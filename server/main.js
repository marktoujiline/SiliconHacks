var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.listen(3000, function() {
	console.log('App Listening on port ', 3000);
});

