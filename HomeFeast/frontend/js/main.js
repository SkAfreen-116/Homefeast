/* =========================================================
   HOMEFEAST MAIN JAVASCRIPT
   Frontend Demo Functionality
   ========================================================= */


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (!nav) return;

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection = "column";

        nav.style.position = "absolute";

        nav.style.top = "76px";

        nav.style.left = "0";

        nav.style.right = "0";

        nav.style.background = "white";

        nav.style.padding = "20px";

        nav.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.10)";
    }
}


/* ================= LOGIN ================= */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Login successful! Backend authentication will be connected later."
        );

    });

}


/* ================= REGISTER ================= */

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Registration successful! Database connection will be added later."
        );

    });

}


/* ================= CHECKOUT ================= */

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Order placed successfully! Backend order processing will be connected later."
        );

    });

}


/* ================= CART QUANTITY ================= */

let quantity = 1;

function changeQuantity(change) {

    quantity += change;

    if (quantity < 1) {

        quantity = 1;

    }


    const quantityElement =
        document.getElementById("quantity");

    const subtotalElement =
        document.getElementById("subtotal");

    const totalElement =
        document.getElementById("total");


    if (quantityElement) {

        quantityElement.textContent = quantity;

    }


    const subtotal =
        quantity * 150;

    const total =
        subtotal + 40;


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + subtotal;

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + total;

    }

}


/* ================= ADD TO CART ================= */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const foodName =
            button.dataset.name;

        const price =
            button.dataset.price;


        alert(
            foodName +
            " added to cart for ₹" +
            price
        );

    });

});


/* ================= MENU SEARCH ================= */

const searchInput =
    document.getElementById("foodSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const foodCards =
    document.querySelectorAll(".menu-food-grid .food-card");


function filterFoods() {

    const searchValue =
        searchInput ?
        searchInput.value.toLowerCase() :
        "";

    const categoryValue =
        categoryFilter ?
        categoryFilter.value :
        "all";


    foodCards.forEach(function(card) {

        const name =
            card.dataset.name;

        const category =
            card.dataset.category;


        const matchesSearch =
            name.includes(searchValue);


        const matchesCategory =
            categoryValue === "all" ||
            category === categoryValue;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterFoods
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterFoods
    );

}


/* ================= CATEGORY BUTTONS ================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        if (categoryFilter) {

            categoryFilter.value = category;

        }


        if (searchInput) {

            searchInput.value = "";

        }


        filterFoods();

    });

});