'use strict';
// Only reviewed, local images belong in products.js. No generated product images.
const turbine = products.find(product => product.id === 'horizontal-400');
const galleryImages = turbine.gallery || [];
const gallery = document.querySelector('#product-gallery');
const lightbox = document.querySelector('#image-lightbox');
const enlarged = document.querySelector('#lightbox-image');
let activeImage = 0;
let opener;
if (galleryImages.length) {
  gallery.replaceChildren();
  const main = document.createElement('button');
  main.type = 'button';
  main.className = 'gallery-main';
  main.setAttribute('aria-label', 'Enlarge product image');
  const image = document.createElement('img');
  image.decoding = 'async';
  main.append(image);
  const caption = document.createElement('p');
  caption.className = 'gallery-caption';
  caption.setAttribute('aria-live', 'polite');
  const thumbnails = document.createElement('div');
  thumbnails.className = 'gallery-thumbnails';
  thumbnails.setAttribute('role', 'group');
  thumbnails.setAttribute('aria-label', 'Choose product image');
  const buttons = galleryImages.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show image ${index + 1}: ${item.alt}`);
    const thumbnail = document.createElement('img');
    thumbnail.src = item.src;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    button.append(thumbnail);
    button.addEventListener('click', () => selectImage(index));
    thumbnails.append(button);
    return button;
  });
  function selectImage(index) {
    activeImage = index;
    image.src = galleryImages[index].src;
    image.alt = galleryImages[index].alt;
    caption.textContent = `${index + 1} / ${galleryImages.length} — ${galleryImages[index].alt}. Select the image to enlarge.`;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
  }
  main.addEventListener('click', () => {
    opener = main;
    enlarged.src = galleryImages[activeImage].src;
    enlarged.alt = galleryImages[activeImage].alt;
    document.querySelector('#lightbox-caption').textContent = galleryImages[activeImage].alt;
    lightbox.showModal();
  });
  gallery.append(main, thumbnails, caption);
  selectImage(0);
}
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target !== lightbox) return;
  const rect = lightbox.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => opener?.focus());
