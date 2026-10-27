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
  activate('FH-400W');
})();
