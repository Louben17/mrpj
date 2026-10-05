import './analytics.js';
const navigation = document.querySelector('#navigation');
const header = document.querySelector('.site-header');
const navigationLinks = [...navigation.querySelectorAll('a')];
let dockTimer;
function showDock() { header.classList.remove('is-scrolling'); }
window.addEventListener('scroll', () => {
  clearTimeout(dockTimer);
  if (scrollY > 40 && !header.contains(document.activeElement)) header.classList.add('is-scrolling');
  else showDock();
  dockTimer = setTimeout(showDock, 650);
}, { passive: true });
header.addEventListener('focusin', showDock);
navigationLinks.forEach(link => link.addEventListener('click', () => {
  if (link.pathname !== location.pathname) return;
  const target = document.querySelector(link.hash);
  const heading = target?.querySelector('h1, h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  }
}));

// Links remain usable without JavaScript; enhancement uses native buttons.
const dialog = document.querySelector('#photo-dialog');
const photo = document.querySelector('#dialog-photo');
let photoTrigger;
document.querySelectorAll('.photo-link[data-photo]').forEach(link => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'photo-button';
  button.setAttribute('aria-label', `Otevřít fotografii: ${link.dataset.title}`);
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'photo-dialog');
  button.append(...link.childNodes);
  const { title, photo: filename } = link.dataset;
  link.replaceWith(button);
  button.addEventListener('click', () => {
    photoTrigger = button;
    document.querySelector('#photo-title').textContent = title;
    photo.src = `/images/${filename}`;
    photo.alt = button.querySelector('img').alt;
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
  });
});
document.querySelector('#close-dialog')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('close', () => {
  document.documentElement.classList.remove('dialog-open');
  photoTrigger?.focus({ preventScroll: true });
});
dialog?.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

// Indicate the current section without taking over scrolling.
let scrollQueued = false;
const sectionLinks = navigationLinks.filter(link => link.pathname === location.pathname && link.hash && document.querySelector(link.hash));
function updateNavigation() {
  scrollQueued = false;
  let activeHash;
  for (const link of sectionLinks) {
    if (document.querySelector(link.hash).getBoundingClientRect().top <= innerHeight * 0.4) activeHash = link.hash;
  }
  if (sectionLinks.length && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) activeHash = sectionLinks.at(-1).hash;
  for (const link of navigationLinks) {
    if (link.hash === activeHash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
// The footer signature draws like the hero once it is reached; content below the
// fold rises in. Without JavaScript or with reduced motion everything is static.
if (matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window) {
  const belowFold = element => element.getBoundingClientRect().top > innerHeight;
  const revealed = new IntersectionObserver(entries => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      if (target.dataset.draw) target.dataset.draw = 'run';
      else target.dataset.reveal = 'shown';
      revealed.unobserve(target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  const signature = document.querySelector('.footer-signature .logo-draw');
  if (signature && belowFold(signature)) { signature.dataset.draw = 'pending'; revealed.observe(signature); }
  document.querySelectorAll('.section-heading, .collection-card, .studio-band figure, .story-copy, .story-visual, .reading-card, .faq-intro, .faq details, .footer-top').forEach(element => {
    if (!belowFold(element)) return;
    const siblings = [...element.parentElement.children].filter(child => child.matches(element.tagName));
    element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 4) * 110}ms`);
    element.dataset.reveal = 'pending';
    revealed.observe(element);
  });
}
document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
