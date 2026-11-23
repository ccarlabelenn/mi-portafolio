document.addEventListener('DOMContentLoaded', () => {
  // 1. CURSOR: CÍRCULO AZUL (#2B3BFF) SOLO EN DISPOSITIVOS CON MOUSE
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'dot-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span></span>';
    document.body.appendChild(cursor);
    document.body.classList.add('cursor-custom');

    let x = 0, y = 0, pendiente = false;
    const pintar = () => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      pendiente = false;
    };

    // pointermove (no mousemove): sigue funcionando mientras se arrastra un elemento
    document.addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.classList.add('visible');
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(pintar);
      }
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('visible'));

    const selector = 'a, button, .draggable, .hero h1, .galeria-item';
    const actualizar = (e) => cursor.classList.toggle('activo', !!(e.target.closest && e.target.closest(selector)));
    document.addEventListener('pointerover', actualizar);
    document.addEventListener('pointerdown', actualizar);
    window.addEventListener('scroll', () => {
      const el = document.elementFromPoint(x, y);
      cursor.classList.toggle('activo', !!(el && el.closest(selector)));
    }, { passive: true });
  }

  // 2. ELEMENTOS ARRASTRABLES (circuito en Contacto, retrato y sticker en Sobre mí)
  // En pantallas táctiles no se arrastra, para no bloquear el scroll con el dedo
  const tactil = window.matchMedia('(pointer: coarse)').matches;
  const draggables = tactil ? [] : document.querySelectorAll('.draggable');
  let topZ = 10;

  draggables.forEach((el) => {
    let isDragging = false;
    let startX = 0, startY = 0, currentX = 0, currentY = 0;

    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      isDragging = true;
      topZ += 1;
      el.style.zIndex = topZ;
      el.setPointerCapture(e.pointerId);
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    const stopDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    el.addEventListener('pointerup', stopDrag);
    el.addEventListener('pointercancel', stopDrag);
  });
});