/* ==========================================
   SHOPPING CART
   ========================================== */


/* GET CART */

function getCart() {

    return JSON.parse(
        localStorage.getItem(
            "homefeast_cart"
        ) || "[]"
    );

}


/* SAVE CART */

function saveCart(cart) {

    localStorage.setItem(
        "homefeast_cart",
        JSON.stringify(cart)
    );

}


/* SUBTOTAL */

function cartSubtotal() {

    return getCart().reduce(

        function (total, item) {

            return total +
                item.price *
                item.quantity;

        },

        0

    );

}


/* RENDER CART */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (!container) return;


    const cart =
        getCart();


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="cart-empty">

                <div style="font-size:50px">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p class="muted">
                    Add some delicious homemade food first.
                </p>

                <a
                    href="menu.html"
                    class="btn btn-primary mt-20">

                    Browse Menu

                </a>

            </div>

        `;


        updateCartTotals();

        return;

    }


    container.innerHTML =

        cart.map(
            item => `

            <div class="cart-item">

                <div class="cart-item-image">

                    ${escapeHtml(
                        item.emoji
                    )}

                </div>


                <div>

                    <h3>

                        ${escapeHtml(
                            item.name
                        )}

                    </h3>


                    <p class="muted">

                        ${formatCurrency(
                            item.price
                        )}

                        each

                    </p>


                    <div class="qty-control">

                        <button
                            onclick="changeQuantity(
                                ${item.foodId},
                                -1
                            )">

                            −

                        </button>


                        <strong>

                            ${item.quantity}

                        </strong>


                        <button
                            onclick="changeQuantity(
                                ${item.foodId},
                                1
                            )">

                            +

                        </button>

                    </div>

                </div>


                <div>

                    <strong>

                        ${formatCurrency(
                            item.price *
                            item.quantity
                        )}

                    </strong>


                    <br>


                    <button
                        class="btn btn-danger btn-small mt-20"
                        onclick="removeFromCart(
                            ${item.foodId}
                        )">

                        Remove

                    </button>

                </div>

            </div>

        `
        ).join("");


    updateCartTotals();

}


/* CHANGE QUANTITY */

function changeQuantity(
    foodId,
    amount
) {

    const cart =
        getCart();


    const item =
        cart.find(
            item =>
                item.foodId ===
                Number(foodId)
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        saveCart(
            cart.filter(
                item =>
                    item.foodId !==
                    Number(foodId)
            )
        );

    } else {

        saveCart(cart);

    }


    renderCart();

}


/* REMOVE */

function removeFromCart(foodId) {

    saveCart(

        getCart().filter(
            item =>
                item.foodId !==
                Number(foodId)
        )

    );


    renderCart();

}


/* UPDATE TOTALS */

function updateCartTotals() {

    const subtotal =
        cartSubtotal();


    const delivery =
        subtotal > 0
            ? 40
            : 0;


    const total =
        subtotal +
        delivery;


    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "deliveryFee"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatCurrency(subtotal);

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            formatCurrency(delivery);

    }


    if (totalElement) {

        totalElement.textContent =
            formatCurrency(total);

    }


    const checkoutButton =
        document.getElementById(
            "checkoutBtn"
        );


    if (checkoutButton) {

        checkoutButton.style.pointerEvents =
            subtotal === 0
                ? "none"
                : "auto";


        checkoutButton.style.opacity =
            subtotal === 0
                ? ".5"
                : "1";

    }

}


/* CHECKOUT ITEMS */

function renderCheckout() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    if (!container) return;


    const cart =
        getCart();


    const total =
        cartSubtotal() +
        (cart.length ? 40 : 0);


    if (cart.length) {

        container.innerHTML =

            cart.map(
                item => `

                <div class="summary-row">

                    <span>

                        ${escapeHtml(
                            item.name
                        )}

                        ×

                        ${item.quantity}

                    </span>


                    <strong>

                        ${formatCurrency(
                            item.price *
                            item.quantity
                        )}

                    </strong>

                </div>

            `
            ).join("");

    } else {

        container.innerHTML = `

            <p class="muted">
                Your cart is empty.
            </p>

        `;

    }


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            formatCurrency(total);

    }

}


/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCart();

        renderCheckout();

    }
);