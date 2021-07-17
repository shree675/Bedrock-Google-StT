import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

const TemplatePage = () => {
  const router = useRouter();
  const {
    query: { transcript, timestamps },
  } = router;
  // console.log(window.File);

  useEffect(() => {
    if (localStorage.getItem("isloggedin") === "false") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="ml-40 mt-8">
      <div className="text-2xl font-bold mb-4">Choose your template</div>
      <div className="mb-4">
        Select the layout you like the most. You could customize it later
      </div>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps },
        }}
      >
        <button className="bg-gray-500 hover:bg-blue-700 text-white text-2xl font-bold py-16 px-16 rounded">
          C1
        </button>
      </Link>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps }, ////////////////////////////////// pass timestamps here as well
        }}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-16 px-16 rounded ml-16">
          C2
        </button>
      </Link>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps }, ////////////////////////////////// pass timestamps here as well
        }}
      >
        <button className="bg-green-500 hover:bg-blue-700 text-white text-2xl font-bold py-16 px-16 rounded ml-16">
          C3
        </button>
      </Link>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps }, ////////////////////////////////// pass timestamps here as well
        }}
      >
        <button className="bg-yellow-500 hover:bg-blue-700 text-white text-2xl font-bold py-16 px-16 rounded ml-16">
          C4
        </button>
      </Link>
    </div>
  );
};

export default TemplatePage;
