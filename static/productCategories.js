const productCategoryTable = document.getElementById('productCategoryTable');
const pctable = document.getElementById('pctable');

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

const form = document.getElementById('productCategoryForm');

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
  xhr.open('POST', '/category');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        form.reset();
        alert('successfully added');
      } else {
        console.error(xhr.status);
      }
    }
  };
  console.log(JSON.stringify(data));
  xhr.send(JSON.stringify(data));
});

fetch('/category')
  .then((response) => response.json())
  .then((data) => {
    let productCategories = data.data;
    productCategories.forEach((productCategory) => {
      console.log(productCategory);
      // const div = document.createElement('div');
      // div.innerHTML = employee.name;
      // etable.appendChild(div);

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const categoryDescriptionCell = document.createElement('td');
      const actionCell = document.createElement('td');

      idCell.textContent = productCategory.categoryNo;
      categoryDescriptionCell.textContent = productCategory.categoryDesc;
      actionCell.innerHTML =
        '<button class="deleteButton" onclick="deleteRow(this)">Delete</button>';

      row.appendChild(idCell);
      row.appendChild(categoryDescriptionCell);
      row.appendChild(actionCell);

      productCategoryTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
