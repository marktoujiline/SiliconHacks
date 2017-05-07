var express = require('express');
var bodyParser = require('body-parser');
var interview = require('./Routes/interview');
var app = express();

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.use(express.static('public'))
app.use('/interview', interview);

app.post('/audio', function (req, res) {
	console.log("RECIEVED AUDIO TO EXTRACT INDICATORS: ", req.body);
	res.status(200).end();
});

var port = 4400;

app.listen(port, function() {
	console.log('App Listening on port ', port);
});
