import { useRouter } from "next/router";
import { useState } from "react";

/**
 * Used on the Login and Sign Up screens to handle authentication. Can be shared between those as Passport.js doesn't differentiate between logging in and signing up.
 */
export default function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { r } = router.query;
  const redirect = r?.toString();

  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          // POST a request with the users email or phone number to the server
          fetch(`/api/auth/magiclink`, {
            method: `POST`,
            body: JSON.stringify({
              redirect,
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
          placeholder="me@hello.com"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        &emsp;
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Let's go!
        </button>
      </form>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={async () => {
          fetch(`/api/auth/twitter`, {
            method: `POST`,
            body: JSON.stringify({
              redirect,
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        Twitter Login
      </button>
    </div>
  );
}
