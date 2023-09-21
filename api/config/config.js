// NPM module imports
const glob = require('glob');
const path = require('path');
const mongoose = require('mongoose');
const async = require('async');

// App dependencies
const { winstonLog } = require('../modules/common/common');
const constants = require('./constants');

module.exports = (callback) => {
  async.series(
    [
      (envCb) => {
        // Checking required environment variables
        if (
          !process.env.MONGO_DB_ADDRESS ||
          !process.env.MONGO_DB_NAME 
        ) {
          winstonLog(
            {},
            constants.logLevel.error,
            'Missing MongoDB credentials in env file.\n Shutting down server.'
          );
          process.exit(1);
        }

        const dbUrl = `mongodb://${process.env.MONGO_DB_ADDRESS}/${process.env.MONGO_DB_NAME}`;
        console.log('dbUrl',dbUrl)

        // Connecting to Database
        mongoose.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        // when successfully connected
        mongoose.connection.on('connected', () => {
          winstonLog(
            {},
            constants.logLevel.info,
            `Mongoose connection open to '${dbUrl}'`
          );
          envCb();
        });
        // if the connection throws an error
        mongoose.connection.on(constants.logLevel.error, (err) => {
          envCb(err);
        });
        // when the connection is disconnected
        mongoose.connection.on('disconnected', () => {
          winstonLog(
            {},
            constants.logLevel.error,
            'Mongoose connection disconnected'
          );
        });
      },
      (modelsCb) => {
        // load all models
        glob('modules/**/*.model.js', (err, files) => {
          if (err) {
            modelsCb(err);
          } else {
            winstonLog({}, constants.logLevel.info, 'Loading models');
            files.forEach((file) => {
              require(path.join(__dirname, '../', file));
              winstonLog({}, constants.logLevel.info, `'${file}' is loaded`);
            });
            modelsCb();
          }
        });
      },
    ],
    (err) => {
      if (err) {
        return callback(err);
      }
      return callback();
    }
  );
};
