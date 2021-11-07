
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const loginBtn = document.getElementById('callback-button'),
        modal = document.getElementById('modal-window'),
        form = document.getElementById('form'),
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

  // Close Modal
  function closeModal() {
    modal.classList.remove('modal_active');
  }

  closeBtn.addEventListener('click', closeModal);
    
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

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
    let error = document.createElement('span');
    error.className = 'error';
    error.style.display = 'block';
    error.innerHTML = text;
    console.log(error);
    return error;
    
  };

  const removeValidation = function () {
    let errors = form.querySelectorAll('.error');
    
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  };

  const checkFields = function () {

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        console.log('пусто', fields[i]);
        
        let error = generateError('Заполните поле');
        
        console.log(error);
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

  // let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return validEmail.test(String(email).toLowerCase());


  console.log(form);
  form.addEventListener('submit', function (e) {
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

  });

});


