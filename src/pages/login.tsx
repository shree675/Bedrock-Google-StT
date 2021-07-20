import AuthenticationForm from "../client/components/AuthenticationForm";
import ReactPlayer from "react-player";

function Login() {
  return (
    <>
      <div
      className="flex h-screen overflow-hidden"
      >
        <div className="text-center flex-1">
          <div
            className="p-48 text-center pt-48"
          >
            <img
              className="block h-10 w-auto text-center w-min mx-auto"
              
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <br></br>
            <h1 className="text-4xl font-bold mb-4">Welcome back.</h1>
            <h3 className="text-lg font-bold text-gray-500 mb-2">
              Watch an On-demand product wackthrough or live demo, and start
              your 14-day free trial.
            </h3>
            <div className="text-center ml-32">
              <img src="/people.png" height="100px" width="140px"></img>
            </div>
            <br></br>
            <AuthenticationForm />
          </div>
        </div>
        <div
          className="text-center flex-1 w-full p-0 m-0 mx-auto"
        >
          <div
            className="bg-indigo-900 w-full h-full text-center pt-48 pl-16 pr-auto"
          >
            <div
              className="overflow-hidden w-min shadow-2xl"
            >
              <ReactPlayer
                controls
                url="https://www.youtube.com/watch?v=pl4UYZfVmTA"
              />
            </div>
            <br></br>
            {/* <img src="/hello.png"></img> */}
            <div
              className="text-1xl text-gray-300 text-left mt-6"
            >
              FROM THE PART OF THE TEAM THAT BUILD XYZ
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Login;
