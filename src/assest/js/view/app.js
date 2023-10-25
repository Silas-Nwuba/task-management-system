const username = document.querySelector('.username');
const password = document.querySelector('.password');
const form = document.querySelector('form');

//login validation

form.setAttribute('novalidate', '');
form.addEventListener('submit', e => {
  e.preventDefault();
  validateLogin();
});
const validateLogin = () => {
  let userErr = true;
  let passErr = true;
  const usernameRegx = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  if (username.value.trim() === '') {
    errorMessage(username, 'Input field is required');
    userErr = false;
  } else if (!usernameRegx.test(username.value.trim())) {
    errorMessage(username, 'Input field is not valid');
    userErr = false;
  } else {
    successMessage(username);
    userErr = true;
  }
  if (password.value.trim() === '') {
    errorMessage(password, 'Input field is required');
    passErr = false;
  } else {
    successMessage(password);
    passErr = true;
  }
};

const errorMessage = (input, message) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector('small');
  small.classList.add('error-message');
  small.textContent = `${message}`;
};
const successMessage = input => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector('small');
  small.classList.remove('error-message');
  small.textContent = '';
};
