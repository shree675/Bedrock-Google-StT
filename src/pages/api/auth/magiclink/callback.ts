import passport from "passport";
import handler from "../../../../server/api-route";

export default handler()
  .use(passport.authenticate("magiclogin"))
  .use((req, res) => {
    // console.log(req.user);
    res.redirect(req.user?.redirect || "/app");
  });
