
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

  function checkName() {
    let nameVal = fields.value;
    console.log(nameVal);

    return /^[А-ЯЁ][а-яё]+$/.test(nameVal);
  }

  function checkEmail(email) {
    let emailVal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(emailVal);
    return emailVal.test(String(email).toLowerCase());
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
    checkName();
    checkEmail();
    checkPassword();

  }

  // fields.forEach(item => {
  //   item.addEventListener('input', () => {
  //     item.value = item.value.replace(/\D/, '') - only numbers;
  //   });
  // });


  
  // Date
//   let now = new Date();
//   console.log(now);
//   let userDate = new Date(now);
//   console.log(userDate);
//   let adult = now - userDate;
//   console.log(adult);

//   function isOverEighteen(birthday) {
//       var ageDifMs = Date.now() - birthday.getTime();
//       var ageDate = new Date(ageDifMs);
//       var age = Math.abs(ageDate.getUTCFullYear() - 1970);
//       if(age > 18){
//         return true;
//       }else{
//         return false;
//       }
//   }

// console.log(isOverEighteen(now));
// console.log(isOverEighteen(userDate));


  inputDate.addEventListener('change', function() {
    let input = this.value;
    let dateEntered = new Date(input);
    console.log(input);
    console.log(dateEntered);
    // let sum = new Date() - dateEntered;
    // console.log(sum);
    
    let sumFormatted = Math.abs(dateEntered.getUTCFullYear() - 1970);
    console.log(sumFormatted);
  });

  console.log(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let emailVal = inputEmail.value;
    isValidateError = false;

    console.log('clicked on submit');
    
    validate();

    const span = document.createElement('span');

    if(!checkEmail(checkName())) {
      console.log('not valid');
      span.classList.add('error');
      return false;
    } else {
      span.classList.remove('error');
    }

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


