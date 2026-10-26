'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const root=document.getElementById('SITE_CONTAINER'),host=window.frameElement;
 let sizing;
 const report=()=>{
  cancelAnimationFrame(sizing);sizing=requestAnimationFrame(()=>{
   const height=Math.ceil(root.getBoundingClientRect().bottom+2);
   if(host)window.parent.postMessage({type:'portfolio-mobile-size',height},location.origin);
  });
 };
 const fit=()=>{root.style.zoom=String(innerWidth/320);root.style.width='320px';report()};
 fit();addEventListener('resize',fit);addEventListener('load',report);
 new ResizeObserver(report).observe(root);document.fonts.ready.then(report);
 const dialog=document.querySelector('.image-lightbox'),image=dialog.querySelector('img');
 dialog.addEventListener('beforetoggle',event=>{
  if(event.newState==='open'){
   const viewportHeight=host?window.parent.innerHeight:innerHeight;
   const offset=host?Math.max(0,-host.getBoundingClientRect().top):0;
   dialog.style.cssText='position:absolute;top:'+(offset+15)+'px;bottom:auto;margin:0 auto;max-height:'+(viewportHeight-30)+'px';
   image.style.maxHeight=Math.max(100,viewportHeight-95)+'px';
  }
 });
 const toggle=document.getElementById('MENU_AS_CONTAINER_TOGGLE'),menu=document.getElementById('MENU_AS_CONTAINER');
 if(toggle&&menu){
  const close=document.createElement('button');close.type='button';close.className='mobile-menu-close';close.textContent='×';close.setAttribute('aria-label','Close navigation menu');menu.append(close);
  const setOpen=open=>{menu.dataset.portableOpen=String(open);menu.dataset.undisplayed=String(!open);toggle.setAttribute('aria-expanded',String(open));document.dispatchEvent(new Event('portfolio-focus-change'));if(open){menu.style.minHeight=((host?window.parent.innerHeight:innerHeight)/(innerWidth/320))+'px';close.focus()}else toggle.focus()};
  toggle.addEventListener('click',()=>setOpen(menu.dataset.portableOpen!=='true'));
  close.addEventListener('click',()=>setOpen(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.dataset.portableOpen==='true')setOpen(false)});
 }
 document.querySelectorAll('[data-mobile-media]').forEach(gallery=>{
  const items=JSON.parse(gallery.dataset.mobileMedia),stage=gallery.querySelector('.mobile-media-stage');
  const prev=gallery.querySelector('[data-media-prev]'),next=gallery.querySelector('[data-media-next]'),counter=gallery.querySelector('.media-counter');
  let index=0,startX,swiped=false;
  const render=direction=>{
   stage.querySelector('video')?.pause();const item=items[index];let el;
   if(item.type==='image'){
    el=document.createElement('button');el.type='button';el.className='image-open';el.setAttribute('aria-label','Enlarge project image');
    const img=new Image();img.src=item.src;img.alt=item.alt;el.append(img);
    el.addEventListener('click',()=>{if(swiped){swiped=false;return}image.src=img.src;image.alt=img.alt;dialog.showModal()});
   }else if(item.type==='video'){
    el=document.createElement('video');el.src=item.src;el.poster=item.poster;el.controls=true;el.playsInline=true;el.preload='metadata';
   }else{
    el=document.createElement('iframe');el.src=item.src;el.title=item.title;el.allowFullscreen=true;el.allow='encrypted-media; picture-in-picture';
   }
   stage.style.height=(item.height||gallery.clientHeight)+'px';prev.style.top=next.style.top=((item.height||gallery.clientHeight)/2)+'px';counter.style.top=Math.max(0,(item.height||gallery.clientHeight)-22)+'px';counter.style.bottom='auto';stage.replaceChildren(el);prev.disabled=index===0;next.disabled=index===items.length-1;counter.textContent=(index+1)+' / '+items.length;
   if(direction&&!matchMedia('(prefers-reduced-motion: reduce)').matches)el.animate([{transform:'translateX('+(direction*100)+'%)'},{transform:'translateX(0)'}],{duration:350,easing:'ease-out'});
  };
  const move=direction=>{const destination=index+direction;if(destination>=0&&destination<items.length){index=destination;render(direction)}};
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  stage.style.touchAction='pan-y';stage.addEventListener('pointerdown',e=>{startX=e.clientX;swiped=false});
  stage.addEventListener('pointerup',e=>{if(startX!==undefined&&Math.abs(e.clientX-startX)>35){swiped=true;move(e.clientX<startX?1:-1)}startX=undefined});
  gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
  render(0);
 });
});
