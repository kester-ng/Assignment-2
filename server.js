// Import express
let express = require("express");

const serverless = require("serverless-http");

require("dotenv").config();

// Import Body parser
let bodyParser = require("body-parser");

// Import Mongoose
let mongoose = require("mongoose");

// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// set up CORS for the UI
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  next();
});

// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb://admin:password123@ds253922.mlab.com:53922/heroku_jxg6h87t', { useNewUrlParser: true});
//mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
mongoose.connect(
  "mongodb+srv://test:admin@cs3219.fws9e.gcp.mongodb.net/API?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});

/*
//export default app; // need to export for chai testing
module.exports = app
*/

module.exports = {
  server: app,
  handler: serverless(app),
};
