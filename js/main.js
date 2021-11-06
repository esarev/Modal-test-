
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const loginBtn = document.getElementById('callback-button'),
        modal = document.getElementById('modal-window'),
        modalContent = document.querySelector('.modal__content'),
        form = document.getElementById('form'),
        formBtn = form.querySelector('.form-btn'),
        userName = document.querySelector('.user-name'),
        closeBtn = form.querySelector('.modal__close-button'),
        buttonOut = document.querySelector('.button-out'),
        inputName = document.getElementById('name'),
        inputSurname = document.getElementById('surname'),
        inputEmail = document.getElementById('email'),
        inputPassword = document.getElementById('password'),
        inputPasswordRepeat = document.getElementById('password-repeat'),
        inputDate = document.getElementById('date'),
        fields = document.querySelectorAll('.field');

  // Open Modal
  loginBtn.onclick = function () {
    modal.classList.add('modal_active');
  };

  closeBtn.onclick = function () {
    modal.classList.remove('modal_active');
  };

  // User login
  const login = (user) => {
    loginBtn.style.display = 'none';

    buttonOut.style.display = 'block';
    userName.style.display = 'block';
  
    userName.textContent = user.name;
    modal.classList.remove('modal_active');
  };

  // User logout
  const logout = () => {
    loginBtn.style.display = 'block';

    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
  };

  buttonOut.addEventListener('click', () => {
    logout();
  });

  // Validate
  const generateError = function (text) {
    const error = document.createElement('span');
    error.className = 'error';
    error.style.display = 'block';
    error.innerHTML = text;
    return error;
  };

  const removeValidation = function () {
    const errors = form.querySelectorAll('.error');
    

    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  };

  const checkFields = function () {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        console.log('пусто', fields[i]);

        let error = generateError('Заполните поле');
        form[i].parentElement.insertBefore(error, fields[i]);
      } 
    }
    
  };

  const checkPassword = function () {
    if (inputPassword.value !== inputPasswordRepeat.value) {
      const error = generateError('Пароли не совпадают');
      inputPasswordRepeat.parentElement.insertBefore(error, inputPasswordRepeat);
    }
  };
  
  form.onsubmit = function (e) {
    e.preventDefault();
    console.log('clicked on submit');
    
    checkFields();
    removeValidation();
    checkPassword();
    
    const user = {
    name: inputName.value,
    surname: inputSurname.value,
    email: inputEmail.value,
    password: inputPassword.value,
    passwordRepeat: inputPasswordRepeat.value,
    date: inputDate.value
    };

    login(user);

  };


});


