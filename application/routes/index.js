var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors.js').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware.js').getRecentPosts;

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App'});
});

router.get('/login', (req,res,next) => {
  res.render('login', {title: "Log In"});
})

router.get('/registration', (req,res,next) => {
  res.render('registration', {title: "Register"});
})

router.use('/postimage', isLoggedIn);
router.get('/postimage', (req,res,next) => {
  res.render('postimage', {title: "Post an Image"});
})

router.get('/post/:id(\\d+)', (req,res,next) => {
  res.send({params:req.params.id});
})

module.exports = router;
