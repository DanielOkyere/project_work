const showtables = document.getElementById('showTables');
const tablesDropDown = document.getElementById('buttonDropDown');
const iframe = document.getElementById('pageFrame');

const dashboard = document.getElementById('dashboard');
const products = document.getElementById('products');
const productCategories = document.getElementById('productCategories');
const purchaseOrders = document.getElementById('purchaseOrders');
const suppliers = document.getElementById('suppliers');
const transactions = document.getElementById('transactions');

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

// functions
function loadHTMLPage(url) {
  iframe.src = url;
}
