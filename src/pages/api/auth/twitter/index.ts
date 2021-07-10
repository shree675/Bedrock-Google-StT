// import handler from "../../../../server/api-route-twt";
import twitterLink from "../../../../server/passport/twitter";

// export default handler().post(twitterLink);

import passport from "passport";
var TwitterStrategy = require("passport-twitter");
// var sess = require("express-session");
import handler from "../../../../server/api-route";

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: "/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});
passport.deserializeUser(function (object, callback) {
  callback(null, object);
});

// passport.initialize();
// passport.authenticate("twitter");
// passport.session();

export default handler().post(twitterLink.send());
// export default passport;
