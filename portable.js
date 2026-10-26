'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const fitDesktop=()=>{const root=document.getElementById('SITE_CONTAINER');if(!root)return;if(innerWidth>=768){root.style.width=Math.max(1559,innerWidth)+'px';root.style.zoom=String(Math.min(1,innerWidth/1559));}else{root.style.width='';root.style.zoom='';}};fitDesktop();addEventListener('resize',fitDesktop);
 const dialog=document.createElement('dialog');dialog.className='image-lightbox';dialog.setAttribute('aria-label','Project image');
 const close=document.createElement('button');close.className='lightbox-close';close.textContent='×';close.setAttribute('aria-label','Close enlarged image');
 const image=document.createElement('img');dialog.append(close,image);document.body.append(dialog);
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{const src=button.querySelector('img');if(!src)return;image.src=src.src;image.alt=src.alt||'Project image';dialog.showModal()}));
 document.querySelectorAll('[data-portable-slides]').forEach(carousel=>{
  const slides=JSON.parse(carousel.dataset.portableSlides);if(!slides.length)return;let i=0;
  const stage=carousel.querySelector('.carousel-stage img'),counter=carousel.querySelector('.carousel-counter');
  const render=()=>{stage.src=slides[i];stage.alt='Project image '+(i+1)+' of '+slides.length;counter.textContent=(i+1)+' / '+slides.length};
  carousel.querySelector('[data-prev]').addEventListener('click',()=>{i=(i+slides.length-1)%slides.length;render()});
  carousel.querySelector('[data-next]').addEventListener('click',()=>{i=(i+1)%slides.length;render()});
  stage.addEventListener('click',()=>{image.src=stage.src;image.alt=stage.alt;dialog.showModal()});render();
 });
 // Decorative eye graphic retains its original hover state without a platform runtime.
 document.querySelectorAll('button').forEach(b=>{if(b.getAttribute('aria-label')==='Eye')b.addEventListener('click',()=>b.classList.toggle('eye-active'))});
 document.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noopener noreferrer');
 document.querySelectorAll('button').forEach(b=>{if(b.textContent.trim().startsWith('#')){b.setAttribute('aria-disabled','true');b.tabIndex=-1}});
});

