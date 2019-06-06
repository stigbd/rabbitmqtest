var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var rabbit = require('rabbot');

var config = {
  connection: {
    protocol: 'amqp://',
    name: 'default',
    user: 'guest',
    pass: 'guest',
    host: 'rabbitmq',
    port: 5672
  },
  exchanges: [
    {
      name:           "worker.exchange",
      type:           "direct",
      autoDelete:     false,
      durable:        true,
      persistent:     true
    },
    {
      name:           "deadLetter.exchange",
      type:           "fanout"
    }
  ],
  queues: [
    {
      name:           "worker.queue",
      autoDelete:     false,
      durable:        true,
      noBatch:        true,
      limit:          1,
      subscribe:      true,
      deadLetter:     'deadLetter.exchange'
    },

    {
      name:           'deadLetter.queue'
    }
  ],
  bindings: [
    {
      exchange:   "worker.exchange",
      target:         "worker.queue",
      keys:           ["email"]
    },

    {
      exchange:      "deadLetter.exchange",
      target:         "deadLetter.queue",
      keys:           ["email"]
    }
  ]
};

rabbit
.configure(config)
.then( function() {
  console.log('rabbit is hopping');
  // ready to start rabbit receivers and publishers
})
.then(null, function(err) {
  console.log('Error on configuring rabbit: ', err);
});

// parse application/json
app.use(bodyParser.json());

app.post('/', function(req, res){
  var message = JSON.stringify(req.body);
  console.log(" [x] received POST with body: " + message );
  var payload = {};
  payload.routingKey = 'email';
  payload.body = { msg: message, dataOK: true}
  rabbit.publish(config.exchanges[0].name, payload, config.connection.name)
  .then( function () {
    console.log(" [x] Sent " + JSON.stringify(payload));
  })
  .catch( function(err) {
    console.log(err);
  });

  res.sendStatus(201);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

process.on('exit', function () {
  rabbit.shutdown(true);
});
