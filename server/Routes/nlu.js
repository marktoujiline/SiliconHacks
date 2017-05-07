var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var nlu_creds = require('./nlu_creds.json');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


nlu_creds.version_date = NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27;
var nlu = new NaturalLanguageUnderstandingV1(nlu_creds);
var toneAnalyzer = new ToneAnalyzerV3(nlu_creds); // not working


module.exports = {
	nlu: (text) => {
	console.log("text: ", text)
	return new Promise((res, rej) => {
		nlu.analyze({
			'html': text, // Buffer or String
			'features': {
				'concepts': {},
				'keywords': {},
			}
		}, function(err, response) {
			if (err)
				rej(err)
			else
				res(response)
		});

	})},
	tone: (text) => {
		return new Promise((res, rej) => {
			toneAnalyzer.tone({ text },
			function(err, tone) {
				if (err)
					rej(err);
				else
					res(tone);
			});
		});
	}
}