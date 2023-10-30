import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../modal/config/firebaseConfig';

const renderCompleteTask = () => {
  const db = getDatabase(app);
  const getItem = ref(db, 'completeTask');
  onValue(getItem, (snapshot) => {
    tbody.innerHTML = '';
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = childSnaphot.key;
      const {
        projectName,
        projectStatus,
        projectTeamMember,
        startDate,
        endDate,
      } = data;

      const row = document.createElement('tr');
      row.innerHTML = `<tr>
                <td>
                  <span>
                    <h3 class="project-name">${
                      projectName.charAt(0).toUpperCase() + projectName.slice(1)
                    }</h3>
                    <!-- <p class="due-date">Due:2023-10-20</p> -->
                  </span>
                </td>
                <td>Silas nwuba</td>
                <td>20-20-2000</td>
                <td>30-20-2000</td>
                <td>
                  <span class="badge badge-complete">Completed on-time</span>
                </td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                      role="progressbar"
                      aria-valuenow="100%"
                      aria-valumin="0"
                      aria-valuemax="300"
                    ></div>
                  </div>
                  <small>100% Complete</small>
                </td>
                <td><span class="badge badge-success">Done</span></td>
              </tr>`;
      tbody.appendChild(row);
    });
  });
};

renderCompleteTask();
