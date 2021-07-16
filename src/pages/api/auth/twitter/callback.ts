import passport from "passport";
import handler from "../../../../server/api-route";
var TwitterStrategy = require("passport-twitter").Strategy;

console.log("hello in callback");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: "http://localhost:3000/api/auth/twitter/callback",
    },
    function (token: any, tokenSecret: any, profile: any, cb: any) {
      console.log("profile", profile);
      console.log("token", token);
      console.log("tokensecret", tokenSecret);
      return cb(null, "stackwork87@gmail.com");
    }
  )
);

export default handler().use(
  // passport.authenticate("twitter", {
  //   successRedirect: "/app",
  //   failureRedirect: "/",
  // })
  // passport.authenticate("twitter")
  passport.authenticate("twitter", (err, user) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("User:", user);
    }
  })
);

// export default function (req: any, res: any) {
//   passport.authenticate("twitter", (err, user) => {
//     if (err) {
//       console.log("error:", err.message);
//       return res.status(500).send(err.message);
//     } else {
//       console.log("user:", user);
//       return res.status(200).send(user.name);
//     }
//   });
// }
