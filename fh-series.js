'use strict';
// Selection for the FH family only. Never infer unprovided technical details.
(() => {
  const variants=[
    {code:'FH-400W',power:'400W'},
    {code:'FH-600W',power:'600W'},
    {code:'FH-800W',power:'800W'}
  ];
  const options=[...document.querySelectorAll('.fh-option')];
  const select=document.querySelector('#catalog-power');
  const code=document.querySelector('#fh-model-selected');
  const power=document.querySelector('#fh-power-selected');
  const activate=key=>{
    const selected=variants.find(v=>v.code===key);
    if(!selected)return;
    code.textContent=selected.code;
    power.textContent=selected.power;
    if(select) select.value=selected.code+' / '+selected.power;
    options.forEach(el=>{
      const active=el.dataset.fh===selected.code;
      el.classList.toggle('active',active);
      el.setAttribute('aria-pressed',String(active));
    });
  };
  options.forEach(btn=>btn.addEventListener('click',()=>activate(btn.dataset.fh)));
  select?.addEventListener('change',()=>activate(select.value.split(' / ')[0]));

  // FH product photography: load only real assets that are present in the repository.
  const images=[
    ['fh-series-01-main-poster.png','FH-400W, FH-600W and FH-800W series product poster'],
    ['fh-series-02-turbine-front.jpg','FH vertical-axis wind turbine outdoors, front view'],
    ['fh-series-03-turbine-angle.jpg','FH vertical-axis turbine outdoors, angled view'],
    ['fh-series-04-turbine-side.jpg','FH vertical-axis wind turbine outdoors, side view'],
    ['fh-series-05-outdoor-view.jpg','FH vertical-axis turbine, outdoor full view'],
    ['fh-series-06-outdoor-rear.jpg','FH vertical-axis wind turbine, reverse view'],
    ['fh-series-07-outdoor-side.jpg','FH vertical-axis wind turbine, waterside view'],
    ['fh-series-08-factory-unit.jpg','Larger vertical-axis wind turbine photographed in the factory, model to be confirmed'],
    ['fh-series-09-generator-closeup.jpg','FH wind turbine generator housing and rotor hub close-up'],
    ['fh-series-10-blade-mount.jpg','FH turbine blade mounting arms and generator detail'],
    ['fh-series-11-supplier-spec-sheet.png','Original FH-400, FH-600 and FH-800 supplier specification sheet']
  ];
  const loaded=document.querySelector('#fh-photo-loaded');
  const placeholder=document.querySelector('#fh-photo-placeholder');
  const status=document.querySelector('#fh-gallery-status');
  const main=document.querySelector('#fh-photo-main');
  const mainImage=document.querySelector('#fh-photo-image');
  const thumbs=document.querySelector('#fh-photo-thumbs');
  if(loaded && placeholder && status && main && mainImage && thumbs){
    const gallery=[];
    let current=0;
    const selectImage=index=>{
      current=index;
      const item=gallery[index];
      if(!item)return;
      mainImage.src=item.src;
      mainImage.alt=item.alt;
      main.setAttribute('aria-label','Enlarge: '+item.alt);
      [...thumbs.children].forEach((button,i)=>{
        button.classList.toggle('active',i===index);
        button.setAttribute('aria-pressed',String(i===index));
      });
    };
    const showGallery=()=>{
      if(!gallery.length)return;
      loaded.hidden=false;
      placeholder.hidden=true;
      thumbs.replaceChildren();
      gallery.forEach((item,i)=>{
        const button=document.createElement('button');
        button.type='button';
        button.className='fh-photo-thumb';
        button.setAttribute('aria-label','View photo '+(i+1)+': '+item.alt);
        const image=document.createElement('img');
        image.src=item.src;
        image.alt='';
        image.loading='lazy';
        button.append(image);
        button.addEventListener('click',()=>selectImage(i));
        thumbs.append(button);
      });
      selectImage(0);
      status.textContent=gallery.length+' product images available. Select a thumbnail to change the image, or click the large image to zoom.';
    };
    const checks=images.map(([file,alt],index)=>new Promise(resolve=>{
      const test=new Image();
      const src='assets/products/'+file;
      test.onload=()=>resolve({src,alt,index});
      test.onerror=()=>resolve(null);
      test.src=src;
    }));
    Promise.all(checks).then(results=>{
      results.filter(Boolean).sort((a,b)=>a.index-b.index).forEach(item=>gallery.push(item));
      if(gallery.length)showGallery();
      else status.textContent='Product photography is temporarily unavailable. Please contact us for full-size photos and specifications.';
    });
    main.addEventListener('click',()=>{
      const item=gallery[current];
      if(!item)return;
      if(typeof createImageViewer==='function'){
        if(!main._fhViewer)main._fhViewer=createImageViewer('#image-lightbox');
        main._fhViewer.open(item.src,item.alt,main);
      }else window.open(item.src,'_blank','noopener');
    });
    main.addEventListener('keydown',event=>{
      if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;
      if(!gallery.length)return;
      event.preventDefault();
      selectImage((current+(event.key==='ArrowRight'?1:-1)+gallery.length)%gallery.length);
    });
  }

  activate('FH-400W');
})();
