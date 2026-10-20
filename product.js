'use strict';
const selectedProduct = products.find(p => p.id === new URLSearchParams(location.search).get('id'));
if (selectedProduct) {
  const p = selectedProduct;
  const name = p.type === 'turbine' ? `${p.power} ${p.axis === 'vertical' ? 'Vertical' : 'Horizontal'} Axis Wind Turbine` : p.title;
  document.title = `${name} | Rewindagic`;
  document.querySelector('meta[name="description"]').content = `Explore ${name}, ${p.voltage}. View available specifications and request a quotation from Rewindagic.`;
  document.querySelector('#detail-title').textContent = name;
  document.querySelector('#detail-image').innerHTML = productImage(p);
  document.querySelector('#detail-description').textContent = p.description;
  document.querySelector('#detail-specs').innerHTML = productSpecs(p).map(([label,value]) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join('');
  document.querySelector('#detail-table').hidden = false;
  document.querySelector('#detail-quote').href = `index.html?product=${encodeURIComponent(p.id)}#contact`;
} else {
  document.querySelector('#detail-title').textContent = 'Product not found';
  document.querySelector('#detail-description').textContent = 'Please return to the product catalog and select an available product.';
  document.querySelector('head').insertAdjacentHTML('beforeend', '<meta name="robots" content="noindex">');
}
