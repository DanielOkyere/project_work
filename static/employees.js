const addEmployee = document.getElementById('addEmployee');
const employeetable = document.getElementById('employeetable');

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
        console.log(xhr.responseText);
      } else {
        console.error(xhr.status);
      }
    }
  };
  xhr.send(JSON.stringify(data));
});
