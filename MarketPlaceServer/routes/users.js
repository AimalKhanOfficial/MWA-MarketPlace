var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var connection = require('../dbconnection/dbconfig');
const { from } = require('rxjs');
const { filter } = require('rxjs/operators');
var utilities = require('../utilities/HelperUtilities');
var jwt = require('jsonwebtoken');

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

router.get("/:email", (req, res, next) => {
  var users = connection.User.find({}, function (err, users) {
    flag = false;
    from(users)
      .pipe(
        filter(singleUser => singleUser.email === req.params.email)
      )
      .subscribe(singleUser => {
        flag = true;
        return res.json("true");
      });

    if (!flag) {
      res.json("false");
    }
  });
});

//Recover password
router.get("/recoverPassword/:email", (req, res, next) => {

  var newPassword = utilities.generateVerificationCode();

  var users = connection.User.update({ email: req.params.email }, { $set: { passWord: newPassword } }, function (err, users) {
    if (err) {
      console.log(err);
      res.json("err");
    }
    else {
      utilities.sendMail(req.params.email, "Password Changed", `
        Hey there, <br/>
          Use ${newPassword} as your new password to login to Market place!`);
      res.status(200).json("Password Change successful!");
    }
  });
});

router.get("/verifyUser/:email", (req, res, next) => {

  var newPassword = utilities.generateVerificationCode();

  var users = connection.User.update({ email: req.params.email }, { $set: { isVerified: 1 } }, function (err, users) {
    if (err) {
      console.log(err);
      res.json("err");
    }
    else {
      res.status(200).json("Verification successful!");
    }
  });
});

//Login Method - Works Fine! Aimal
router.post("/login", [
  check('email').exists().withMessage("provide email"),
  check('email').isEmail().withMessage("provide valid email"),
  check('password').exists().withMessage("provide password")
], (req, res, next) => {
  //For Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  console.log(process.env.JWT_PRIVATE)
  connection.User.find({ email: req.body.email, passWord: req.body.password }, function (err, user) {
    if (user.length > 0) {
      console.log(user[0]);
      return res.json({
        auth: true,
        token: jwt.sign(user[0].toJSON(), process.env.JWT_PRIVATE)
      });
    }
    else {
      return res.json({
        auth: false,
        token: jwt.sign({ res: "NoUserFound" }, process.env.JWT_PRIVATE)
      });
    }
  });
});

//Registration method completed - Aimal
router.post("/register", [
  check('userName').exists().withMessage("provide username"),
  check('passWord').exists().withMessage("provide password"),
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

  var newUser = new connection.User({
    userName: req.body.userName,
    passWord: req.body.passWord,
    role: 0,
    email: req.body.email,
    isVerified: 0,
    verificationCode: verificationCode,
    contactNumber: req.body.contactNumber,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  console.log(newUser);

  newUser.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).json("Something went wrong, please try again later!");
    }
    else {
      utilities.sendMail(req.body.email, "Registration Successful", `
        Hey there ${req.body.userName} <br/>
          Use ${verificationCode} to verify your account!`);
      res.status(200).json("Registration successful!");
    }
  });
});


router.get('/all', (req, res, next) => {
  console.log("entering function");
  connection.User.find({}, function (err, user) {

    console.log(user[0]);
    return res.json({
      working: true,
      user: { abc: 123 }
    });

  });
});

module.exports = router;
