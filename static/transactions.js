const transactionTable = document.getElementById('transactionTable');
const ttable = document.getElementById('ttable');

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const form = document.getElementById('transactionForm');

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
  xhr.open('POST', '/transaction');
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

fetch('/transaction')
  .then((response) => response.json())
  .then((data) => {
    let products = data.data;
    products.forEach((product) => {
      console.log(product);
      // const div = document.createElement('div');
      // div.innerHTML = employee.name;
      // etable.appendChild(div);

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const transactionDateCell = document.createElement('td');
      const transactionDescriptionCell = document.createElement('td');
      const unitPriceCell = document.createElement('td');
      const unitsOrderedCell = document.createElement('td');
      const unitsReceivedCell = document.createElement('td');
      const unitsSoldCell = document.createElement('td');
      const unitsWastedCell = document.createElement('td');
      const productNoCell = document.createElement('td');
      const purchaseOrderNoCell = document.createElement('td');
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
      row.appendChild(transactionDateCell);
      row.appendChild(transactionDescriptionCell);
      row.appendChild(unitPriceCell);
      row.appendChild(unitsOrderedCell);
      row.appendChild(unitsReceivedCell);
      row.appendChild(unitsSoldCell);
      row.appendChild(unitsWastedCell);
      row.appendChild(productNoCell);
      row.appendChild(purchaseOrderNoCell);
      row.appendChild(actionCell);

      transactionTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
