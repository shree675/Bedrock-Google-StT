import AuthenticationForm from "../client/components/AuthenticationForm";

function Login() {
  return (
    <>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <br></br>
        <AuthenticationForm />
      </div>
    </>
  );
}

export default Login;
