import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const {
    query: { title, transcript, renderdate },
  } = router;
  return (
    <div>
      <h1>Details</h1>
      <h3>Title</h3>
      <div>{title}</div>
      <h4>Date</h4>
      <div>{renderdate}</div>
      <h3>Transcript:</h3>
      <div>{transcript}</div>
    </div>
  );
};

export default Details;
