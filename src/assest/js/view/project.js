import toastr from 'toastr';
import { writeProjectDb } from '../modal/projectService';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../modal/config/firebaseConfig';

const projectModal = document.querySelector('.add-project');
const addBtn = document.querySelector('.add-btn');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

//show project modal
addBtn.addEventListener('click', () => {
  projectModal.querySelector('.modal').style.display = 'block';
  projectModal.querySelector('.btn-submit').innerHTML = 'submit';
  overlay.style.display = 'block';
});
//close project modal

projectModal.querySelector('.close').addEventListener('click', () => {
  projectModal.querySelector('.modal').style.display = 'none';
  overlay.style.display = 'none';
  form.reset();
});

const renderEmployee = () => {
  const db = getDatabase(app);
  const getItem = ref(db, 'project');
  onValue(getItem, (snapshot) => {
    tbody.innerHTML = '';
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = childSnaphot.key;
      const {
        projectName,
        piority,
        cost,
        projectStatus,
        startDate,
        endDate,
        desc,
      } = data;
      const row = document.createElement('tr');
      const projectCost = new Intl.NumberFormat().format(cost);
      const typecheck =
        projectStatus == 'Done' ? 'badge-success' : 'badge-info';
      row.innerHTML = `<td>${id}</td>
         <td> 
         <span>
         <h5 class="project-title">${
           projectName.charAt(0).toUpperCase() + projectName.slice(1)
         }</h5>
         <p class="project-desc">${desc}</p>
       </span>
       </td>
         <td> <svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z"/></svg>${projectCost.toLocaleString(
           'en-US'
         )}
       </td>
         <td>${startDate}</td>
         <td>${endDate}</td>
         <td>${piority}</td>
         <td><span class="badge ${typecheck}">${projectStatus}</span></td>
         <td>
         <span>
         <button type="button" class="btn btn-success">Edit</button>
         <button type="button" class="btn btn-danger">Delete</button>
       </span>
         </td>
       </tr>`;
      tbody.appendChild(row);
    });
  });
};

renderEmployee();
//add-project-modal-validation
form.setAttribute('novalidate', '');
form.addEventListener('submit', (e) => {
  const form = e.target;
  e.preventDefault();
  if (validation(form)) {
    loader();
    sendProjectData(form);
  }
});

const validation = (formElement) => {
  const projectName = formElement.querySelector('.project-name');
  const piority = formElement.querySelector('.piority');
  const cost = formElement.querySelector('.cost');
  const projectStatus = formElement.querySelector('.status');
  const startDate = formElement.querySelector('.start-date');
  const endDate = formElement.querySelector('.end-date');
  const projectManager = formElement.querySelector('.project-manager');
  const projectTeamMember = formElement.querySelector('.project-team-member');
  const desc = formElement.querySelector('.desc');
  let error = true;

  if (
    projectName.value.trim() === '' ||
    piority.value.trim() === '' ||
    cost.value.trim() === '' ||
    projectStatus.value.trim() === '' ||
    startDate.value.trim() === '' ||
    endDate.value.trim() === '' ||
    projectManager.value.trim() === '' ||
    projectTeamMember.value.trim() === '' ||
    desc.value.trim() === ''
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
  form.querySelector('.btn-submit').innerHTML = 'Processing...';
};

const sendProjectData = (form) => {
  const projectName = form.querySelector('.project-name').value;
  const piority = form.querySelector('.piority').value;
  const cost = form.querySelector('.cost').value;
  const projectStatus = form.querySelector('.status').value;
  const startDate = form.querySelector('.start-date').value;
  const endDate = form.querySelector('.end-date').value;
  const projectManager = form.querySelector('.project-manager').value;
  const projectTeamMember = form.querySelector('.project-team-member').value;
  const desc = form.querySelector('.desc').value;

  const data = {
    projectName: projectName,
    piority: piority,
    cost: cost,
    projectManager: projectManager,
    projectStatus: projectStatus,
    startDate: startDate,
    endDate: endDate,
    projectTeamMember: projectTeamMember,
    desc: desc,
  };
  writeProjectDb(data);
};
toastr.options = {
  preventDuplicates: true,
  preventOpenDuplicate: true,
};
tbody.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.closest('.btn-success')) {
    alert('working');
    const row =
      e.target.closest('.btn-success').parentElement.parentElement
        .parentElement;
    const id = row.children[0].innerText;
    const projectName = row.children[1];
    const desc = projectName.parentElement;
    console.log(desc);
    const cost = row.children[2].innerText;
    const startDate = row.children[3].innerText;
    const endDate = row.children[4].innerText;
    const piority = row.children[5].innerText;
    const projectStatus = row.children[6].innerText;
    renderItemOnEditModal(
      id,
      projectName,
      cost,
      startDate,
      endDate,
      piority,
      projectStatus
    );
  }
});

const renderItemOnEditModal = (
  id,
  projectName,
  cost,
  startDate,
  endDate,
  desc,
  piority,
  projectStatus
) => {
  let temp = [];
  const details = {
    id: id,
    projectName: projectName,
    desc: desc,
    cost: cost,
    startDate: startDate,
    endDate: endDate,
    piority: piority,
    projectStatus: projectStatus,
  };
  if (temp.length > 0) {
    temp = [];
  }
  temp.push(details);
  temp.forEach((data) => {
    const html = ` <div class="modal" data-id=${data.id}>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Edit Project
          </h5>

          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form action="" autocomplete="off">
            <div class="row">
              <div class="col">
                <label for="name">Project Name</label>
                <input
                  type="text"
                  required
                  class="project-name"
                  required
                  value="silas"
                />
              </div>
              <div class="col">
                <label for="name">Piority</label>
                <select class="piority" required>
                <option value="${data.piority}">Low</option>
                  <option value="" selected></option>
                  <option value="Low">Low</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div class="col">
                <label for="status">Cost</label>
                <input type="text" required class="cost" value="${data.cost}" />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="status">Status</label>
                <select class="status" required>
                  <option value="" selected>select</option>
                  <option value="Pending">Pending</option>
                  <option value="On-Hold">On-Hold</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div class="col">
                <label for="StartDate">Start Date</label>
                <input
                  type="date"
                  required
                  class="start-date"
                  required
                  value="${data.startDate}"
                />
              </div>
              <div class="col">
                <label for="EndDate">End Date</label>
                <input type="date" required class="end-date" required  value="${data.endDate}"/>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="Project-Manager">Project Manager</label>
                <select class="project-manager" required>
                <option value="Claire Blake">${data.projectManager}</option>
                  <option value="" selected>select</option>
                  <option value="Claire Blake">Claire Blake</option>
                  <option value="George Wilson">George Wilson</option>
                  <option value="John Smith">John Smith</option>
                  <option value="Mike Williams">Mike Williams</option>
                </select>
              </div>
              <div class="col">
                <label for="Project-Team-member"
                  >Project Team Member</label
                >
                <select class="project-team-member" required>
                  <option value="" selected>select</option>
                  <option value="silas">silas</option>
                  <option value="ebuka">ebuka</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="desc">Description</label>
                <input type="text" required class="desc" value="good job" />
              </div>
            </div>
            <button type="submit" class="btn-submit">Submit</button>
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
