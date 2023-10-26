import { getDatabase, ref, set, update, remove } from 'firebase/database';
import { app } from './config/firebaseConfig';
import toastr from 'toastr';

const generateId = (start, range) => {
  let id = Math.floor(Math.random() * range + start);
  while (id > range) {
    id = Math.floor(Math.random() * range + start);
  }
  return id;
};

export function writeEmployee(data) {
  const db = getDatabase(app);
  const employeeId = `emp${generateId(10, 100)}`;
  set(ref(db, 'employee/' + employeeId), data)
    .then(() => {
      const key = 'successMessage';
      localStorage.setItem(key, 'Successfully Registered');
    })
    .catch(() => {
      const key = 'errorMessage';
      localStorage.setItem(key, 'Network Error');
    });
}
const success = () => {
  const message = localStorage.getItem('successMessage');
  if (message) {
    toastr.success(message);
    localStorage.removeItem('successMessage');
  }
  const editModol = document.querySelector('.add-employee');
  editModol.querySelector('.modal').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('form').reset();
};
success();
const error = () => {
  const message = localStorage.getItem('errorMessage');
  if (message) {
    toastr.error(message);
    localStorage.removeItem('errorMessage');
  }
  const editModol = document.querySelector('.add-employee');
  editModol.querySelector('.modal').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('form').reset();
};
error();
