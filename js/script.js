
// 1. PRODUCT DATABASE
const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 12.50,
        stock: 20,
        image: "image/1.jpg"
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 24.00,
        stock: 15,
        image: "image/2.jpg"
    },
    {
        id: 3,
        name: "USB Flash 64GB",
        category: "Storage",
        price: 8.75,
        stock: 29,
        image: "image/5.jpg"
    },
    {
        id: 4,
        name: "SSD 1TB NVMe",
        category: "Storage",
        price: 59.00,
        stock: 10,
        image: "image/3.jpg"
    },
    {
        id: 5,
        name: "Gaming Headset",
        category: "Audio",
        price: 35.00,
        stock: 12,
        image: "image/4.jpg"
    },
    {
        id: 6,
        name: "Webcam HD",
        category: "Accessories",
        price: 28.00,
        stock: 18,
        image: "image/12.jpg"
    },
    {
        id: 7,
        name: "Monitor 24 inch",
        category: "Display",
        price: 120.00,
        stock: 8,
        image: "image/6.jpg"
    },
    {
        id: 8,
        name: "Gaming Laptop",
        category: "Laptop",
        price: 750.00,
        stock: 5,
        image: "image/7.jpg"
    },
    {
        id: 9,
        name: "Wireless Headphones",
        category: "Audio",
        price: 45.00,
        stock: 14,
        image: "image/8.jpg"
    },
    {
        id: 10,
        name: "USB-C Hub",
        category: "Accessories",
        price: 19.00,
        stock: 25,
        image: "image/9.jpg"
    },
    {
        id: 11,
        name: "Gaming Monitor",
        category: "Display",
        price: 180.00,
        stock: 7,
        image: "image/10.jpg"
    },
    {
        id: 12,
        name: "Office Laptop",
        category: "Laptop",
        price: 550.00,
        stock: 9,
        image: "image/11.jpg"
    }
];

// 2. VARIABLES
let cart = [];
let discountPercent = 0;
const VAT_RATE = 0.10;
const EXCHANGE_RATE = 4100;
let selectedDeliveryFee = 1.50;
// 3. DISPLAY PRODUCTS
const productList = document.getElementById("productList");
function displayProducts(productArray) {
    productList.innerHTML = "";
    productArray.forEach(product => {
        productList.innerHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 shadow-sm product-card">
                    <img
                        src="${product.image}"
                        class="card-img-top p-3"
                        style="height:200px; object-fit:contain;"
                        alt="${product.name}"
                        onerror="this.onerror=null; this.src='image/1.jpg';"
                    >
                    <div class="card-body text-center">
                        <span class="badge bg-secondary">
                            ${product.category}
                        </span>
                        <h5 class="mt-3">
                            ${product.name}
                        </h5>
                        <h4 class="text-success">
                            $${product.price.toFixed(2)}
                        </h4>
                        <p class="text-muted">
                            In stock: ${product.stock}
                        </p>
                        <button
                            class="btn btn-primary w-100"
                            onclick="addToCart(${product.id})"
                            ${product.stock === 0 ? "disabled" : ""}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}
displayProducts(products);
// 4. ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        if (cartItem.quantity >= product.stock) {
            alert("Not enough stock!");
            return;
        }
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    updateCart();
}
// 5. INCREASE QUANTITY
function increaseQuantity(id) {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    if (item.quantity < item.stock) {
        item.quantity++;
    } else {
        alert("Maximum stock reached!");
    }
    updateCart();
}
// 6. DECREASE QUANTITY
function decreaseQuantity(id) {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(id);
        return;
    }
    updateCart();
}
// 7. REMOVE PRODUCT
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
// 8. CLEAR CART
function clearCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
    }
    if (confirm("Are you sure you want to clear cart?")) {
        cart = [];
        discountPercent = 0;
        updateCart();
        alert("All products removed from cart!");
    }
}
// 9. UPDATE CART
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    if (!cartItems) return;
    cartItems.innerHTML = "";
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
        cartItems.innerHTML += `
            <div class="d-flex align-items-center gap-2 border-bottom py-3">
                <!-- PRODUCT IMAGE -->
                <img
                    src="${item.image}"
                    width="65"
                    height="65"
                    style="object-fit:contain;"
                    alt="${item.name}"
                    onerror="this.onerror=null; this.src='image/1.jpg';"
                >
                <!-- PRODUCT INFORMATION -->
                <div class="flex-grow-1">
                    <h6 class="mb-1">
                        ${item.name}
                    </h6>
                    <small class="text-muted">
                        $${item.price.toFixed(2)} each
                    </small>

                </div>
                <!-- QUANTITY BUTTONS -->

                <div class="d-flex align-items-center gap-2">

                    <button
                        class="btn btn-outline-secondary btn-sm"
                        onclick="decreaseQuantity(${item.id})">
                        −
                    </button>
                    <span>
                        ${item.quantity}
                    </span>
                    <button
                        class="btn btn-outline-secondary btn-sm"
                        onclick="increaseQuantity(${item.id})">
                        +
                    </button>
                </div>

                <!-- PRICE AND REMOVE -->
                <div class="text-end ms-2">
                    <strong>
                        $${(item.price * item.quantity).toFixed(2)}
                    </strong>
                    <br>
                    <button
                        class="btn btn-link text-danger p-0"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    // EMPTY CART MESSAGE

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="text-center text-muted py-4">

                Your cart is empty.

            </p>

        `;
    }


    // UPDATE CART COUNT

    if (cartCount) {

        cartCount.innerText = totalQuantity;
    }

    calculateTotal();
}


// ==========================================
// 10. CALCULATE TOTAL
// ==========================================

function calculateTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const discount = subtotal * discountPercent;
    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * VAT_RATE;
    const delivery = subtotal > 0 ? selectedDeliveryFee : 0;
    const total = afterDiscount + vat + delivery;
    const totalRiel = Math.round(total * EXCHANGE_RATE);

    document.getElementById("subtotal").innerText =
        "$" + subtotal.toFixed(2);

    document.getElementById("discount").innerText =
        "-$" + discount.toFixed(2);

    document.getElementById("vat").innerText =
        "$" + vat.toFixed(2);

    document.getElementById("delivery").innerText =
        "$" + delivery.toFixed(2);

    document.getElementById("total").innerText =
        "$" + total.toFixed(2);

    document.getElementById("totalRiel").innerText =
        totalRiel.toLocaleString("en-US") + " ៛";
}
// 11. APPLY COUPON
function applyCoupon() {
    const couponInput = document.getElementById("couponInput");
    const code = couponInput.value.trim().toUpperCase();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    if (code === "SAVE10") {
        discountPercent = 0.10;
        alert("Coupon applied! 10% discount.");
    } else if (code === "") {
        alert("Please enter coupon code.");
        return;
    } else {
        alert("Invalid coupon code!");
        return;
    }
    calculateTotal();
}
// 12. DELIVERY LOCATION
function changeDelivery() {
    const deliverySelect =
        document.getElementById("deliverySelect");
    selectedDeliveryFee = Number(deliverySelect.value);
    calculateTotal();
}
// 13. CHECKOUT
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Checkout successful! Thank you for shopping.");

}
// 14. SEARCH PRODUCTS
function searchProducts() {
    const keyword = document.getElementById("searchInput")
        .value.toLowerCase().trim();
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(keyword) ||
               product.category.toLowerCase().includes(keyword);

    });

    displayProducts(filteredProducts);
}
// 15. CATEGORY FILTER
function filterCategory(category) {
    let filteredProducts;
    if (category === "All") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product =>
            product.category === category
        );
    }
    displayProducts(filteredProducts);
}
// 16. CONNECT BUTTONS
// Clear Cart Button
document.getElementById("clearCartBtn")
    .addEventListener("click", clearCart);
// Checkout Button
document.getElementById("checkoutBtn")
    .addEventListener("click", checkout);
// Apply Coupon Button
document.getElementById("applyCoupon")
    .addEventListener("click", applyCoupon);
// Delivery Selection
document.getElementById("deliverySelect")
    .addEventListener("change", changeDelivery);
// Search Input
document.getElementById("searchInput")
    .addEventListener("input", searchProducts);
// Category Buttons
document.querySelectorAll(".category-btn")
    .forEach(button => {
        button.addEventListener("click", function () {
            const category = this.dataset.category;
            filterCategory(category);
        });

    });
updateCart();
