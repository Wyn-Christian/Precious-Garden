const mongoose = require("mongoose");
const castAggregation = require("mongoose-cast-aggregation");
require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
var app = express();

// Import Routers
var indexRouter = require("./routes/index");
var catalogRouter = require("./routes/catalog");

mongoose.plugin(castAggregation);
mongoose.set("toJSON", { virtuals: true });
mongoose.set("id", true);
mongoose.set("strictQuery", false);

const mongodbUrl = process.env.MONGO_URL;
mongoose
  .connect(process.env.MONGODB_URI || mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "precious-garden",
  })
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });
let db = mongoose.connection;

// MIDDLEWARES
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", indexRouter);
app.use("/", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err.stack);
  res.json({
    error: err.message,
  });
});

module.exports = app;
