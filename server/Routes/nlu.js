var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var nlu_creds = require('./nlu_creds.json');
nlu_creds.version_date = NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27;
var nlu = new NaturalLanguageUnderstandingV1(nlu_creds);

nlu.analyze({
	'html': 'This is some professional stuff going on at an awesome hackathon with a lot of javscript nodejs coding because we are awesome programmers', // Buffer or String
	'features': {
		'concepts': {},
		'keywords': {},
	}
}, function(err, response) {
	if (err)
		console.log('error:', err);
	else
		console.log(JSON.stringify(response, null, 2));
});

