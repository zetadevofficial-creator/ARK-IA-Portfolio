# Technische Fallstudie: Bildschirmübersetzung auf Android

## Die Herausforderung

Text in anderen Apps soll lesbar übersetzt werden, ohne den Nutzer durch eine dauerhafte Aufnahme zu überraschen oder den Bildschirminhalt an einen Übersetzungsserver zu senden.

## Entwurfsentscheidung

Die Übersetzung wird ausdrücklich vom Nutzer gestartet. Android verwaltet die Bildschirmfreigabe; ARK liest Text aus der freigegebenen Ansicht, übersetzt ihn mit lokal verfügbaren ML-Kit-Sprachmodellen und zeigt das Ergebnis als Overlay. Das Overlay muss mit der Systemnavigation und der begrenzten Bildschirmfläche zurechtkommen.

## Ablauf auf hoher Ebene

1. Der Nutzer lädt die benötigten Sprachmodelle bei Bedarf herunter.
2. Der Nutzer aktiviert die Übersetzungsblase und bestätigt die Systemfreigabe.
3. Erst nach einer Nutzeraktion wird eine Bildschirmansicht gelesen und Text erkannt.
4. Die Übersetzung erfolgt auf dem Gerät; das Ergebnis wird über dem Ausgangsbild angezeigt.
5. Die Sitzung kann über die App oder Android beendet werden.

## Abwägungen

- **Datenschutz vor Dauerbetrieb:** keine kontinuierliche Bildschirmaufnahme. Jede Sitzung benötigt die Freigabe von Android; einzelne Übersetzungen werden durch den Nutzer ausgelöst.
- **Offline-Nutzung nach Vorbereitung:** Sprachmodelle werden vorher heruntergeladen. Der Download benötigt Internet, die eigentliche Übersetzung kann danach lokal laufen.
- **Plattformgrenze:** dieser Bildschirmzugriff ist in der gezeigten Version Android-spezifisch und wird nicht als Windows-Funktion dargestellt.
- **Technische Grenzen:** geschützte Ansichten bleiben geschützt. Kleine oder stark gestaltete Schrift kann schlechter erkannt werden. Die Ansicht ist eine Momentaufnahme und aktualisiert sich nicht automatisch beim Scrollen.

## Was ich dabei gelernt habe

Eine gute Funktion braucht mehr als OCR und Übersetzung: Systemberechtigungen, Lebenszyklus der Freigabe, Bedienbarkeit des Overlays, Lesbarkeit und ein klares Verhalten bei Abbruch gehören ebenfalls zum Entwurf. Die Implementierungsdetails und der vollständige Kotlin-/Flutter-Quellcode bleiben im privaten Projekt.

---

# Nota técnica: traducción de pantalla en Android

## El reto

Traducir texto de otras aplicaciones sin sorprender al usuario con una captura permanente ni enviar la pantalla a un servidor de traducción.

## Decisión de diseño

La traducción se inicia explícitamente. Android administra el permiso de captura; ARK lee el texto de la vista autorizada, lo traduce con modelos locales de ML Kit y presenta el resultado como una superposición. Esa superposición debe convivir con la navegación del sistema y el espacio limitado de la pantalla.

## Flujo general

1. El usuario descarga los modelos de idioma que necesita.
2. Activa la burbuja y confirma el permiso que muestra Android.
3. Solo después de una acción suya se lee la pantalla y se reconoce el texto.
4. La traducción se procesa en el dispositivo y aparece sobre la imagen original.
5. La sesión puede detenerse desde ARK o desde Android.

## Compromisos de diseño

- **Privacidad antes que captura continua:** cada sesión requiere autorización del sistema y cada lectura la inicia el usuario.
- **Uso sin conexión después de preparar idiomas:** descargar los modelos sí requiere internet; traducir después puede hacerse localmente.
- **Límite de plataforma:** esta función de captura de pantalla está implementada para Android; el portafolio no la presenta como función de Windows.
- **Límites técnicos:** se respetan las pantallas protegidas. El texto pequeño o muy estilizado puede reconocerse peor. La vista es una captura fija, no una traducción que se actualiza sola al desplazarse.

## Aprendizaje

Una función así requiere más que OCR y traducción: permisos del sistema, ciclo de vida de la sesión, facilidad de uso de la superposición, legibilidad y buen manejo de cancelaciones también forman parte del diseño. La implementación completa y su código Kotlin/Flutter quedan en el proyecto privado.
