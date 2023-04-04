const tables = document.getElementById('showTables');
const tablesDropDown = document.getElementById('buttonDropDown');
const iframe = document.getElementById('pageFrame');
const inventory = document.getElementById('inventory');

tables.addEventListener('click', function () {
  if (tablesDropDown.style.display === 'none') {
    tablesDropDown.style.display = 'flex';
  } else {
    tablesDropDown.style.display = 'none';
  }
});

inventory.addEventListener('click', () => {
  loadHTMLPage('/dashboard');
});

function loadHTMLPage(url) {
  iframe.src = url;
}
