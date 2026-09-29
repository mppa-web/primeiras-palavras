// ─── Preencha só aqui ────────────────────────────────────────────────
const SITE = {
  owner: 'Italo José Zarantonelo Trindade',          // pessoa ou empresa responsável pelo app
  email: 'minhasprimeiraspalavrasapp@gmail.com',      // e-mail de contato / privacidade
  updated: { pt: '22 de setembro de 2026', en: 'September 22, 2026' },
  playUrl: '',      // quando o app sair: 'https://play.google.com/store/apps/details?id=...'
  waitlistUrl: 'https://script.google.com/macros/s/AKfycbziB3h4DwXXN2o3M1bFWCOUpznjMhT24Vj2tyacMRkrwBSvrIz6Qx44Q9-ZlAvxDgTwvg/exec',  // URL do Apps Script da lista do iPhone (ver ferramentas/lista-iphone.gs)
};
// ─────────────────────────────────────────────────────────────────────

document.querySelectorAll('[data-fill]').forEach(el => {
  const k = el.dataset.fill;
  if (k === 'email') {
    el.textContent = SITE.email;
    if (el.tagName === 'A') el.href = 'mailto:' + SITE.email;
  } else if (k === 'updated') {
    el.textContent = SITE.updated[el.closest('[lang]')?.lang?.startsWith('en') ? 'en' : 'pt'];
  } else {
    el.textContent = SITE[k] ?? '';
  }
});

// Idioma: ?lang=en ou o do navegador. Os dois textos estão na página.
const pick = new URLSearchParams(location.search).get('lang')
  || localStorage.getItem('pp_lang')
  || (navigator.language || 'pt').slice(0, 2);
const setLang = (l) => {
  l = l === 'en' ? 'en' : 'pt';
  document.documentElement.lang = l === 'en' ? 'en' : 'pt-BR';
  document.body.dataset.lang = l;
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === l));
  localStorage.setItem('pp_lang', l);
};
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.l)));
setLang(pick);

// Botão do Google Play: "Em breve" até playUrl ser preenchido.
if (SITE.playUrl) {
  document.body.dataset.play = 'live';
  document.querySelectorAll('[data-play]').forEach(a => { a.href = SITE.playUrl; a.target = '_blank'; a.rel = 'noopener'; });
}

// Lista de espera do iPhone.
document.querySelectorAll('form[data-waitlist]').forEach(f => {
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const el = f.elements;
    if (el.site.value) return; // robô
    const nome = el.nome.value.trim(), email = el.email.value.trim();
    if (!nome || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !el.consent.checked) { f.dataset.s = 'bad'; return; }
    if (!SITE.waitlistUrl) { f.dataset.s = 'err'; console.warn('Preencha SITE.waitlistUrl em site.js'); return; }
    f.dataset.s = 'sending';
    const consentText = f.querySelector('.consent [lang="' + (document.body.dataset.lang === 'en' ? 'en' : 'pt-BR') + '"]')?.textContent || '';
    try {
      await fetch(SITE.waitlistUrl, { method: 'POST', mode: 'no-cors',
        body: new URLSearchParams({ nome, email, consent: 'sim', lang: document.body.dataset.lang, texto: consentText }) });
      f.dataset.s = 'ok';
    } catch { f.dataset.s = 'err'; }
  });
});

// Imagens opcionais: se o arquivo existir, cobre o espaço reservado.
document.querySelectorAll('img[data-src]').forEach(i => { i.onerror = () => i.remove(); i.src = i.dataset.src; });
