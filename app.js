var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var apiRouter = require('./routes/document');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://jingshan0506:20110918myj@ds019980.mlab.com:19980/blabla2', { promiseLibrary: require('bluebird')
// mongoose.connect('mongodb://localhost/blabla2', { promiseLibrary: require('bluebird')
})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/blabla2')));
app.use('/', express.static(path.join(__dirname, 'dist/blabla2')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('evn') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
