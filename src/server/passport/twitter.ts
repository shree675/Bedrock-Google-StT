import passport from "passport";
import TwitterStrategy from "passport-twitter";
import prisma from "../db/prisma";

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
      consumerKey: "9ovckXkGTToo2BwgpUcTqzZsz",
      consumerSecret: "0c2F18KErtbuG1sGAiJfBL31BhEjwt6GRu7vZv4r9Hx55NECgv",
      callbackURL: "/auth/twitter/callback",
    },
    async (email, done) => {
      console.log(email);
      await prisma.user.upsert({
        create: {
          email,
        },
        update: {},
        where: {
          email,
        },
      });
    }
  )
);

const twitterLink = new TwitterStrategy({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET_KEY,
  callbackURL: "/auth/twitter/callback",
});

export default twitterLink;
