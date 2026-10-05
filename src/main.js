const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const header = document.querySelector('.site-header');
const desktop = window.matchMedia('(min-width: 768px)');

document.documentElement.classList.add('js');
toggle.hidden = false;

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Otevřít menu');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  navigation.classList.toggle('is-open', open);
});
const navigationLinks = [...navigation.querySelectorAll('a')];
navigationLinks.forEach(link => link.addEventListener('click', () => {
  const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
  closeMenu();
  if (wasOpen) {
    const heading = document.querySelector(`${link.hash} h2`);
    heading.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  }
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
header.addEventListener('focusout', event => {
  if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
desktop.addEventListener('change', () => {
  const focusIsHidden = !desktop.matches && navigation.contains(document.activeElement);
  closeMenu();
  if (focusIsHidden || (desktop.matches && document.activeElement === toggle)) header.querySelector('.wordmark').focus();
});

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
  button.querySelector('.photo-action').innerHTML = '<span>Prohlédnout fotografii</span><span aria-hidden="true">+</span>';
  const source = link.href;
  const { title, photo: filename } = link.dataset;
  link.replaceWith(button);
  button.addEventListener('click', () => {
    photoTrigger = button;
    document.querySelector('#photo-title').textContent = title;
    photo.src = `/images/${filename}`;
    photo.alt = button.querySelector('img').alt;
    document.querySelector('#photo-source').href = source;
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('dialog-open');
  photoTrigger?.focus({ preventScroll: true });
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

// Indicate the current section without taking over scrolling.
let scrollQueued = false;
function updateNavigation() {
  scrollQueued = false;
  let activeHash;
  for (const link of navigationLinks) {
    if (document.querySelector(link.hash).getBoundingClientRect().top <= innerHeight * 0.4) activeHash = link.hash;
  }
  if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) activeHash = navigationLinks.at(-1).hash;
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
document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
