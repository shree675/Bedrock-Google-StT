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
      consumerKey: "9ovckXkGTToo2BwgpUcTqzZsz",
      consumerSecret: "0c2F18KErtbuG1sGAiJfBL31BhEjwt6GRu7vZv4r9Hx55NECgv",
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
