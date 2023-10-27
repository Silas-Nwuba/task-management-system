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
      const editModel = document.querySelector('.add-employee');
      editModel.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();

      const message = localStorage.getItem('successMessage');
      if (message) {
        toastr.success(message);
        localStorage.removeItem('successMessage');
      }
    })
    .catch(() => {
      const key = 'errorMessage';
      localStorage.setItem(key, 'Network Error');
      const editModal = document.querySelector('.add-employee');
      editModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();

      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.error(message);
        localStorage.removeItem('errorMessage');
      }
    });
}
//updateEmployee
export const updateEmployeeDb = (id, data) => {
  const db = getDatabase(app);
  update(ref(db, 'employee/' + id), data)
    .then(() => {
      //localStorage for success message
      const localKey = 'successMessage';
      localStorage.setItem(localKey, 'Successfully Updated');
      const editModel = document.querySelector('.edit-employee');
      editModel.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      editModel.querySelector('form').reset();
      editModel.querySelector('.btn-update').innerHTML = 'Submit';

      const message = localStorage.getItem('successMessage');
      if (message) {
        toastr.success(message);
        localStorage.removeItem('successMessage');
      }
    })
    .catch(() => {
      const key = 'errorMessage';
      localStorage.setItem(key, 'Network Error');
      const editModal = document.querySelector('.edit-employee');
      editModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();

      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.error(message);
        localStorage.removeItem('errorMessage');
      }
    });
};
export function deleteEmployeeDb(id) {
  const db = getDatabase(app);
  remove(ref(db, 'employee/' + id))
    .then(() => {
      //localStorage for success message
      const localKey = 'successMessage';
      localStorage.setItem(localKey, 'Successfully Deleted');
      const deleteModal = document.querySelector('.delete-employee');
      deleteModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      const message = localStorage.getItem('successMessage');
      if (message) {
        toastr.success(message);
        localStorage.removeItem('successMessage');
      }
    })
    .catch(() => {
      const localKey = 'errorMessage';
      localStorage.setItem(localKey, 'Network issue');
      const deleteModal = document.querySelector('.delete-empoyee');
      deleteModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.success(message);
        localStorage.removeItem('errorMessage');
      }
    });
}
