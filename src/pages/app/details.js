import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const {
    query: { title, transcript, renderdate },
  } = router;
  return (
    <div className="ml-40 mt-8">
      <h1 className="text-4xl font-bold mb-4">Details</h1>
      <h3 className="text-lg font-bold text-gray-500 mb-1">Title</h3>
      <div>{title}</div>
      <br></br>
      <h4 className="text-lg font-bold text-gray-500 mb-1">Date</h4>
      <div>{renderdate}</div>
      <br></br>
      <h3 className="text-lg font-bold text-gray-500 mb-1">Transcript:</h3>
      <div style={{ paddingRight: "10%" }}>{transcript}</div>
      <br></br>
    </div>
  );
};

export default Details;
