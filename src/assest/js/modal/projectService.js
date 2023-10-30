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

export function writeProjectDb(data) {
  const db = getDatabase(app);
  const projectId = `project${generateId(10, 100)}`;
  set(ref(db, 'project/' + projectId), data)
    .then(() => {
      const key = 'successMessage';
      localStorage.setItem(key, 'Successfully Registered');
      const projectModal = document.querySelector('.add-project');
      projectModal.querySelector('.modal').style.display = 'none';
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
      const projectModal = document.querySelector('.add-project');
      projectModal.querySelector('.modal').style.display = 'none';
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
export const updateProjectDb = (id, data) => {
  const db = getDatabase(app);
  update(ref(db, 'project/' + id), data)
    .then(() => {
      const key = 'successMessage';
      localStorage.setItem(key, 'Successfully Updated');
      const editModal = document.querySelector('.edit-project');
      editModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();
      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.error(message);
        localStorage.removeItem('errorMessage');
      }
    })
    .catch(() => {
      const key = 'successMessage';
      localStorage.setItem(key, 'Network Error');
      const editModal = document.querySelector('.edit-project');
      editModal.Modal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();
      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.error(message);
        localStorage.removeItem('errorMessage');
      }
    });
};

export const completeProjectDb = (id, data) => {
  const db = getDatabase(app);
  set(ref(db, 'completeTask/' + id), data)
    .then(() => {
      const key = 'successMessage';
      localStorage.setItem(key, 'Successfully Completed');
      const completeModal = document.querySelector('.complete-task');
      completeModal.querySelector('.modal').style.display = 'none';
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
      const completeModal = document.querySelector('.complete-task');
      completeModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();

      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.error(message);
        localStorage.removeItem('errorMessage');
      }
    });
};

export function deleteProjectDb(id) {
  const db = getDatabase(app);
  remove(ref(db, 'project/' + id))
    .then(() => {
      //localStorage for success message
      const key = 'successMessage';
      localStorage.setItem(key, 'Successfully Deleted');
      const deleteModal = document.querySelector('.delete-project');
      deleteModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('form').reset();
      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.error(message);
        localStorage.removeItem('errorMessage');
      }
    })
    .catch(() => {
      const localKey = 'errorMessage';
      localStorage.setItem(localKey, 'Network issue');
      const deleteModal = document.querySelector('.delete-project');
      deleteModal.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      const message = localStorage.getItem('errorMessage');
      if (message) {
        toastr.success(message);
        localStorage.removeItem('errorMessage');
      }
    });
}
