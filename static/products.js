const productTable = document.getElementById('productTable');
const ptable = document.getElementById('ptable');

function deleteRow(product) {
  var ID = product.getAttribute('data-id');
  console.log(ID);
  if (confirm('Are you sure you want to delete this entry?')) {
    // this.submit();
    // row.parentNode.removeChild(row);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/product', true);
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
    xhr.send(JSON.stringify({ productNo: ID }));
  }
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
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = product.id;
      productNameCell.textContent = product.name;
      serialNoCell.textContent = product.serialNo;
      unitPriceCell.textContent = product.unitPrice;
      quantityOnHandCell.textContent = product.quantityOnHand;
      reorderLevelCell.textContent = product.reorderLevel;
      reorderQuantityCell.textContent = product.reorderQuantity;
      reorderLeadTimeCell.textContent = product.reorderLeadTime;
      categoryNoCell.textContent = product.categoryNo;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)" data-ID="' +
        product.id +
        '">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(productNameCell);
      row.appendChild(serialNoCell);
      row.appendChild(unitPriceCell);
      row.appendChild(quantityOnHandCell);
      row.appendChild(reorderLevelCell);
      row.appendChild(reorderQuantityCell);
      row.appendChild(reorderLeadTimeCell);
      row.appendChild(categoryNoCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      productTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
