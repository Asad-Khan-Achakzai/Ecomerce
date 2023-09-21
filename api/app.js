const express = require("express");
const http = require("http");
const constants = require("./config/constants");
const { winstonLog } = require("./modules/common/common");

// Configuring the environment
require("dotenv").config({
  path: ".env",
});

const app = express();

const port = process.env.SERVER_PORT || 3000;

function shutdown() {
  winstonLog({}, constants.logLevel.info, "Shutting down server");
  process.exit(1);
}
// Configure routes and error handling
require("./config/config")((err) => {
  if (err) {
    winstonLog(
      {},
      constants.logLevel.error,
      `An error occurred while configuring app: ${err}. Shutting down server.`
    );
    process.exit(1);
  } else {
    app.use(
      express.urlencoded({ extended: true, limit: constants.maxRequestSize })
    );
    app.use(express.json({ limit: constants.maxRequestSize })); // Default max request body size is 100kb
    
    // CORS middleware
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
      );
      next();
    });

    require("./config/routes")(app);

    const onError = (error) => {
      switch (error.code) {
        case "EACCES":
          winstonLog(
            {},
            constants.logLevel.error,
            `Port '${port}' requires elevated privileges`
          );
          break;
        case "EADDRINUSE":
          winstonLog(
            {},
            constants.logLevel.error,
            `Port '${port}' is already in use`
          );
          break;
        default:
          winstonLog(
            {},
            constants.logLevel.error,
            `An error occurred while starting server: ${error}`
          );
      }
      shutdown();
    };

    const onListening = () => {
      winstonLog(
        {},
        constants.logLevel.info,
        `Server started on port: '${port}'`
      );
    };

    // Creating server
    const server = http.createServer(app);
    server.listen(port);
    server.setTimeout(constants.serverTimeout);
    server.on("error", onError);
    server.on("listening", onListening);
  }
});
