var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'sender'
    },
    port: 3000,
    db: 'mongodb://localhost',
    mq: 'amqp://localhost'
  },

  test: {
    root: rootPath,
    app: {
      name: 'sender'
    },
    port: 3000,
    db: 'mongodb://rabbitmqtest_mongodb_1'
  },

  production: {
    root: rootPath,
    app: {
      name: 'sender'
    },
    port: 3000,
    db: 'mongodb://rabbitmqtest_mongodb_1'
  }
};

module.exports = config[env];
