(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const languageSelect = document.querySelector('.language-switch');
  const copyButton = document.querySelector('[data-copy]');
  const supportedLanguages = ['de', 'en', 'es'];
  let language = languageSelect.value;
  try {
    const savedLanguage = window.localStorage.getItem('ark-portfolio-language');
    if (supportedLanguages.includes(savedLanguage)) language = savedLanguage;
  } catch {
    // The page still works when browser storage is disabled.
  }
  const pageText = {
    de: {
      title: 'ARK IA — Flutter-Projekt von Zeta-Dev',
      description: 'ARK IA: ein Flutter-Projekt für Android und Windows. KI, Sprache, persönliche Organisation und lokale Bildschirmübersetzung auf Android.',
      copy: 'Kopiert ✓',
      copyError: 'Im Repository öffnen ↗',
    },
    en: {
      title: 'ARK IA — Flutter project by Zeta-Dev',
      description: 'ARK IA: a Flutter project for Android and Windows, bringing together AI, voice, personal organization, and on-device screen translation for Android.',
      copy: 'Copied ✓',
      copyError: 'Open in repository ↗',
    },
    es: {
      title: 'ARK IA — Proyecto Flutter de Zeta-Dev',
      description: 'ARK IA: un proyecto Flutter para Android y Windows. IA, voz, organización personal y traducción de pantalla local en Android.',
      copy: 'Copiado ✓',
      copyError: 'Abrir en el repositorio ↗',
    },
  };

  function setLanguage(next) {
    if (!supportedLanguages.includes(next)) return;
    language = next;
    root.lang = next;
    const suffix = `${next[0].toUpperCase()}${next.slice(1)}`;
    document.querySelectorAll('[data-de][data-en][data-es]').forEach((element) => {
      element.innerHTML = element.dataset[next];
    });
    document.querySelectorAll('[data-label-de][data-label-en][data-label-es]').forEach((element) => {
      element.textContent = element.dataset[`label${suffix}`];
    });
    document.querySelectorAll('[data-alt-de][data-alt-en][data-alt-es]').forEach((element) => {
      element.alt = element.dataset[`alt${suffix}`];
    });
    document.querySelectorAll('[data-aria-de][data-aria-en][data-aria-es]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`aria${suffix}`]);
    });
    languageSelect.value = next;
    try {
      window.localStorage.setItem('ark-portfolio-language', next);
    } catch {
      // Language selection remains active for this page view.
    }
    document.title = document.body.dataset[`title${suffix}`] || pageText[next].title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = document.body.dataset[`description${suffix}`] || pageText[next].description;
    }
    if (copyButton) {
      copyButton.setAttribute('aria-label', next === 'de' ? 'Code kopieren' : next === 'en' ? 'Copy code' : 'Copiar código');
    }
  }

  languageSelect.addEventListener('change', () => setLanguage(languageSelect.value));
  setLanguage(language);

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (copyButton) copyButton.addEventListener('click', async () => {
    const source = `GestureDetector(
  onTapDown: (_) => _setPressed(true),
  onTapUp: (_) => _setPressed(false),
  onTapCancel: () => _setPressed(false),
  onTap: widget.onTap,
  child: AnimatedScale(
    scale: _pressed ? widget.scaleDown : 1.0,
    duration: widget.duration,
    curve: Curves.easeOut,
    child: widget.child,
  ),
)`;
    try {
      await navigator.clipboard.writeText(source);
      copyButton.textContent = pageText[language].copy;
      window.setTimeout(() => {
        const suffix = `${language[0].toUpperCase()}${language.slice(1)}`;
        copyButton.textContent = copyButton.dataset[`label${suffix}`];
      }, 1600);
    } catch {
      copyButton.textContent = pageText[language].copyError;
      window.setTimeout(() => {
        const suffix = `${language[0].toUpperCase()}${language.slice(1)}`;
        copyButton.textContent = copyButton.dataset[`label${suffix}`];
      }, 1800);
    }
  });
})();
