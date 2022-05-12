const inputValidation = (input) => {
    if (input) {
        return true;
    }
}

const usernameValidation = (username) => {
    let usernameSpec = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;

    return usernameSpec.test(username);
}

const emailValidation = (email) => {
    let emailSpec = /\S+@\S+\.\S+/;

    return emailSpec.test(email);
}

const passwordValidation = (password) => {
    let passwordSpec = /^(?=.*[A-Z])(?=.*\d)(?=.*[-/*+!@#$^&]).{7,}$/;

    return passwordSpec.test(password);
}

const imageValidation = (image) => {
    let imageSpec = /(\.jpg|\.jpeg|\.png|\.bmp|\.gif)$/i;

    return imageSpec.test(image);
}

const registerValidation = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmpass;
    let attestAge = req.body.age;
    let readAndAgree = req.body.tos;

    if (!inputValidation(username) || !inputValidation(email) || !inputValidation(password) || !inputValidation(confirmPassword)) {
        req.flash('error', "Must fill in empty field(s)!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if (!usernameValidation(username)) {
        req.flash('error', "Username must be 3 or more alphanumeric characters!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if (!emailValidation(email)) {
        req.flash('err', "Email must be in the form of 'something@something.something'!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if (!passwordValidation(password)) {
        req.flash('error', "Password must be 8 or more characters with a number, uppercase letter, and special character!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if (password !== confirmPassword) {
        req.flash('error', "Passwords do not match!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if (!(attestAge || readAndAgree)) {
        req.flash('error', "Must check the boxes to proceed!");
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else {
        next();
    }
}

const loginValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!inputValidation(username) || !inputValidation(password)) {
        req.flash('error', "Must fill in empty field(s)!");
        req.session.save(err => {
            res.redirect('/login');
        })
    } else if (!usernameValidation(username)) {
        req.flash('error', "Invalid username!");
        req.session.save(err => {
            res.redirect('/login');
        })
    } else if (!passwordValidation(password)) {
        req.flash('error', "Invalid password!");
        req.session.save(err => {
            res.redirect('/login');
        })
    } else {
        next();
    }
}

const postValidation = (req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    let policy = req.body.policy;

    if (!inputValidation(title) || !inputValidation(description) || !inputValidation(policy)) {
        req.flash('error', "Must fill in empty field(s)!");
        req.session.save(err => {
            res.redirect('/postimage');
        })
    } else {
        next();
    }
}

module.exports = {registerValidation, loginValidation, postValidation};