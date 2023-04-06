const productTable = document.getElementById('productTable');
const ptable = document.getElementById('ptable');

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const form = document.getElementById('productForm');

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
  xhr.open('POST', '/product');
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

fetch('/product')
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
      const productNameCell = document.createElement('td');
      const serialNoCell = document.createElement('td');
      const unitPriceCell = document.createElement('td');
      const quantityOnHandCell = document.createElement('td');
      const reorderLevelCell = document.createElement('td');
      const reorderQuantityCell = document.createElement('td');
      const reorderLeadTimeCell = document.createElement('td');
      const categoryNoCell = document.createElement('td');
      const actionCell = document.createElement('td');

      idCell.textContent = product.id;
      productNameCell.textContent = product.name;
      serialNoCell.textContent = product.serialNo;
      unitPriceCell.textContent = product.unitPrice;
      quantityOnHandCell.textContent = product.quantityOnHand;
      reorderLevelCell.textContent = product.reorderlevel;
      reorderQuantityCell.textContent = product.reorderQuantity;
      reorderLeadTimeCell.textContent = product.reorderLeadTimeCell;
      categoryNoCell.textContent = product.categoryNo;
      actionCell.innerHTML =
        '<button class="deleteButton" onclick="deleteRow(this)">Delete</button>';

      row.appendChild(idCell);
      row.appendChild(productNameCell);
      row.appendChild(serialNoCell);
      row.appendChild(unitPriceCell);
      row.appendChild(quantityOnHandCell);
      row.appendChild(reorderLevelCell);
      row.appendChild(reorderQuantityCell);
      row.appendChild(reorderLeadTimeCell);
      row.appendChild(categoryNoCell);
      row.appendChild(actionCell);

      productTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));