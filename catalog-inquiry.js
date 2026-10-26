'use strict';
// Shared inquiry enhancement for the 400W, 600W and catalog product pages.
// Netlify detects the matching static HTML forms during deployment.
(() => {
  const form = document.querySelector('#catalog-inquiry-form');
  if (!form) return;

  const productField = document.querySelector('#catalog-form-product');
  const productIdField = document.querySelector('#catalog-form-product-id');
  const modelLabel = document.querySelector('#catalog-quote-product');
  const product = typeof selectedProduct !== 'undefined' ? selectedProduct : null;
  if (product && !product.detailPage) {
    productField.value = product.title;
    productIdField.value = product.id;
    if (modelLabel) modelLabel.textContent = product.title;
  }

  form.addEventListener('submit', event => {
    if (location.protocol === 'file:' || ['localhost', '127.0.0.1', ''].includes(location.hostname)) {
      event.preventDefault();
      document.querySelector('#catalog-form-status').textContent =
        'Please submit from the deployed Netlify site. This local preview cannot send inquiries.';
    }
  });

  const getValue = id => (document.getElementById(id)?.value || '').trim();
  const message = () => [
    'Hello, I would like a quotation for ' + productField.value + '.',
    'Model ID: ' + productIdField.value,
    ...(document.querySelector('#catalog-power') ? ['Rated power: ' + (getValue('catalog-power') || 'please advise')] : []),
    'Quantity: ' + (getValue('catalog-quantity') || 'please advise'),
    'Preferred voltage: ' + (getValue('catalog-voltage') || 'please advise'),
    'Delivery country: ' + (getValue('catalog-country') || 'please advise'),
    ...(document.querySelector('#catalog-color') ? ['Preferred finish: ' + (getValue('catalog-color') || 'please advise')] : []),
    'Application: ' + (getValue('catalog-application') || 'not specified'),
    'System setup: ' + (getValue('catalog-setup') || 'not specified'),
    'Other requirements: ' + (getValue('catalog-message') || 'not specified'),
    'Please confirm model specifications, available accessories and shipping.'
  ].join('\n');

  const whatsapp = document.querySelector('.catalog-whatsapp-link');
  whatsapp?.addEventListener('click', () => {
    whatsapp.href = 'https://wa.me/8619825532553?text=' + encodeURIComponent(message());
  });

  const email = document.querySelector('.catalog-email-link');
  email?.addEventListener('click', () => {
    email.href = 'mailto:1683750532@qq.com?subject=' +
      encodeURIComponent('Product quotation: ' + productField.value) +
      '&body=' + encodeURIComponent(message());
  });
})();
