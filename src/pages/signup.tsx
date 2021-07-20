import AuthenticationFormSignup from "../client/components/AuthenticationForm/signup";
import ReactPlayer from "react-player";

function Signup() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-full p-0 h-screen">
        <div className="text-center flex-1 w-full">
          <div className="p-48 text-center pt-32">
            <img
              className="block h-10 w-auto text-center w-min ml-auto mr-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <br></br>
            <h1 className="text-4xl font-bold mb-4">Signup for xyz</h1>
            <h3 className="text-lg font-bold text-gray-500 mb-2">
              Watch an On-demand product wackthrough or live demo, and start
              your 14-day free trial.
            </h3>
            <div className="text-center ml-32">
              <img src="/people.png" height="100px" width="140px"></img>
            </div>
            <br></br>
            <AuthenticationFormSignup />
            <a href="/login" className="text-blue-600">
              <u>Already a user? Login</u>
            </a>
          </div>
        </div>
        <div
          className="text-center flex-1 w-screen p-0 m-0 mx-auto"
        >
          <div
            className="bg-blue-600 w-full h-full text-center pt-32 pl-28 pr-auto"
          >
            <div className="absolute z-10 mt-48 ml-96 pl-16 ">
              <img src="/dots.png" height="150px" width="150px" className="transform rotate-45"/>
            </div>
            <div className="overflow-hidden rounded-md w-min shadow-2xl absolute z-20">
              {/* <img src="/dots.svg" height="00px" style={{ zIndex: 5 }}></img> */}

              <ReactPlayer width="540px" height="320px"
                controls
                url="https://www.youtube.com/watch?v=AucSVFQ-IPI"
              />
            </div>
            <br></br>
            <div
              className="text-sm text-white pl-20 pr-48 mt-80 pt-8 absolute z-20"

            >
              "Our members are so impressed. It's intuitive. It's clean. It's
              distraction free. If you're building a community where you want
              the focus to be on your members and discussion, I highly recommend
              checking out Circle. I'm glad we made this decision."
            </div>
            <br></br>
            <div className="text-xl text-white font-bold mt-96 pt-16 ml-56 absolute z-20">Pat Flynn</div>
            <div className="text-gray-300 text-sm absolute z-20 mt-96 pt-24 ml-44">Founder, Smart Passive Income</div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
