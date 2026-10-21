'use strict';
// Shared native dialog: fit the complete image, or inspect original pixels by scrolling.
function createImageViewer(selector) {
  const dialog = document.querySelector(selector);
  const image = dialog.querySelector('.viewer-image');
  const caption = dialog.querySelector('.viewer-caption');
  const zoom = dialog.querySelector('.viewer-zoom');
  const viewport = dialog.querySelector('.lightbox-viewport');
  let opener;
  function setZoom(expanded) {
    dialog.classList.toggle('is-zoomed', expanded);
    zoom.setAttribute('aria-pressed', String(expanded));
    zoom.textContent = expanded ? 'Fit complete image' : 'View at full size';
    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  }
  zoom.addEventListener('click', () => setZoom(!dialog.classList.contains('is-zoomed')));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({preventScroll: true}));
  return {
    open(src, alt, trigger) {
      opener = trigger;
      image.src = src;
      image.alt = alt;
      caption.textContent = alt;
      dialog.querySelector('.viewer-original').href = src;
      setZoom(false);
      dialog.showModal();
    }
  };
}
