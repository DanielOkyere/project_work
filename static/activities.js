const activitiesTable = document.getElementById('activitiesTable');
const atable = document.getElementById('atable');

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const form = document.getElementById('activitiesForm');

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
  xhr.open('POST', '/activity');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        form.reset();
        alert('successfully added');
        window.location.reload();
      } else {
        console.error(xhr.status);
      }
    }
  };
  console.log(JSON.stringify(data));
  xhr.send(JSON.stringify(data));
});

fetch('/activity')
  .then((response) => response.json())
  .then((data) => {
    let activities = data.data;
    activities.forEach((activity) => {
      console.log(activity);
      // const div = document.createElement('div');
      // div.innerHTML = employee.name;
      // etable.appendChild(div);

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const activityNameCell = document.createElement('td');
      const activityDescriptionCell = document.createElement('td');
      const activityDateCell = document.createElement('td');
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = activity.idNo;
      activityNameCell.textContent = activity.name;
      activityDescriptionCell.textContent = activity.description;
      activityDateCell.textContent = activity.date;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(activityNameCell);
      row.appendChild(activityDescriptionCell);
      row.appendChild(activityDateCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      activitiesTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
