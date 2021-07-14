/**
 * This is a redundant file used for testing
 * This file is not being used anywhere in the code
 * But please do not delete this file
 */

// ------------------------------------------------------------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
var passport = require("passport"),
  TwitterStrategy = require("passport-twitter").Strategy;
require("https").globalAgent.options.rejectUnauthorized = false;

app.use(express.json());

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  next();
});

app.options("*", cors());

app.use(
  session({
    secret: "fake",
    resave: true,
    saveUninitialized: true,
  })
);

// console.log(process.env.TWITTER_API_KEY);
// app.use(dotenv);
passport.use(
  new TwitterStrategy(
    {
      consumerKey: "9ovckXkGTToo2BwgpUcTqzZsz",
      consumerSecret: "0c2F18KErtbuG1sGAiJfBL31BhEjwt6GRu7vZv4r9Hx55NECgv",
      callbackURL: "http://localhost:5000/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/twitter/login", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000/app",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
