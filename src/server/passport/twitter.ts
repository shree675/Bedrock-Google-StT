import passport from "passport";
// const TwitterStrategy = require("passport-twitter").Strategy;
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
  console.log(email);
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

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWITTER_API_KEY,
//       consumerSecret: process.env.TWITTER_API_SECRET_KEY,
//       callbackURL: "/auth/twitter/callback",
//       twitter_callback: async (req: any, res: any) => {
//         try {
//           const twitter_user = await req.user;
//           console.log(twitter_user);
//           const user = await prisma.user.upsert({
//             create: {
//               email: twitter_user.emails[0].value,
//             },
//             update: {},
//             where: {
//               email: twitter_user.emails[0].value,
//             },
//           });
//           // const user = await User.create({
//           //   name: twitter_user.displayName,
//           //   email: twitter_user.emails[0].value,
//           // });

//           res.redirect("/app");
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//     function (token: any, tokenSecret: any, profile: any, done: any) {
//       done(null, profile);
//     }

// );

const twitterLink = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET_KEY,
    callbackURL: "http://localhost:3000/api/auth/twitter/callback",
    //   twitter_callback: async (req: any, res: any) => {
    //     try {
    //       const twitter_user = await req.user;
    //       console.log(twitter_user);
    //       const user = await prisma.user.upsert({
    //         create: {
    //           email: twitter_user.emails[0].value,
    //         },
    //         update: {},
    //         where: {
    //           email: twitter_user.emails[0].value,
    //         },
    //       });
    //       // const user = await User.create({
    //       //   name: twitter_user.displayName,
    //       //   email: twitter_user.emails[0].value,
    //       // });

    //       res.redirect("/app");
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
  },
  function (token: any, tokenSecret: any, profile: any, done: any) {
    console.log(profile);
    done(null, profile);
  }
);

// console.log(twitterLink);

// passport.use(twitterLink);

export default twitterLink;
