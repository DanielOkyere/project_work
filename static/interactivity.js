<<<<<<< HEAD
const showtables = document.getElementById('showTables');
const tablesDropDown = document.getElementById('buttonDropDown');
const iframe = document.getElementById('pageFrame');

const dashboard = document.getElementById('dashboard');
const products = document.getElementById('products');
const productCategories = document.getElementById('productCategories');
const purchaseOrders = document.getElementById('purchaseOrders');
const suppliers = document.getElementById('suppliers');
const transactions = document.getElementById('transactions');
const employees = document.getElementById('employees');
const activities = document.getElementById('activities');

// event listeners
showtables.addEventListener('click', function () {
=======
const tables = document.getElementById('showTables');
const tablesDropDown = document.getElementById('buttonDropDown');
const iframe = document.getElementById('pageFrame');
const inventory = document.getElementById('inventory');

tables.addEventListener('click', function () {
>>>>>>> 23b11b4 (designing ui)
  if (tablesDropDown.style.display === 'none') {
    tablesDropDown.style.display = 'flex';
  } else {
    tablesDropDown.style.display = 'none';
  }
});

<<<<<<< HEAD
dashboard.addEventListener('click', () => {
  loadHTMLPage('/dashboard');
});
products.addEventListener('click', () => {
  loadHTMLPage('/products');
});
productCategories.addEventListener('click', () => {
  loadHTMLPage('/productCategories');
});
purchaseOrders.addEventListener('click', () => {
  loadHTMLPage('/purchaseOrders');
});
suppliers.addEventListener('click', () => {
  loadHTMLPage('/suppliers');
});
transactions.addEventListener('click', () => {
  loadHTMLPage('/transactions');
});
employees.addEventListener('click', () => {
  loadHTMLPage('/employees');
});
activities.addEventListener('click', () => {
  loadHTMLPage('/activities');
});

// functions
=======
inventory.addEventListener('click', () => {
  loadHTMLPage('/dashboard');
});

>>>>>>> 23b11b4 (designing ui)
function loadHTMLPage(url) {
  iframe.src = url;
}
