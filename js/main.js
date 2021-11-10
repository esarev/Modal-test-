
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
        fields = document.querySelectorAll('.field'),
        formButton = document.querySelector('.form-btn');

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
    fields.forEach((field) => {
      field.value = '';
    });
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
    let nameVal = /[А-ЯЁ][а-яё]/;
    console.log(nameVal);
    if(inputName.length < 2) {
      const error = generateError('Слишком короткое имя');
      isValidateError = true;
      inputName.parentNode.insertBefore(error, inputName);
    }
    return nameVal.test(inputName.value);  
  }

  // ValidEmail
  const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  function validateEmail() {
    return emailRegExp.test(inputEmail.value);
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
      const error = generateError('Пароль должен содержать минимум 8 символов');
      isValidateError = true;
      inputPassword.parentNode.insertBefore(error, inputPassword);
    }
    if(!hasNumber && !hasCapitalLetter && !hasSymbol) {
      console.log('not valid');
      const error = generateError('Пароль должен включать одну заглавную букву, один символ, и одну цифру.');
      isValidateError = true;
      inputPassword.parentNode.insertBefore(error, inputPassword);
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
  let date = dateNow.getFullYear() - dateEntered.getFullYear();
  
    if(date < 18) {
      const error = generateError('Ты ещё так молод, у тебя всё впереди!:)');
      isValidateError = true;
      console.log('ошибка выводится');
      inputDate.parentNode.insertBefore(error, inputDate);
      formButton.disabled = true;
    }
    if(date > 18) {
      formButton.disabled = false;
      console.log('нет ошибки');
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
    }
  });
});


