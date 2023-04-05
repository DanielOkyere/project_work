const addEmployee = document.getElementById('addEmployee');
const employeetable = document.getElementById('employeetable');
const etable = document.getElementById('etable');

addEmployee.addEventListener('click', () => {
  addRow();
});

function addRow() {
  var row = employeetable.insertRow(-1);
  var nameCell = row.insertCell(0);
  var ageCell = row.insertCell(1);
  var cityCell = row.insertCell(2);
  var actionCell = row.insertCell(3);
  nameCell.innerHTML = 'Bob';
  ageCell.innerHTML = '35';
  cityCell.innerHTML = 'Chicago';
  actionCell.innerHTML =
    '<button class="deleteButton" onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const form = document.getElementById('employeeForm');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the form data
  var formData = new FormData(form);
  var data = {};
  for (var [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Send the data using AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/employee');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // console.log(xhr.responseText);
        form.reset();
      } else {
        console.error(xhr.status);
      }
    }
  };
  // console.log(JSON.stringify(data));
  xhr.send(JSON.stringify(data));
});

fetch('/employee')
  .then((response) => response.json())
  .then((data) => {
    let employees = data.data;
    employees.forEach((employee) => {
      console.log(employee);
      // const div = document.createElement('div');
      // div.innerHTML = employee.name;
      // etable.appendChild(div);

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const emailCell = document.createElement('td');
      const actionCell = document.createElement('td');

      idCell.textContent = employee.employeeNo;
      nameCell.textContent = employee.name;
      emailCell.textContent = employee.email;
      actionCell.innerHTML =
        '<button class="deleteButton" onclick="deleteRow(this)">Delete</button>';

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(actionCell);

      employeetable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
