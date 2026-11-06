const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
$('#yr').textContent = new Date().getFullYear();

// intro preloader
(function () {
  const pre = $('#pre'), pb = $('#pb'), pp = $('#pp'), t0 = performance.now();
  (function f(t) {
    const p = Math.min(100, Math.round((t - t0) / 12));
    pb.style.backgroundSize = `100% ${p}%`; pp.textContent = p + '%';
    if (p < 100) return requestAnimationFrame(f);
    setTimeout(() => {
      pre.classList.add('go'); document.body.classList.remove('load'); document.body.classList.add('ready');
      setTimeout(() => pre.remove(), 1000);
    }, 250);
  })(t0);
})();

// typing roles
const roles = ['Full-Stack Developer', 'UX/UI Designer', 'Java & Python Developer', 'B.Tech CSE · ITER'];
let ri = 0, ci = 0, del = false;
(function type() {
  const w = roles[ri]; ci += del ? -1 : 1;
  $('#role').textContent = w.slice(0, ci);
  let d = del ? 40 : 90;
  if (!del && ci === w.length) { del = true; d = 1400; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; d = 300; }
  setTimeout(type, d);
})();

// scroll-linked effects
const nav = $('nav'), bar = $('#bar'), bg = $('.bg'), hero = $('.hero');
const tp = $('#top'), tc = tp.querySelector('.f');
const wr = $('.wr'); wr.innerHTML = wr.textContent.split(' ').map(w => `<span>${w}</span>`).join(' ');
const words = [...wr.children], projs = $$('.proj');
const orbs = $$('.alt,#work').map((s, i) => { const el = document.createElement('div'); el.className = 'orb'; el.style.cssText = `top:12%;${i % 2 ? 'right' : 'left'}:-160px`; s.prepend(el); return { s, el, k: .12 + (i % 3) * .06 }; });
const clamp = v => Math.max(0, Math.min(1, v));
function scrollFx() {
  const r = wr.getBoundingClientRect(), p = clamp((innerHeight * .88 - r.top) / (innerHeight * .5));
  words.forEach((w, i) => w.classList.toggle('on', i / words.length < p));
  projs.forEach(pr => pr.style.setProperty('--sp', clamp((innerHeight - pr.getBoundingClientRect().top) / (innerHeight * .75)).toFixed(3)));
  orbs.forEach(o => { o.el.style.transform = `translateY(${o.s.getBoundingClientRect().top * -o.k}px)`; });
}
const secs = $$('main section[id]'), links = $$('.links a'), tls = $$('.tl');
let tick = false;
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  nav.classList.toggle('solid', y > 40);
  tp.classList.toggle('show', y > 600); tc.style.strokeDashoffset = 126 * (1 - (max > 0 ? y / max : 0));
  if (y < innerHeight * 1.2) {
    bg.style.transform = `translateY(${y * .25}px) scale(${1 + y / 4000})`;
    hero.style.transform = `translateY(${y * .12}px)`;
    hero.style.opacity = Math.max(0, 1 - y / (innerHeight * .8));
  }
  let cur = 'home';
  secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  tls.forEach(t => { const r = t.getBoundingClientRect(); t.style.setProperty('--p', Math.max(0, Math.min(100, (innerHeight * .65 - r.top) / r.height * 100)) + '%'); });
  scrollFx();
  tick = false;
}
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll); onScroll();

// reveal + count-up
function count(n) {
  const to = +n.dataset.to, dec = (n.dataset.to.split('.')[1] || '').length, suf = n.dataset.suf || '', t0 = performance.now();
  (function f(t) {
    const p = Math.min(1, (t - t0) / 1400);
    n.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  e.target.querySelectorAll('[data-to]').forEach(count);
}), { threshold: .15 });
$$('.rv').forEach(e => io.observe(e));

// cursor, hero spotlight, card glow, magnetic buttons, 3D tilt
if (fine) {
  const cd = $('#cd'), cr = $('#cr'); let mx = 0, my = 0, rx = 0, ry = 0;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY; cd.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
    const h = $('#home'); h.style.setProperty('--mx', e.clientX + 'px'); h.style.setProperty('--my', e.clientY + 'px');
  });
  (function loop() { rx += (mx - rx) * .16; ry += (my - ry) * .16; cr.style.transform = `translate(${rx - 19}px,${ry - 19}px)`; requestAnimationFrame(loop); })();
  $$('a,button').forEach(el => { el.addEventListener('mouseenter', () => cr.classList.add('h')); el.addEventListener('mouseleave', () => cr.classList.remove('h')); });
  $$('.mag').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });
  $$('[data-tilt]').forEach(t => {
    t.addEventListener('mousemove', e => { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transition = 'transform .1s'; t.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`; });
    t.addEventListener('mouseleave', () => { t.style.transition = 'transform .6s'; t.style.transform = ''; });
  });
}
$$('.card').forEach(c => c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--x', e.clientX - r.left + 'px'); c.style.setProperty('--y', e.clientY - r.top + 'px'); }));

// mobile menu
const menu = $('.links');
$('#burger').onclick = () => menu.classList.toggle('open');
links.forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// contact form
$('#cf').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, b = f.querySelector('button'), m = $('#msg');
  b.disabled = true; b.textContent = 'Sending…';
  try {
    const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) });
    if (!(await r.json()).success) throw 0;
    m.textContent = 'Thanks! Your message is on its way.'; f.reset();
  } catch (_) { m.textContent = 'Something went wrong. Please email me directly.'; }
  b.disabled = false; b.textContent = 'Send Message';
});

$('#top').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// play project previews only while visible
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { threshold: .35 });
  $$('video[data-v]').forEach(v => vio.observe(v));
}

// tech strip: drifts on its own, speeds up and reverses with scroll
const rows = $$('.trow').map(r => { const t = r.firstElementChild; t.innerHTML += t.innerHTML; return { r, t, dir: +r.dataset.dir, off: 0, hover: false, vis: false }; });
const tio = new IntersectionObserver(es => es.forEach(e => rows.find(o => o.r === e.target).vis = e.isIntersecting));
rows.forEach(o => { tio.observe(o.r); o.r.addEventListener('mouseenter', () => o.hover = true); o.r.addEventListener('mouseleave', () => o.hover = false); });
let lastY = scrollY, vel = 0;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
(function drift() {
  vel += ((scrollY - lastY) - vel) * .12; lastY = scrollY;
  rows.forEach(o => {
    if (!o.vis || still) return;
    const half = o.t.scrollWidth / 2;
    if (!o.hover) o.off += o.dir * (.6 + vel * .5);
    o.off = ((o.off % half) + half) % half;
    o.t.style.transform = `translateX(${-o.off}px)`;
  });
  requestAnimationFrame(drift);
})();
