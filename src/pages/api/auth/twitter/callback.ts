import passport from "passport";
import handler from "../../../../server/api-route";
var TwitterStrategy = require("passport-twitter").Strategy;

console.log("hello in callback");

export default handler().use(
  // passport.authenticate("twitter", {
  //   successRedirect: "/app",
  //   failureRedirect: "/login",
  // })
  passport.authenticate("twitter")
  // passport.authenticate(
  //   "twitter",
  //   {
  //     successRedirect: "/app",
  //     failureRedirect: "/login",
  //   },
  //   (err, user) => {
  //     if (err) {
  //       console.log("Error:", err);
  //     } else {
  //       console.log("User:", user);
  //     }
  //   }
  // )
);
