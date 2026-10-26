'use strict';
(() => {
  const viewer = createImageViewer('#image-lightbox');
  const main = document.querySelector('.series-main-image');
  const mainImg = main.querySelector('img');
  // Prefer the owner's exact 1254×1254 promotional image as the first gallery
  // item as soon as the binary asset is available. Until then, preserve the
  // existing real-photo main image without displaying a broken thumbnail.
  const gallery = document.querySelector('.series-gallery');
  const posterPath = gallery?.dataset.posterImage;
  if (posterPath) {
    const poster = new Image();
    poster.onload = () => {
      const thumbs = document.querySelector('.series-thumbnails');
      const first = thumbs.querySelector('[data-select-image]');
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.selectImage = posterPath;
      button.dataset.alt = '400W to 2000W vertical-axis wind turbine product overview and model comparison';
      button.setAttribute('aria-label', 'Show 400W–2000W product overview main image');
      const thumbnail = document.createElement('img');
      thumbnail.src = posterPath;
      thumbnail.alt = '400W–2000W product overview';
      thumbnail.width = 130;
      thumbnail.height = 130;
      button.appendChild(thumbnail);
      thumbs.prepend(button);
      document.querySelectorAll('[data-select-image]').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      main.dataset.viewImage = posterPath;
      main.dataset.alt = button.dataset.alt;
      mainImg.src = posterPath;
      mainImg.alt = button.dataset.alt;
      main.setAttribute('aria-label', 'Enlarge product overview');
      // Delegated selection listener below also handles this inserted thumbnail.
    };
    poster.src = posterPath;
  }

  document.querySelector('.series-thumbnails').addEventListener('click', event => {
    const button = event.target.closest('[data-select-image]');
    if (!button) return;
    document.querySelectorAll('[data-select-image]').forEach(b => b.classList.toggle('active', b === button));
    main.dataset.viewImage = button.dataset.selectImage;
    main.dataset.alt = button.dataset.alt;
    mainImg.src = button.dataset.selectImage;
    mainImg.alt = button.dataset.alt;
    main.setAttribute('aria-label', 'Enlarge ' + button.dataset.alt);
  });
  main.addEventListener('click', () => viewer.open(main.dataset.viewImage, main.dataset.alt, main));

  const select = document.querySelector('#catalog-power');
  document.querySelectorAll('[data-power]').forEach(button => button.addEventListener('click', () => {
    select.value = button.dataset.power;
    document.querySelectorAll('[data-power]').forEach(b => b.classList.toggle('active', b === button));
    document.querySelector('#product-inquiry').scrollIntoView({behavior: 'smooth', block: 'start'});
  }));
  select.addEventListener('change', () => {
    document.querySelectorAll('[data-power]').forEach(b => b.classList.toggle('active', b.dataset.power === select.value));
  });
  // The shared catalog form handler reads this optional field for contact messages.
})();
