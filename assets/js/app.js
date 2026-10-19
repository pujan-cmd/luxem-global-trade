/* Luxem Global Trade — site behaviour (multi-page build) */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var EMAIL = 'info@luxemglobaltrade.com', WA = '918511158598';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- technical drawings (SVG) ---------- */
  if (window.LGTIllus && ($('[data-hero]') || $('[data-thumb]'))) {
    doc.body.insertAdjacentHTML('afterbegin', LGTIllus.DEFS);
    $$('[data-hero]').forEach(function (el) { el.innerHTML = LGTIllus.hero(el.getAttribute('data-hero')); });
    $$('[data-thumb]').forEach(function (el) {
      var k = parseFloat(el.getAttribute('data-k'));
      el.innerHTML = LGTIllus.thumb(el.getAttribute('data-thumb'), isNaN(k) ? undefined : k);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }) : null;
  $$('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  /* ---------- counters ---------- */
  var years = new Date().getFullYear() - 1998;
  $$('[data-since]').forEach(function (el) { el.setAttribute('data-count', years); el.textContent = years; });
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count')), t0 = null;
    if (reduce || isNaN(target)) { el.textContent = target; return; }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var cio = io ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.35 }) : null;
  $$('[data-count]').forEach(function (el) { if (cio) { el.textContent = '0'; cio.observe(el); } });

  /* ---------- home hero slider (progress-bar driven) ---------- */
  var hero = $('#hero');
  if (hero) {
    var slides = $$('.slide', hero), inds = $$('.ind', hero), cur = 0;
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); s.setAttribute('aria-hidden', k === cur ? 'false' : 'true'); });
      inds.forEach(function (b, k) { b.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
    };
    inds.forEach(function (b, k) { b.addEventListener('click', function () { if (k !== cur) show(k); }); });
    if (reduce) hero.classList.add('static');
    hero.addEventListener('animationend', function (e) { if (e.animationName === 'fill') show(cur + 1); });
    hero.addEventListener('mouseenter', function () { hero.classList.add('paused'); });
    hero.addEventListener('mouseleave', function () { hero.classList.remove('paused'); });
    hero.addEventListener('focusin', function () { hero.classList.add('paused'); });
    hero.addEventListener('focusout', function () { hero.classList.remove('paused'); });
    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(cur + 1); else if (e.key === 'ArrowLeft') show(cur - 1);
    });
    if (!reduce && window.matchMedia('(pointer:fine)').matches) {
      var raf = 0, mx = 0, my = 0;
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2; my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(function () { hero.style.setProperty('--mx', mx.toFixed(3)); hero.style.setProperty('--my', my.toFixed(3)); raf = 0; });
      });
    }
  }

  /* ---------- tabs (brass grades + export regions) ---------- */
  function setBars(panel, animate) {
    $$('.comp i', panel).forEach(function (b) {
      var w = b.getAttribute('data-w');
      if (animate && !reduce) { b.style.flexBasis = '0%'; void b.offsetWidth; }
      b.style.flexBasis = w + '%';
    });
  }
  function highlightRegion(r) {
    $$('.wm-svg [data-r]').forEach(function (el) { el.classList.toggle('on', el.getAttribute('data-r') === r); });
  }
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i, pn = doc.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        if (pn) { pn.hidden = !on; if (on) setBars(pn, true); }
        if (on && t.getAttribute('data-r')) highlightRegion(t.getAttribute('data-r'));
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((i + tabs.length - 1) % tabs.length, true); }
        else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
        else if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, true); }
      });
    });
  });
  $$('.gpanel').forEach(function (p) { setBars(p, false); });

  /* ---------- mobile menu ---------- */
  var links = $('#links'), burger = $('#burger');
  function setMenu(open) {
    if (!links || !burger) return;
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    doc.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 980) setMenu(false); });

  /* ---------- enquiry form (contact page) ---------- */
  var form = $('#rfq'), sent = $('#sent');
  var PRODUCTS = { auto: 'Auto Parts', turned: 'Brass Turned Parts', glands: 'Cable Glands & Connectors', electrical: 'Electrical Components', forged: 'Forged & Cast Brass Parts', gas: 'Gas Parts', hardware: 'Hardware & Sanitary Parts', inserts: 'Inserts & Fasteners', plumbing: 'Plumbing Fittings Parts', rods: 'Rods & Ingots' };
  if (form) {
    var params = new URLSearchParams(location.search);
    var selP = $('#f-product'), selT = $('#f-type');
    if (params.get('product') && PRODUCTS[params.get('product')] && selP) selP.value = params.get('product');
    if (params.get('type') === 'catalogue' && selT) selT.value = 'Catalogue / spec sheet request';
    var val = function (id) { return ($('#' + id).value || '').trim(); };
    var mark = function (id, bad) { $('#' + id).closest('.field').classList.toggle('bad', bad); return bad; };
    ['f-name', 'f-company', 'f-email', 'f-country', 'f-msg'].forEach(function (id) {
      $('#' + id).addEventListener('input', function () { $('#' + id).closest('.field').classList.remove('bad'); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var checks = [
        ['f-name', val('f-name').length < 2],
        ['f-company', val('f-company').length < 2],
        ['f-email', !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('f-email'))],
        ['f-country', val('f-country').length < 2],
        ['f-msg', val('f-msg').length < 10]
      ], first = null;
      checks.forEach(function (c) { if (mark(c[0], c[1]) && !first) first = c[0]; });
      if (first) { $('#' + first).focus(); return; }
      var prod = PRODUCTS[val('f-product')] || 'Not specified';
      var msg = 'Hello Luxem Global Trade team,\n\nI would like to request a quotation.\n\n' +
        'Name: ' + val('f-name') + '\nCompany: ' + val('f-company') + '\nEmail: ' + val('f-email') +
        '\nPhone / WhatsApp: ' + (val('f-phone') || '—') + '\nCountry: ' + val('f-country') +
        '\nEnquiry type: ' + val('f-type') + '\nProduct family: ' + prod + '\nPreferred Incoterm: ' + val('f-inco') +
        '\n\nRequirements:\n' + val('f-msg') + '\n\nThank you.';
      var subject = 'RFQ — ' + prod + ' — ' + val('f-company');
      $('#sent-msg').textContent = msg;
      $('#sent-mail').href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(msg);
      $('#sent-wa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
      sent.classList.add('show');
      sent.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      sent.focus({ preventScroll: true });
    });
    $('#sent-copy').addEventListener('click', function () {
      var btn = this, text = $('#sent-msg').textContent;
      var done = function () { btn.textContent = 'Copied ✓'; setTimeout(function () { btn.textContent = 'Copy message'; }, 2200); };
      var fallback = function () {
        var ta = doc.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; doc.body.appendChild(ta); ta.select();
        try { doc.execCommand('copy'); done(); } catch (err) { btn.textContent = 'Select the text above'; }
        doc.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); } else fallback();
    });
  }

  /* ---------- products page: highlight the group in view ---------- */
  var famLinks = $$('.famnav a[data-fam]');
  if (famLinks.length && 'IntersectionObserver' in window) {
    var famBar = $('.famnav .wrap');
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        famLinks.forEach(function (l) {
          var on = l.getAttribute('data-fam') === e.target.id;
          l.classList.toggle('cur', on);
          if (on && famBar.scrollWidth > famBar.clientWidth) famBar.scrollTo({ left: l.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    famLinks.forEach(function (l) { var t = doc.getElementById(l.getAttribute('data-fam')); if (t) spy.observe(t); });
  }

  /* ---------- photo lightbox ---------- */
  var lb = $('#lb');
  if (lb) {
    var lbImg = $('#lb-img'), lbCap = $('#lb-cap'), lbX = $('.lb-x', lb), lastFocus = null;
    var openLB = function (btn) {
      var ph = $('.ph', btn);
      lbImg.style.backgroundImage = getComputedStyle(ph).backgroundImage;
      lbImg.setAttribute('aria-label', btn.getAttribute('data-cap') || 'Product photo');
      lbCap.textContent = btn.getAttribute('data-cap') || '';
      lastFocus = btn; lb.hidden = false; lb.classList.add('open'); doc.body.style.overflow = 'hidden'; lbX.focus();
    };
    var closeLB = function () {
      if (!lb.classList.contains('open')) return;
      lb.classList.remove('open'); lb.hidden = true; doc.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    $$('[data-lb]').forEach(function (b) { b.addEventListener('click', function () { openLB(b); }); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbImg) closeLB(); });
    lbX.addEventListener('click', closeLB);
    doc.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLB();
      else if (e.key === 'Tab') { e.preventDefault(); lbX.focus(); }
    });
  }

  /* ---------- blog: category filter + search (cards are pre-built in the HTML) ---------- */
  var grid = $('#blog-grid');
  if (grid) {
    var cards = $$('.bcard', grid), feat = $('#blog-feature .bfeat'), qBox = $('#blog-q'), countEl = $('#blog-count'), emptyEl = $('#blog-empty');
    var chips = $$('.bchip'), cat = 'All', q = '';
    var apply = function () {
      var showFeat = cat === 'All' && !q, n = 0;
      cards.forEach(function (c, i) {
        var ok = (cat === 'All' || c.getAttribute('data-cat') === cat) &&
          (!q || q.toLowerCase().split(/\s+/).every(function (w) { return c.getAttribute('data-q').indexOf(w) > -1; }));
        if (ok) n++;
        c.hidden = !ok || (showFeat && i === 0);
      });
      if (feat) feat.hidden = !showFeat;
      emptyEl.hidden = n > 0;
      countEl.textContent = n + (n === 1 ? ' article' : ' articles') + (cat !== 'All' ? ' in ' + cat : '') + (q ? ' matching “' + q + '”' : '');
    };
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.getAttribute('data-cat');
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    if (qBox) qBox.addEventListener('input', function () { q = qBox.value.trim(); apply(); });
    apply();
  }

  /* ---------- article page: reading progress + copy link ---------- */
  var prog = $('#rprog');
  if (prog && doc.body.hasAttribute('data-article')) {
    var upd = function () {
      var h = doc.documentElement.scrollHeight - window.innerHeight, y = window.pageYOffset;
      prog.classList.add('on'); prog.style.width = (h > 0 ? Math.min(100, Math.max(0, y / h * 100)) : 0) + '%';
    };
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }
  var cp = $('#copy-link');
  if (cp) cp.addEventListener('click', function () {
    var done = function () { cp.lastChild.textContent = 'Copied ✓'; setTimeout(function () { cp.lastChild.textContent = 'Copy link'; }, 2200); };
    var fallback = function () {
      var ta = doc.createElement('textarea'); ta.value = location.href; ta.style.cssText = 'position:fixed;opacity:0'; doc.body.appendChild(ta); ta.select();
      try { doc.execCommand('copy'); done(); } catch (e) { cp.lastChild.textContent = 'Copy from address bar'; }
      doc.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(done, fallback); else fallback();
  });

  /* ---------- clock (contact page) + footer year ---------- */
  function tick() {
    var els = $$('.js-clock'); if (!els.length) return;
    var txt;
    try {
      txt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' IST';
    } catch (e) { txt = 'IST (UTC+5:30)'; }
    els.forEach(function (el) { el.textContent = txt; });
  }
  tick(); setInterval(tick, 20000);
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
