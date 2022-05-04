var express = require('express');
var router = express.Router();
const UserModel = require('../models/usersmodel');
const UserError = require('../helpers/error/UserError');
const {errorPrint, successPrint} = require('../helpers/debug/debugprinters');
const {registerValidation} = require('../middleware/validation');

router.post('/register', registerValidation, (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmpass = req.body.password;

    UserModel.usernameExists(username)
        .then((usernameDoesExist) => {
            if (usernameDoesExist) {
                throw new UserError("Registration Failed: Email already exists", "/registration", 200);
            } else {
                return UserModel.emailExists(email);
            }
        })
        .then((emailDoesExist) => {
            if (emailDoesExist) {
                throw new UserError("Registration Failed: Email already exists", "/registration", 200);
            } else {
                return UserModel.create(username, password, email);
            }
        })
        .then((createdUserId) => {
            if (createdUserId < 0) {
                throw new UserError("Server Error: User could not be created", "/registration", 500);
            } else {
                successPrint("users.js --> User was created!");
                req.flash('success', 'User account has been made!');
                res.redirect('/login');
            }
        })
        .catch((err) => {
            errorPrint("User could not be made", err);
            if (err instanceof UserError) {
                errorPrint(err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                next(err);
            }
        });
});

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    //do server side validation here

    UserModel.authenticate(username, password)
        .then((loggedUserId) => {
            if (loggedUserId) {
                successPrint(`User ${username} is logged in`);
                req.session.username = username;
                req.session.userId = loggedUserId;
                res.locals.logged = true;
                req.flash('success', 'You have been successfully logged in!')
                res.redirect('/');
            } else {
                throw new UserError("Password is incorrect!", "/login", 200);
            }
        })
        .catch((err) => {
            errorPrint("User login failed");
            if (err instanceof UserError) {
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect('/login');
            } else {
                next(err);
            }
        })
});

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            errorPrint("Session could not be destroyed.");
            next(err);
        } else {
            successPrint("Session was destroyed.");
            res.clearCookie('csid');
            res.json({status: "OK", message: "User is logged out"});
        }
    })
});

module.exports = router; 
