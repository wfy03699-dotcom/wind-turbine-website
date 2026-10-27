'use strict';
// Updates comparison highlight, header and inquiry model together. Data is from
// the manufacturer's FX series brochure supplied by the product owner.
(() => {
  const modelData=[{"id":"FX-800","power":"800W","voltage":"12–48V AC","start":"1.3 m/s","diameter":"0.80 m","height":"1.32 m"},{"id":"FX-1K","power":"1KW","voltage":"24V / 48V AC","start":"2 m/s","diameter":"1.10 m","height":"1.64 m"},{"id":"FX-2K","power":"2KW","voltage":"24–96V AC","start":"2 m/s","diameter":"1.60 m","height":"1.92 m"},{"id":"FX-3K","power":"3KW","voltage":"48–220V AC","start":"2 m/s","diameter":"1.92 m","height":"2.80 m"},{"id":"FX-5K","power":"5KW","voltage":"48–220V AC","start":"2 m/s","diameter":"2.40 m","height":"3.60 m"},{"id":"FX-10K","power":"10KW","voltage":"48–220V AC","start":"2 m/s","diameter":"3.00 m","height":"5.00 m"}];
  const buttons=[...document.querySelectorAll('[data-model]')];
  const select=document.querySelector('#catalog-power');
  const fields={model:document.querySelector('#selected-model-label'),
    voltage:document.querySelector('#selected-voltage'),
    start:document.querySelector('#selected-start'),
    diameter:document.querySelector('#selected-diameter'),
    height:document.querySelector('#selected-height')};
  const update = id => {
    const item=modelData.find(x=>x.id===id);
    if(!item) return;
    fields.model.textContent=item.id+' / '+item.power;
    fields.voltage.textContent=item.voltage;
    fields.start.textContent=item.start;
    fields.diameter.textContent=item.diameter;
    fields.height.textContent=item.height;
    if(select) select.value=item.id+' — '+item.power;
    buttons.forEach(b=>{
      const active=b.dataset.model===item.id;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    document.querySelectorAll('.fx-compare-table thead th[data-model-header]').forEach(h=>{
      h.classList.toggle('selected',h.dataset.modelHeader===item.id);
    });
  };
  buttons.forEach(b=>b.addEventListener('click',()=>update(b.dataset.model)));
  select?.addEventListener('change',()=>update(select.value.split(' — ')[0]));
  update('FX-800');
})();