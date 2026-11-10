/* =========================================
   HOMEFEAST FOOD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const foodCards = document.querySelectorAll(".food-card");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const searchInput = document.getElementById("search-food");
    const searchButton = document.getElementById("search-btn");
    const noFood = document.getElementById("no-food");
    const foodResult = document.getElementById("food-result");

    let selectedCategory = "all";


    /* =========================================
       FILTER FOOD
    ========================================= */

    function filterFood() {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleCount = 0;


        foodCards.forEach(function (card) {

            const foodName =
                card.dataset.name.toLowerCase();

            const foodCategory =
                card.dataset.category.toLowerCase();


            const matchesSearch =
                foodName.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                foodCategory.includes(selectedCategory);


            if (matchesSearch && matchesCategory) {

                card.style.display = "block";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* No food message */

        if (visibleCount === 0) {

            noFood.style.display = "block";

            foodResult.textContent =
                "No food found";

        } else {

            noFood.style.display = "none";

            foodResult.textContent =
                `Showing ${visibleCount} food item${visibleCount > 1 ? "s" : ""}`;

        }

    }


    /* =========================================
       CATEGORY BUTTONS
    ========================================= */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory =
                button.dataset.category;

            filterFood();

        });

    });


    /* =========================================
       SEARCH
    ========================================= */

    searchInput.addEventListener(
        "input",
        filterFood
    );


    searchButton.addEventListener(
        "click",
        filterFood
    );


    /* =========================================
       ADD TO CART
    ========================================= */

    const addButtons =
        document.querySelectorAll(".add-cart");


    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id =
                button.dataset.id;

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            let cart =
                JSON.parse(
                    localStorage.getItem("homefeastCart")
                ) || [];


            const existingItem =
                cart.find(item => item.id === id);


            if (existingItem) {

                existingItem.quantity++;

            } else {

                cart.push({

                    id: id,

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            localStorage.setItem(
                "homefeastCart",
                JSON.stringify(cart)
            );


            updateCartCount();


            /* Button feedback */

            const originalText =
                button.textContent;

            button.textContent =
                "✓ Added";

            button.style.background =
                "#0f6b2d";


            setTimeout(function () {

                button.textContent =
                    originalText;

            }, 1000);

        });

    });


    /* =========================================
       CART COUNT
    ========================================= */

    function updateCartCount() {

        const cart =
            JSON.parse(
                localStorage.getItem("homefeastCart")
            ) || [];


        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );


        const cartCount =
            document.getElementById("cart-count");


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }

    }


    updateCartCount();

});