var express = require('express');
var router = express.Router();
var jsonParser = express.json();
const { check, validationResult } = require('express-validator/check');
var connection = require('../dbconnection/dbconfig');

router.get('/posts', (req, res, next) => {
  // var query = connection.Post.find({}).select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 1 });
  connection.Post.find({ "status.key": 2, isDeleted: false }, function (err, list) {
    if (err) throw err;
    return res.json(list);
  })
})
router.get('/adminPosts', (req, res, next) => {
  // var query = connection.Post.find({}).select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 1 });
  connection.Post.find({}, function (err, list) {
    if (err) throw err;
    return res.json(list);
  })
})
router.get('/posts/:id', (req, res, next) => {
  // var query = connection.Post.find({}).findOne({ '_id': req.params.id }).select({ "title": 1, "user_name": 1, "description": 1, "price": 1, "_id": 1 });
  connection.Post.find({}).findOne({ '_id': req.params.id }, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.json(data);
  })
})

router.delete('/posts/:id', (req, res, next) => {
  connection.Post.update({ _id: req.params.id }, { $set: { isDeleted: true } }, function (err, data) {
    if (!err) {
      return res.status(200).json(data);
    } else {
      return res.status(500).send(err);
    }
  });
});

router.get("/posts/activate/:id", (req, res, next) => {


  var query = connection.Post.update({ _id: req.params.id }, { $set: { status: { key: "2", value: "Approved" } } }, function (err, posts) {
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
router.route('/posts/add')
  .post(jsonParser, function (req, res, next) {

    console.log(req.body);

    addPost(req.body, res);

  });

router.route('/posts/:id')
  .put(jsonParser, function (req, res, next) {

    console.log(req.body);

    updatePost(req, res);

  });

function updatePost(req, res) {

  var query = connection.Post.update({ _id: req.params.id }, req.body, function (err, posts) {
    if (err) {
      console.log(err);
      res.json("err");
    }
    else {
      console.log("updated");
      res.status(200).json({ "status": "1" });
    }
  });
}

function addPost(pObj, pRes) {

  console.log('****************** ADDDDD *****************')


  var posts = connection.Post.create(pObj, function (err, list) {
    console.log("1 document inserted");
    pRes.json({ "status": 'ok' });
    pRes.end();
  })

}
module.exports = router;