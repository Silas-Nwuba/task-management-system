import toastr from 'toastr';

const employeeModal = document.querySelector('.add-employee');
const modal = employeeModal.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const gender = document.querySelector('.gender');
const position = document.querySelector('.position');
const form = document.querySelector('form');

//open add-employee modal
document.querySelector('.add-btn').addEventListener('click', () => {
  modal.style.display = 'block';
  overlay.style.display = 'block';
});

//close add-employee modal
document.querySelector('.close').addEventListener('click', () => {
  modal.style.display = 'none';
  overlay.style.display = 'none';
});

//add-employee-modal-validation
form.setAttribute('novalidate', '');
form.addEventListener('submit', e => {
  e.preventDefault();
  validation();
});

const validation = () => {
  let error = true;
  const regrex = /^[a-zA-Z]+$/;
  if (
    firstName.value.trim() === '' ||
    lastName.value.trim() === '' ||
    email.value.trim() === '' ||
    gender.value.trim() === ' ' ||
    position.value.trim() === ''
  ) {
    toastr.error('input field is required');
    error = false;
  } else if (
    firstName.value.trim() !== '' &&
    !regrex.test(firstName.value.trim())
  ) {
    toastr.error('input field is invalid');
    error = false;
  }
  if (error === true) {
    return true;
  } else {
    return false;
  }
};
toastr.options = {
  preventDuplicates: true,
  preventOpenDuplicate: true,
};
