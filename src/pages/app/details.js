import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { useEffect } from "react";

const Details = () => {
  const router = useRouter();
  const {
    query: { title, transcript, renderdate },
  } = router;

  useEffect(() => {
    if (
      localStorage.getItem("isloggedin") === null ||
      localStorage.getItem("isloggedin") === undefined
    ) {
      router.push("/login");
    }
    if (localStorage.getItem("isloggedin") === "false") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="ml-40 mt-8">
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
