var express = require('express');
var router = express.Router();
var jsonParser = express.json();
const { check, validationResult } = require('express-validator/check');
var connection = require('../dbconnection/dbconfig');

router.get('/posts', (req, res, next) => {
  var query = connection.Post.find({}).select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 0 });

  query.exec(function (err, list) {
    if (err) throw err;
    return res.json(list);
  })
})

router.route('/posts/add')
  .post(jsonParser, function (req, res, next) {

    console.log(req.body);

    addPost(req.body, res);

  });


function addPost(pObj, pRes) {

  console.log('****************** ADDDDD *****************')


  var posts = connection.Post.create(pObj, function (err, list) {
    console.log("1 document inserted");
    pRes.json({ "status": 'ok' });
    pRes.end();
  })

}
module.exports = router;