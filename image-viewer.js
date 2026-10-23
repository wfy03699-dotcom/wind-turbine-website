'use strict';
// Shared product lightbox. Mouse wheel, +/- buttons and drag-to-pan work inside this dialog.
// The separate "Open original image" browser tab is outside the site's control.
function createImageViewer(selector) {
  const dialog = document.querySelector(selector);
  const image = dialog.querySelector('.viewer-image');
  const caption = dialog.querySelector('.viewer-caption');
  const fitButton = dialog.querySelector('.viewer-zoom');
  const viewport = dialog.querySelector('.lightbox-viewport');
  const toolbar = dialog.querySelector('.viewer-toolbar');
  const zoomOut = document.createElement('button');
  const zoomIn = document.createElement('button');
  const zoomLevel = document.createElement('span');
  zoomOut.type = zoomIn.type = 'button';
  zoomOut.className = 'viewer-zoom-out';
  zoomIn.className = 'viewer-zoom-in';
  zoomOut.textContent = '−';
  zoomIn.textContent = '+';
  zoomOut.setAttribute('aria-label', 'Zoom out');
  zoomIn.setAttribute('aria-label', 'Zoom in');
  zoomLevel.className = 'viewer-zoom-level';
  zoomLevel.setAttribute('aria-live', 'polite');
  toolbar.insertBefore(zoomOut, fitButton);
  toolbar.insertBefore(zoomIn, fitButton);
  toolbar.insertBefore(zoomLevel, fitButton);
  image.draggable = false;

  let opener;
  let scale = 1;
  let baseWidth = 0;
  let baseHeight = 0;
  let dragging = null;
  const MAX_SCALE = 8;

  function updateControls() {
    const expanded = scale > 1.001;
    dialog.classList.toggle('is-zoomed', expanded);
    fitButton.setAttribute('aria-pressed', String(expanded));
    fitButton.textContent = expanded ? 'Fit complete image' : 'View at full size';
    zoomLevel.textContent = Math.round(scale * 100) + '%';
    zoomOut.disabled = !expanded;
    zoomIn.disabled = scale >= MAX_SCALE;
  }

  function fitImage() {
    scale = 1;
    image.style.width = '';
    image.style.height = '';
    dialog.classList.remove('is-zoomed');
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
    baseWidth = image.getBoundingClientRect().width;
    baseHeight = image.getBoundingClientRect().height;
    updateControls();
  }

  function setScale(next, anchor) {
    if (!image.naturalWidth || !baseWidth || !baseHeight) return;
    next = Math.max(1, Math.min(MAX_SCALE, next));
    if (Math.abs(next - scale) < 0.001) return;
    if (next === 1) {
      fitImage();
      return;
    }

    const viewRect = viewport.getBoundingClientRect();
    const point = anchor || {
      x: viewRect.left + viewRect.width / 2,
      y: viewRect.top + viewRect.height / 2
    };
    const before = image.getBoundingClientRect();
    const fractionX = Math.max(0, Math.min(1, (point.x - before.left) / before.width));
    const fractionY = Math.max(0, Math.min(1, (point.y - before.top) / before.height));

    scale = next;
    dialog.classList.add('is-zoomed');
    image.style.width = (baseWidth * scale) + 'px';
    image.style.height = (baseHeight * scale) + 'px';
    const after = image.getBoundingClientRect();
    viewport.scrollLeft += after.left + after.width * fractionX - point.x;
    viewport.scrollTop += after.top + after.height * fractionY - point.y;
    updateControls();
  }

  zoomIn.addEventListener('click', () => setScale(scale * 1.3));
  zoomOut.addEventListener('click', () => setScale(scale / 1.3));
  fitButton.addEventListener('click', () => {
    if (scale > 1) fitImage();
    else setScale(Math.max(2, Math.min(MAX_SCALE, image.naturalWidth / baseWidth)));
  });

  // Prevent page scrolling only when the wheel is used directly over the image.
  viewport.addEventListener('wheel', event => {
    if (!dialog.open || event.target !== image || !image.naturalWidth) return;
    event.preventDefault();
    setScale(scale * (event.deltaY < 0 ? 1.2 : 1 / 1.2), {x: event.clientX, y: event.clientY});
  }, {passive: false});

  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || scale <= 1 || event.target !== image) return;
    event.preventDefault();
    dragging = {x: event.clientX, y: event.clientY};
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (!dragging) return;
    viewport.scrollLeft -= event.clientX - dragging.x;
    viewport.scrollTop -= event.clientY - dragging.y;
    dragging = {x: event.clientX, y: event.clientY};
  });
  function stopDragging() {
    dragging = null;
    viewport.classList.remove('is-dragging');
  }
  viewport.addEventListener('pointerup', stopDragging);
  viewport.addEventListener('pointercancel', stopDragging);
  viewport.addEventListener('lostpointercapture', stopDragging);

  image.addEventListener('load', () => {
    if (dialog.open) fitImage();
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    stopDragging();
    opener?.focus({preventScroll: true});
  });
  return {
    open(src, alt, trigger) {
      opener = trigger;
      image.src = src;
      image.alt = alt;
      caption.textContent = alt;
      dialog.querySelector('.viewer-original').href = src;
      dialog.showModal();
      fitImage();
    }
  };
}
