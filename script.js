// script.js

document.getElementById('addProduct').addEventListener('click', addProduct);
document.getElementById('resetTable').addEventListener('click', resetTable);

const conversionRates = {
    'ml': 1,
    'L': 1000,
    'gr': 1,
    'Kg': 1000
};

function addProduct() {
    const name = document.getElementById('productName').value;
    const cost = parseFloat(document.getElementById('productCost').value);
    const quantity = parseFloat(document.getElementById('productQuantity').value);
    const unit = document.getElementById('quantityUnit').value;

    if (name === '' || isNaN(cost) || isNaN(quantity)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    const convertedQuantity = quantity * conversionRates[unit];
    const pricePerUnit = cost / convertedQuantity;

    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>$${cost.toFixed(2)}</td>
        <td>${quantity} ${unit}</td>
        <td>$${pricePerUnit.toFixed(2)}</td>
        <td><button class="delete-btn" onclick="deleteProduct(this)">Eliminar</button></td>
    `;

    sortTable();
}

function sortTable() {
    const table = document.getElementById('productTable');
    const rows = Array.from(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

    rows.sort((rowA, rowB) => {
        const priceA = parseFloat(rowA.cells[3].innerText.replace('$', ''));
        const priceB = parseFloat(rowB.cells[3].innerText.replace('$', ''));
        return priceA - priceB;
    });

    const tbody = table.getElementsByTagName('tbody')[0];
    rows.forEach(row => tbody.appendChild(row));
}

function resetTable() {
    const tbody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
}

function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
