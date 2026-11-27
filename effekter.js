/* Sidesmart – effekter på forsiden: intro, afsløring ved scroll, 3D, egen musemarkør, magnetiske knapper, løbebånd.
   Alt slås fra ved "reducer bevægelse". Uden JS vises siden helt normalt. */
(function(){
  var root=document.documentElement;
  var stille=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mus=matchMedia("(hover:hover) and (pointer:fine)").matches;
  function klar(){root.classList.add("klar")}

  /* ---------- intro (kun første besøg pr. session) ---------- */
  var intro=document.getElementById("intro");
  if(root.classList.contains("intro-vis")&&intro){
    var tal=document.getElementById("intro-tal"),bar=document.getElementById("intro-bar"),t0=performance.now(),varighed=1300,slut=false;
    function luk(){if(slut)return;slut=true;tal.textContent="100";bar.style.transform="scaleX(1)";
      setTimeout(function(){intro.classList.add("ud");klar();setTimeout(function(){root.classList.remove("intro-vis")},1000)},150)}
    (function loop(t){if(slut)return;var p=Math.min(1,(t-t0)/varighed),e=1-Math.pow(1-p,3);tal.textContent=Math.round(e*100);bar.style.transform="scaleX("+e+")";
      if(p<1)requestAnimationFrame(loop);else luk()})(t0);
    setTimeout(luk,varighed+300);
    try{sessionStorage.setItem("intro-set","1")}catch(e){}
  }else{requestAnimationFrame(klar)}
  if(stille)return;

  /* ---------- afsløring ved scroll ---------- */
  if("IntersectionObserver" in window){
    var mål=document.querySelectorAll("main .sec-head > *, .case > *, .grid3 > .card, .more-links, .steps, .step, .faq details, .next-case, .about > div, .contact > *");
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("synlig");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px"});
    [].forEach.call(mål,function(el){var i=el.parentElement?[].indexOf.call(el.parentElement.children,el):0;el.style.setProperty("--d",Math.min(i,5)*0.08+"s");el.setAttribute("data-vis","");io.observe(el)});
  }

  /* ---------- scroll + mus: parallakse, 3D-demo, løbebånd, lys ---------- */
  var hero=document.querySelector(".hero"),demo=document.querySelector(".demo"),spot=document.querySelector(".spot");
  var phone=document.querySelector(".shots .phone"),shots=document.querySelector(".shots");
  var spor=document.querySelector(".baand-spor"),x=0,sidst=scrollY,fart=0,mx=0,my=0,tx=0,ty=0;
  if(spor)spor.style.animation="none";
  function tick(){
    var y=scrollY;fart+=((y-sidst)-fart)*.12;sidst=y;
    tx+=(mx-tx)*.08;ty+=(my-ty)*.08;
    if(demo&&y<innerHeight*1.3)demo.style.transform="perspective(1200px) rotateX("+(-ty*8)+"deg) rotateY("+(tx*10)+"deg) translateY("+(y*.07)+"px)";
    if(spor){var w=spor.scrollWidth/2;x-=.55+Math.abs(fart)*.3;if(-x>=w)x+=w;spor.style.transform="translate3d("+x+"px,0,0) skewX("+Math.max(-10,Math.min(10,-fart*.35))+"deg)"}
    if(phone&&shots){var r=shots.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){var p=(r.top+r.height/2-innerHeight/2)/innerHeight;phone.style.transform="translateY("+(p*60)+"px)"}}
    requestAnimationFrame(tick)}
  requestAnimationFrame(tick);
  if(hero&&mus)hero.addEventListener("mousemove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;
    if(spot){var r=hero.getBoundingClientRect();spot.style.transform="translate3d("+(e.clientX-r.left)+"px,"+(e.clientY-r.top)+"px,0)"}});

  if(!mus)return;

  /* ---------- egen musemarkør ---------- */
  root.classList.add("mus");
  var c=document.getElementById("cursor"),cx=-100,cy=-100,px=cx,py=cy;
  addEventListener("mousemove",function(e){cx=e.clientX;cy=e.clientY;c.classList.remove("skjul")});
  document.addEventListener("mouseleave",function(){c.classList.add("skjul")});
  (function f(){px+=(cx-px)*.22;py+=(cy-py)*.22;c.style.transform="translate3d("+px+"px,"+py+"px,0)";requestAnimationFrame(f)})();
  document.addEventListener("mouseover",function(e){
    if(e.target.closest("input,textarea,select,summary")){c.className="cursor skjul";return}
    var a=e.target.closest("a,button,[data-cursor]");
    if(a&&a.dataset.cursor){c.className="cursor stor";c.setAttribute("data-tekst",a.dataset.cursor)}
    else if(a){c.className="cursor lille";c.removeAttribute("data-tekst")}
    else{c.className="cursor";c.removeAttribute("data-tekst")}});

  /* ---------- magnetiske knapper ---------- */
  [].forEach.call(document.querySelectorAll(".btn,.cta-small,.fb-btn"),function(b){
    if(b.closest("form"))return;
    b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.25)+"px,"+((e.clientY-r.top-r.height/2)*.4)+"px)"});
    b.addEventListener("mouseleave",function(){b.style.transform=""})});

  /* ---------- kort der vipper med lys ---------- */
  [].forEach.call(document.querySelectorAll(".grid3 .card, .fact"),function(k){
    k.classList.add("vip");
    k.addEventListener("mousemove",function(e){var r=k.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      k.style.setProperty("--mx",x*100+"%");k.style.setProperty("--my",y*100+"%");
      k.style.transform="perspective(900px) rotateX("+((.5-y)*7)+"deg) rotateY("+((x-.5)*9)+"deg) translateY(-4px)"});
    k.addEventListener("mouseleave",function(){k.style.transform=""})});
})();
