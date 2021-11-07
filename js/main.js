
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  let isValidateError = false;

  const loginButton = document.getElementById('callback-button'),
        modal = document.getElementById('modal-window'),
        form = document.getElementById('form'),
        userName = document.querySelector('.user-name'),
        closeButton = form.querySelector('.modal__close-button'),
        buttonOut = document.querySelector('.button-out'),
        inputName = document.getElementById('name'),
        inputSurname = document.getElementById('surname'),
        inputEmail = document.getElementById('email'),
        inputPassword = document.getElementById('password'),
        inputPasswordRepeat = document.getElementById('password-repeat'),
        inputDate = document.getElementById('date'),
        fields = document.querySelectorAll('.field');
      
  // Open Modal
  loginButton.onclick = function () {
    modal.classList.add('modal_active');
  };

  // Close Modal
  function closeModal() {
    modal.classList.remove('modal_active');
  }

  closeButton.addEventListener('click', closeModal);
    
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // User login
  const login = function(user) {
    loginButton.style.display = 'none';

    buttonOut.style.display = 'block';
    userName.style.display = 'block';
  
    userName.textContent = user.name;
    modal.classList.remove('modal_active');
  };

  // User logout
  const logout = function() {
    loginButton.style.display = 'block';

    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
  };

  buttonOut.addEventListener('click', () => {
    logout();
  });

  // Validate

  function generateError(text) {
    const error = document.createElement('span');
    error.className = 'error';
    error.style.display = 'block';
    error.innerText = text;
    console.log(error);
    return error;
    
  }

  // const clearError =  document.getElementsByTagName('span');
    
  // clearError.addEventListener('focus', (e) => {
  //   e.target.style.display = 'block';
  // });
    
  

  function removeValidation() {
    let errors = form.querySelectorAll('.error');
    isValidateError = true;
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
      // clearError();
    }
  }

  function checkFields() {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].value) {return;}
        console.log('пусто', fields[i]);
        isValidateError = true;
        let error = generateError('Заполните поле');
        console.log(error);
        fields[i].parentNode.insertBefore(error, fields[i]);
      
    }
  }

  function checkPassword() {
    if (inputPassword.value !== inputPasswordRepeat.value) {
      const error = generateError('Пароли не совпадают');
      isValidateError = true;
      inputPasswordRepeat.parentNode.insertBefore(error, inputPasswordRepeat);
    }
  }

  function validate() {
    removeValidation();
    checkFields();
    checkPassword();
  }

  // let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return validEmail.test(String(email).toLowerCase());

  // fields.forEach(item => {
  //   item.addEventListener('input', () => {
  //     item.value = item.value.replace(/\D/, '') - only numbers;
  //   });
  // });


  console.log(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    isValidateError = false;

    console.log('clicked on submit');
    
    validate();
    
    const user = {
    name: inputName.value,
    surname: inputSurname.value,
    email: inputEmail.value,
    password: inputPassword.value,
    passwordRepeat: inputPasswordRepeat.value,
    date: inputDate.value
    };

    if (!isValidateError) {
      login(user);
    }

  });
});


