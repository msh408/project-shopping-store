const apiURL = "https://fakestoreapi.com/products";

class Store {

    constructor() {

        this.products = [];
        this.cart = [];

        this.selectors = {

            products: document.querySelector(".products"),

            cartOverlay: document.querySelector(".cart-overlay"),

            cart: document.querySelector(".cart"),

            cartBody: document.querySelector(".cart-body"),

            cartTotal: document.querySelector(".cart-total"),

            cartClear: document.querySelector(".cart-clear"),

            checkOut: document.querySelector(".check-out"),

            cartBtn: document.querySelector(".cart-btn"),

            cartQty: document.querySelector(".cart-qty"),

            cartClose: document.querySelector(".cart-close"),

            loginBtn: document.querySelector(".login-btn")

        };

        this.init();

    }

    /* ==========================
        INITIALIZE
    ========================== */

    init() {

        this.loadCart();

        this.addEvents();

        this.loadProducts();

    }

    /* ==========================
        EVENTS
    ========================== */

    addEvents() {

        this.selectors.products.addEventListener(

            "click",

            (e) => this.addToCart(e)

        );

        this.selectors.cartBtn.addEventListener(

            "click",

            () => this.showCart()

        );

        this.selectors.cartClose.addEventListener(

            "click",

            () => this.hideCart()

        );

        this.selectors.cartOverlay.addEventListener(

            "click",

            (e) => {

                if (e.target === this.selectors.cartOverlay) {

                    this.hideCart();

                }

            }

        );

        this.selectors.cartBody.addEventListener(

            "click",

            (e) => this.updateCart(e)

        );

        this.selectors.cartClear.addEventListener(

            "click",

            () => this.clearCart()

        );

        if (this.selectors.loginBtn) {

            this.selectors.loginBtn.addEventListener(

                "click",

                () => {

                    window.location.href = "./component/auth.html";

                }

            );

        }

    }

    /* ==========================
        SHOW / HIDE CART
    ========================== */

    showCart() {

        this.selectors.cart.classList.add("show");

        this.selectors.cartOverlay.classList.add("show");

    }

    hideCart() {

        this.selectors.cart.classList.remove("show");

        this.selectors.cartOverlay.classList.remove("show");

    }

/* ==========================
    LOCAL STORAGE
========================== */

saveCart() {

    localStorage.setItem(

        "online-store",

        JSON.stringify(this.cart)

    );

}

loadCart() {

    this.cart = JSON.parse(

        localStorage.getItem("online-store")

    ) || [];

}

/* ==========================
    LOAD PRODUCTS
========================== */

async loadProducts() {

    try {

        const response = await fetch(apiURL);

        if (!response.ok) {

            throw new Error(`HTTP Error : ${response.status}`);

        }

        this.products = await response.json();

        this.renderProducts();

        this.renderCart();

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================
    ADD TO CART
========================== */

addToCart(e) {

    const button = e.target.closest("[data-id]");

    if (!button) return;

    const id = Number(button.dataset.id);

    const exist = this.cart.find(item => item.id === id);

    if (exist) {

        alert("Product already exists in cart.");

        return;

    }

    this.cart.push({

        id,

        qty: 1

    });

    this.saveCart();

    this.renderProducts();

    this.renderCart();

    this.showCart();

}

/* ==========================
    REMOVE PRODUCT
========================== */

removeFromCart(id) {

    this.cart = this.cart.filter(

        item => item.id !== id

    );

    this.saveCart();

    this.renderProducts();

    this.renderCart();

}

/* ==========================
    INCREASE
========================== */

increaseQty(id) {

    const item = this.cart.find(

        item => item.id === id

    );

    if (!item) return;

    item.qty++;

    this.saveCart();

    this.renderCart();

}

/* ==========================
    DECREASE
========================== */

decreaseQty(id) {

    const item = this.cart.find(

        item => item.id === id

    );

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {

        this.removeFromCart(id);

        return;

    }

    this.saveCart();

    this.renderCart();

}

/* ==========================
    UPDATE CART
========================== */

updateCart(e) {

    const button = e.target.closest("[data-btn]");

    if (!button) return;

    const cartItem = button.closest(".cart-item");

    const id = Number(cartItem.dataset.id);

    switch (button.dataset.btn) {

        case "incr":

            this.increaseQty(id);

            break;

        case "decr":

            this.decreaseQty(id);

            break;

        case "remove":

            this.removeFromCart(id);

            break;

    }

}

/* ==========================
    CLEAR CART
========================== */

clearCart() {

    this.cart = [];

    this.saveCart();

    this.renderProducts();

    this.renderCart();

    this.hideCart();

}

/* ==========================
    TOTAL PRICE
========================== */

calculateTotal() {

    return this.cart.reduce((sum, item) => {

        const product = this.products.find(

            p => p.id === item.id

        );

        if (!product) return sum;

        return sum + product.price * item.qty;

    }, 0);

}
/* ==========================
    RENDER PRODUCTS
========================== */

renderProducts() {

    this.selectors.products.innerHTML = this.products
        .map(product => {

            const { id, title, image, price } = product;

            const inCart = this.cart.find(item => item.id === id);

            return `
                <div class="product">

                    <img src="${image}" alt="${title}">

                    <div class="product-body">

                        <h3>${title}</h3>

                        <div class="price">
                            <span>${price.format()}</span>
                        </div>

                        <button
                            class="buy-btn"
                            data-id="${id}"
                            ${inCart ? "disabled" : ""}
                        >
                            ${inCart ? "Added To Cart" : "Add To Cart"}
                        </button>

                    </div>

                </div>
            `;

        })
        .join("");

}

/* ==========================
    RENDER CART
========================== */

renderCart() {

    const qty = this.cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    this.selectors.cartQty.textContent = qty;

    this.selectors.cartTotal.textContent =
        this.calculateTotal().format();

    if (this.cart.length === 0) {

        this.selectors.cartBody.innerHTML = `
            <div class="cart-empty">
                Your cart is empty
            </div>
        `;

        return;

    }

    this.selectors.cartBody.innerHTML = this.cart
        .map(item => {

            const product = this.products.find(
                p => p.id === item.id
            );

            if (!product) return "";

            const amount = product.price * item.qty;

            return `

                <div class="cart-item" data-id="${item.id}">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                    <div class="cart-info">

                        <h4>${product.title}</h4>

                        <p>
                            ${product.price.format()}
                            ×
                            ${item.qty}
                        </p>

                        <strong>
                            ${amount.format()}
                        </strong>

                    </div>

                    <div class="cart-actions">

                        <i
                            class="bi bi-plus-lg"
                            data-btn="incr"
                        ></i>

                        <span>${item.qty}</span>

                        <i
                            class="bi bi-dash-lg"
                            data-btn="decr"
                        ></i>

                        <i
                            class="bi bi-trash"
                            data-btn="remove"
                        ></i>

                    </div>

                </div>

            `;

        })
        .join("");

}}

/* ==========================
    PRICE FORMAT
========================== */



Number.prototype.format = function () {

    return this.toLocaleString("en-US", {

        style: "currency",

        currency: "USD"

    });

};

/* ==========================
    START STORE
========================== */

new Store();