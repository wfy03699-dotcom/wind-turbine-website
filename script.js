'use strict';
const verticalArt = `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a vertical axis wind turbine"><defs><linearGradient id="blade" x1="0" x2="1"><stop stop-color="#d5ded7"/><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#8da398"/></linearGradient></defs><ellipse cx="121" cy="222" rx="58" ry="7" fill="#173a3220"/><path d="M116 67h8v151h-8z" fill="#8fa198"/><path d="M120 40v118M79 62l81 81M80 143l80-81" stroke="#68877a" stroke-width="4"/><path d="M84 28C39 55 45 133 86 163l20-14C73 113 69 68 105 41Z" fill="url(#blade)" stroke="#b5c2b8"/><path d="M154 28c45 27 39 105-2 135l-20-14c33-36 37-81 1-108Z" fill="url(#blade)" stroke="#b5c2b8"/><path d="M111 24c-18 39-15 100 9 139l16-13c-17-37-17-79 0-112Z" fill="url(#blade)" stroke="#a5b8ab"/><ellipse cx="120" cy="169" rx="15" ry="7" fill="#274b3f"/><path d="M100 219h40l7 6H93Z" fill="#59776b"/></svg>`;
const horizontalArt = `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a horizontal axis wind turbine"><ellipse cx="120" cy="224" rx="57" ry="6" fill="#173a3220"/><path d="M118 90h7l5 132h-19Z" fill="#b4c3b9"/><path d="M119 83l-2-68q0-14 8-8l7 7-3 68Z" fill="#fafcf7" stroke="#a9bbae"/><path d="M119 88l-62 40q-10 9-12 0l1-10 66-38Z" fill="#f4f7ee" stroke="#a9bbae"/><path d="M124 84l48 55q9 12 13 3l1-10-54-58Z" fill="#e4ece3" stroke="#a9bbae"/><path d="M121 76h29l8 7-8 8h-29Z" fill="#6e8b7c"/><circle cx="121" cy="84" r="11" fill="#f4f7ef" stroke="#9bad9e"/><circle cx="121" cy="84" r="4" fill="#557665"/><path d="M104 221h33l8 5H96Z" fill="#59776b"/></svg>`;
const generatorArt = `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of an electrical generator"><ellipse cx="121" cy="207" rx="78" ry="10" fill="#173a3220"/><path d="M65 174l-12 29h32l11-22M153 177l8 26h29l-14-34" fill="#46695b"/><path d="M76 77h85l28 24v69l-28 22H76Z" fill="#648776"/><ellipse cx="78" cy="134" rx="38" ry="57" fill="#89a393"/><ellipse cx="78" cy="134" rx="28" ry="43" fill="#31584a"/><ellipse cx="78" cy="134" rx="19" ry="29" fill="#a8baad"/><path d="M39 126h38v17H39Z" fill="#c6d1c8"/><ellipse cx="39" cy="134" rx="6" ry="9" fill="#889d8e"/><path d="M109 86v95m13-95v95m13-95v95m13-95v95m13-88v82m13-71v62" stroke="#335b4b" stroke-width="5"/><path d="M109 71V53h42l11 18v14h-53Z" fill="#91a897"/><path d="M117 58h27" stroke="#d6dfd4" stroke-width="3"/></svg>`;
const products = [];
for (const watts of [500, 600, 800]) {
  for (const axis of ['vertical', 'horizontal']) {
    products.push({id:`${axis}-${watts}`,axis,type:'turbine',title:`${watts}W Wind Turbine`,power:`${watts}W`,voltage:'12V–48V',description:`A ${axis} axis wind turbine in the ${watts}W product range. Discuss your site conditions and electrical requirements to select an appropriate configuration.`});
  }
}
for (const axis of ['vertical', 'horizontal']) products.push({id:`${axis}-generator`,axis,type:'generator',title:`${axis === 'vertical' ? 'Vertical' : 'Horizontal'} Axis Generator`,power:'100W–500kW',voltage:'12V–440V',description:`Explore ${axis} axis generators across a 100W–500kW power range and 12V–440V voltage range. These figures describe the product family; individual models and available combinations require confirmation.`});
const grid = document.querySelector('#product-grid');
const dialog = document.querySelector('#product-dialog');
let lastDetailButton;
function renderProducts(filter = 'all') {
  const visible = products.filter(p => filter === 'all' || (filter === 'generator' ? p.type === 'generator' : p.axis === filter));
  grid.innerHTML = visible.map(p => `<article class="product-card"><div class="product-art"><span class="product-tag">${p.type === 'generator' ? 'GENERATOR SERIES' : 'WIND ENERGY'}</span>${p.type === 'generator' ? generatorArt : p.axis === 'vertical' ? verticalArt : horizontalArt}</div><div class="product-body"><p class="product-category">${p.axis} axis · ${p.type === 'generator' ? 'Generator' : 'Wind turbine'}</p><h3>${p.title}</h3><div class="spec-row"><div><span>${p.type === 'generator' ? 'POWER RANGE' : 'RATED POWER'}</span><strong>${p.power}</strong></div><div><span>VOLTAGE RANGE</span><strong>${p.voltage}</strong></div></div><button class="detail-button" data-id="${p.id}" aria-label="View ${p.axis} axis ${p.title} details">Explore product <span>↗</span></button></div></article>`).join('');
  document.querySelector('#product-count').textContent = `${visible.length} products`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b === button);b.setAttribute('aria-pressed', String(b === button));});
  renderProducts(button.dataset.filter);
}));
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-id]');
  if (!button) return;
  const p = products.find(item => item.id === button.dataset.id);
  lastDetailButton = button;
  document.querySelector('#dialog-title').textContent = p.title;
  document.querySelector('#dialog-description').textContent = p.description;
  document.querySelector('#dialog-specs').innerHTML = `<dt>Axis orientation</dt><dd>${p.axis === 'vertical' ? 'Vertical' : 'Horizontal'}</dd><dt>${p.type === 'generator' ? 'Power range' : 'Rated power'}</dt><dd>${p.power}</dd><dt>Voltage range</dt><dd>${p.voltage}</dd>`;
  document.querySelector('#interest').value = p.type === 'generator' ? 'Generators — 100W to 500kW' : `${p.axis === 'vertical' ? 'Vertical' : 'Horizontal'} axis wind turbines`;
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {if(e.target === dialog){const r = dialog.getBoundingClientRect();if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();}});
dialog.addEventListener('close', () => lastDetailButton?.focus());
document.querySelector('#dialog-inquiry').addEventListener('click', () => dialog.close());
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {const open = nav.classList.toggle('open');toggle.setAttribute('aria-expanded', String(open));toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');toggle.textContent = open ? '✕' : '☰';});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');toggle.setAttribute('aria-expanded', 'false');toggle.setAttribute('aria-label', 'Open navigation');toggle.textContent = '☰';}));
document.querySelector('#inquiry-form').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const text = `REWINDAGIC — PROJECT BRIEF\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nInterest: ${data.get('interest')}\n\nProject details:\n${data.get('message')}\n\nPlease share this brief with your Rewindagic representative. This website has not submitted your inquiry.\n`;
  const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a');a.href = url;a.download = 'Rewindagic-project-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent = 'Your project brief is ready. Share the downloaded file with your representative. No inquiry has been sent.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts();
