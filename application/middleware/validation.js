const checkUsername  = (username) => {
    let usernameSpec = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    return usernameSpec.test(username);
}

const checkPassword = (password) => {
    let passwordSpec = /^(?=.*[A-Z])(?=.*\d)(?=.*[-/*+!@#$^&]).{7,}$/;
    return passwordSpec.test(password);
}

const registerValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!checkUsername(username)) {
        req.flash('error', "Invalid username!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if (!checkPassword(password)) {
        req.flash('error', "Invalid password!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else {
        next();
    }
}

const loginValidation = (req, res, next) => {

}

module.exports = {registerValidation, loginValidation};