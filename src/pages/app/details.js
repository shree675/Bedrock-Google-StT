import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const {
    query: { title, transcript, renderdate },
  } = router;
  return (
    <div>
      <h1>Details</h1>
      <div>Title</div>
      <div>{title}</div>
      <div>Date</div>
      <div>{renderdate}</div>
      <div>Transcript:</div>
      <div>{transcript}</div>
    </div>
  );
};

export default Details;
