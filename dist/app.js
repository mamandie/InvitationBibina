'use strict';
const C = window.WEDDING;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fullNames = `${[C.bride, C.brideSurname].filter(Boolean).join(' ')} & ${[C.groom, C.groomSurname].filter(Boolean).join(' ')}`;
const date = new Date(C.date);
let openingTimer;
let opened = false, opening = false, player, playerReady = false, wantsMusic = false, playing = false, firstMusic = true;

function setText(selector, value) { $$(selector).forEach(el => { el.textContent = value; }); }
setText('[data-bride-surname]', C.brideSurname || ''); setText('[data-groom-surname]', C.groomSurname || '');
setText('[data-location-name]', C.locationName); setText('[data-location-address]', C.locationAddress);
const locationMap = document.createElement('iframe'); locationMap.src = C.mapsEmbed; locationMap.title = `Localisation : ${C.locationName}, Keur Massar`; locationMap.width = '600'; locationMap.height = '450'; locationMap.loading = 'lazy'; locationMap.allowFullscreen = true; locationMap.referrerPolicy = 'strict-origin-when-cross-origin'; $('#location-map').append(locationMap);
$('#location-directions').href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${C.locationName}, ${C.locationAddress}`)}`;
setText('[data-names]', fullNames); setText('[data-bride]', C.bride); setText('[data-groom]', C.groom); setText('[data-initials]', C.initials); setText('[data-date]', C.dateLabel); setText('[data-city]', C.city);
document.title = `${fullNames} · Une promesse, une vie`;
$('#invitation-text').textContent = C.invitation;
$('#demo-note').hidden = !C.demo;
function create(tag, cls, text) { const el = document.createElement(tag); if (cls) el.className = cls; if (text !== undefined) el.textContent = text; return el; }
C.story.forEach((item, i) => { const el = create('article', 'chapter reveal'); el.append(create('p','eyebrow',`0${i+1} / ${item.chapter.toUpperCase()}`),create('h3','',item.title),create('p','',item.text)); $('#story-chapters').append(el); });
const month = create('p','calendar-title',date.toLocaleDateString('fr-FR',{month:'long',year:'numeric',timeZone:'Africa/Dakar'}));
const grid = create('div','calendar-grid');
['L','M','M','J','V','S','D'].forEach(x=>grid.append(create('span','weekday',x)));
const year=date.getUTCFullYear(), monthIndex=date.getUTCMonth(), day=date.getUTCDate();
const offset=(new Date(Date.UTC(year,monthIndex,1)).getUTCDay()+6)%7;
for(let i=0;i<offset;i++) grid.append(create('span'));
for(let i=1;i<=new Date(Date.UTC(year,monthIndex+1,0)).getUTCDate();i++){const event=C.events.find(event=>event.date===`${year}-${String(monthIndex+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`);const cell=create('span',event?'chosen':'',String(i));if(event)cell.setAttribute('aria-label',`${event.dateLabel}, ${event.title}`);grid.append(cell);}
$('#calendar').append(month,grid);
function tick(){
  const diff=date.getTime()-Date.now();
  $('.countdown').hidden=diff<=0;
  $('#calendar-download').hidden=diff<=0;
  if(diff<=0){$('#countdown-message').textContent='Deux journées réunies dans notre histoire.';return;}
  const values=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
  ['days','hours','minutes','seconds'].forEach((id,i)=>$('#'+id).textContent=String(values[i]).padStart(2,'0'));
}
tick();setInterval(tick,1000);
C.events.forEach(event=>{const article=create('article','event reveal'),time=create('div','event-time',event.time);if (!/^\d/.test(event.time)) time.classList.add('unconfirmed');time.append(create('small','',event.icon));const content=create('div');content.append(create('p','event-date',event.dateLabel),create('h3','',event.title),create('p','event-place',event.place),create('p','event-description',event.text));if(event.address){const link=create('a','text-link','OUVRIR L’ITINÉRAIRE ↗');link.href=`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.address)}`;link.target='_blank';link.rel='noopener';content.append(link);}article.append(time,content);$('#events').append(article);});
C.photos.forEach((photo,i)=>{const button=create('button','gallery-photo reveal');button.type='button';button.style.setProperty('--photo-delay',`${i%2*120}ms`);button.setAttribute('aria-label',`Agrandir le souvenir ${i+1}`);button.hidden=i>=6;const img=create('img');img.src=photo.src;img.alt=photo.alt;img.loading='lazy';img.width=700;img.height=930;img.style.objectPosition=photo.position;const expandIcon=create('span','photo-expand');expandIcon.setAttribute('aria-hidden','true');expandIcon.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/></svg>';button.append(img,expandIcon);button.addEventListener('click',()=>openPhoto(i));$('#gallery').append(button);});
$('#show-photos').addEventListener('click',()=>{const expanded=$('#show-photos').getAttribute('aria-expanded')!=='true';$('#show-photos').setAttribute('aria-expanded',String(expanded));$$('.gallery-photo').forEach((el,i)=>el.hidden=!expanded&&i>=6);$('#show-photos').textContent=expanded?'RÉDUIRE LES SOUVENIRS −':'TOUS LES SOUVENIRS ＋';});
// Play silent films as they enter the viewport; stop downloading/playing offscreen.
const visibleFilms=new Set();
function playVisibleFilms(){if(!document.hidden)visibleFilms.forEach(video=>{video.play()?.catch(()=>{});});}
const filmObserver='IntersectionObserver'in window?new IntersectionObserver(entries=>{
  entries.forEach(({target:video,isIntersecting})=>{
    if(isIntersecting){visibleFilms.add(video);if(!document.hidden)video.play()?.catch(()=>{});}
    else{visibleFilms.delete(video);video.pause();}
  });
},{threshold:0,rootMargin:'0px'}):null;
C.videos.forEach((src,i)=>{
  const video=create('video');
  video.src=src;video.controls=true;video.preload='metadata';video.playsInline=true;
  video.muted=true;video.defaultMuted=true;video.loop=true;
  video.setAttribute('muted','');video.setAttribute('playsinline','');
  video.poster=C.photos[i?4:0].src;
  video.setAttribute('aria-label',`Vidéo souvenir ${i+1}`);
  const keepSoundClear=()=>{if(!video.muted){pauseMusic();$$('.films video').forEach(other=>{if(other!==video&&!other.muted)other.pause();});}};
  video.addEventListener('play',keepSoundClear);
  video.addEventListener('volumechange',()=>{if(!video.paused)keepSoundClear();});
  $('#films').append(video);
  if(filmObserver)filmObserver.observe(video);
  else{video.autoplay=true;}
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)playVisibleFilms();});
// Fullscreen gallery: modal focus trap is handled by native <dialog>.
let photoIndex=0, lastPhotoButton, touchStart=null;
function renderPhoto(){const p=C.photos[photoIndex];$('#lightbox-image').src=p.src;$('#lightbox-image').alt=p.alt;$('#lightbox-caption').textContent=p.alt;$('#photo-counter').textContent=`${String(photoIndex+1).padStart(2,'0')} / ${String(C.photos.length).padStart(2,'0')}`;}
function openPhoto(i){lastPhotoButton=document.activeElement;photoIndex=i;renderPhoto();$('#lightbox').showModal();document.body.style.overflow='hidden';}
function closePhoto(){if($('#lightbox').open)$('#lightbox').close();}
function changePhoto(step){photoIndex=(photoIndex+step+C.photos.length)%C.photos.length;renderPhoto();}
$('#close-lightbox').addEventListener('click',closePhoto);$('#prev-photo').addEventListener('click',()=>changePhoto(-1));$('#next-photo').addEventListener('click',()=>changePhoto(1));
$('#lightbox').addEventListener('close',()=>{document.body.style.overflow='';lastPhotoButton?.focus({preventScroll:true});});
$('#lightbox').addEventListener('keydown',e=>{if(e.key==='ArrowRight')changePhoto(1);if(e.key==='ArrowLeft')changePhoto(-1);});
$('#lightbox').addEventListener('touchstart',e=>{touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
$('#lightbox').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))changePhoto(dx<0?1:-1);touchStart=null;},{passive:true});
// Navigation and progressive reveals.
$('#menu-toggle').addEventListener('click',()=>{const expanded=$('#menu-toggle').getAttribute('aria-expanded')!=='true';$('#menu-toggle').setAttribute('aria-expanded',String(expanded));$('#menu').classList.toggle('open',expanded);});
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu').classList.remove('open');}));
const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08}):null;
if(observer){document.documentElement.classList.add('js-ready');$$('.reveal').forEach(el=>observer.observe(el));}
if('IntersectionObserver'in window){const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){$$('.bottom-nav a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}),{rootMargin:'-15% 0px -55% 0px'});['histoire','programme','galerie','rsvp'].forEach(id=>sectionObserver.observe($('#'+id)));}
function finishOpening(){opened=true;opening=false;$('#site').inert=false;$('#site').removeAttribute('aria-hidden');$('#cover').classList.add('opened');document.body.classList.remove('sealed');$('#music-toggle').hidden=false;$('#invitation').setAttribute('tabindex','-1');$('#invitation').focus({preventScroll:true});}
$('#open-envelope').addEventListener('click',()=>{
  if(opening||opened)return;
  opening=true;
  $('#cover').classList.add('opening');
  $('#open-envelope').setAttribute('aria-expanded','true');
  $('#open-envelope').disabled=true;
  $('#card-writing').inert=false;
  $('#card-writing').removeAttribute('aria-hidden');
  openingTimer=setTimeout(()=>{
    $('#cover').classList.add('unsealed');
    $('#open-envelope').hidden=true;
    $('#discover-invitation').hidden=false;
    $('#discover-invitation').focus({preventScroll:true});
  },reducedMotion?0:3200);
  $('#music-toggle').hidden=false;
  requestMusic();
});
$('#discover-invitation').addEventListener('click',finishOpening);
$('#replay').addEventListener('click',()=>{
  pauseMusic();$('#music-toggle').hidden=true;opened=false;opening=false;
  window.scrollTo({top:0,behavior:'instant'});
  clearTimeout(openingTimer);
  $('#cover').classList.remove('opened','opening','unsealed');
  $('#open-envelope').disabled=false;
  $('#cover').scrollTop=0;
  $('#open-envelope').hidden=false;
  $('#open-envelope').setAttribute('aria-expanded','false');
  $('#card-writing').inert=true;
  $('#card-writing').setAttribute('aria-hidden','true');
  $('#discover-invitation').hidden=true;
  document.body.classList.add('sealed');
  $('#open-envelope').focus({preventScroll:true});
  $('#site').inert=true;$('#site').setAttribute('aria-hidden','true');
});
// Request sound only after touching the envelope or the sound button.
function updateMusicControl(){
  const button=$('#music-toggle');
  const label=wantsMusic?'Couper le son':'Activer le son';
  button.setAttribute('aria-label',label);
  button.setAttribute('title',label);
  button.setAttribute('aria-pressed',String(wantsMusic));
  button.classList.toggle('is-playing',playing&&wantsMusic);
}
function startMusic(){
  if(firstMusic){player.seekTo(C.musicStart,true);firstMusic=false;}
  player.unMute();
  player.playVideo();
}
function requestMusic(){
  wantsMusic=true;updateMusicControl();
  $$('.films video').forEach(v=>{if(!v.muted)v.pause();});
  if(playerReady){startMusic();}
  else prepareMusic();
}
function prepareMusic(){
  if(!document.getElementById('youtube-api')){
    const script=document.createElement('script');
    script.id='youtube-api';script.src='https://www.youtube.com/iframe_api';
    script.onerror=()=>{script.remove();pauseMusic();};
    document.head.append(script);
  }
}
window.onYouTubeIframeAPIReady=()=>{
  player=new YT.Player('youtube-player',{
    width:200,height:200,videoId:C.youtubeId,
    playerVars:{playsinline:1,start:C.musicStart,controls:0,disablekb:1,origin:location.origin},
    events:{
      onReady:e=>{
        playerReady=true;
        e.target.getIframe().setAttribute('allow','autoplay; encrypted-media');
        e.target.getIframe().title='Musique de l’invitation';
        e.target.getIframe().tabIndex=-1;
        if(wantsMusic)startMusic();
      },
      onStateChange:e=>{
        playing=e.data===1;
        if(playing&&!wantsMusic){player.pauseVideo();return;}
        if(playing)firstMusic=false;
        if(e.data===0&&wantsMusic){player.seekTo(C.musicStart,true);player.playVideo();}
        updateMusicControl();
      },
      onAutoplayBlocked:pauseMusic,
      onError:pauseMusic
    }
  });
};
// Prepare the player before the first touch so the card click can start sound directly.
prepareMusic();
function pauseMusic(){
  wantsMusic=false;playing=false;
  if(playerReady)player.pauseVideo();
  updateMusicControl();
}
$('#music-toggle').addEventListener('click',()=>{if(wantsMusic)pauseMusic();else requestMusic();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseMusic();$$('.films video').forEach(v=>v.pause());}});
// Downloads are local and never presented as a successful remote submission.
function downloadable(text, filename, type='text/plain;charset=utf-8'){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);setTimeout(()=>URL.revokeObjectURL(url),60000);const a=create('a','','Télécharger ma réponse');a.href=url;a.download=filename;return a;}
function icsEscape(value){return value.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');}
$('#calendar-download').addEventListener('click',()=>{
  const stamp=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const events=C.events.flatMap(event=>{const start=new Date(`${event.date}T00:00:00Z`);return ['BEGIN:VEVENT',`UID:${event.date}-mariage@bibina`,`DTSTAMP:${stamp(new Date())}`,`DTSTART;VALUE=DATE:${stamp(start).slice(0,8)}`,`DTEND;VALUE=DATE:${stamp(new Date(start.getTime()+86400000)).slice(0,8)}`,`SUMMARY:${icsEscape(`${event.title} · ${fullNames}`)}`,`LOCATION:${icsEscape(event.address||event.place)}`,'END:VEVENT'];});
  downloadable(['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Bibina//Invitation//FR',...events,'END:VCALENDAR',''].join('\r\n'),'notre-mariage.ics','text/calendar;charset=utf-8').click();
});
$$('input[name="attendance"]').forEach(input=>input.addEventListener('change',()=>{$('#guests-wrap').hidden=input.value==='non'&&input.checked;$('#guest-count').disabled=$('input[name="attendance"]:checked').value==='non';}));
const netlifyEnabled=C.netlifyForms===true;
if(netlifyEnabled){$('#rsvp-submit').innerHTML='CONFIRMER MA PRÉSENCE <span>↗</span>';$('#rsvp-note').textContent='Votre réponse sera transmise aux organisateurs via Netlify Forms.';$('#guestbook-form button').textContent='ENVOYER MON MESSAGE ↗';$('#guestbook-note').textContent='Votre message sera transmis aux organisateurs. Il restera privé jusqu’à leur validation.';}
async function submitForm(form,result,text,filename){result.replaceChildren();const submit=form.querySelector('button[type=submit]');if(netlifyEnabled){submit.disabled=true;try{const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()});if(!response.ok)throw Error('Envoi impossible');result.textContent='Merci ! Votre message a été transmis aux organisateurs. Il ne sera pas publié automatiquement.';form.reset();}catch{result.textContent='L’envoi n’a pas abouti. Aucun enregistrement ne peut être confirmé. Vous pouvez conserver votre réponse ci-dessous.';result.append(downloadable(text,filename));}finally{submit.disabled=false;}}else{result.append(create('p','','Votre message est prêt. Il n’a pas encore été envoyé. Téléchargez-le pour le conserver et le transmettre aux organisateurs.'),downloadable(text,filename));if(C.whatsapp){const a=create('a','','Transmettre par WhatsApp ↗');a.href=`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;a.target='_blank';a.rel='noopener';result.append(a);}}}
$('#rsvp-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const yes=data.get('attendance')==='oui';const text=`Mariage de ${fullNames}\n${C.dateLabel}\nNom : ${data.get('name')}\nPrésence : ${yes?'Oui, avec plaisir':'Non, en pensée avec vous'}\nPersonnes : ${yes?data.get('guests'):0}\n`;submitForm(e.currentTarget,$('#rsvp-result'),text,'ma-reponse-mariage.txt');});
$('#guestbook-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);submitForm(e.currentTarget,$('#wish-result'),`Pour ${fullNames}\nDe : ${data.get('name')}\n\n${data.get('message')}\n`,'un-mot-pour-vous.txt');});
