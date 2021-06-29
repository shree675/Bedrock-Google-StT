import Link from "next/link";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";
import { useState } from "react";
import axios from "axios";

function Homepage() {
  const [{ data }] = useGetCurrentUserQuery();
  const [uploadedFile, setUploadedFile] = useState("");

  const upload = () => {
    var formData = new FormData();
    console.log(uploadedFile);
    formData.append("uploadedFile", uploadedFile);
    fetch("/api/uploadfile", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // axios.post("api/uploadfile", formData).then((res) => {
    //   console.log(res);
    // });
    // axios.post("api/uploadfile", { formData }).then((res) => {
    //   console.log(res);
    // });
  };

  const hasUploaded = (event) => {
    setUploadedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <>
      <h1>My SaaS Name</h1>
      <br></br>
      <input type="file" onChange={hasUploaded}></input>
      <button onClick={upload}>Upload</button>
      <h2>This could be your tagline</h2>
      {!data?.currentUser ? (
        <>
          <Link href="/get-started">Get started</Link>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <Link href="/app">Go to dashboard</Link>
      )}
    </>
  );
}

export default Homepage;
