var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

  connectToDb();

});

function connectToDb() {

  const conection = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds137651.mlab.com:37651/mwadb`;
  console.log(conection)

  mongoose.connect(conection, { useNewUrlParser: true },()=>
  {

    console.log("db connected")

  
  });


  var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// Compile model from schema
var Posts = mongoose.model('Posts', SomeModelSchema );

 
  
  
  var itemOne = Posts({ a_string: 'myItem' }).save(function (err) {

    if (err) throw err;

    console.log("item Added")

  });


}
