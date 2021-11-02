document.addEventListener('DOMContentLoaded', () => {

  const callBackBtn = document.getElementById('callback-button'),
        modal = document.getElementById('modal-window'),
        closeBtn = document.querySelector('.modal__close-button');
  
  callBackBtn.onclick = function () {
    modal.classList.add('modal_active');
  };

  closeBtn.onclick = function () {
    modal.classList.remove('modal_active');
  };
});