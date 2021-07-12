// import twitterLink from "../../../../server/passport/twitter";
import passport from "passport";
var TwitterStrategy = require("passport-twitter");
import prisma from "../../../../server/db/prisma";
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

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string;
      email: string;
      provider: string;
      redirect?: string;
    }
  }
}
// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser(async (u: Express.User, done) => {
  const email = u.email.toLowerCase();
  const user = await prisma.user.upsert({
    create: {
      email,
    },
    update: {},
    where: {
      email,
    },
  });

  done(null, {
    ...u,
    id: user.id,
  });
});

passport.deserializeUser(async (user: Express.User, done) => {
  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: "/auth/twitter/callback",
      twitter_callback: async (req, res) => {
        try {
          const twitter_user = await req.user;
          const user = await prisma.user.upsert({
            create: {
              email: twitter_user.emails[0].value,
            },
            update: {},
            where: {
              email: twitter_user.emails[0].value,
            },
          });
          // const user = await User.create({
          //   name: twitter_user.displayName,
          //   email: twitter_user.emails[0].value,
          // });

          // const token = user.generateAuthToken();
          // res.header("x_auth_token", token).json({
          //   msg: "callback called",
          //   status: 200,
          // });

          res.redirect("/");
        } catch (err) {
          console.log(err);
          // res.status(500).json(err);
        }
      },
    },
    function (token, tokenSecret, profile, done) {
      done(null, profile);
    }
  )
);

const twitterLink = new TwitterStrategy({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET_KEY,
  callbackURL: "/auth/twitter/callback",
  twitter_callback: async (req, res) => {
    try {
      const twitter_user = await req.user;
      const user = await prisma.user.upsert({
        create: {
          email: twitter_user.emails[0].value,
        },
        update: {},
        where: {
          email: twitter_user.emails[0].value,
        },
      });
      // const user = await User.create({
      //   name: twitter_user.displayName,
      //   email: twitter_user.emails[0].value,
      // });

      // const token = user.generateAuthToken();
      // res.header("x_auth_token", token).json({
      //   msg: "callback called",
      //   status: 200,
      // });

      // res.redirect("/");
    } catch (err) {
      console.log(err);
      // res.status(500).json(err);
    }
  },
});

// export default handler();
export default passport;
