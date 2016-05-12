var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var amqp = require('amqplib/callback_api');
var mqhost = 'amqp://rabbitmq';
// First connect
amqp.connect(mqhost, function(err, conn) {
    console.log('connected to amqp at ' + mqhost);
});
// Then create channel
amqp.connect(mqhost, function(err, conn) {
    conn.createChannel(function(err, ch) {});
});
var q = 'hello';
// Create channel and queue
amqp.connect(mqhost, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue(q, {durable: false});
        console.log(" queue created " + q);
    });
});

// parse application/json
app.use(bodyParser.json());

app.post('/', function(req, res){
    var messageToSend = JSON.stringify(req.body, null, 2);
    console.log(" [x] received " + messageToSend);
    amqp.connect(mqhost, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.sendToQueue(q, new Buffer(messageToSend));
            console.log(" [x] Sent " + messageToSend);
        });
    });
    res.sendStatus(201);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
