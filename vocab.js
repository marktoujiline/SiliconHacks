var syllable = require("syllable");


var getLevel = function(text) {
	var fkScore = getFKScore(text);
	var comprehensionLevels = ["<5th Grade", "5th Grade", "6th Grade", "7th Grade", "8th - 9th Grade", "10th - 11th Grade", "College", "College Graduate", "English PHD showing off"];
	var nScore = Math.ceil(fkScore/10);
	var level = 0;
	if (nScore > 10)
	       level = 0;
	else if (nScore > 9)
		level = 1;
	else if (nScore > 8)
		level = 2;
	else if (nScore > 7)
		level = 3;
	else if (nScore > 6)
		level = 4;
	else if (nScore > 5) 
		level = 5;
	else if (nScore > 3) // pattern change
		level = 6;
	else if (nScore > 0)
		level = 7;
	else
		level = 8;
	return comprehensionLevels[level];
}

var getFKScore = function(text) {
	var wsScore = getWordSentenceScore(text);
	var swScore = getSyllableWordScore(text);
	return 206.835 - 1.015 * (wsScore) - 84.6 * (swScore);
}

var getWordSentenceScore = function(text) {
	var numSentences = countSentences(text);
	var numWords = countWords(text);
	return numWords * 1.0 / numSentences;
}

var getSyllableWordScore = function(text) {
	var numSyllables = countSyllables(text);
	var numWords = countWords(text);
	return numSyllables * 1.0 / numWords;
}

var countSentences = function(text) {
	return Math.max(1, text.split(".").length-1); // -1 for last period
}

var countWords = function(text) {
	return Math.max(1, text.split(" ").length);
}

var countSyllables = function(text) {
	return Math.max(1, syllable(text));
}

function assert(condition, msg) {
	if (!condition) {
		throw msg || "Assertion failed!";
	}
}

//assert (countSentences(text) === 1, "count sentences");
//assert (countWords(text) === 8, "count words");
//assert (getWordSentenceScore(text) === 8, "score word/sentence");
//assert (countSentences(text) !== 6, "count syllables");
//assert (getSyllableWordScore(text) === 1, "score syllable/word");

var text = "The Natural Language understanding purpose analyzes text to extract keywords, concept, entities, sentiment, and roles using natural lanaguage understanding."
console.log("Sentence count ", countSentences(text));
console.log("Word count ", countWords(text));
console.log("Word/sentence score ", getWordSentenceScore(text));
console.log("Syllable count ", countSyllables(text));
console.log("Total score", getFKScore(text));
