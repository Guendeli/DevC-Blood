var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist/'));
app.listen(process.env.PORT || 5000, function() {
  console.log('listening ', process.env.PORT || 5000);
});

