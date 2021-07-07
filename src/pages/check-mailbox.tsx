import { useRouter } from "next/router";

function CheckMailbox() {
  const router = useRouter();
  const email = router.query.e && decodeURIComponent(router.query.e.toString());
  const code = router.query.c && decodeURIComponent(router.query.c.toString());

  return (
    <>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <h1 className="text-4xl font-bold mb-4">Check your mailbox!</h1>
        <p className="text-lg font-bold text-gray-500 mb-4">
          We've sent you a magic link to <b>{email ? email : "your email"}</b>.
        </p>
        <p>Click on the link to finish signing in.</p>
        {code && (
          <p>
            Make sure the verification code matches <b>{code}</b>!
          </p>
        )}
      </div>
    </>
  );
}

export default CheckMailbox;
