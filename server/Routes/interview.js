var express = require('express')
var path = require('path')
var router = express.Router();

var questions = [
    'Explain what recursion is for a kid',
    'What is your biggest passion in life?',
    'What was your favorite part of SiliconHacks?'
]

router.get('/question/:id', function(req, res) {
    if(req.params.id < 0 || req.params.id >= questions.length) {
        res.json({done: true});
    }
    else
        res.json({question: questions[req.params.id], done: false});
});

module.exports = router;
