import { useRouter } from "next/router";
import { useEffect } from "react";

const Feedback = () => {
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
  });

  return (
    <div>
      <h1>Feedback</h1>
    </div>
  );
};

export default Feedback;
