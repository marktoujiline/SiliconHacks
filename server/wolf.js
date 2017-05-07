var xml2json = require('xml2js').parseString;
var request = require('request');

var url = "http://api.wolframalpha.com/v2/query?appid=H77RUP-YKLXJJVT4X&format=plaintext&input=";



module.exports = function(topic, other) {
	return new Promise(function(res, rej) {
		if(!topic) {
			res(other);
			return;
		}
		request(url+topic, function (err, response, body) {
			console.log('error', err);
			console.log('statusCode', response && response.statusCode);
			console.log('body', body);
			var list = [];
			xml2json(body, function(err, result) {
				if(result.queryresult.pod) {
					for (var i = 0; i < result.queryresult.pod.length; i++) {
						var pod = result.queryresult.pod[i];
						list.push(pod.subpod[0].plaintext[0]);
					}
				}
			// console.log(list);
			other.push({wolf: list})
			res(other);
			});
		});
	});
} 