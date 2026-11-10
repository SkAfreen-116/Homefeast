/* ==========================================
   ORDERS
   ========================================== */


/* GET ORDERS */

function getOrders() {

    return JSON.parse(
        localStorage.getItem(
            "homefeast_orders"
        ) || "[]"
    );

}


/* SAVE ORDERS */

function saveOrders(orders) {

    localStorage.setItem(
        "homefeast_orders",
        JSON.stringify(orders)
    );

}


/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const checkoutForm =
            document.getElementById(
                "checkoutForm"
            );


        if (checkoutForm) {

            const user =
                getCurrentUser();


            if (user) {

                document.getElementById(
                    "customerName"
                ).value =
                    user.name;

            }


            checkoutForm.addEventListener(
                "submit",
                placeOrder
            );

        }


        renderOrders();

        renderSellerOrders();

        renderSellerStats();

    }
);


/* PLACE ORDER */

function placeOrder(event) {

    event.preventDefault();


    const cart =
        getCart();


    if (cart.length === 0) {

        showMessage(
            "checkoutMessage",
            "Your cart is empty.",
            "error"
        );

        return;

    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const order = {

        id:
            "HF" +
            Date.now()
                .toString()
                .slice(-7),

        customerName:
            document.getElementById(
                "customerName"
            ).value.trim(),

        phone:
            document.getElementById(
                "phone"
            ).value.trim(),

        address:
            document.getElementById(
                "address"
            ).value.trim(),

        city:
            document.getElementById(
                "city"
            ).value.trim(),

        pincode:
            document.getElementById(
                "pincode"
            ).value.trim(),

        payment:
            payment,

        items:
            cart,

        total:
            cartSubtotal() + 40,

        status:
            "Placed",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };


    const orders =
        getOrders();


    orders.unshift(order);


    saveOrders(orders);


    localStorage.removeItem(
        "homefeast_cart"
    );


    showMessage(
        "checkoutMessage",
        `Order ${order.id} placed successfully!`,
        "success"
    );


    setTimeout(
        function () {

            window.location.href =
                "orders.html";

        },
        800
    );

}


/* CUSTOMER ORDERS */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersList"
        );


    if (!container) return;


    const orders =
        getOrders();


    if (orders.length === 0) {

        container.innerHTML = `

            <div class="cart-empty">

                <div style="font-size:50px">
                    📦
                </div>

                <h2>
                    No orders yet
                </h2>

                <p class="muted">
                    Your placed orders will appear here.
                </p>

                <a
                    href="menu.html"
                    class="btn btn-primary mt-20">

                    Order Food

                </a>

            </div>

        `;

        return;

    }


    container.innerHTML =

        orders.map(
            order => `

            <article class="order-card">

                <div class="order-head">

                    <div>

                        <strong>
                            Order #${escapeHtml(
                                order.id
                            )}
                        </strong>

                        <div class="muted">

                            ${escapeHtml(
                                order.date
                            )}

                        </div>

                    </div>


                    <span class="status">

                        ${escapeHtml(
                            order.status
                        )}

                    </span>

                </div>


                <div style="margin-top:12px">

                    ${order.items.map(
                        item => `

                        <div class="order-item">

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
                    ).join("")}

                </div>


                <div class="order-total">

                    <span>
                        Total
                    </span>

                    <strong>

                        ${formatCurrency(
                            order.total
                        )}

                    </strong>

                </div>


                <p class="muted mt-20">

                    Delivery:

                    ${escapeHtml(
                        order.address
                    )},

                    ${escapeHtml(
                        order.city
                    )}

                    -

                    ${escapeHtml(
                        order.pincode
                    )}

                </p>

            </article>

        `
        ).join("");

}


/* SELLER ORDERS */

function renderSellerOrders() {

    const container =
        document.getElementById(
            "sellerOrders"
        );


    if (!container) return;


    const orders =
        getOrders();


    if (orders.length === 0) {

        container.innerHTML = `

            <p class="muted">

                No customer orders yet.

            </p>

        `;

        return;

    }


    container.innerHTML =

        orders.map(
            order => `

            <div class="order-card">

                <div class="order-head">

                    <div>

                        <strong>
                            #${escapeHtml(
                                order.id
                            )}
                        </strong>

                        <div>

                            ${escapeHtml(
                                order.customerName
                            )}

                            ·

                            ${escapeHtml(
                                order.phone
                            )}

                        </div>

                    </div>


                    <select
                        onchange="updateOrderStatus(
                            '${order.id}',
                            this.value
                        )">

                        ${
                            [
                                "Placed",
                                "Preparing",
                                "Out for Delivery",
                                "Delivered",
                                "Cancelled"
                            ]
                            .map(
                                status => `

                                <option
                                    ${
                                        order.status ===
                                        status
                                            ? "selected"
                                            : ""
                                    }>

                                    ${status}

                                </option>

                            `
                            )
                            .join("")
                        }

                    </select>

                </div>


                <div class="muted mt-20">

                    ${order.items.map(
                        item =>

                            `${escapeHtml(
                                item.name
                            )} × ${item.quantity}`

                    ).join(", ")}

                </div>


                <div class="order-total">

                    <span>
                        Total
                    </span>

                    <strong>

                        ${formatCurrency(
                            order.total
                        )}

                    </strong>

                </div>

            </div>

        `
        ).join("");

}


/* UPDATE ORDER STATUS */

function updateOrderStatus(
    orderId,
    status
) {

    const orders =
        getOrders();


    const order =
        orders.find(
            item =>
                item.id === orderId
        );


    if (!order) return;


    order.status =
        status;


    saveOrders(orders);


    renderSellerOrders();

    renderSellerStats();

}


/* SELLER STATISTICS */

function renderSellerStats() {

    const orders =
        getOrders();


    const count =
        document.getElementById(
            "orderCount"
        );


    const revenue =
        document.getElementById(
            "revenueCount"
        );


    if (count) {

        count.textContent =
            orders.length;

    }


    if (revenue) {

        const total =
            orders

                .filter(
                    order =>
                        order.status !==
                        "Cancelled"
                )

                .reduce(
                    (sum, order) =>
                        sum + order.total,
                    0
                );


        revenue.textContent =
            formatCurrency(total);

    }

}