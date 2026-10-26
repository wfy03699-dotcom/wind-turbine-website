'use strict';
(() => {
  const viewer = createImageViewer('#image-lightbox');
  const main = document.querySelector('.series-main-image');
  const mainImg = main.querySelector('img');
  document.querySelectorAll('[data-select-image]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-select-image]').forEach(b => b.classList.toggle('active', b === button));
    main.dataset.viewImage = button.dataset.selectImage;
    main.dataset.alt = button.dataset.alt;
    mainImg.src = button.dataset.selectImage;
    mainImg.alt = button.dataset.alt;
    main.setAttribute('aria-label', 'Enlarge ' + button.dataset.alt);
  }));
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
