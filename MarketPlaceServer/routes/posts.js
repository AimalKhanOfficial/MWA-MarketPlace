var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var connection = require('../dbconnection/dbconfig');

router.get('/', (req, res, next) => {
  var posts = connection.Post.find({}, function (err, list) {
    if (err) throw err;
    return res.json(list);
  })
})

module.exports = router;