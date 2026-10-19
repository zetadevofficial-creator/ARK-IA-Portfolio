# Propuesta de publicación

Esta carpeta es una preparación local para un repositorio independiente. Todavía no tiene repositorio Git propio ni se ha publicado.

## Ajustes propuestos

- Nombre: `ARK-IA-Portfolio`
- Descripción: `Technisches Portfolio zu ARK IA, einer Flutter-App für Android und Windows.`
- Visibilidad: pública
- README inicial: alemán; también hay versiones en inglés y español
- Topics: `flutter`, `dart`, `android`, `windows`, `portfolio`, `machine-learning`
- Sitio de portafolio: `site/`, listo para desplegarse con GitHub Pages y actualizarse con GitHub Actions
- Validación automática: `tests/validate_site.py` revisa idiomas, enlaces internos, títulos e imágenes con texto alternativo
- Ejemplo público de código: `examples/flutter_interaction/`, un widget Flutter independiente con pruebas propias
- No añadir una licencia de código abierta hasta decidir qué permisos quieres conceder.

## Revisión antes de hacer público

1. Abrir los tres README y revisar capturas, traducciones y afirmaciones de funciones.
2. Revisar visualmente `site/index.html` y `site/case-study.html` en escritorio y móvil; probar los tres idiomas y copiar el ejemplo.
3. Confirmar que el ejemplo independiente `examples/flutter_interaction/` puede mostrarse públicamente.
4. Buscar datos personales, nombres de usuario, metadatos y secretos en todos los archivos.
5. Confirmar nombre, descripción, topics y visibilidad del repositorio.
6. Crear el repositorio público separado; no conectarlo al repositorio privado ni copiar su historial.
7. En GitHub, configurar Pages para publicar desde GitHub Actions; el flujo del repositorio publicará `site/`.

El repositorio privado, sus commits, ramas, respaldos, paneles, servicios de servidor y configuración permanecen fuera de esta carpeta.
