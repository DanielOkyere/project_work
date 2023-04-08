const supplierTable = document.getElementById('supplierTable');
const ttable = document.getElementById('stable');

function deleteRow(supplier) {
  var ID = supplier.getAttribute('data-id');
  console.log(ID);
  if (confirm('Are you sure you want to delete this entry?')) {
    // this.submit();
    // row.parentNode.removeChild(row);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/supplier', true);
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
    xhr.send(JSON.stringify({ supplierNo: ID }));
  }
}

const form = document.getElementById('supplierForm');

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
  xhr.open('POST', '/supplier');
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

fetch('/supplier')
  .then((response) => response.json())
  .then((data) => {
    let suppliers = data.data;
    suppliers.forEach((supplier) => {
      console.log(supplier);
      // const div = document.createElement('div');
      // div.innerHTML = employee.name;
      // etable.appendChild(div);

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const supplierNameCell = document.createElement('td');
      const supplierStreetCell = document.createElement('td');
      const supplierCityCell = document.createElement('td');
      const supplierStateCell = document.createElement('td');
      const supplierZipCodeCell = document.createElement('td');
      const supplierTelNoCell = document.createElement('td');
      const supplierFaxNoCell = document.createElement('td');
      const supplierEmailCell = document.createElement('td');
      const supplierWebAddressCell = document.createElement('td');
      const contactNameCell = document.createElement('td');
      const contactTelNoCell = document.createElement('td');
      const contactFaxNoCell = document.createElement('td');
      const contactEmailCell = document.createElement('td');
      const paymentTermsCell = document.createElement('td');
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = supplier.supplierNo;
      supplierNameCell.textContent = supplier.supplierName;
      supplierStreetCell.textContent = supplier.supplierStreet;
      supplierCityCell.textContent = supplier.supplierCity;
      supplierStateCell.textContent = supplier.supplierState;
      supplierZipCodeCell.textContent = supplier.supplierZipCode;
      supplierTelNoCell.textContent = supplier.suppTelNo;
      supplierFaxNoCell.textContent = supplier.suppFaxNo;
      supplierEmailCell.textContent = supplier.suppEmailAddress;
      // supplierWebAddressCell.textContent = supplier.suppWebAddress;
      contactNameCell.textContent = supplier.contactName;
      contactTelNoCell.textContent = supplier.contactTelNo;
      contactFaxNoCell.textContent = supplier.contactFaxNo;
      contactEmailCell.textContent = supplier.contactEmalAddress;
      paymentTermsCell.textContent = supplier.paymentTerms;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)" data-ID="' +
        supplier.supplierNo +
        '">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(supplierNameCell);
      row.appendChild(supplierStreetCell);
      row.appendChild(supplierCityCell);
      row.appendChild(supplierStateCell);
      row.appendChild(supplierZipCodeCell);
      row.appendChild(supplierTelNoCell);
      row.appendChild(supplierFaxNoCell);
      row.appendChild(supplierEmailCell);
      // row.appendChild(supplierWebAddressCell);
      row.appendChild(contactNameCell);
      row.appendChild(contactTelNoCell);
      row.appendChild(contactFaxNoCell);
      row.appendChild(contactEmailCell);
      row.appendChild(paymentTermsCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      supplierTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
