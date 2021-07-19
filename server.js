const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
var passport = require("passport"),
  TwitterStrategy = require("passport-twitter").Strategy;
const { redirect } = require("next/dist/next-server/server/api-utils");
require("https").globalAgent.options.rejectUnauthorized = false;
// import prisma from "./src/server/db/prisma";

var p = "";

app.use(express.json());

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use((req, res, next) => {
//   res.header({
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "application/json",
//   });
//   next();
// });

// app.options("*", cors());

app.use(
  session({
    secret: "fake",
    resave: true,
    saveUninitialized: true,
  })
);

// var p = "";

// app.use(dotenv);
passport.use(
  new TwitterStrategy(
    {
      consumerKey: "HSA8cY1wJZjpN0JNsGcEgzo8V",
      consumerSecret: "r5lXauB57n87nkkAgZGHGBGUKhMaah8j5NiXxDRVaUdT0hsFls",
      callbackURL: "http://localhost:5000/auth/twitter/callback",
      includeEmail: true,
    },
    function (token, tokenSecret, profile, done) {
      // console.log(profile);
      // setP(profile.id);
      // p = profile.id;
      global.id = profile.id;
      console.log("global.id", global.id);
      done(null, profile);
    }
  )
);

passport.serializeUser(async function (user, callback) {
  // if (!p) {
  //   p = user.id;
  global.id = user.id;
  // }
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/twitter/login", passport.authenticate("twitter"));

// console.log("hello:", p);

// app.get(
//   "/auth/twitter/callback",
//   passport.authenticate("twitter", {
//     successRedirect: "http://localhost:3000/app?profileid=" + global.id,
//     failureRedirect: "http://localhost:3000/login",
//   })
// );

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter"),
  function (req, res) {
    console.log(req.isAuthenticated());
    res.redirect(
      "http://localhost:3000/determine?profileid=" +
        req.user.id +
        "&username=" +
        req.user.username +
        "&emailad=" +
        req.user.emails[0].value
    );
  }
);

app.listen(5000, () => {
  console.log("listening on port 5000");
});

module.exports = {
  p: p,
};
