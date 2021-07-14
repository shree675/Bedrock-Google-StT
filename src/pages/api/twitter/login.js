import passport from "passport";

export default function (req, res) {
  console.log("----- /twitter/login -----");
  passport.authenticate("twitter");
}
