// // import handler from "../../../../server/api-route";
// // import twitter from "../../../../server/passport/twitter";
// import passport from "passport";
// // export default handler().post(twitter.send);

// export default function () {
//   passport.authenticate("twitter", {
//     successRedirect: "/app",
//     failureRedirect: "/login",
//   });
// }

import passport from "passport";
import handler from "../../../../server/api-route";

console.log("hello");

export default handler()
  .use(
    passport.authenticate("twitter", {
      successRedirect: "/app",
      failureRedirect: "/login",
    })
  )
  .use((req, res) => {
    console.log(req.user);
    res.redirect(req.user?.redirect || "/app");
  });
