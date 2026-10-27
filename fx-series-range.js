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

/* FX series owner-supplied main image and model specification poster.
   Only display an asset after it loads; until uploaded the product page
   retains its attractive text-based cover, without broken images. */
(() => {
  const photos=[
    {src:'assets/products/fx-series-800w-10kw-main.png',alt:'FX Series 800W to 10KW vertical-axis wind turbine main promotional image'},
    {src:'assets/products/fx-series-800w-10kw-specifications.png',alt:'FX-800 FX-1K FX-2K FX-3K FX-5K FX-10K technical specification infographic'}
  ];
  const gallery=document.querySelector('#fx-photo-loaded');
  const fallback=document.querySelector('#fx-photo-fallback');
  const status=document.querySelector('#fx-photo-status');
  const thumbs=document.querySelector('#fx-photo-thumbs');
  const trigger=document.querySelector('#fx-photo-main');
  const img=document.querySelector('#fx-photo-image');
  if (!gallery || !fallback || !trigger || !thumbs || !img) return;
  const viewer=typeof createImageViewer==='function'?createImageViewer('#image-lightbox'):null;
  const loaded=src=>new Promise(resolve=>{
    const test=new Image();
    test.onload=()=>resolve(true);
    test.onerror=()=>resolve(false);
    test.src=src;
  });
  const show=(photo,button)=>{
    img.src=photo.src;img.alt=photo.alt;
    trigger.dataset.currentSrc=photo.src;
    trigger.dataset.currentAlt=photo.alt;
    trigger.setAttribute('aria-label','Enlarge '+photo.alt);
    thumbs.querySelectorAll('button').forEach(el=>{
      const selected=el===button;
      el.classList.toggle('active',selected);
      el.setAttribute('aria-pressed',String(selected));
    });
  };
  Promise.all(photos.map(p=>loaded(p.src))).then(flags=>{
    const available=photos.filter((_,i)=>flags[i]);
    if(!available.length)return;
    gallery.hidden=false;
    fallback.hidden=true;
    status.textContent='Browse the actual product promotional image and FX series technical specification chart. Select a thumbnail and click the large image for full resolution.';
    available.forEach((photo,i)=>{
      const button=document.createElement('button');
      button.type='button';
      button.setAttribute('aria-label',i===0?'Show first product image':'Show model technical specifications');
      const tile=document.createElement('img');
      tile.src=photo.src;tile.alt=i===0?'Promotional cover':'Specification infographic';
      tile.loading=i?'lazy':'eager';tile.width=112;tile.height=112;
      button.appendChild(tile);
      thumbs.appendChild(button);
      button.addEventListener('click',()=>show(photo,button));
      if(i===0)show(photo,button);
    });
  });
  trigger.addEventListener('click',()=>{
    if(viewer && trigger.dataset.currentSrc)viewer.open(trigger.dataset.currentSrc,trigger.dataset.currentAlt,trigger);
  });
})();
