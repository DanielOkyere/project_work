const purchaseOrderTable = document.getElementById('purchaseOrderTable');
const ptable = document.getElementById('pctable');

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const form = document.getElementById('purchaseOrderForm');

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
  xhr.open('POST', '/order');
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

fetch('/order')
  .then((response) => response.json())
  .then((data) => {
    let purchaseOrders = data.data;
    purchaseOrders.forEach((purchaseOrder) => {
      console.log(purchaseOrder);
      // const div = document.createElement('div');
      // div.innerHTML = employee.name;
      // etable.appendChild(div);

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const purchaseOrderDescriptionCell = document.createElement('td');
      const orderDateCell = document.createElement('td');
      const dateRequiredCell = document.createElement('td');
      const shippedDateCell = document.createElement('td');
      const freightChargeCell = document.createElement('td');
      const supplierNoCell = document.createElement('td');
      const employeeNoCell = document.createElement('td');
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = purchaseOrder.purchaseOrderNo;
      purchaseOrderDescriptionCell.textContent =
        purchaseOrder.purchaseOrderDesc;
      orderDateCell.textContent = purchaseOrder.orderDate;
      dateRequiredCell.textContent = purchaseOrder.dateRequired;
      shippedDateCell.textContent = purchaseOrder.shippedDate;
      freightChargeCell.textContent = purchaseOrder.freightCharge;
      supplierNoCell.textContent = purchaseOrder.supplierNo;
      employeeNoCell.textContent = purchaseOrder.employeeNo;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(purchaseOrderDescriptionCell);
      row.appendChild(orderDateCell);
      row.appendChild(dateRequiredCell);
      row.appendChild(shippedDateCell);
      row.appendChild(freightChargeCell);
      row.appendChild(supplierNoCell);
      row.appendChild(employeeNoCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      purchaseOrderTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
