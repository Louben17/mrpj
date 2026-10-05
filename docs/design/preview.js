const canvas = document.querySelector('#color-canvas');
document.querySelectorAll('input[name="background"]').forEach(input => {
  input.addEventListener('change', () => {
    if (['paper', 'sage', 'blush'].includes(input.value)) {
      canvas.style.backgroundColor = `var(--mrpj-color-${input.value})`;
    }
  });
});

const dialog = document.querySelector('#photo-dialog');
const photo = document.querySelector('#dialog-photo');
let photoTrigger;

document.querySelectorAll('.photo-button').forEach(button => {
  button.addEventListener('click', () => {
    photoTrigger = button;
    document.querySelector('#photo-title').textContent = button.dataset.title;
    photo.src = `/images/${button.dataset.photo}`;
    photo.alt = button.querySelector('img').alt;
    document.querySelector('#photo-source').href = button.dataset.source;
    dialog.showModal();
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => photoTrigger?.focus());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    dialog.close();
  }
});

const form = document.querySelector('#demo-form');
const email = document.querySelector('#demo-email');
const error = document.querySelector('#email-error');
const status = document.querySelector('#form-status');

function clearError() {
  email.removeAttribute('aria-invalid');
  error.hidden = true;
  error.textContent = '';
}

email.addEventListener('input', () => {
  status.textContent = '';
  if (email.validity.valid) clearError();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = '';
  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    error.textContent = email.validity.valueMissing ? 'Vyplň e-mail pro tuto ukázku.' : 'Zadej e-mail ve tvaru jmeno@domena.cz.';
    error.hidden = false;
    email.focus();
    return;
  }
  clearError();
  status.textContent = 'Ukázka validace: formát je v pořádku. Nic se neodeslalo ani neuložilo.';
});
