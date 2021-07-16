import { useRouter } from "next/router";
import { useState } from "react";
import { useGetUserEmailMutation } from "../../graphql/getUserEmail.generated";
import Link from "next/link";
import passport from "passport";
var TwitterStrategy = require("passport-twitter").Strategy;

/**
 * Used on the Login and Sign Up screens to handle authentication. Can be shared between those as Passport.js doesn't differentiate between logging in and signing up.
 */
export default function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { r } = router.query;
  // const redirect = r?.toString();
  // const [data1]=useGetUserEmailMutation();
  const [, getUserEmail] = useGetUserEmailMutation();

  return (
    <div>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();

          const x = await getUserEmail({
            email: email,
          });
          // console.log(x.data?.getUserEmail);

          // POST a request with the users email or phone number to the server
          fetch(`/api/auth/magiclink`, {
            method: `POST`,
            body: JSON.stringify({
              redirect: x.data?.getUserEmail ? "/app" : "/",
              destination: email,
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                // Add the email and security code to the query params so we can show them on the /check-mailbox page
                router.push(
                  `/check-mailbox?e=${encodeURIComponent(email)}&c=${json.code}`
                );
              }
            });
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />
        &emsp;
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Login
        </button>
      </form>
      <a href="http://localhost:3000/api/auth/twitter">
        <button className="bg-white-500 text-black hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded mb-4 border">
          <div style={{ display: "flex" }}>
            <div style={{ flex: "0.3" }}>
              <img src="/twitter.svg" height="30px" width="30px"></img>
            </div>
            &ensp;
            <div style={{ flex: "2" }}> Sign up with Twitter</div>
          </div>
        </button>
      </a>
      <br></br>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={async () => {
          passport.use(
            new TwitterStrategy(
              {
                consumerKey: "",
                consumerSecret: "",
                callbackURL: "http://localhost:3000/api/auth/twitter/callback",
              },
              function (token: any, tokenSecret: any, profile: any, cb: any) {
                console.log(profile);
                return cb();
              }
            )
          );
          passport.initialize();
          passport.session();
          passport.authenticate("twitter", (err, user) => {
            console.log("err", err);
            console.log("user", user);
          });
          console.log(passport);
        }}
      >
        Login with Twitter
      </button>
    </div>
  );
}
