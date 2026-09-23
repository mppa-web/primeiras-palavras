// ─── Preencha só aqui ────────────────────────────────────────────────
const SITE = {
  owner: 'Italo José Zarantonelo Trindade',          // pessoa ou empresa responsável pelo app
  email: 'minhasprimeiraspalavrasapp@gmail.com',      // e-mail de contato / privacidade
  updated: { pt: '22 de setembro de 2026', en: 'September 22, 2026' },
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
