const productCategoryTable = document.getElementById('productCategoryTable');
const pctable = document.getElementById('pctable');

function deleteRow(categoryNo) {
  var ID = categoryNo.getAttribute('data-id');
  console.log(ID);
  if (confirm('Are you sure you want to delete this entry?')) {
    // this.submit();
    // row.parentNode.removeChild(row);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/category', true);
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
    xhr.send(JSON.stringify({ categoryNo: ID }));
  }
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
        window.location.reload();
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
      const deleteCell = document.createElement('td');
      const updateCell = document.createElement('td');

      idCell.textContent = productCategory.categoryNo;
      categoryDescriptionCell.textContent = productCategory.categoryDesc;
      deleteCell.innerHTML =
        '<button class="deletebutton" onclick="deleteRow(this)" data-ID="' +
        productCategory.categoryNo +
        '">Delete</button>';
      updateCell.innerHTML =
        '<button class="updatebutton" onclick="">Update</button>';

      row.appendChild(idCell);
      row.appendChild(categoryDescriptionCell);
      row.appendChild(updateCell);
      row.appendChild(deleteCell);

      productCategoryTable.querySelector('tbody').appendChild(row);
    });
  })
  .catch((error) => console.error(error));
