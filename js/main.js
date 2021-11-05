document.addEventListener('DOMContentLoaded', () => {

  const callBackBtn = document.getElementById('callback-button'),
        modal = document.getElementById('modal-window'),
        form = document.getElementById('logInForm'),
        formBtn = form.querySelector('.form-btn'),
        buttonOut = document.querySelector('.button-out'),
        userName = document.querySelector('.user-name'),
        closeBtn = form.querySelector('.modal__close-button'),
        name = document.getElementById('name'),
        surname = document.getElementById('surname'),
        email = document.getElementById('email'),
        password = document.getElementById('password'),
        passwordRepeat = document.getElementById('password-repeat'),
        date = document.getElementById('date'),
        fields = form.querySelectorAll('.fields');

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    //Validation:

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        console.log('пусто', fields[i]);

        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = 'Заполните поле';
        form[i].parentElement.insertBefore(error, fields[i]);
      }
    }

    const user = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value,
      date: date.value
    };

    const errors = form.querySelectorAll('.error');

    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }

    if (password.value !== passwordRepeat.value) {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.innerHTML = 'Пароли не совпадают';
      passwordRepeat.parentElement.insertBefore(error, passwordRepeat);
    } else {
      login(user);
    }

    // login(user);
  });


});