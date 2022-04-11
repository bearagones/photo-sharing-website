var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'CSC 317 App', name:'Beatrice Aragones' });
});

router.get('/login', (req,res,next) => {
  res.render('login');
})

module.exports = router;
