async function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
        const res = await fetch("products.json");
        products = await res.json();
        localStorage.setItem("products", JSON.stringify(products));
    }
    return products;
}

function renderDashboard(products) {

    document.getElementById("totalProducts").textContent = products.length;
    let totalStock = 0;
    for (let i = 0; i < products.length; i++) {
        totalStock += products[i].stock;
        console.log(totalStock)
    }
    document.getElementById("totalStock").textContent = totalStock;
    let categories = [];
    for (let i = 0; i < products.length; i++) {
        if (!categories.includes(products[i].category)) {
            categories.push(products[i].category);
        }
        console.log(categories)
    }
    document.getElementById("totalCategories").textContent = categories.length;


    const tableBody = document.getElementById("productTable");
    tableBody.innerHTML = products.map(p => `
            <tr class="border-t border-gray-700">
                <td class="py-2">${p.name}</td>
                <td class="py-2">R${p.price}</td>
                <td class="py-2">${p.stock}</td>
                <td class="py-2">${p.category}</td>
            </tr>
        `).join("");


    const ctx = document.getElementById("stockChart").getContext("2d");
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: 'Stock',
                data: products.map(p => p.stock),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
     options: {
        responsive: false,
        maintainAspectRatio: false
    }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const products = await loadProducts();
    renderDashboard(products);
});


