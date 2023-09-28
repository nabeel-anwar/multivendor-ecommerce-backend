const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const AppError = require("./utils/appError");

const userRouter = require('./routes/userRoutes');
const seedRouter = require('./routes/seedRoutes');

const app = express();

// 1) Middlewares

//Morgan for logs into console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Applying rate limiter
app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP, please try again in a hour",
  })
);

app.use(express.json());

// Data Sanitize against NoSql query injection
app.use(mongoSanitize());

// Data Sanitize against XSS
app.use(xss());

// Added Request Time.
app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

// 2) Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/seed', seedRouter);
app.all("*", (request, response, next) => {
  // const err = new Error(`can't find ${request.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`can't find ${request.originalUrl} on this server`, 404)); // calling next() with param jumps to error middleware
});

// 3) Error Handling Middleware
app.use((err, request, response, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  console.log(err);

  response.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
