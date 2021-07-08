// import handler from "../../../../server/api-route";
// import twitter from "../../../../server/passport/twitter";
import passport from "passport";
// export default handler().post(twitter.send);

export default function () {
  passport.authenticate("twitter", {
    successRedirect: "/app",
    failureRedirect: "/login",
  });
}
