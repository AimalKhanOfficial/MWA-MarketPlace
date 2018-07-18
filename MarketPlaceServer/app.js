var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var analyticsRouter = require('./routes/analytics');
var postsRouter = require('./routes/posts');
var fileupload = require('./routes/files');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use((req, res, next) => {
  console.log("New Request", req.url);
  if (req.url === "/users/login" || req.url === "/users/register" || req.url === "/favicon.ico" || req.url === "/api/posts") {
    next();
  }
  else {
    var token = null;
    var bits = req.headers.authorization.split(' ');
    console.log("Token", req.headers.authorization);
    console.log("bits", bits);
    if (bits.length == 2) {
      console.log("here1");
      var scheme = bits[0];
      var credentials = bits[1];

      if (/^Bearer$/i.test(scheme)) {
        console.log("here2");
        token = credentials;
        jwt.verify(token, process.env.JWT_PRIVATE, function (err, decoded) {
          console.log("err", err);
          console.log("decoded", decoded);
          if (err) {
            console.log(err);
            res.status(200).json("Invalid Token");
          }
          else {
            console.log("No error!");
            next();
          }
        });
      }
    }
    else {
      res.status(401).json("Invalid Token format");
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', postsRouter);
app.use('/imgapi', fileupload);
app.use('/analytics', analyticsRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log("Started!");
});