'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const scope=document.querySelector('.mobile-site');if(!scope)return;
 const toggle=scope.querySelector('.responsive-menu-toggle'),menu=scope.querySelector('.responsive-menu'),close=scope.querySelector('.responsive-menu-close');
 let previousOverflow='';
 const setOpen=open=>{
  if(open){previousOverflow=document.body.style.overflowY;document.body.style.overflowY='hidden'}else document.body.style.overflowY=previousOverflow;
  menu.hidden=!open;menu.dataset.portableOpen=String(open);toggle.setAttribute('aria-expanded',String(open));
  document.dispatchEvent(new Event('portfolio-focus-change'));if(open)close.focus();else toggle.focus();
 };
 toggle.addEventListener('click',()=>setOpen(menu.hidden));close.addEventListener('click',()=>setOpen(false));
 menu.querySelectorAll('a[href$="#mobile-contact"]').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('keydown',event=>{
  if(menu.hidden)return;if(event.key==='Escape'){setOpen(false);return}
  if(event.key==='Tab'){const targets=[...menu.querySelectorAll('a,button')],first=targets[0],last=targets[targets.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
 });
 addEventListener('resize',()=>{if(innerWidth>=1024&&!menu.hidden)setOpen(false)});
 const dialog=document.querySelector('.image-lightbox'),image=dialog.querySelector('img');
 scope.querySelectorAll('[data-mobile-media]').forEach(gallery=>{
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
   stage.replaceChildren(el);prev.disabled=index===0;next.disabled=index===items.length-1;counter.textContent=(index+1)+' / '+items.length;
   if(direction&&!matchMedia('(prefers-reduced-motion: reduce)').matches)el.animate([{transform:'translateX('+(direction*100)+'%)'},{transform:'translateX(0)'}],{duration:350,easing:'ease-out'});
  };
  const move=direction=>{const destination=index+direction;if(destination>=0&&destination<items.length){index=destination;render(direction)}};
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  stage.style.touchAction='pan-y';stage.addEventListener('pointerdown',e=>{startX=e.clientX;swiped=false});
  stage.addEventListener('pointerup',e=>{if(startX!==undefined&&Math.abs(e.clientX-startX)>35){swiped=true;move(e.clientX<startX?1:-1)}startX=undefined});
  gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
  render(0);
 });
 scope.querySelectorAll('.motion-video').forEach(player=>{
  const video=player.querySelector('video'),button=player.querySelector('.motion-video-play');
  button.addEventListener('click',()=>{video.controls=true;video.play().catch(()=>{video.controls=false;button.hidden=false})});
  video.addEventListener('play',()=>{button.hidden=true});
  video.addEventListener('pause',()=>{button.hidden=false});
  video.addEventListener('ended',()=>{button.hidden=false});
 });
});
