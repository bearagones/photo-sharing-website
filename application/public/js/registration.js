function validateForm(event) {
    event.preventDefault();

    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    const confirm_password = document.getElementById("confirmpass").value;

    const username_spec = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    const password_spec = /^(?=.*[A-Z])(?=.*\d)(?=.*[-/*+!@#$^&]).{7,}$/;

    if (!username.match(username_spec)) {
        alert("Please enter a valid username");
        return false;
    }

    if (password !== confirm_password) {
        alert("Password does not match");
        return false;
    } else if (!password.match(password_spec)) {
        alert("Please enter a valid password");
        return false;
    }

    if ((username.match(username_spec)) && (password === confirm_password) && (password.match(password_spec))) {
        alert("Form was submitted!");
        return true;
    }

}