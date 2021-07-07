import { useRouter } from "next/router";
import Link from "next/link";

const TemplatePage = () => {
  const router = useRouter();
  const {
    query: { transcript, timestamps },
  } = router;
  // console.log(audiourl);
  return (
    <div>
      <h1>
        This is a mock page for choosing templates (we need not implement it
        now)
      </h1>
      <div>Choose your template</div>
      <div>
        Select the layout you like the most. You could customize it later
      </div>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps },
        }}
      >
        <button>Proceed</button>
      </Link>
    </div>
  );
};

export default TemplatePage;
