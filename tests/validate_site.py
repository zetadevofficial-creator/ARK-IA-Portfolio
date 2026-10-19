from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"


class PageInspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = set()
        self.links = []
        self.fragment_links = []
        self.images_without_alt = []
        self.incomplete_translations = []
        self.language_options = []
        self.in_language_select = False
        self.has_title = False
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "select" and "language-switch" in attrs.get("class", "").split():
            self.in_language_select = True

        for prefix in ("data", "data-label", "data-alt", "data-aria", "data-title", "data-description"):
            translated = [f"{prefix}-{lang}" for lang in ("de", "en", "es")]
            if any(key in attrs for key in translated) and not all(key in attrs for key in translated):
                self.incomplete_translations.append(tag)

        if tag == "option" and self.in_language_select:
            self.language_options.append(attrs.get("value", ""))

        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.add(element_id)
            self.ids.add(element_id)

        href = attrs.get("href")
        if href:
            self.links.append(href)

        src = attrs.get("src")
        if src:
            self.links.append(src)

        if tag == "img":
            if "alt" not in attrs:
                self.images_without_alt.append(attrs.get("src", "<unknown image>"))

        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "select":
            self.in_language_select = False

    def handle_data(self, data):
        if self.in_title and data.strip():
            self.has_title = True


def validate_page(page):
    inspector = PageInspector()
    inspector.feed(page.read_text(encoding="utf-8"))
    errors = []

    if not inspector.has_title:
        errors.append("missing a non-empty <title>")
    if inspector.duplicates:
        errors.append(f"duplicate IDs: {', '.join(sorted(inspector.duplicates))}")
    if inspector.images_without_alt:
        errors.append(f"images missing alt text: {', '.join(inspector.images_without_alt)}")
    if inspector.incomplete_translations:
        errors.append("elements missing one or more German, English, and Spanish translations")
    if inspector.language_options != ["de", "en", "es"]:
        errors.append(f"language selector must be ordered de, en, es; got {inspector.language_options}")

    for link in inspector.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        target = page if not parsed.path else (page.parent / parsed.path).resolve()
        if parsed.path and not target.is_file():
            errors.append(f"missing local file for {link!r}")
        if parsed.fragment:
            if target == page and parsed.fragment not in inspector.ids:
                errors.append(f"missing in-page target #{parsed.fragment}")
            elif target != page:
                target_inspector = PageInspector()
                if target.is_file():
                    target_inspector.feed(target.read_text(encoding="utf-8"))
                    if parsed.fragment not in target_inspector.ids:
                        errors.append(f"missing target {link!r}")

    return errors


def main():
    pages = sorted(SITE.glob("*.html"))
    if not pages:
        raise SystemExit("No HTML pages found in site/")

    failures = []
    for page in pages:
        errors = validate_page(page)
        if errors:
            failures.extend(f"{page.relative_to(ROOT)}: {error}" for error in errors)
        else:
            print(f"OK {page.relative_to(ROOT)}")

    if failures:
        print("\n".join(f"ERROR {error}" for error in failures))
        raise SystemExit(1)


if __name__ == "__main__":
    main()
