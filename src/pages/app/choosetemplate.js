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
    <div className="ml-72 mt-8">
      <div className = "mb-8 flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-current text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
        <p className="text-lg text-gray-400 font-bold">Dashboard</p>
        <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
        <p className="text-lg text-green-400 font-bold">Template</p>
      </div>
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
