const transactionTable = document.getElementById('transactionTable');
const ttable = document.getElementById('ttable');

function deleteRow(transaction) {
  var ID = transaction.getAttribute('data-id');
  console.log(ID);
  if (confirm('Are you sure you want to delete this entry?')) {
    // this.submit();
    // row.parentNode.removeChild(row);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/transaction', true);
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
    xhr.send(JSON.stringify({ transactionNo: ID }));
  }
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

fetch('/transaction')
  .then((response) => response.json())
  .then((data) => {
    let transactions = data.data;
    transactions.forEach((transaction) => {
      console.log(transaction);
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
      const purchaseOrderNoCell = document.createElement('td');
      const productNoCell = document.createElement('td');
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = transaction.transactionNo;
      transactionDateCell.textContent = transaction.transactionDate;
      transactionDescriptionCell.textContent =
        transaction.transactionDescription;
      unitPriceCell.textContent = transaction.unitPrice;
      unitsOrderedCell.textContent = transaction.unitsOrdered;
      unitsReceivedCell.textContent = transaction.unitsReceived;
      unitsSoldCell.textContent = transaction.unitsSold;
      unitsWastedCell.textContent = transaction.unitsWastage;
      purchaseOrderNoCell.textContent = transaction.purchaseOrder;
      productNoCell.textContent = transaction.productNo;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)" data-ID="' +
        transaction.transactionNo +
        '">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(transactionDateCell);
      row.appendChild(transactionDescriptionCell);
      row.appendChild(unitPriceCell);
      row.appendChild(unitsOrderedCell);
      row.appendChild(unitsReceivedCell);
      row.appendChild(unitsSoldCell);
      row.appendChild(unitsWastedCell);
      row.appendChild(purchaseOrderNoCell);
      row.appendChild(productNoCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      transactionTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
