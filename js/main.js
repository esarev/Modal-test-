
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
    return error;
  }

  function removeValidation() {
    let errors = form.querySelectorAll('.error');
    
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }
  
  // fields.forEach((item) => {
  //   item.addEventListener('focus', function() {
  //     fields.parentNode.removeChild(fields);
  //   });
  // });

  function checkFields() {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].value) {return;}
        
        isValidateError = true;
        let error = generateError('Заполните поле');
      
        fields[i].parentNode.insertBefore(error, fields[i]);
    } 
  }

  function checkEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
    checkEmail();
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

    let emailVal = inputEmail.value;
    isValidateError = false;

    console.log('clicked on submit');
    
    validate();

    const span = document.querySelector('.error');
    if(!checkEmail(emailVal)) {
      console.log('email.not valid');
      span.classList.add('error');
      return false;
    } else {
      span.classList.remove('error');
    }
    
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


