const supplierTable = document.getElementById('supplierTable');
const ttable = document.getElementById('stable');

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
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
      const contactTelNo = document.createElement('td');
      const contactFaxNo = document.createElement('td');
      const contactEmail = document.createElement('td');
      const paymentTerms = document.createElement('td');
      const actionCell = document.createElement('td');

      idCell.textContent = product.id;
      transactionDateCell.textContent = product.name;
      transactionDescriptionCell.textContent = product.serialNo;
      unitPriceCell.textContent = product.unitPrice;
      unitsOrderedCell.textContent = product.quantityOnHand;
      unitsReceivedCell.textContent = product.reorderlevel;
      unitsSoldCell.textContent = product.reorderQuantity;
      unitsWastedCell.textContent = product.reorderLeadTimeCell;
      productNoCell.textContent = product.categoryNo;
      purchaseOrderNoCell.textContent = product.categoryNo;
      actionCell.innerHTML =
        '<button class="deleteButton" onclick="deleteRow(this)">Delete</button>';

      row.appendChild(idCell);
      row.appendChild(supplierNameCell);
      row.appendChild(supplierStreetCell);
      row.appendChild(supplierCityCell);
      row.appendChild(supplierStateCell);
      row.appendChild(supplierZipCodeCell);
      row.appendChild(supplierTelNoCell);
      row.appendChild(supplierFaxNoCell);
      row.appendChild(supplierEmailCell);
      row.appendChild(supplierWebAddressCell);
      row.appendChild(contactNameCell);
      row.appendChild(contactTelNo);
      row.appendChild(contactFaxNo);
      row.appendChild(contactEmail);
      row.appendChild(paymentTerms);
      row.appendChild(actionCell);

      supplierTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
