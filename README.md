# mi-portafolio

Diseño, desarrollo y despliegue del examen de diseño de interfaces web.

## 1. Enlaces del proyecto

* **Sitio publicado (GitHub Pages):** <https://ccarlabelenn.github.io/mi-portafolio/index.html#contacto>
* **Archivo de Figma:** <https://www.figma.com/design/AMrK5AeX5KmZy4gzNrCmEm/examen?node-id=7-5&t=YiC7b6e4iZgkIVWg-1>

---

## 2. Registro por avance 

### Avance 1 (9 de noviembre) — Exploración inicial y sobrecarga visual
* **Qué presenté:** Una propuesta oscura, inspirada en referentes como *Emele Collab*, *Readymag* e *ilovecreatives*. La idea original buscaba mezclar un portafolio con un blog editable, utilizando tres familias tipográficas (`Unbounded`, `DM Sans` y `DM Mono`) y una paleta de cinco colores neón de alta saturación (azul eléctrico, naranja neón, violeta y lima ácido) que teñían la pantalla según cada proyecto.
* **Feedback y diagnóstico propio:** Al avanzar en el prototipo noté que la propuesta se sentía ajena a mi identidad como diseñadora. La mezcla de tantos colores neón, tipografías distintas y la estructura tipo blog competían visualmente con las fotografías de mis objetos físicos (electrónica, cerámicas y madera), haciendo que el sitio se viera recargado y poco coherente con mi trabajo material.

### Avance 2 (16 de noviembre) — Cambio de rumbo y síntesis editorial
* **Qué presenté:** Un rediseño casi total de la identidad visual en Figma, descartando el modo oscuro y el blog para volver a una estética limpia, luminosa y editorial que me representara al 100%.
* **Qué cambié para la entrega final:**
  * **Paleta cromática:** Pasé a un lienzo blanco (`#FFFFFF`) con tinta azul profundo (`#0A0A1F`) y dejé el **azul eléctrico (`#2B3BFF`)** como único color de acento para interacciones, enlaces y detalles tipográficos.
  * **Tipografía única:** Simplifiqué el sistema usando exclusivamente la familia **Unbounded** (pesos 300 a 800) cargada localmente, logrando una jerarquía contundente entre titulares grandes y textos de lectura
  * **Curaduría de proyectos:** Reemplacé el proyecto de ebanistería (*Silla Élé*) por *Irse y no volver* (objeto poético interactivo basado en Alejandra Pizarnik), consolidando cuatro proyectos que cruzan electrónica, programación y oficios: *Vitrina Sónica*, *El tincado*, *Irse y no volver* y *Torno*.
  * **Interacción lúdica sin ruido:** Mantuve el espíritu interactivo que buscaba desde el principio, pero de forma sutil: un cursor circular azul reactivo y elementos arrastrables (como el circuito en Contacto y el sticker/retrato en Sobre mí) que invitan a jugar sin distraer.

---

## 3. Arquitectura del código (HTML / CSS / JS)

El sitio está construido con **HTML5 semántico**, **CSS3 puro** (sin frameworks) y **JavaScript Vanilla**, dividido en 6 páginas enlazadas entre sí (`index.html`, `sobre-mi.html`, `vitrina.html`, `tincado.html`, `irse.html`, `torno.html`):

* **Escalado proporcional fiel a Figma (`styles.css`):** Para respetar exactamente las proporciones del lienzo diseñado en Figma (`1728px` de ancho), definí la unidad base `--u: calc(100vw/1728)`. Esto permite que márgenes, tipografías y bloques escalen de manera fluida en cualquier monitor de escritorio, cambiando a un sistema adaptado en móviles y tablets mediante `@media (max-width: 1024px)`.
* **Grillas asimétricas reutilizables (`--tx`, `--x`, `--mt`, `--g`, `--sx`):** Las cuatro páginas de proyectos comparten una misma hoja de estilos, pero cada una define sus propias variables CSS en línea en el `<body>` y utiliza la clase `.inv` para alternar la posición de la galería y el texto a izquierda o derecha.
* **Imágenes responsivas y rendimiento:** Uso de `loading="lazy"` en galerías, etiquetas `<picture>` con `<source media="(min-width:1025px)">` en *Vitrina Sónica* para servir distintas proporciones según el dispositivo, y `history.scrollRestoration = 'manual'` para controlar la posición de lectura.
* **Interactividad inteligente (`script.js`):**
  1. **Cursor personalizado (`.dot-cursor`):** Detecta dispositivos con puntero fino (`pointer: fine`), oculta el cursor normal y mueve un círculo azul mediante `requestAnimationFrame` y `pointermove`, ampliándose al pasar sobre enlaces o elementos interactivos.
  2. **Elementos arrastrables (`.draggable`):** Permite mover libremente el circuito, el retrato y el sticker usando eventos `pointerdown`, `pointermove` y `pointerup` con gestión dinámica de `z-index`, desactivándose automáticamente en pantallas táctiles (`pointer: coarse`) para no bloquear el desplazamiento vertical con el dedo.

---

## 4. Uso de Inteligencia Artificial

Durante el desarrollo utilicé **Claude** y **Gemini** como apoyo técnico puntual para la programación en JavaScript y la refactorización del código, mientras que el diseño visual en Figma, la identidad, la curaduría, las fotografías y la redacción de todos los contenidos son de autoría propia.

### Registro de herramientas y prompts

1. **Programación de interacciones en JavaScript (`script.js`)**
   * **Herramienta:** Claude / Gemini.
   * **Prompt utilizado:** *"Necesito un script en JavaScript vanilla para mi portafolio que reemplace el cursor por un círculo azul de 18px que crezca al pasar sobre enlaces, y que además permita arrastrar algunas imágenes (clase .draggable) por la pantalla sin que interfiera con el scroll en celulares."*
   * **Qué entregó la IA:** El código base con listeners de `mousemove` y eventos de arrastre con `setPointerCapture`.
   * **Qué ajusté y por qué:** Cambié `mousemove` por `pointermove` porque noté que al arrastrar una imagen el cursor azul se quedaba congelado; agregué `requestAnimationFrame` para que el movimiento fuera fluido y definí los selectores específicos de mi diseño (`.hero h1`, `.galeria-item`, `.draggable`) junto con el color `#2B3BFF` de mi paleta.

2. **Organización y limpieza del código (`styles.css` y HTML)**
   * **Herramienta:** Claude / Gemini.
   * **Prompt utilizado:** *"Ayúdame a ordenar este CSS y HTML para no repetir código en las cuatro páginas de mis proyectos, manteniendo las posiciones exactas que diseñé en Figma."*
   * **Qué entregó la IA:** La propuesta de abstraer las coordenadas individuales de cada proyecto mediante variables CSS en el `<body>` (`--tx`, `--x`, `--mt`, `--g`, `--sx`) y unificar las reglas en una sola hoja de estilos (`styles.css`).
   * **Qué ajusté y por qué:** Revisé y ajusté manualmente cada valor numérico en píxeles/unidades `--u` comparando pantalla a pantalla con mi prototipo en Figma, además de añadir soporte para `prefers-reduced-motion` y etiquetas `aria-label` para mejorar la accesibilidad.

3. **Áreas realizadas 100% sin IA**
   * Diseño de interfaz (UI Kit, componentes y prototipo desktop/mobile en Figma).
   * Redacción de biografía, descripción de proyectos, créditos de equipo y fotografía/edición de todas las imágenes.
   * Pseudocódigo y código inicial.

---

## 5. Problemas y soluciones

| Problema encontrado | Causa | Solución aplicada |
| :--- | :--- | :--- |
| **Falta de identidad en el diseño inicial** | El exceso de colores neón y el fondo oscuro opacaban las fotografías de mis prototipos físicos y no representaban mi estilo. | Pivote completo en el Avance 2 hacia una estética minimalista en blanco y azul eléctrico (`#2B3BFF`) con tipografía `Unbounded`. |
| **El cursor personalizado se congelaba al arrastrar elementos** | Al usar `setPointerCapture` en los elementos `.draggable` con `mousemove`, el navegador dejaba de disparar el evento de movimiento al documento. | Reemplacé `mousemove` por `pointermove` en `script.js`, permitiendo que el cursor siga al puntero incluso mientras se arrastra un objeto. |
| **Bloqueo del scroll en versión móvil** | Al tocar las imágenes arrastrables en pantallas táctiles, el evento `touch-action: none` impedía deslizar la página hacia abajo. | Incorporé una detección con `window.matchMedia('(pointer: coarse)').matches` para desactivar el arrastre en celulares y restaurar `touch-action: auto`. |
| **Descuadre de proporciones entre pantallas grandes y portátiles** | Usar medidas fijas en `px` rompía la composición asimétrica diseñada en Figma (`1728px`). | Implementé la variable escalable `--u: calc(100vw/1728)` para desktop y una media query unificada a partir de `1024px` para tablet y móvil. |

---

## 6. Aprendizajes

* **El diseño web debe servir al contenido:** Aprendí que un portafolio no necesita efectos estridentes para tener personalidad, reducir la paleta a blanco y azul eléctrico hizo que mis proyectos de electrónica y oficios cobraran mucho más valor visual y se sintieran más míos.
* **Pensar en sistemas y variables:** Traducir un diseño de Figma a código me enseñó a detectar patrones repetitivos (como las fichas de proyecto) y resolverlos con variables CSS en lugar de duplicar archivos.
* **Diseño responsivo real y táctil:** Comprendí que adaptar un sitio a móvil no es solo achicar cajas, sino repensar cómo interactúa el usuario (por ejemplo, reemplazar el *hover* y el *drag* de mouse por una navegación táctil limpia).
* **Criterio crítico frente a la IA:** Usar IA aceleró la resolución de problemas técnicos en JavaScript y CSS, pero requirió entender cómo funcionaba cada línea para depurar errores de interacción y mantener la fidelidad exacta con mi prototipo.
