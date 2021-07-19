import AuthenticationFormSignup from "../client/components/AuthenticationForm/signup";
import ReactPlayer from "react-player";

function Signup() {
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "0px",
          height: "735px",
        }}
      >
        <div style={{ textAlign: "center", flex: "1", width: "100%" }}>
          <div
            style={{ padding: "15%", textAlign: "center", paddingTop: "20%" }}
          >
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
            <h1 className="text-4xl font-bold mb-4">Signup for xyz</h1>
            <h3 className="text-lg font-bold text-gray-500 mb-2">
              Watch an On-demand product wackthrough or live demo, and start
              your 14-day free trial.
            </h3>
            <div style={{ textAlign: "center", marginLeft: "37%" }}>
              <img src="/people.png" height="100px" width="140px"></img>
            </div>
            <br></br>
            <AuthenticationFormSignup />
            <a href="/login" style={{ color: "blue" }}>
              <u>Already a user? Login</u>
            </a>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            flex: "1",
            width: "100%",
            padding: "0px",
            margin: "0px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#4565e8",
              width: "fit-content",
              height: "100%",
              textAlign: "center",
              paddingTop: "7%",
              paddingLeft: "7%",
              paddingRight: "auto",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                borderRadius: "5px",
                width: "fit-content",
                boxShadow: "2px 0px 10px #232323",
              }}
            >
              {/* <img src="/dots.svg" height="00px" style={{ zIndex: 5 }}></img> */}

              <ReactPlayer
                controls
                url="https://www.youtube.com/watch?v=AucSVFQ-IPI"
              />
            </div>
            <br></br>
            <div
              className="text-lg text-white"
              style={{ paddingLeft: "10%", paddingRight: "15%" }}
            >
              "Our members are so impressed. It's intuitive. It's clean. It's
              distraction free. If you're building a community where you want
              the focus to be on your members and discussion, I highly recommend
              checking out Circle. I'm glad we made this decision."
            </div>
            <br></br>
            <div className="text-2xl text-white font-bold">Pat Flynn</div>
            <div className="text-gray-300">Founder, Smart Passive Income</div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
