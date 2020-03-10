const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES GET
const historyRoute = require("./routes/history");
const eventRoute = require("./routes/event");
const roomsRoute = require("./routes/room");

mongoose
  .connect(
    "mongodb+srv://gamerloby:Mlab@123@gamerloby-yeqqo.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "gamerloby"
    }
  )
  .then(() => {
    console.log("connected to mongodb");
  });

const app = express();

// CONFIG
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(__dirname + "/public"));

// ROUTE PATH
app.use("/api", historyRoute);
app.use("/api/eventlog", eventRoute);
app.use("/api/rooms", roomsRoute);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.send(err);
});

module.exports = app;
