# Development process / Entwicklungsablauf / Proceso de desarrollo

ARK IA is a long-running independent project. Its complete application source and backend implementation stay in a private repository. This document describes the engineering approach at a high level; the public code is a small, self-contained UI example.

## Project structure

The private Flutter application separates its main responsibilities into recognizable areas:

| Area | Responsibility |
| --- | --- |
| `config/` | Shared app configuration and prompts. |
| `models/` | Data structures used by screens and services. |
| `screens/` | Full application views and user flows. |
| `services/` | Work such as persistence, synchronization, media, voice, and updates. |
| `widgets/` | Reusable interface elements. |
| `theme/` | Colors, text styles, and appearance settings. |
| `utils/` | Small shared helpers. |
| `android/` and `windows/` | Platform-specific integration when Flutter alone is not enough. |
| `test/` | Widget, service, and regression tests. |

The public repository contains only a safe demonstration package under `examples/flutter_interaction/`; it is not a copy of the private application tree.

The project snapshot represented here is app version 1.0.0 and Android build 29. The private app's main source areas are `lib/config/`, `lib/models/`, `lib/screens/`, `lib/services/`, `lib/widgets/`, `lib/theme/`, and `lib/utils/`; platform integration, assets, tests, and tooling are kept in their corresponding top-level folders. This is a directory map, not a copy of those private files.

## How I approach a feature

1. **Understand the user flow.** Identify who uses the feature, what they are trying to do, and what should happen when they cancel, go offline, or lack a permission.
2. **Set behavior and boundaries.** Decide which parts belong in the interface, shared app logic, a service, or a platform-specific bridge. Keep secrets and privileged operations on the server side.
3. **Implement in focused pieces.** Prefer reusable widgets and small service responsibilities so behavior can be checked independently.
4. **Test expected behavior and regressions.** Add focused widget or service tests for the user-visible behavior and important edge cases.
5. **Run static and automated checks.** The private project uses Dart analysis, Flutter tests, a documentation audit, and Node tests for the server-side worker.
6. **Verify the relevant platform flow.** Check Android or Windows behavior where the feature uses system permissions, files, downloads, or native integration.
7. **Document and release deliberately.** Keep version and build information explicit, record user-facing changes, and prepare platform installers as separate deliverables.

## Quality practices

- The Flutter codebase has automated tests covering areas such as synchronization, permissions, downloads, voice, updates, screen translation, and UI regressions. This portfolio does not claim a passing result unless a check has been run for the exact revision being reviewed.
- Named Dart declarations in the private app follow a documentation convention with short purpose comments in Spanish, English, and German.
- Platform-specific behavior is treated as a boundary. For example, Android screen capture requires the system's explicit approval and is not described as a Windows capability.
- UI examples include focused tests; the public tap animation is verified for press, callback, reset, and unavailable-action behavior.

## What the public example demonstrates

[`examples/flutter_interaction/`](../examples/flutter_interaction/) is a small Flutter package with its own `pubspec.yaml`, reusable widget, and widget tests. It shows a real interaction pattern without exposing the private app's business rules, account flows, AI prompts, server API, synchronization format, or signing configuration.

## Sprachen / Languages / Idiomas

### Deutsch

Ich entwickle ARK IA schrittweise und beginne mit dem tatsächlichen Nutzerablauf. Danach lege ich Verhalten und Zuständigkeiten fest, setze die Funktion in kleinen Teilen um und prüfe sie mit gezielten Widget- oder Servicetests. Statische Analyse und Regressionstests helfen, bestehendes Verhalten zu schützen. Plattformfunktionen werden auf dem jeweiligen Zielsystem geprüft. Die vollständige Anwendung und ihre privaten Dienste bleiben im privaten Repository.

### Español

Desarrollo ARK IA por partes, empezando por el flujo real de la persona usuaria. Defino el comportamiento esperado y los límites técnicos, implemento piezas pequeñas y las verifico con pruebas de widgets o servicios. El análisis estático y las pruebas de regresión ayudan a proteger el comportamiento existente. Las funciones propias de cada plataforma se revisan en su sistema correspondiente. La aplicación completa y sus servicios privados permanecen en el repositorio privado.

### English

I develop ARK IA in focused steps, starting with the real user flow. I define expected behavior and technical boundaries, implement small pieces, and verify them with widget or service tests. Static analysis and regression tests help protect existing behavior. Platform-specific features are checked on their target system. The full application and private services remain in the private repository.
