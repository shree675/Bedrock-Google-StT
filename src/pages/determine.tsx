import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useGetUserEmailMutation } from "../client/graphql/getUserEmail.generated";
import Link from "next/link";
import passport from "passport";
var TwitterStrategy = require("passport-twitter").Strategy;
import { useCreateUserMutation } from "../client/graphql/createUser.generated";

/**
 * Used on the Login and Sign Up screens to handle authentication. Can be shared between those as Passport.js doesn't differentiate between logging in and signing up.
 */
export default function Determine() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { r } = router.query;
  const [, getUserEmail] = useGetUserEmailMutation();
  const [, createUser] = useCreateUserMutation();
  const [signuptrue, setSignup] = useState(true);
  const [logintrue, setLogin] = useState(true);

  const {
    query: { profileid, username, emailad },
  } = router;

  useEffect(() => {
    console.log(localStorage.getItem("isloggedin"));
    if (localStorage.getItem("isloggedin") === "true") {
      router.push("/app");
    }
  }, []);

  useEffect(() => {
    if (profileid) {
      if (localStorage.getItem("fromsignup") === "true") {
        getUserEmail({
          id: profileid,
        }).then((data) => {
          if (data.data?.getUserEmail) {
            setSignup(false);
            setLogin(true);
            localStorage.setItem("isloggedin", "false");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
            // router.push("/login");
          } else {
            setSignup(true);
            setLogin(true);
            localStorage.setItem("isloggedin", "true");
            localStorage.setItem("userid", profileid);
            localStorage.setItem("name", username);
            createUser({
              id: profileid,
              name: username,
              email: emailad,
            });
            router.push("/");
          }
        });
      } else {
        getUserEmail({
          id: profileid,
        }).then((data) => {
          if (data.data?.getUserEmail) {
            setSignup(true);
            setLogin(true);
            localStorage.setItem("isloggedin", "true");
            localStorage.setItem("name", data.data?.getUserEmail.name);
            localStorage.setItem("userid", data.data.getUserEmail.id);
            router.push("/app");
          } else {
            setSignup(true);
            setLogin(false);
            localStorage.setItem("isloggedin", "false");

            setTimeout(() => {
              router.push("/signup");
            }, 2000);
            // router.push("/signup");
          }
        });
      }
    }
  }, [profileid, logintrue, signuptrue]);

  return (
    <div>
      {signuptrue ? null : (
        <div style={{ textAlign: "center", paddingTop: "3%" }}>
          <div style={{ padding: "1%", textAlign: "center" }}>
            <img
              className="block h-10 w-auto"
              style={{
                textAlign: "center",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </div>
          <div className="text-4xl font-bold mb-4">Welcome to xyz</div>
          <div
            style={{
              textAlign: "center",
              margin: "15%",
              backgroundColor: "#ff8888",
              borderRadius: "10px",
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <div style={{ textAlign: "center", padding: "5%" }}>
              <div className="text-2xl font-bold mb-4 text-white">
                You are already an existing user. Please login.
              </div>
              <div className="text-1xl font-bold mb-4">
                Redirecting to login...
              </div>
            </div>
          </div>
        </div>
      )}
      {logintrue ? null : (
        <div style={{ textAlign: "center", paddingTop: "3%" }}>
          <div style={{ padding: "1%", textAlign: "center" }}>
            <img
              className="block h-10 w-auto"
              style={{
                textAlign: "center",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </div>
          <div className="text-4xl font-bold mb-4">Welcome to xyz</div>
          <div
            style={{
              textAlign: "center",
              margin: "15%",
              backgroundColor: "#ff8888",
              borderRadius: "10px",
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <div style={{ textAlign: "center", padding: "5%" }}>
              <div className="text-2xl font-bold mb-4 text-white">
                You are a new user. Please sign up.
              </div>
              <div className="text-1xl font-bold mb-4">
                Redirecting to sign up...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
