var amqp = require ('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://rabbitmqtest_rabbitmq_1', function(err, conn) {});

// create a channel
amqp.connect('amqp://rabbitmqtest_rabbitmq_1', function(err, conn) {
  conn.createChannel(function(err, ch) {});
});

// declare a queue to send and send to
amqp.connect('amqp://rabbitmqtest_rabbitmq_1', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    var id = Math.floor(Math.random() * 1000000) + 1;
    ch.sendToQueue(q, new Buffer("ID " + ++id + " -- Hello world, from node!"));
    console.log(" [x] Sent 'Hello world!' " + id);
  });
  // close connection and exit
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
