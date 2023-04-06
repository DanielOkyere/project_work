const tables = document.getElementById('showTables');

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
  if (tablesDropDown.style.display === 'none') {
    tablesDropDown.style.display = 'flex';
  } else {
    tablesDropDown.style.display = 'none';
  }
});

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

function loadHTMLPage(url) {
  iframe.src = url;
}
