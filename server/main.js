var express = require('express');
var bodyParser = require('body-parser');
var interview = require('./Routes/interview');
var transcribe = require('./Routes/transcribe');
var nlu = require('./Routes/nlu').nlu;
var tone = require('./Routes/nlu').tone;
var app = express();
var vocab = require('./vocab');

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.use(express.static('public'))
app.use('/interview', interview);

app.post('/audio', function (req, res) {
	console.log("RECIEVED AUDIO TO EXTRACT INDICATORS: ", req.body);
	transcribe(req.body)
		.then((text) => {
			return Promise.all([
				nlu(text),
				tone(text)
			])
		})
		.then((analRes) => {
			console.log(analRes)
			res.json(analRes);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send();
		})
});

var port = 4400;

app.listen(port, function() {
	console.log('App Listening on port ', port);
});
