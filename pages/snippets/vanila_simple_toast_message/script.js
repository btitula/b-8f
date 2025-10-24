const successButton = document.querySelector('.success');
const errorButton = document.querySelector('.error');
const warningButton = document.querySelector('.warning');

let toastContainer;

function generateToast({
  message,
  backgroundColor = '#00214d',
  color = '#fffffe',
  lifetime = '3000ms'
}) {
  toastContainer.insertAdjacentHTML('beforeend', `
    <p class="toast" style="background-color: ${backgroundColor}; color: ${color}; animation-duration: ${lifetime};">
      ${message}
    </p>
  `);

  const toast = toastContainer.lastElementChild;
  toast.addEventListener('animationend', () => {
    toast.remove();
  }, { once: true });
}

(function initToast() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="toast-container">
    </div>
  `);
  toastContainer = document.querySelector('.toast-container');
})();

successButton.addEventListener('click', (e) => {
  generateToast({
    message: e.currentTarget.dataset.message,
    backgroundColor: '#00214d',
    color: '#fffffe',
    lifetime: '3000ms'
  });
});

errorButton.addEventListener('click', (e) => {
  generateToast({
    message: e.currentTarget.dataset.message,
    backgroundColor: '#dc3545',
    color: '#fffffe',
    lifetime: '3000ms'
  });
});

warningButton.addEventListener('click', (e) => {
  generateToast({
    message: e.currentTarget.dataset.message,
    backgroundColor: '#ffc107',
    color: '#fffffe',
    lifetime: '3000ms'
  });
});