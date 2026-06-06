/* ══════════════════════════════════════════════════════════════
   My Work — landing interactions
   ══════════════════════════════════════════════════════════════ */
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── DATA ─────────────────────────────────────────────────── */
const RESTAURANTS = [
  { name:'Châtelet',     city:'Paris 1',  ini:'CH', done:21, total:21, pct:100, flag:'100%' },
  { name:'Nation',       city:'Paris 11', ini:'NA', done:20, total:20, pct:100, flag:'100%' },
  { name:'République',   city:'Paris 11', ini:'RE', done:19, total:20, pct:95 },
  { name:'Opéra',        city:'Paris 9',  ini:'OP', done:18, total:19, pct:95 },
  { name:'Bastille',     city:'Paris 12', ini:'BA', done:17, total:20, pct:85 },
  { name:'Montparnasse', city:'Paris 14', ini:'MO', done:15, total:22, pct:68, late:'2 en retard' },
];

const PH_TASKS = [
  { txt:'Contrôle températures frigos', chip:'Fait',   cls:'chip-done',   done:true },
  { txt:'Ouverture caisse & fond',      chip:'Fait',   cls:'chip-done',   done:true },
  { txt:'Briefing équipe — service midi', chip:'Normal', cls:'chip-normal', done:false },
  { txt:'Audit propreté salle',         chip:'Urgent', cls:'chip-high',   done:false },
  { txt:'Réassort zone boissons',       chip:'Normal', cls:'chip-normal', done:false },
];

const FEATURES = [
  { t:'Gestion multi-restaurants', tag:'Cœur du produit',
    d:"Créez une tâche pour un restaurant ou tout le réseau. Suivez les complétions en temps réel, restaurant par restaurant.",
    p:'<rect x="2.5" y="2.5" width="19" height="19" rx="4"/><path d="M7 9l3 3 5-6" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 16h10" stroke-linecap="round"/>' },
  { t:'Notifications temps réel', tag:'Zéro appel',
    d:"Alertes de retard automatiques et commentaires instantanés entre vos directeurs et le siège. Tout le monde au courant.",
    p:'<path d="M12 3a6 6 0 016 6v4l1.5 2.5h-15L4 13V9a6 6 0 016-6z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 19a2.5 2.5 0 005 0" stroke-linecap="round"/>' },
  { t:'Rapports & analyse IA', tag:'Automatique',
    d:"Un rapport de performance prêt à partager : taux de complétion, retards, classement des restaurants — synthétisé par l'IA, chaque semaine.",
    p:'<path d="M5 19V5a1 1 0 011-1h12a1 1 0 011 1v14" /><path d="M8 15l3-3 2 2 4-5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 19h18" stroke-linecap="round"/>' },
  { t:'Multi-device, partout', tag:'Web · Mobile · Tablette',
    d:"Bureau au siège, tablette en restaurant, mobile sur le terrain. Tout est synchronisé en temps réel, sans installation ni App Store.",
    p:'<rect x="2.5" y="4" width="13" height="9" rx="1.5"/><rect x="16.5" y="8" width="5" height="11" rx="1.5"/><path d="M5 16.5h6" stroke-linecap="round"/>' },
  { t:'5 niveaux d\'accès', tag:'Rôles',
    d:"Franchisé, directeur des opérations, directeur, manager, admin. Chacun voit exactement ce qui le concerne.",
    p:'<circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke-linecap="round"/><path d="M16 5.5a3 3 0 010 5.5M20.5 19c0-2.5-1.5-4.2-3.5-4.7" stroke-linecap="round"/>' },
  { t:'Planification & récurrence', tag:'Calendrier',
    d:"Tâches ponctuelles, quotidiennes, hebdo ou mensuelles. Un calendrier visuel pour anticiper la charge.",
    p:'<rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M8 2.5v4M16 2.5v4M3.5 9.5h17" stroke-linecap="round"/><path d="M8 14l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>' },
];

const ROLES = [
  { badge:'Franchisé', name:'Vue réseau complète', d:"Tous les restaurants, toutes les statistiques, la gestion des utilisateurs.",
    accent:'#B45309', bg:'#FDF0E4', fg:'#B45309',
    ic:'<circle cx="12" cy="5" r="2.3"/><circle cx="5" cy="18" r="2.3"/><circle cx="19" cy="18" r="2.3"/><path d="M10.7 6.7 6.3 15.8M13.3 6.7 17.7 15.8" stroke-linecap="round"/>' },
  { badge:'Dir. Opérations', name:'Pilotage terrain', d:"Création de tâches, KPIs et dashboard multi-restaurants.",
    accent:'#1A6FAF', bg:'#EAF4FD', fg:'#1A6FAF',
    ic:'<path d="M4 18a8 8 0 0 1 16 0" stroke-linecap="round"/><path d="M12 18 16 11" stroke-linecap="round"/><circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none"/>' },
  { badge:'Directeur', name:'Son restaurant', d:"Les tâches de son restaurant, le suivi de ses managers, les commentaires.",
    accent:'#2F6446', bg:'#D9E8D8', fg:'#2F6446',
    ic:'<path d="M4.5 8.5 6 4.5h12l1.5 4" stroke-linejoin="round"/><path d="M5 8.5v11h14v-11" stroke-linejoin="round"/><path d="M10 19.5v-5h4v5" stroke-linejoin="round"/>' },
  { badge:'Manager', name:'Ses tâches', d:"Uniquement les tâches qui lui sont assignées. Interface simplifiée, terrain.",
    accent:'#6941C6', bg:'#EFE9FE', fg:'#6941C6',
    ic:'<rect x="5" y="3.5" width="14" height="17" rx="2.2"/><path d="M8.5 9.2 10 10.7 13 7.7M8.5 15.2 10 16.7 13 13.7" stroke-linecap="round" stroke-linejoin="round"/>' },
];

const STEPS = [
  { n:'1', t:'Démo & configuration', d:"On configure votre réseau, vos restaurants et vos accès ensemble." },
  { n:'2', t:"Invitation de l'équipe", d:"Vos directeurs reçoivent un email et créent leur mot de passe." },
  { n:'3', t:'Création des tâches', d:"Importez ou créez vos tâches récurrentes. Elles s'assignent toutes seules." },
  { n:'4', t:'Suivi en temps réel', d:"Consultez l'avancement depuis votre téléphone, où que vous soyez." },
];

const AUDIENCE = [
  { ic:'ic-shop',  t:'Réseaux & franchises',     d:"Pilotez 5, 50 ou 500 restaurants depuis une seule interface, avec le même niveau d'exigence partout." },
  { ic:'ic-grid',  t:"Directions d'exploitation", d:"Suivez la performance terrain en temps réel, sans multiplier les appels, les mails et les tableurs." },
  { ic:'ic-users', t:'Restaurateurs multi-sites', d:"Gardez la main sur chaque établissement et harmonisez vos process d'un point de vente à l'autre." },
];

const PRICING = [
  { name:'Essentiel', tag:'Petit groupe', price:'À venir', unit:'par restaurant / mois', cta:'Être recontacté',
    feats:['Jusqu\'à 3 restaurants','Tâches & checklists','Application mobile & tablette','Suivi des complétions'] },
  { name:'Pro', tag:'Le plus demandé', featured:true, price:'À venir', unit:'par restaurant / mois', cta:'Demander une démo',
    feats:['Restaurants illimités','5 niveaux de rôles','Notifications temps réel','Rapports & analyse IA','Calendrier & récurrence'] },
  { name:'Réseau', tag:'Franchises & grands comptes', price:'Sur devis', unit:'facturation annuelle', cta:'Nous contacter',
    feats:['Tout le plan Pro','Accompagnement dédié','Onboarding du réseau','Exports & intégrations','Support prioritaire'] },
];

const FAQ = [
  { q:"My Work fonctionne-t-il sur mobile et tablette\u00a0?",
    a:"Oui. My Work est multi-device\u00a0: ordinateur au siège, tablette en restaurant, mobile sur le terrain. C'est une application web installable, sans passer par un App Store, et les données se synchronisent en temps réel d'un appareil à l'autre." },
  { q:"Faut-il installer un logiciel ou du matériel\u00a0?",
    a:"Non. My Work fonctionne dans le navigateur et s'installe en un geste sur les écrans de vos équipes. Aucun matériel spécifique, aucune maintenance informatique de votre côté." },
  { q:"Combien de temps faut-il pour déployer My Work\u00a0?",
    a:"Le déploiement est rapide et sans projet IT lourd\u00a0: nous configurons votre réseau avec vous, puis vos équipes prennent l'app en main. Le délai exact dépend de la taille de votre réseau et du nombre d'établissements à paramétrer." },
  { q:"Comment l'IA est-elle utilisée dans l'application\u00a0?",
    a:"L'IA analyse en continu l'activité de votre réseau — complétions, retards, écarts entre restaurants — et génère des synthèses et des rapports de performance prêts à partager, sans que vous ayez à manipuler le moindre tableur." },
  { q:"Quel est le modèle tarifaire\u00a0?",
    a:"My Work est un abonnement SaaS facturé par restaurant. Vous choisissez l'offre adaptée à votre réseau et vous faites évoluer votre abonnement au fil de votre croissance. Les grilles détaillées arrivent très bientôt." },
  { q:"Mes données sont-elles sécurisées\u00a0?",
    a:"Vos données sont hébergées de façon sécurisée et l'accès est strictement cloisonné par rôle\u00a0: chaque utilisateur ne voit que les restaurants et les informations qui le concernent." },
];


/* ─── RENDER ───────────────────────────────────────────────── */
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

document.getElementById('rankList').innerHTML = RESTAURANTS.slice(0,5).map((r,i) => `
  <div class="rank-row">
    <span class="rank-pos">${i+1}</span>
    <span class="rank-ava">${r.ini}</span>
    <div class="rank-info">
      <div class="rank-name">${esc(r.name)}
        ${r.flag ? `<span class="rank-flag">${r.flag}</span>` : ''}
        ${r.late ? `<span class="rank-flag late">${r.late}</span>` : ''}
      </div>
      <div class="rank-city">${esc(r.city)} · ${r.done}/${r.total} tâches</div>
      <div class="rank-bar"><span class="rank-bar-fill" style="--w:${r.pct}%"></span></div>
    </div>
    <span class="rank-pct">${r.pct}%</span>
  </div>`).join('');

document.getElementById('phTasks').innerHTML = PH_TASKS.map((t,i) => `
  <div class="ph-task ${t.done ? 'done' : ''}" data-i="${i}">
    <span class="ph-check"><svg viewBox="0 0 14 14"><path d="M3 7.5l2.6 2.6L11 4.2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <span class="ph-task-txt">${esc(t.txt)}</span>
    <span class="ph-chip ${t.cls}">${t.chip}</span>
  </div>`).join('');

document.getElementById('featGrid').innerHTML = FEATURES.map(f => `
  <article class="feat-card" data-reveal>
    <div class="feat-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${f.p}</svg></div>
    <h3>${esc(f.t)}</h3>
    <p>${esc(f.d)}</p>
    <span class="feat-tag">${esc(f.tag)}</span>
  </article>`).join('');

document.getElementById('rolesGrid').innerHTML = ROLES.map(r => `
  <article class="role-card" data-reveal style="--accent:${r.accent}">
    <div class="role-top">
      <span class="role-avatar" style="--badge-bg:${r.bg};--badge-fg:${r.fg}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${r.ic}</svg>
      </span>
      <span class="role-badge" style="--badge-bg:${r.bg};--badge-fg:${r.fg}">${esc(r.badge)}</span>
    </div>
    <h3>${esc(r.name)}</h3>
    <p>${esc(r.d)}</p>
  </article>`).join('');

document.getElementById('stepsGrid').innerHTML = STEPS.map(s => `
  <div class="step" data-reveal>
    <div class="step-num">${s.n}</div>
    <h3>${esc(s.t)}</h3>
    <p>${esc(s.d)}</p>
  </div>`).join('');

document.getElementById('audGrid').innerHTML = AUDIENCE.map((a,i) => `
  <article class="aud-card" data-reveal style="--d:${i*0.06}s">
    <span class="aud-ic"><i class="ic ${a.ic}"></i></span>
    <h3>${esc(a.t)}</h3>
    <p>${esc(a.d)}</p>
  </article>`).join('');

document.getElementById('priceGrid').innerHTML = PRICING.map((p,i) => `
  <article class="price-card ${p.featured ? 'featured' : ''}" data-reveal style="--d:${i*0.07}s">
    <div class="price-head">
      <span class="price-tag">${esc(p.tag)}</span>
      <h3>${esc(p.name)}</h3>
    </div>
    <div class="price-amount"><b>${esc(p.price)}</b><span>${esc(p.unit)}</span></div>
    <ul class="price-feats">
      ${p.feats.map(f => `<li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(f)}</li>`).join('')}
    </ul>
    <a href="#contact" class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'} price-cta tab-link" data-tab="contact">${esc(p.cta)}</a>
  </article>`).join('');

document.getElementById('faqList').innerHTML = FAQ.map((f,i) => `
  <div class="faq-item ${i===0 ? 'open' : ''}" data-reveal style="--d:${i*0.04}s">
    <button class="faq-q" type="button" aria-expanded="${i===0}">
      <span>${esc(f.q)}</span>
      <svg class="faq-chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div class="faq-a"><p>${esc(f.a)}</p></div>
  </div>`).join('');

/* set ring offset (circumference ≈ 490, 90% → 49) */
const ringFg = document.querySelector('.ring-fg');
if (ringFg) ringFg.style.setProperty('--off', String(Math.round(490 * (1 - 0.90))));

/* ─── NAV scroll state ─────────────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive:true });

/* ─── COUNT-UP ─────────────────────────────────────────────── */
function countUp(el){
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (reduceMotion){ el.textContent = target + suffix; return; }
  const dur = 1300, t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * e) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ─── REVEAL on scroll / load (robust, no IO dependency) ───── */
function reveal(el){
  if (el.classList.contains('in')) return;
  el.classList.add('in');
  el.querySelectorAll('[data-count]').forEach(countUp);
  if (el.dataset.count !== undefined) countUp(el);
}
const stage = document.querySelector('.hero-stage');
function fireStage(){
  if (stage && stage.classList.contains('staged')) return;
  if (stage) stage.classList.add('staged');
  document.querySelectorAll('.dash-window, .phone').forEach(n => n.classList.add('in'));
  document.querySelectorAll('.hero-stage [data-count]').forEach(countUp);
  startPhoneLoop();
}
let ticking = false;
function checkReveal(){
  ticking = false;
  const trigger = window.innerHeight * 0.9;
  document.querySelectorAll('[data-reveal]:not(.in)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < trigger && r.bottom > 0) reveal(el);
  });
  if (stage){
    const r = stage.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.8 && r.bottom > 0) fireStage();
  }
}
function onScrollReveal(){
  if (!ticking){ ticking = true; requestAnimationFrame(checkReveal); }
}
window.addEventListener('scroll', onScrollReveal, { passive:true });
window.addEventListener('resize', onScrollReveal, { passive:true });
window.addEventListener('load', checkReveal);
requestAnimationFrame(checkReveal);
/* hard failsafe: nothing stays hidden + counters reach final value */
setTimeout(() => {
  document.querySelectorAll('.tab-panel.is-active [data-reveal]:not(.in)').forEach(reveal);
  fireStage();
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const expect = target + (el.dataset.suffix || '');
    if (el.textContent !== expect && parseFloat(el.textContent) !== target) el.textContent = expect;
  });
}, 2500);

/* ─── PHONE checkbox demo loop ─────────────────────────────── */
let phoneStarted = false;
function startPhoneLoop(){
  if (phoneStarted || reduceMotion) return;
  phoneStarted = true;
  const tasks = [...document.querySelectorAll('.ph-task')];
  const progNum = document.querySelector('.ph-prog-row b span');
  const bar = document.querySelector('.ph-bar-fill');
  let nextIdx = 2; // first two start done
  const cycle = () => {
    const task = tasks[nextIdx];
    if (task && !task.classList.contains('done')){
      task.classList.add('done','pop');
      const chip = task.querySelector('.ph-chip');
      if (chip){ chip.textContent = 'Fait'; chip.className = 'ph-chip chip-done'; }
      const done = tasks.filter(t => t.classList.contains('done')).length;
      if (progNum) progNum.textContent = done;
      if (bar) bar.style.setProperty('--w', Math.round(done / tasks.length * 100) + '%');
      setTimeout(() => task.classList.remove('pop'), 320);
    }
    nextIdx++;
    if (nextIdx >= tasks.length){
      // reset after a pause
      setTimeout(() => {
        tasks.forEach((t,i) => {
          const orig = PH_TASKS[i];
          t.classList.toggle('done', orig.done);
          const chip = t.querySelector('.ph-chip');
          if (chip){ chip.textContent = orig.chip; chip.className = 'ph-chip ' + orig.cls; }
        });
        const baseDone = PH_TASKS.filter(t => t.done).length;
        if (progNum) progNum.textContent = baseDone;
        if (bar) bar.style.setProperty('--w', Math.round(baseDone / tasks.length * 100) + '%');
        nextIdx = 2;
      }, 2600);
    }
  };
  setInterval(cycle, 2100);
}

/* ─── CTA form ─────────────────────────────────────────────── */
const form = document.getElementById('ctaForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('ctaEmail');
  const btn = form.querySelector('button');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  if (!valid){
    input.classList.add('invalid');
    input.focus();
    return;
  }
  input.classList.remove('invalid');
  btn.textContent = '✓ Demande envoyée';
  btn.classList.add('ok');
  btn.disabled = true;
  input.disabled = true;
  // TODO: brancher un vrai endpoint (Formspree, Netlify Forms, API…)
  console.log('Demande de démo :', input.value.trim());
});
document.getElementById('ctaEmail').addEventListener('input', e => e.target.classList.remove('invalid'));

/* ─── TABS ─────────────────────────────────────────────────── */
const PANELS = ['produit','features','pricing','deploiement','faq','contact'];
function activateTab(name){
  if (!PANELS.includes(name)) name = 'produit';
  document.querySelectorAll('.tab-panel').forEach(p =>
    p.classList.toggle('is-active', p.dataset.panel === name));
  document.querySelectorAll('.tab-link').forEach(a =>
    a.classList.toggle('is-current', a.dataset.tab === name));
  const panel = document.getElementById('panel-' + name);
  if (panel){
    if (name === 'produit') fireStage();
    panel.querySelectorAll('[data-reveal]').forEach(reveal);
  }
  window.scrollTo(0, 0);
  if (location.hash.slice(1) !== name) history.replaceState(null, '', '#' + name);
}
document.querySelectorAll('.tab-link').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); activateTab(a.dataset.tab); });
});
window.addEventListener('hashchange', () => activateTab(location.hash.slice(1)));
activateTab((location.hash || '#produit').slice(1));

/* ─── FAQ accordion ────────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
