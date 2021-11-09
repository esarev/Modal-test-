
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

  fields.forEach(function (field) {
    field.addEventListener("focus", function () {
    let span = document.getElementsByTagName('span');
    console.log(span);
    // span.parentNode.removeChild(span);
    span[1].remove();
    });
  });

  // Validate

  function generateError(text) {
    const error = document.createElement('span');
    error.classList = 'error';
    error.style.display = 'block';
    error.innerText = text;
    return error;
  }
  
  function removeValidation() {
    const errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }

  function checkFields() {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].value == '') {
        isValidateError = true;
        const error = generateError('Заполните поле');
        fields[i].parentNode.insertBefore(error, fields[i]);
      } 
    }  
  }

  function checkName() {
    let nameVal = fields.value;
    console.log(nameVal);

    return /^[А-ЯЁ][а-яё]+$/.test(nameVal);
  }

  // ValidEmail
  const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  function validateEmail(value) {
    return emailRegExp.test(value);
  }

  function updateInput() {
    if(!validateEmail(inputEmail.value)) {
      const error = generateError('Введите корректный email');
      inputEmail.parentNode.insertBefore(error, inputEmail);
    } else {
      console.log(updateInput);
    }
    
  }
  inputEmail.addEventListener('input', updateInput);

  // ValidPassword

  function checkPassword() {

    const hasNumber = /\d/;
    const hasCapitalLetter = /\[a-zA-z]+/;
    const hasSymbol = /\[!@#]/;
    let regexp = hasNumber && hasCapitalLetter && hasSymbol;
    console.log(regexp);
    
    if(inputPassword.value == '' || inputPassword.length < 8) {
      console.log('not valid');
    } else {
      console.log('valid');
    }

    if(!hasNumber && !hasCapitalLetter && hasSymbol || inputPassword.value == '') {
      console.log('not valid');
    } else {
      console.log('valid');
    }

    if (inputPassword.value !== inputPasswordRepeat.value) {
      const error = generateError('Пароли не совпадают');
      isValidateError = true;
      inputPasswordRepeat.parentNode.insertBefore(error, inputPasswordRepeat);
    }
    return regexp.test(inputPassword.value);
  }

  // DateValid
  inputDate.addEventListener('change', function() {
  let input = this.value;
  let dateNow = new Date();
  let dateEntered = new Date(input);
  console.log(input);
  console.log(dateEntered);
  let date = dateNow.getFullYear() - dateEntered.getFullYear();
  console.log(date);
    if(date < 18) {
      const error = generateError('Упс! Вам ещё не исполнилось 18 лет!');
      isValidateError = true;
      console.log(generateError);
      inputDate.parentNode.insertBefore(error, inputDate);
    }
  });
  

  function validate() {
    removeValidation();
    checkFields();
    checkName();
    checkPassword();
  }

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
      form.addEventListener('submit', () => {
        document.getElementById("form").reset();
      });
    } else {
      
    }

  });
});


