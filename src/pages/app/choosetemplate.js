import { useRouter } from "next/router";
import Link from "next/link";

const TemplatePage = () => {
  const router = useRouter();
  const {
    query: { transcript },
  } = router;
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
          query: { transcript }, ////////////////////////////////// pass timestamps as well
        }}
      >
        <button>Next {"<-"} this is a button</button>
      </Link>
    </div>
  );
};

export default TemplatePage;
