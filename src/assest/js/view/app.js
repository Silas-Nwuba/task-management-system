import { authenticateUser } from '../modal/login';

const username = document.querySelector('.username');
const password = document.querySelector('.password');
const form = document.querySelector('form');
const btn = document.querySelector('button');

//login validation
form.setAttribute('novalidate', '');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateLogin()) {
    loader();
    authenticateUser(username.value, password.value);
  }
});
const validateLogin = () => {
  let userErr = true;
  let passErr = true;
  const usernameRegx = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  if (username.value.trim() === '') {
    errorMessage(username, 'Username is required');
    userErr = false;
  } else if (
    !usernameRegx.test(username.value.trim()) ||
    username.value.trim() !== 'elimcephas@gmail.com'
  ) {
    errorMessage(username, 'Username is not valid');
    userErr = false;
  } else {
    successMessage(username);
    userErr = true;
  }
  if (password.value.trim() === '') {
    errorMessage(password, 'Pasword is required');
    passErr = false;
  } else if (password.value.trim() !== 'Tankvick123') {
    errorMessage(password, 'Pasword is not valid');
    passErr = false;
  } else {
    successMessage(password);
    passErr = true;
  }
  if ((userErr = passErr === true)) {
    return true;
  } else {
    return false;
  }
};

const loader = () => {
  btn.innerHTML = 'Processing...';
};
const errorMessage = (input, message) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector('small');
  small.classList.add('error-message');
  small.textContent = `${message}`;
};
const successMessage = (input) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector('small');
  small.classList.remove('error-message');
  small.textContent = '';
};
