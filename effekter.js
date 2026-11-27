/* Sidesmart – effekter på forsiden: afsløring ved scroll, 3D, egen musemarkør, magnetiske knapper, løbebånd.
   Alt slås fra ved "reducer bevægelse". Uden JS vises siden helt normalt. */
(function(){
  var root=document.documentElement;
  var stille=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mus=matchMedia("(hover:hover) and (pointer:fine)").matches;
  function klar(){root.classList.add("klar")}

  requestAnimationFrame(klar);
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
  var mx=0,my=0,tx=0,ty=0;
  function tick(){
    var y=scrollY;
    tx+=(mx-tx)*.08;ty+=(my-ty)*.08;
    if(demo&&y<innerHeight*1.3)demo.style.transform="perspective(1200px) rotateX("+(-ty*8)+"deg) rotateY("+(tx*10)+"deg) translateY("+(y*.07)+"px)";
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
