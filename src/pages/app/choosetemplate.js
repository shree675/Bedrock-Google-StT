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
    if (
      localStorage.getItem("isloggedin") === null ||
      localStorage.getItem("isloggedin") === undefined
    ) {
      router.push("/signup");
    }
    if (localStorage.getItem("isloggedin") === "false") {
      router.push("/signup");
    }
  }, []);

  return (
    <div className="ml-72 mt-8">
      <div className="mb-8 flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 stroke-current text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
        <p className="text-lg text-gray-400 font-bold">Dashboard</p>
        <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
        <p className="text-lg text-green-400 font-bold">Template</p>
      </div>
      <div className=" font-bold mb-4"><h1 className="text-3xl">Choose your template</h1></div>
      <div className="mb-16 text-gray-600  ">
        Select the layout you like the most. You could customize it later
      </div>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps },
        }}
      >
        <button className="bg-gray-500 hover:bg-gray-600 text-black text-3xl font-bold py-20 px-20 rounded">
          T1
        </button>
      </Link>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps }, ////////////////////////////////// pass timestamps here as well
        }}
      >
        <button className="bg-pink-300 hover:bg-pink-400 text-black text-3xl font-bold py-20 px-20 rounded ml-12">
          T2
        </button>
      </Link>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps }, ////////////////////////////////// pass timestamps here as well
        }}
      >
        <button className="bg-purple-300 hover:bg-purple-400 text-black text-3xl font-bold py-20 px-20 rounded ml-12">
          T3
        </button>
      </Link>
      <Link
        href={{
          pathname: "/app/edittemplate",
          query: { transcript, timestamps }, ////////////////////////////////// pass timestamps here as well
        }}
      >
        <button className="bg-green-300 hover:bg-green-400 text-black text-3xl font-bold py-20 px-20 rounded ml-12">
          T4
        </button>
      </Link>
    </div>
  );
};

export default TemplatePage;
