'use strict';
// FX-600 independent gallery. Images are stored in /assets/products/ on the
// feature branch; missing assets are omitted until the owner uploads originals.
(() => {
  const assets = [{"src":"assets/products/fx-600w-main.png","alt":"FX-600 600W wind turbine product poster and specification chart"},{"src":"assets/products/fx-600w-outdoor-front.jpg","alt":"FX-600 white vertical-axis wind turbine installed by the waterfront – front view"},{"src":"assets/products/fx-600w-outdoor-angle.jpg","alt":"FX-600 white vertical-axis turbine installed outdoors – three-quarter view"},{"src":"assets/products/fx-600w-outdoor-side.jpg","alt":"FX-600 white vertical-axis turbine installed outdoors – side view"},{"src":"assets/products/fx-600w-green-dimensions.jpg","alt":"FX-600 vertical-axis turbine shown in green with 60cm and 105cm annotated measurements"},{"src":"assets/products/fx-600w-white-dimensions.jpg","alt":"FX-600 vertical-axis turbine shown in white with 60cm and 105cm annotated measurements"},{"src":"assets/products/fx-600w-blade-hub-detail.jpg","alt":"FX-600 turbine support arms, fasteners and generator hub – close-up"},{"src":"assets/products/fx-600w-bottom-view.jpg","alt":"Three-blade vertical-axis turbine underside view against the sky"},{"src":"assets/products/fx-600w-color-options.jpg","alt":"FX-600 vertical-axis turbine in white, green and red blade colors"},{"src":"assets/products/fx-600w-generator-detail.jpg","alt":"FX-600 white generator body and bolted support detail"},{"src":"assets/products/fx-600w-system-diagram.jpg","alt":"Illustrative wind turbine controller, battery, inverter and AC load diagram – verify compatibility before wiring"}];
  const thumbnails = document.querySelector('#fx600-thumbnails');
  const mainButton = document.querySelector('#fx600-main-button');
  const mainImage = document.querySelector('#fx600-main-photo');
  const notice = document.querySelector('#fx600-image-notice');
  const viewer = createImageViewer('#image-lightbox');
  if (!thumbnails || !mainButton || !mainImage) return;

  const probe = asset => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(asset);
    img.onerror = () => resolve(null);
    img.src = asset.src;
  });
  const activate = (asset, button) => {
    mainImage.src = asset.src;
    mainImage.alt = asset.alt;
    mainButton.dataset.viewImage = asset.src;
    mainButton.dataset.alt = asset.alt;
    mainButton.setAttribute('aria-label','Enlarge ' + asset.alt);
    thumbnails.querySelectorAll('button').forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
  };

  Promise.all(assets.map(probe)).then(found => {
    const available = found.filter(Boolean);
    if (!available.length) {
      notice.textContent = 'High-resolution FX-600 photographs are being added to this product page. Please contact us for the original files or return when the gallery is updated.';
      return;
    }
    notice.hidden = true;
    mainButton.hidden = false;
    available.forEach((asset,index) => {
      const button = document.createElement('button');
      button.type='button';
      button.setAttribute('aria-label','View FX-600 photograph '+(index+1)+': '+asset.alt);
      const img = document.createElement('img');
      img.src=asset.src;img.alt=index===0?'FX-600 product poster':'FX-600 turbine photo '+index;
      img.width=130;img.height=130;
      if(index) img.loading='lazy';
      button.appendChild(img);
      thumbnails.appendChild(button);
      button.addEventListener('click',()=>activate(asset,button));
      if(index===0) activate(asset,button);
    });
  });
  mainButton.addEventListener('click',()=>{
    const src=mainButton.dataset.viewImage;
    if(src) viewer.open(src,mainButton.dataset.alt,mainButton);
  });
})();