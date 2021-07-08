import handler from "../../../../server/api-route-twt";
import twitterLink from "../../../../server/passport/twitter";

export default handler().post(twitterLink);
