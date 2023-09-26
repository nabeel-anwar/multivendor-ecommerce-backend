const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

//Morgan for logs into console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

// Applying rate limiter
app.use('/api',
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

module.exports = app;
