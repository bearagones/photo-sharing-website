var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors.js').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware.js');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'AmiguruBea'});
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

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req,res,next) => {
    res.render('viewpost', {title: `Post ${req.params.id}`});
})

module.exports = router;
