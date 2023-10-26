import toastr from 'toastr';
import { writeEmployee } from '../modal/employeeService';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../modal/config/firebaseConfig';

const employeeModal = document.querySelector('.add-employee');
const modal = employeeModal.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const gender = document.querySelector('.gender');
const position = document.querySelector('.position');
const form = document.querySelector('form');
const btn = document.querySelector('.btn-submit');
const tbody = document.querySelector('tbody');
const editmodal = document.querySelector('.edit-employee');

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

const renderEmployee = () => {
  const db = getDatabase(app);
  const getItem = ref(db, 'employee');
  onValue(getItem, (snapshot) => {
    tbody.innerHTML = '';
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = childSnaphot.key;
      const { firstName, lastName, email, gender, position } = data;
      const fullname =
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1) +
        ' ' +
        lastName.charAt(0).toUpperCase() +
        lastName.slice(1);
      const row = document.createElement('tr');
      row.innerHTML = `<td>${id}</td>
       <td>${fullname}</td>
       <td>${email}</td>
       <td>${gender}</td>
       <td>${position}</td>
       <td class="emp-active">Active</td>
       <td>
         <span>
           <button type="button" class="btn btn-success">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               fill="currentColor"
               class="bi bi-pencil-square"
               viewBox="0 0 16 16"
             >
               <path
                 d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
               />
               <path
                 fill-rule="evenodd"
                 d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
               />
             </svg>
           </button>
           <button type="button" class="btn btn-info">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
           <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
         </svg>
           </button>
           <button type="button" class="btn btn-danger">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               fill="currentColor"
               class="bi bi-trash-fill"
               viewBox="0 0 16 16"
             >
               <path
                 d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
               />
             </svg>
           </button>
         </span>
       </td>
     </tr>`;
      tbody.appendChild(row);
    });
  });
};

renderEmployee();
//add-employee-modal-validation
form.setAttribute('novalidate', '');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validation(form)) {
    loader();
    creatEmployee(form);
  }
});

const validation = () => {
  let error = true;
  const regrex = /^[a-zA-Z]+$/;
  if (
    firstName.value.trim() === '' ||
    lastName.value.trim() === '' ||
    email.value.trim() === '' ||
    gender.value.trim() === '' ||
    position.value.trim() === ''
  ) {
    toastr.error('input field is required');
    error = false;
  }
  if (error === true) {
    return true;
  } else {
    return false;
  }
};
const loader = () => {
  btn.innerHTML = 'Processing...';
};
const creatEmployee = (formElement) => {
  const firstName = formElement.querySelector('.first-name').value;
  const lastName = formElement.querySelector('.last-name').value;
  const email = formElement.querySelector('.email').value;
  const gender = formElement.querySelector('.gender').value;
  const position = formElement.querySelector('.position').value;

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    position: position,
  };

  writeEmployee(data);
};

// //const editEmployee = () => {
// document.querySelector('tbody').addEventListener('click', (e) => {
//   e.preventDefault();
//   if (e.target.closest('.btn-success')) {
//     const row =
//       e.target.closest('.btn-success').parentElement.parentElement
//         .parentElement;
//     const id = row.children[0].innerText;
//     const employeeName = row.children[1].innerText;
//     const email = row.children[2].innerText;
//     const gender = row.children[3].innerText;
//     const position = row.children[4].innerText;
//     renderItemOnEditModal(id, employeeName, email, gender, position);
//   }
// });
const renderItemOnEditModal = (id, employeeName, email, gender, position) => {
  let temp = [];
  const details = {
    id: id,
    employeeName: employeeName,
    gender: gender,
    email: email,
    position: position,
    email: email,
  };
  if (temp.length > 0) {
    temp = [];
  }
  temp.push(details);
  temp.forEach((data) => {
    const firstName = data.employeeName.split(' ')[0];
    const lastName = data.employeeName.split(' ')[1];
    const html = ` <div class="modal" data-id=${data.id}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Edit Employee
          </h5>

          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form action="" autocomplete="off">
            <div class="col">
              <input
                type="text"
                placeholder="First name"
                required
                class="first-name"
                value="${firstName}"
              />
              <small></small>
            </div>
            <div class="col">
              <input
                type="text"
                placeholder="Last name"
                required
                class="last-name"
                value="${lastName}"
              />
              <small></small>
            </div>
            <div class="col">
              <input
                type="email"
                placeholder="Email"
                required
                class="email"
                value="${data.email}"
              />
              <small></small>
            </div>
            <div class="col">
              <select class="gender" required>
                <option value="" selected>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <small></small>
            </div>
            <div class="col">
              <select required class="position">
                <option value="" selected>Position</option>
                <option value="Fronend developer">
                  Fronend developer
                </option>
                <option value="Backend developer">
                  Backend developer
                </option>
              </select>
              <small></small>
            </div>
            <button type="submit" class="btn-update">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;
    // console.log(editmodal);
    // editmodal.insertAdjacentHTML('beforeend', html);
    // editmodal.querySelector('.modal').style.display = 'block';
    // overlay.style.display = 'block';
    // editmodal.querySelector('.close').addEventListener('click', closeEditModal);

    //   editmodal.querySelector('form').setAttribute('novalidate', '');
    //   editmodal
    //     .querySelector('.btn-submit')
    //     .addEventListener('submit', validationForm);
  });
};

const closeEditModal = () => {
  editmodal.querySelector('.modal').remove();
  overlay.style.display = 'none';
  temp = [];
};
const validationForm = (e) => {
  e.preventDefault();
  alert('Working');
};
toastr.options = {
  preventDuplicates: true,
  preventOpenDuplicate: true,
};
