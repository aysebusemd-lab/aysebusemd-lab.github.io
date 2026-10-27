'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const fitDesktop=()=>{const root=document.getElementById('SITE_CONTAINER');if(!root)return;if(innerWidth>=1024){root.style.width=Math.max(1559,innerWidth)+'px';root.style.zoom=String(Math.min(1,innerWidth/1559));}else{root.style.width='';root.style.zoom='';}};fitDesktop();addEventListener('resize',fitDesktop);
 const dialog=document.createElement('dialog');dialog.className='image-lightbox';dialog.setAttribute('aria-label','Project image');
 const close=document.createElement('button');close.className='lightbox-close';close.textContent='×';close.setAttribute('aria-label','Close enlarged image');
 const image=document.createElement('img');dialog.append(close,image);document.body.append(dialog);
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{const src=button.querySelector('img');if(!src)return;image.src=src.src;image.alt=src.alt||'Project image';dialog.showModal()}));
 const galleries=[];
 let activeGallery=null,autoplayTimer,focusFrame;
 const restartAutoplay=()=>{
  clearTimeout(autoplayTimer);
  if(activeGallery)autoplayTimer=setTimeout(()=>{
   const previous=activeGallery;updateGalleryFocus();
   if(activeGallery&&activeGallery===previous){activeGallery.advance();restartAutoplay()}
  },3000);
 };
 const updateGalleryFocus=()=>{
  let closest=null,distance=Infinity;
  const host=window.frameElement,hostRect=host?.getBoundingClientRect();
  const viewportHeight=host?window.parent.innerHeight:innerHeight;
  const obscured=dialog.open||document.querySelector('[data-portable-open="true"]');
  if(!document.hidden&&!obscured&&(!host||hostRect.width>0))for(const gallery of galleries){
   const rect=gallery.element.getBoundingClientRect();
   const top=rect.top+(hostRect?.top||0),bottom=rect.bottom+(hostRect?.top||0);
   const visible=Math.max(0,Math.min(bottom,viewportHeight)-Math.max(top,0));
   if(rect.width<=0||rect.height<=0||visible<Math.min(rect.height,viewportHeight)*.25)continue;
   const offset=Math.abs((top+bottom)/2-viewportHeight/2);
   if(offset<distance){closest=gallery;distance=offset}
  }
  if(closest!==activeGallery){
   if(activeGallery)activeGallery.element.dataset.autoplayActive='false';
   activeGallery=closest;
   if(activeGallery)activeGallery.element.dataset.autoplayActive='true';
   restartAutoplay();
  }
 };
 const requestGalleryFocus=()=>{cancelAnimationFrame(focusFrame);focusFrame=requestAnimationFrame(updateGalleryFocus)};
 document.querySelectorAll('[data-portable-slides]').forEach(carousel=>{
  const slides=JSON.parse(carousel.dataset.portableSlides);if(!slides.length)return;
  const viewport=carousel.querySelector('.carousel-stage'),counter=carousel.querySelector('.carousel-counter');
  let current=viewport.querySelector('img'),i=0,busy=false,queued=0;
  const caption=()=>{current.alt='Project image '+(i+1)+' of '+slides.length;counter.textContent=(i+1)+' / '+slides.length};
  const show=async (step,automatic=false)=>{
   if(busy){if(!automatic)queued+=step;return}busy=true;
   const next=(i+step%slides.length+slides.length)%slides.length;
   if(next!==i){
    const incoming=new Image();incoming.src=slides[next];incoming.alt='Project image '+(next+1)+' of '+slides.length;
    try{await incoming.decode()}catch(error){/* Keep navigation available if one image cannot decode. */}
    if(automatic&&activeGallery?.element!==carousel){
     busy=false;if(queued){const pending=queued;queued=0;show(pending)}return;
    }
    viewport.append(incoming);current.setAttribute('aria-hidden','true');
    const direction=step<0?-1:1;
    const options={duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:550,easing:'cubic-bezier(.45,0,.2,1)',fill:'both'};
    const outgoingAnimation=current.animate([{transform:'translateX(0)'},{transform:'translateX('+(-direction*100)+'%)'}],options);
    const incomingAnimation=incoming.animate([{transform:'translateX('+(direction*100)+'%)'},{transform:'translateX(0)'}],options);
    i=next;counter.textContent=(i+1)+' / '+slides.length;
    await Promise.all([outgoingAnimation.finished,incomingAnimation.finished]);
    current.remove();incomingAnimation.cancel();current=incoming;caption();
   }
   busy=false;
   if(queued){const step=queued;queued=0;show(step)}
  };
  const navigate=step=>{show(step);if(activeGallery?.element===carousel)restartAutoplay()};
  for(const [selector,points] of [['[data-prev]','20,4 4,20 20,36'],['[data-next]','4,4 20,20 4,36']]){
   const button=carousel.querySelector(selector);
   button.innerHTML='<svg viewBox="0 0 24 40" aria-hidden="true" focusable="false"><polyline points="'+points+'"/></svg>';
   button.addEventListener('click',()=>navigate(selector==='[data-prev]'?-1:1));
  }
  carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();navigate(event.key==='ArrowRight'?1:-1)}});
  viewport.addEventListener('click',()=>{image.src=current.src;image.alt=current.alt;dialog.showModal()});
  carousel.dataset.autoplayActive='false';
  galleries.push({element:carousel,advance:()=>show(1,true)});
  caption();
 });
 addEventListener('scroll',requestGalleryFocus,{passive:true});
 addEventListener('resize',requestGalleryFocus);
 if(window.frameElement){window.parent.addEventListener('scroll',requestGalleryFocus,{passive:true});window.parent.addEventListener('resize',requestGalleryFocus)}
 document.addEventListener('visibilitychange',updateGalleryFocus);
 document.addEventListener('portfolio-focus-change',updateGalleryFocus);
 dialog.addEventListener('toggle',updateGalleryFocus);
 updateGalleryFocus();
 // Decorative eye graphic retains its original hover state without a platform runtime.
 document.querySelectorAll('button').forEach(b=>{if(b.getAttribute('aria-label')==='Eye')b.addEventListener('click',()=>b.classList.toggle('eye-active'))});
 document.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noopener noreferrer');
 document.querySelectorAll('button').forEach(b=>{if(b.textContent.trim().startsWith('#')){b.setAttribute('aria-disabled','true');b.tabIndex=-1}});
});

