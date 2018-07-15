var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var Connection = require('../dbconnection/dbconfig');
const { from } = require('rxjs');
const { filter } = require('rxjs/operators');
var utilities = require('../utilities/HelperUtilities');

//Testing sending mail - Works (Aimal)
router.get("/", (req, res, next) => {
  console.log("1")
  res.json(utilities.sendMail('aimalkhanofficial@gmail.com', 'test', utilities.generateVerificationCode()));
});

//We need this middle ware to check for authorization token (Aimal)
router.use('/protected', (req, res, next) => {
  var token = null;
  var bits = req.headers.authorization.split(' ');

  if (bits.length == 2) {
    var scheme = bits[0];
    var credentials = bits[1];
    if (/^Bearer$/i.test(scheme)) {
      token = credentials;
      jwt.verify(token, '@ccc%^', function (err, decoded) {
        if (err) res.status(200).json("Invalid Token");
        next();
      });
    }
  }
  else {
    res.status(401).json("Invalid Token format");
  }
});

//Incomplete registration method (Aimal)
router.post("/register", [
  check('userName').exists().withMessage("provide username"),
  check('passWord').exists().withMessage("provide password"),
  check('role').exists().withMessage("provide role"),
  check('email').exists().withMessage("provide email"),
  check('email').isEmail().withMessage("provide valid email"),
  check('contactNumber').exists().withMessage("provide contactNumber")
], (req, res, next) => {
  //For Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  var verificationCode = utilities.generateVerificationCode();

  var newUser = new Connection.User({
    userName: req.body.userName,
    passWord: req.body.userName,
    role: req.body.role,
    email: req.body.email,
    // location: {
    //     s_type: String,
    //     coordinates: [Number]
    // },
    isVerified: Number,
    verificationCode: verificationCode,
    contactNumber: req.body.contactNumber,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  res.status(200).json("Registration Successful!");
});


/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  // var newPost = new Connection.Post({
  //   title: 'Car',
  //   description: 'String',
  //   post_date: new Date,
  //   last_updated: new Date,
  //   price: 22,
  //   status: 2,
  //   condition: 2,
  //   category:  2,
  //   location: {
  //     s_type: 'dfdf',
  //     coordinates: [98.2323232, 92.11121]
  //     }
  // })
  // newPost.save(function(err){
  //   if(err) throw err;
  //   res.json("Success");
  // })
  res.json("Hey");
});

module.exports = router;
