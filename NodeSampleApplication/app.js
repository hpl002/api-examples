var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('/'))
app.use('/api', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// generic error handler
// return error message if development environemnt
app.use(function (err, req, res, next) {
  //TODO: there is likely pre-existing express middleware that handles these types of errors
  let status = err?.status || 500
  if (err.name === "AxiosError") {
    status = err.response.data.status
    console.error("Axios error while communicating with target", err.response.data.message)
  }

  console.error(err)
  res.status(status).send()
});


module.exports = app;
