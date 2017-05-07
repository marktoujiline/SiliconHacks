var express = require('express')
var path = require('path')
var router = express.Router();

var questions = [
    'Why do you want to work for this company?',
    'If you could move a mountain, where would you put it, and why?',
    'How would you save the world?'
]

router.get('/question/:id', function(req, res) {
    if(req.params.id < 0 || req.params.id >= questions.length)
        res.status(404).send();
    else
        res.json({question: questions[req.params.id]});
});

module.exports = router;
