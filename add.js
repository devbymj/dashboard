document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
    const category = document.getElementById("category").value.trim();

    // Get existing products or start empty
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Create new product with unique ID
    const newProduct = {
        id: Date.now(),
        name,
        price,
        stock,
        category
    };

    // Add to products list
    products.push(newProduct);

    // Save back to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Show success
    document.getElementById("message").classList.remove("hidden");

    // Reset form
    e.target.reset();
});
