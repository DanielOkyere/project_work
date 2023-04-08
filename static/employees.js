const addEmployee = document.getElementById('addEmployee');
const employeetable = document.getElementById('employeetable');
const etable = document.getElementById('etable');

function deleteRow(employee) {
  var ID = employee.getAttribute('data-id');
  console.log(ID);
  if (confirm('Are you sure you want to delete this entry?')) {
    // this.submit();
    // row.parentNode.removeChild(row);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/employee', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          alert('Failed to delete entry.');
        } else {
          alert('successfully deleted');
          window.location.reload();
        }
      }
    };
    xhr.send(JSON.stringify({ employeeNo: ID }));
  }
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
        alert('successfully added');
        window.location.reload();
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
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = employee.employeeNo;
      nameCell.textContent = employee.name;
      emailCell.textContent = employee.email;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)" data-ID="' +
        employee.employeeNo +
        '">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      employeetable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
