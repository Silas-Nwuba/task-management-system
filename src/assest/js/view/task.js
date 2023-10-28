const taskModal = document.querySelector('.add-task');
const overlay = document.querySelector('.overlay');
const modal = taskModal.querySelector('.modal');
//open add-employee modal
document.querySelector('.add-btn').addEventListener('click', () => {
  modal.style.display = 'block';
  overlay.style.display = 'block';
  btn.innerHTML = 'Submit';
});

//close add-employee modal
document.querySelector('.close').addEventListener('click', () => {
  modal.style.display = 'none';
  overlay.style.display = 'none';
  form.reset();
});
