import { getDatabase, ref, onValue } from 'firebase/database';
import toastr from 'toastr';
import { app } from '../modal/config/firebaseConfig';

//show success message
const successMessage = () => {
  const message = localStorage.getItem('successMessage');
  if (message) {
    toastr.success(message);
    localStorage.removeItem('successMessage');
  }
};
successMessage();

const totalEmployee = document.querySelector('.total-employee');
const totaltask = document.querySelector('.total-task');
const totalInCompleteTask = document.querySelector('.total-incomplete-task');
const totalCompleteTask = document.querySelector('.total-complete-task');
const db = getDatabase(app);
const getEmployee = ref(db, 'employee');
onValue(getEmployee, (snapshot) => {
  const total = snapshot.size;
  if (+total >= 1 && total < 10) totalEmployee.innerHTML = `0${total}`;
});
const getTask = ref(db, 'project');
onValue(getTask, (snapshot) => {
  const total = snapshot.size;
  if (+total >= 1 && total < 10) totaltask.innerHTML = `0${total}`;
});

const getPartialTask = ref(db, 'project');
onValue(getPartialTask, (snapshot) => {
  const partialArr = [];
  snapshot.forEach((task) => {
    const { projectStatus } = task.val();
    if (projectStatus != 'Done') {
      partialArr.push(projectStatus);
      const item = partialArr.length;
      if (+item >= 1 && item < 10) totalInCompleteTask.innerHTML = `0${item}`;
    }
  });
});

const getCompleteTask = ref(db, 'project');
onValue(getCompleteTask, (snapshot) => {
  const completeArr = [];
  snapshot.forEach((task) => {
    const { projectStatus } = task.val();
    if (projectStatus === 'Done') {
      completeArr.push(projectStatus);
      const item = completeArr.length;
      if (+item >= 1 && item < 10) totalCompleteTask.innerHTML = `0${item}`;
    }
  });
});
