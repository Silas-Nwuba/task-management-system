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
