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
    {src:'assets/products/fx-series-800w-10kw-specifications.png',alt:'FX-800 FX-1K FX-2K FX-3K FX-5K FX-10K technical specification infographic'},
    {src:'assets/products/fx-series-photo-01-indoor-white.jpg',alt:'Related vertical-axis turbine, indoor white model photographed from the front'},
    {src:'assets/products/fx-series-photo-02-indoor-angle.jpg',alt:'Related vertical-axis wind turbine white blades and multicolor center, indoor view'},
    {src:'assets/products/fx-series-photo-03-indoor-front.jpg',alt:'Related vertical-axis turbine, indoor front angle with white blades'},
    {src:'assets/products/fx-series-photo-04-indoor-full-view.jpg',alt:'Full view of a related three-blade vertical-axis white wind turbine indoors'},
    {src:'assets/products/fx-series-photo-05-waterfront-view.jpg',alt:'Representative three-blade white vertical-axis wind turbine outdoors near waterfront'},
    {src:'assets/products/fx-series-photo-06-waterfront-angle.jpg',alt:'Representative three-blade vertical-axis wind turbine by the water, angled view'},
    {src:'assets/products/fx-series-photo-07-waterfront-side.jpg',alt:'Representative vertical-axis turbine white blades from the lakeside'},
    {src:'assets/products/fx-series-photo-08-outdoor-open-sky.jpg',alt:'Representative three-blade vertical-axis turbine outdoors with blue sky'},
    {src:'assets/products/fx-series-photo-09-outdoor-blue-sky.jpg',alt:'Representative three-blade vertical-axis wind turbine under blue sky'},
    {src:'assets/products/fx-series-photo-10-outdoor-red-blue-hub.jpg',alt:'Representative white-blade turbine with red and blue center hub installed outdoors'},
    {src:'assets/products/fx-series-photo-11-outdoor-blue-yellow-hub.jpg',alt:'Representative white-blade turbine with blue and yellow central assembly outdoors'},
    {src:'assets/products/fx-series-photo-12-generator-close-up.jpg',alt:'Close-up of a sample wind turbine generator and support mount'},
    {src:'assets/products/fx-series-photo-13-blade-arm-fasteners.jpg',alt:'Close-up of turbine blade-arm bolts and central mounting plate'},
    {src:'assets/products/fx-series-photo-14-generator-hub-white.jpg',alt:'Close-up of white generator housing and attachment assembly'},
    {src:'assets/products/fx-series-photo-15-generator-mount.jpg',alt:'Generator mount flange and lower attachment detail'}
  ];  const gallery=document.querySelector('#fx-photo-loaded');
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
    status.textContent='Browse the series main cover, power specification infographic, and representative original turbine photographs. Photos illustrate related physical configurations; confirm the exact model before ordering.';
    available.forEach((photo,i)=>{
      const button=document.createElement('button');
      button.type='button';
      button.setAttribute('aria-label',i===0?'Show series main image':i===1?'Show model technical specification chart':'Show real turbine photograph '+(i-1));
      const tile=document.createElement('img');
      tile.src=photo.src;tile.alt=i===0?'Promotional cover':i===1?'Specification infographic':'Photo '+(i-1);
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
