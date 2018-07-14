var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.DB_PASS);
  res.render('index', { title: 'Express', DB_PASS: process.env.DB_PASS });
});

module.exports = router;
