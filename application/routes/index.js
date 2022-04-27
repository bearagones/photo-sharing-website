var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App'});
});

router.get('/login', (req,res,next) => {
  res.render('login', {title: "Log In"});
})

router.get('/registration', (req,res,next) => {
  res.render('registration', {title: "Register"});
})

router.get('/postimage', (req,res,next) => {
  res.render('postimage', {title: "Post an Image"});
})

router.get('/viewpost', (req,res,next) => {
  res.render('viewpost', {title: "View a Post"});
})

module.exports = router;
