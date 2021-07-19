import AuthenticationForm from "../client/components/AuthenticationForm";
import ReactPlayer from "react-player";

function Login() {
  return (
    <>
      <div style={{ display: "flex", height: "735px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", flex: "1" }}>
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
            <h1 className="text-4xl font-bold mb-4">Welcome back.</h1>
            <h3 className="text-lg font-bold text-gray-500 mb-2">
              Watch an On-demand product wackthrough or live demo, and start
              your 14-day free trial.
            </h3>
            <div style={{ textAlign: "center", marginLeft: "37%" }}>
              <img src="/people.png" height="100px" width="140px"></img>
            </div>
            <br></br>
            <AuthenticationForm />
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
              backgroundColor: "#000f47",
              width: "100%",
              height: "100%",
              textAlign: "center",
              paddingTop: "15%",
              paddingLeft: "7%",
              paddingRight: "auto",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                width: "fit-content",
                boxShadow: "2px 0px 10px #232323",
              }}
            >
              <ReactPlayer
                controls
                url="https://www.youtube.com/watch?v=pl4UYZfVmTA"
              />
            </div>
            <br></br>
            {/* <img src="/hello.png"></img> */}
            <div
              className="text-1xl text-gray-300"
              style={{ textAlign: "left", marginTop: "2%" }}
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
