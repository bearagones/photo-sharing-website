var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:'Beatrice Aragones' });
});

router.get('/login', (req,res,next) => {
  res.render('login');
})

router.get('/registration', (req,res,next) => {
  res.render('registration');
})

router.get('/postimage', (req,res,next) => {
  res.render('postimage');
})

router.get('/viewpost', (req,res,next) => {
  res.render('viewpost');
})

module.exports = router;
