/*
  Sidesmart – cookie-samtykke (EU/ePrivacy og GDPR)

  Siden sætter ingen sporings-cookies, før besøgende har sagt ja.
  Banneret vises KUN, når der er sat et sporings-id herunder. Uden sporing er
  der intet at give samtykke til, og så skal man heller ikke vise et banner.

  Sådan slår I annonce-sporing til:
    metaPixelId:  Facebook/Instagram Pixel-id (kun tal), fx "123456789012345"
    googleTagId:  Google Ads/Analytics-id, fx "AW-123456789" eller "G-ABC123XYZ"
*/
window.SIDESMART_SPORING = {
  metaPixelId: "",
  googleTagId: ""
};

(function () {
  var cfg = window.SIDESMART_SPORING || {};
  var KEY = "cookie-samtykke"; // "ja" | "nej"
  var harSporing = !!(cfg.metaPixelId || cfg.googleTagId);

  function hent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function gem(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function indlaesSporing() {
    if (cfg.metaPixelId) {
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", cfg.metaPixelId);
      window.fbq("track", "PageView");
    }
    if (cfg.googleTagId) {
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.googleTagId);
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", cfg.googleTagId);
    }
  }

  var css =
    ".cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:560px;margin:0 auto;background:#0B1A27;color:#F2F5F4;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:20px;box-shadow:0 20px 50px -10px rgba(0,0,0,.6);font:400 15px/1.55 Inter,system-ui,sans-serif}" +
    ".cookie-banner h2{font-size:17px;font-weight:600;margin:0 0 6px}" +
    ".cookie-banner p{margin:0;color:#A9B8C2}" +
    ".cookie-banner a{color:#F2F5F4}" +
    ".cookie-knapper{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}" +
    ".cookie-knapper button{font:inherit;font-weight:600;padding:12px;border-radius:999px;cursor:pointer;border:1px solid #3FA7A0;background:transparent;color:#F2F5F4}" +
    ".cookie-knapper button:hover{background:rgba(63,167,160,.15)}" +
    ".cookie-knapper button:focus-visible{outline:2px solid #3FA7A0;outline-offset:2px}";

  function visBanner() {
    if (document.getElementById("cookie-banner")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var b = document.createElement("div");
    b.id = "cookie-banner"; b.className = "cookie-banner";
    b.setAttribute("role", "dialog"); b.setAttribute("aria-labelledby", "cookie-titel");
    b.innerHTML =
      '<h2 id="cookie-titel">Må vi bruge cookies?</h2>' +
      '<p>Vi vil gerne bruge cookies til at måle, hvor godt vores annoncer virker. Siden virker fint, uanset hvad I vælger. ' +
      '<a href="/privatliv.html">Læs mere</a></p>' +
      '<div class="cookie-knapper"><button type="button" data-valg="nej">Kun nødvendige</button>' +
      '<button type="button" data-valg="ja">Accepter alle</button></div>';
    b.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-valg");
      if (!v) return;
      gem(v);
      b.remove();
      if (v === "ja") indlaesSporing();
    });
    document.body.appendChild(b);
  }

  // Kan kaldes fra et link, fx på privatlivssiden: skift dit cookie-valg
  window.aabnCookieValg = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    if (harSporing) visBanner();
    return harSporing;
  };

  if (!harSporing) return;
  var valg = hent();
  if (valg === "ja") indlaesSporing();
  else if (valg !== "nej") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", visBanner);
    else visBanner();
  }
})();
