"use-strict";

/* Environment Variables from .env */
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

/* Installed Modules */
const express = require("express");
const app = express();
const courses = require(__dirname+'/routes/api/courses');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
/* Setup database */
mongoDBUrl = "mongodb://localhost/code4degree";
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Database connected");
});

/* Set up View */
app.set("views", "./views"); 
app.set("view engine", "pug"); //Can used for quickly testing out the backend

/* Set up body parser to parse json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*Routes*/
app.get("/", (req, res, next) => {
  res.render("welcome", {
    title: "Code4Degree",
    message: "An online assignment submission platform"
  });
});

app.use('/api/user/:userId/course', (req, res, next) => {
  res.locals.userId = req.params.userId;
  next();
},courses);


app.listen(port, () => console.log(`${env} server listening on port ${port}!`));
