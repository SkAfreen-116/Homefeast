/* ==========================================
   AUTHENTICATION
   ========================================== */


/* GET USERS */

function getUsers() {

    return JSON.parse(
        localStorage.getItem(
            "homefeast_users"
        ) || "[]"
    );

}


/* SAVE USERS */

function saveUsers(users) {

    localStorage.setItem(
        "homefeast_users",
        JSON.stringify(users)
    );

}


/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const registerForm =
            document.getElementById(
                "registerForm"
            );


        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                registerUser
            );

        }


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                loginUser
            );

        }

    }
);


/* REGISTER */

function registerUser(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "registerName"
        ).value.trim();


    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const role =
        document.getElementById(
            "registerRole"
        ).value;


    const users =
        getUsers();


    /* CHECK EMAIL */

    if (
        users.some(
            user =>
                user.email === email
        )
    ) {

        showMessage(
            "registerMessage",
            "An account with this email already exists.",
            "error"
        );

        return;

    }


    /* CREATE USER */

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        role: role

    };


    users.push(newUser);


    saveUsers(users);


    showMessage(
        "registerMessage",
        "Account created successfully!",
        "success"
    );


    setTimeout(
        function () {

            window.location.href =
                "login.html";

        },
        900
    );

}


/* LOGIN */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const role =
        document.getElementById(
            "loginRole"
        ).value;


    const users =
        getUsers();


    const user =
        users.find(
            item =>

                item.email === email &&

                item.password === password &&

                item.role === role

        );


    if (!user) {

        showMessage(
            "loginMessage",
            "Invalid email, password, or role.",
            "error"
        );

        return;

    }


    localStorage.setItem(
        "homefeast_currentUser",
        JSON.stringify(user)
    );


    showMessage(
        "loginMessage",
        "Login successful!",
        "success"
    );


    setTimeout(
        function () {

            if (role === "seller") {

                window.location.href =
                    "seller-dashboard.html";

            } else {

                window.location.href =
                    "menu.html";

            }

        },
        600
    );

}