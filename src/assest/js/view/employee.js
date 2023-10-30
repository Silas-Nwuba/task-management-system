import toastr from 'toastr';
import {
  writeEmployee,
  updateEmployeeDb,
  deleteEmployeeDb,
} from '../modal/employeeService';
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
const deleteModal = document.querySelector('.delete-employee');

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
       <td>
       <span class="badge badge-success">Active</span></td>
       <td>
         <span>
           <button type="button" class="btn btn-success"> <svg
           width="16"
           height="16"
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
          
           <button type="button" class="btn btn-danger"><svg
           width="16"
           height="16"
           fill="currentColor"
           class="bi bi-trash"
           viewBox="0 0 16 16"
         >
           <path
             d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
           />
           <path
             d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
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

tbody.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.closest('.btn-success')) {
    const row =
      e.target.closest('.btn-success').parentElement.parentElement
        .parentElement;
    const id = row.children[0].innerText;
    const employeeName = row.children[1].innerText;
    const email = row.children[2].innerText;
    const gender = row.children[3].innerText;
    const position = row.children[4].innerText;
    renderItemOnEditModal(id, employeeName, email, gender, position);
  }
});
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
    const html = ` <div class="modal" data-id = ${data.id}>
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
                <option value="UI/UX designer">UI/UX designer</option>
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
    editmodal.insertAdjacentHTML('beforeend', html);
    editmodal.querySelector('.modal').style.display = 'block';
    overlay.style.display = 'block';
    editmodal.querySelector('.close').addEventListener('click', closeEditModal);
    editmodal.querySelector('form').setAttribute('novalidate', '');
    editmodal.querySelector('form').addEventListener('submit', validationForm);
  });
};

const closeEditModal = () => {
  editmodal.querySelector('.modal').remove();
  overlay.style.display = 'none';
  temp = [];
};
const validationForm = (e) => {
  e.preventDefault();
  const form = e.target;
  if (checkFormInput(form)) {
    form.querySelector('.btn-update').innerHTML = 'Processing..';
    editEmployeeData(form);
  }
};
const checkFormInput = (formElement) => {
  const firstName = formElement.querySelector('.first-name');
  const lastName = formElement.querySelector('.last-name');
  const email = formElement.querySelector('.email');
  const gender = formElement.querySelector('.gender');
  const position = formElement.querySelector('.position');
  let error = true;
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

//edit employee
const editEmployeeData = (form) => {
  const id = editmodal.querySelector('.modal').dataset.id;
  const firstName = form.querySelector('.first-name').value;
  const lastName = form.querySelector('.last-name').value;
  const email = form.querySelector('.email').value;
  const gender = form.querySelector('.gender').value;
  const position = form.querySelector('.position').value;

  const employeeObject = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    position: position,
  };

  updateEmployeeDb(id, employeeObject);
};

//delete employee
const shoeDeleteEmployeeModal = () => {
  tbody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.btn-danger')) {
      const row =
        e.target.closest('.btn-danger').parentElement.parentElement
          .parentElement;
      const id = row.children[0].innerText;

      const html = `<div class="modal" data-id=${id}>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Confirmation
            </h5>

            <span class="close">&times;</span>
          </div>
          <div class="modal-body">
            <p>Are you sure to delete this employee?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success">Yes</button>
            <button class="btn btn-danger">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
      deleteModal.insertAdjacentHTML('beforeend', html);
      deleteModal.querySelector('.modal').style.display = 'block';
      overlay.style.display = 'block';
      deleteModal.querySelector('.close').addEventListener('click', () => {
        deleteModal.querySelector('.modal').style.display = 'none';
        overlay.style.display = 'none';
      });
      deleteModal.querySelector('.btn-danger').addEventListener('click', () => {
        deleteModal.querySelector('.modal').style.display = 'none';
        overlay.style.display = 'none';
      });
      deleteModal
        .querySelector('.btn-success')
        .addEventListener('click', deleteEmployee);
    }
  });
};
shoeDeleteEmployeeModal();
const deleteEmployee = (e) => {
  const id =
    e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
  deleteEmployeeDb(id);
};

toastr.options = {
  preventDuplicates: true,
  preventOpenDuplicate: true,
};
