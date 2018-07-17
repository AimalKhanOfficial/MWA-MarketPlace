var express = require('express');
var router = express.Router();
var jsonParser = express.json();
const { check, validationResult } = require('express-validator/check');
var connection = require('../dbconnection/dbconfig');

router.get('/posts', (req, res, next) => {
<<<<<<< HEAD
  var query = connection.Post.find({});
  // .select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 0 });
=======
  // var query = connection.Post.find({}).select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 1 });
>>>>>>> df8a924327f5e8ba2eaa413e074e015ee43312ef

  connection.Post.find({},function (err, list) {
    if (err) throw err;
    return res.json(list);
  })
})

<<<<<<< HEAD
router.get("/posts/activate/:id", (req, res, next) => {


  var query = connection.Post.update({ _id: req.params.id }, { $set: { status: 2 } }, function (err, posts) {
    if (err) {
      console.log(err);
      res.json("err");
    }
    else {
      console.log("updated");
      res.status(200).json("Post Activated");
    }
  });
});

router.get('/users', (req, res, next) => {
  var query = connection.User.find({});

  query.exec(function (err, list) {
    if (err) throw err;
    return res.json(list);
  })
})
=======
router.get('/posts/:id', (req, res, next) => {

  // var query = connection.Post.find({}).findOne({ '_id': req.params.id }).select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 1 });

  connection.Post.find({}).findOne({ '_id': req.params.id }, function (err, data) {
    if (err) return res.status(500).send(ERROR);
    return res.json(data);
  })
});

>>>>>>> df8a924327f5e8ba2eaa413e074e015ee43312ef
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