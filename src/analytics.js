// Google Analytics 4 loads only after the visitor agrees (opt-in, as Czech law requires
// for analytics cookies). The choice is remembered and can be changed from the footer.
const MEASUREMENT_ID = 'G-4N57HC649N';
const STORAGE_KEY = 'mrpj-analytics-consent';

function readChoice() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function saveChoice(value) {
  try { localStorage.setItem(STORAGE_KEY, value); } catch { /* private mode: ask again next visit */ }
}

let loaded = false;
function gtag() { window.dataLayer.push(arguments); }
function loadAnalytics() {
  window.dataLayer = window.dataLayer || [];
  if (loaded) { gtag('consent', 'update', { analytics_storage: 'granted' }); return; }
  loaded = true;
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.append(script);
}
function revokeAnalytics() {
  if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
  const domains = ['', location.hostname, `.${location.hostname.replace(/^www\./, '')}`];
  for (const name of document.cookie.split(';').map(cookie => cookie.split('=')[0].trim()).filter(name => name.startsWith('_ga'))) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
  }
}

let banner;
function closeBanner() { banner?.remove(); banner = null; }
function showBanner() {
  if (banner) return;
  banner = document.createElement('section');
  banner.className = 'consent';
  banner.setAttribute('aria-label', 'Souhlas s měřením návštěvnosti');
  banner.innerHTML = '<p><strong>Smíme měřit návštěvnost?</strong> Přes Google Analytics zjišťujeme, co tě na webu zajímá. Bez reklam a jen s tvým souhlasem.</p><div class="consent-actions"><button type="button" class="consent-accept">Povolit</button><button type="button" class="consent-decline">Ne, díky</button></div>';
  banner.querySelector('.consent-accept').addEventListener('click', () => { saveChoice('granted'); loadAnalytics(); closeBanner(); });
  banner.querySelector('.consent-decline').addEventListener('click', () => { saveChoice('denied'); revokeAnalytics(); closeBanner(); });
  document.body.append(banner);
}

const choice = readChoice();
if (choice === 'granted') loadAnalytics();
else if (choice !== 'denied') showBanner();
document.querySelectorAll('[data-cookie-settings]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => { showBanner(); banner.querySelector('.consent-accept').focus(); });
});
