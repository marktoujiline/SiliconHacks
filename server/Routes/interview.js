var express = require('express')
var path = require('path')
var router = express.Router();

var questions = [
    //'Why do you want to work for this company?',
    'If you could move a mountain, where would you put it, and why?',
    'How would you save the world?'
]

router.get('/question/:id', function(req, res) {
    if(req.params.id < 0 || req.params.id >= questions.length) {
        res.json({done: true});
    }
    else
        res.json({question: questions[req.params.id], done: false});
});

module.exports = router;
