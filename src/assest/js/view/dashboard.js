import toastr from 'toastr';
//show success message
const successMessage = () => {
  const message = localStorage.getItem('successMessage');
  if (message) {
    toastr.success(message);
    localStorage.removeItem('successMessage');
  }
};
successMessage();

window.addEventListener('load', () => {
  alert('working');
});
