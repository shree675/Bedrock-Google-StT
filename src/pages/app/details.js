import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { useEffect } from "react";

const Details = () => {
  const router = useRouter();
  const {
    query: { title, transcript, renderdate },
  } = router;

  useEffect(() => {
    if (localStorage.getItem("isloggedin") === "false") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="ml-72 mt-8">
      <div className = "mb-8 flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-current text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
        <p className="text-lg text-gray-400 font-bold">Dashboard</p>
        <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
        <p className="text-lg text-green-400 font-bold">Title</p>
      </div>
      <h1 className="text-4xl font-bold mb-4">Details</h1>
      <h3 className="text-lg font-bold text-gray-500 mb-1">Title</h3>
      <div>{title}</div>
      <br></br>
      <h4 className="text-lg font-bold text-gray-500 mb-1">Date</h4>
      <div>{renderdate}</div>
      <br></br>
      <div>
        <ReactPlayer
          controls
          url="https://www.youtube.com/watch?v=9P8mASSREYM"
        />
      </div>
      <br></br>
      <h3 className="text-lg font-bold text-gray-500 mb-1">Transcript:</h3>
      <div style={{ paddingRight: "10%" }}>{transcript}</div>
      <br></br>
    </div>
  );
};

export default Details;
