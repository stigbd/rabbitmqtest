var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
bodyParser = require("body-parser"),
config = require('../../config/config'),
amqp = require("amqp");

module.exports = function (app) {
    app.use('/', router);
    app.use(bodyParser.urlencoded({ extended: false }));
};

router.get('/', function (req, res, next) {
    Article.find(function (err, articles) {
        if (err) return next(err);
        res.render('index', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });
});


var amqp = require('amqp');
var mq = amqp.createConnection(config.mq);
mq.on('ready', function() {
    console.log('connected');
});

router.post('/',function(req, res){
    var body=req.body;
    var messageToSend = req.body;
    var queueToSendTo = "hello";
    mq.publish(queueToSendTo, messageToSend);
    res.sendStatus(201);
});
