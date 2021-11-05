document.addEventListener('DOMContentLoaded', () => {

  const callBackBtn = document.getElementById('callback-button'),
        modal = document.getElementById('modal-window'),
        buttonOut = document.querySelector('.button-out'),
        userName = document.querySelector('.user-name'),
        closeBtn = document.querySelector('.modal__close-button'),
        logInForm = document.getElementById('logInForm'),
        name = document.getElementById('name'),
        surname = document.getElementById('surname'),
        email = document.getElementById('email'),
        password = document.getElementById('password'),
        date = document.getElementById('date');

  const login = (user) => {
    callBackBtn.style.display = 'none';

    buttonOut.style.display = 'block';
    userName.style.display = 'block';
  
    userName.textContent = user.name;
    modal.classList.remove('modal_active');
  };

  const logout = () => {
    callBackBtn.style.display = 'block';

    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
  };
  
  callBackBtn.onclick = function () {
    modal.classList.add('modal_active');
  };

  closeBtn.onclick = function () {
    modal.classList.remove('modal_active');
  };

  buttonOut.addEventListener('click', () => {
    logout();
  });

  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      date: date.value
    };

    login(user);
  });


});