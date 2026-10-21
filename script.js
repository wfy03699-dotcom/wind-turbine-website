'use strict';
const grid = document.querySelector('#product-grid');
const dialog = document.querySelector('#product-dialog');
let lastDetailButton;
const catalogViewer = createImageViewer('#catalog-image-lightbox');
function renderProducts(filter = 'all') {
  const visible = products.filter(p => filter === 'all' || (filter === 'generator' ? p.type === 'generator' : p.type === 'turbine' && p.axis === filter))
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  grid.innerHTML = visible.map(p => `
    <article class="product-card" aria-labelledby="card-${p.id}">
      <div class="product-art">${p.id === 'horizontal-400' ? `<button class="product-preview" type="button" data-preview="${p.id}" aria-label="Enlarge ${p.title} product sheet">${productImage(p)}<span class="preview-hint">Click to enlarge</span></button>` : productImage(p)}</div>
      <div class="product-body">
        <p class="product-category">${p.axis === 'vertical' ? 'Vertical' : 'Horizontal'} axis · ${p.type === 'generator' ? 'Generator' : 'Wind turbine'}</p>
        <h3 id="card-${p.id}">${p.title}</h3>
        <dl class="card-specs">
          <div><dt>${p.type === 'generator' ? 'Power range' : 'Rated power'}</dt><dd>${p.power}</dd></div>
          <div><dt>Voltage range</dt><dd>${p.voltage}</dd></div>
        </dl>
        <div class="card-actions">
          <a class="button detail-link" href="${productUrl(p)}" aria-label="View Product Details: ${p.title}">View Product Details <span aria-hidden="true">↗</span></a>
          <a class="button dark quote-button" href="#contact" data-quote="${p.id}" aria-label="Get a Quote: ${p.title}">Get a Quote <span aria-hidden="true">↗</span></a>
          <button class="detail-button" data-id="${p.id}" aria-label="Quick view: ${p.title}">Quick view <span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>`).join('');
  document.querySelector('#product-count').textContent = `${visible.length} ${filter === 'all' ? 'products' : filter === 'generator' ? 'generator families' : 'wind turbines'}`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b === button);b.setAttribute('aria-pressed', String(b === button));});
  renderProducts(button.dataset.filter);
}));
grid.addEventListener('click', event => {
  const preview = event.target.closest('[data-preview]');
  if (preview) {
    const product = products.find(item => item.id === preview.dataset.preview);
    catalogViewer.open(product.image, product.imageAlt, preview);
    return;
  }
  const quote = event.target.closest('[data-quote]');
  if (quote) { document.querySelector('#interest').value = quote.dataset.quote; document.querySelector('#interest').focus({preventScroll:true}); return; }
  const button = event.target.closest('[data-id]');
  if (!button) return;
  const p = products.find(item => item.id === button.dataset.id);
  lastDetailButton = button;
  document.querySelector('#dialog-title').textContent = p.title;
  document.querySelector('#dialog-description').textContent = p.description;
  document.querySelector('#dialog-specs').innerHTML = productSpecs(p).map(([label,value]) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join('');
  document.querySelector('#interest').value = p.id;
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {if(e.target === dialog){const r = dialog.getBoundingClientRect();if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();}});
dialog.addEventListener('close', () => lastDetailButton?.focus());
document.querySelector('#dialog-inquiry').addEventListener('click', () => { dialog.close(); document.querySelector('#interest').focus({preventScroll:true}); });
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {const open = nav.classList.toggle('open');toggle.setAttribute('aria-expanded', String(open));toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');toggle.textContent = open ? '✕' : '☰';});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { toggle.click(); toggle.focus(); } });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');toggle.setAttribute('aria-expanded', 'false');toggle.setAttribute('aria-label', 'Open navigation');toggle.textContent = '☰';}));
// A local static server cannot process Netlify submissions. Never show a false success.
document.querySelector('#inquiry-form').addEventListener('submit', e => {
  if (['localhost', '127.0.0.1', ''].includes(location.hostname) || location.protocol === 'file:') {
    e.preventDefault();
    document.querySelector('#form-status').textContent = 'Please use the deployed Netlify website to submit your inquiry. This local preview cannot send forms.';
  }
});
const requested = new URLSearchParams(location.search).get('product');
if (products.some(p => p.id === requested)) document.querySelector('#interest').value = requested;
document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts();
