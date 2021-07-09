import handler from "../../../server/api-route";

export default handler().get((req, res) => {
  // console.log(req.headers.cookie);
  req.logout();
  // console.log(req.headers.cookie);
  // console.log(res);
  res.redirect("/");
});
