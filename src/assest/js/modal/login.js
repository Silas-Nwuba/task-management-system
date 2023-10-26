import { signInWithEmailAndPassword } from 'firebase/auth';
import toastr from 'toastr';
import { auth } from './config/firebaseConfig';

const form = document.querySelector('form');
export const authenticateUser = (username, password) => {
  signInWithEmailAndPassword(auth, username, password)
    .then(Credential => {
      const user = Credential.user;
      if (user) {
        window.location.href = 'http://localhost:1234/dashboard.html';
        form.reset();
        const key = 'successMessage';
        localStorage.setItem(key, 'Successfully logged in');
      }
    })
    .catch(() => {
      toastr.error('Network Error');
    });
};
