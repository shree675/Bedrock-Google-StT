import AuthenticationForm from "../client/components/AuthenticationForm";

function Login() {
  return (
    <>
      <br></br>
      <div style={{ display: "flex" }}>
        <div style={{ textAlign: "center", flex: "1" }}>
          <div style={{ padding: "15%", textAlign: "center" }}>
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
            <br></br>
            <h1 className="text-4xl font-bold mb-4">Welcome back.</h1>
            <h3 className="text-lg font-bold text-gray-500 mb-2">
              Watch an On-demand product wackthrough or live demo, and start
              your 14-day free trial.
            </h3>
            <br></br>
            <AuthenticationForm />
          </div>
        </div>
        <div style={{ textAlign: "center", flex: "1" }}>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
