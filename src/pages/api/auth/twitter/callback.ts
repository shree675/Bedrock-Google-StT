import passport from "passport";
import handler from "../../../../server/api-route";

console.log("hello in callback");

export default handler().use(
  // passport.authenticate("twitter", {
  //   successRedirect: "/app",
  //   failureRedirect: "/",
  // })
  // passport.authenticate("twitter")
  passport.authenticate("twitter", (err, user) => {
    if (err) {
      console.log("Error:", err.message);
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
