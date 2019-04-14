const cluster = require("cluster");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");

const Logger = require("./logger.js");

const CONSTANTS = require("./constants.js");

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
};

// the master process
if (cluster.isMaster) {
  // Count the CPUs
  const cpuCount = require("os").cpus().length;
  let i = 0;

  // Create a worker for each CPU
  for (i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on("exit", (worker) => {
    // Replace the dead worker
    Logger.warn(`Worker ${worker.id} died, restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.use(compression({filter: shouldCompress}));
  app.use(bodyParser.json()); // support json encoded bodies

  // configuration ===============================================================

  // set up our express application
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));

  // For CORS
  app.use( (req, res, next) => {
    // Website you wish to allow to connect
    const origin = req.headers.origin;
    if (CONSTANTS.ALLOWED_ORIGINS.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Authorization,X-Requested-With,content-type,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  //Global Vars

  app.use("/", express.static(path.join(__dirname, "/../dist")));
  app.use("/vendor", express.static(path.join(__dirname, "/../node_modules")));

  // routes ======================================================================

  app.get("/about", (req, res) => {
    res.status(200).send(CONSTANTS.ABOUT);
  });

  app.listen(CONSTANTS.PORT, () => {
    Logger.info(`Cluster node ${cluster.worker.id} "${CONSTANTS.ABOUT}" listening at port ${CONSTANTS.PORT}`);
  });
  //end cluster worker
};
