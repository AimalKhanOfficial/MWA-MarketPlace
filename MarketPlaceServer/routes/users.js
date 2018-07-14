var express = require('express');
var router = express.Router();
var Connection =  require('../dbconnection/dbconfig');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  var newPost = new Connection.Post({
    title: 'Car',
    description: 'String',
    post_date: new Date,
    last_updated: new Date,
    price: 22,
    status: 2,
    condition: 2,
    category:  2,
    location: {
      s_type: 'dfdf',
      coordinates: [98.2323232, 92.11121]
      }
  })
  newPost.save(function(err){
    if(err) throw err;
    res.json("Success");
  })
});

module.exports = router;
