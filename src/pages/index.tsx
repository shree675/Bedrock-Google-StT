import Link from "next/link";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../client/graphql/createProject.generated";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";

function Homepage() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const router = useRouter();
  const [, createProject] = useMutation(CreateProjectDocument);
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  // const [bb, setbb] = useState("");
  const [filename, setFileName] = useState("");
  const [transcription, setTranscription] = useState("");

  const styles = {
    border: "1px solid black",
    width: 600,
    color: "black",
    padding: 20,
  };

  useEffect(() => {}, [filename]);

  // function getBase64(file) {
  //   if (!file) {
  //     setbb("");
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     setbb(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // }

  const upload = async () => {
    var formData = new FormData();
    console.log(uploadedFile);

    // getBase64(uploadedFile);

    // formData.append("file", bb);
    formData.append("file", uploadedFile);

    // --------------------------------------------

    fetch("/api/uploadfile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        setTranscription(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

    // --------------------------------------------

    // fetch("/api/uploadfile", {
    //   method: "POST",
    //   body: { formData },
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // axios.post("/api/uploadfile", { formData }).then((res) => {
    //   console.log(res);
    // });

    // // works::::
    // axios.post("/api/uploadfile", formData).then((res) => {
    //   console.log(res);
    // });

    // only the below works (latest):
    // ----------------------------------------------------------------
    // fetch("http://localhost:5000/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => {
    //     // console.log(res);
    //     return res.text();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const hasDropped = (files, event) => {
    setUploadedFile(files[0]);
    // getBase64(files[0]);
    console.log(files[0]);
    setFileName(files[0].name);
    setTranscription("");
  };

  const hasUploaded = (event) => {
    setUploadedFile(event.target.files[0]);
    setTranscription("");
    // getBase64(event.target.files[0]);
  };

  if (fetching) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (!data?.currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  return (
    <>
      <h1>Getting Started</h1>
      <h2>
        👋Welcome {data.currentUser.name}! This is your onboading page to play
        around with.
      </h2>
      <br></br>
      <h3>Lets start by uploading an audio file</h3>
      <ul>
        <li>
          Upload audio file, max of 60 seconds in length (.wav, .mp3, .flac,
          etc.)
        </li>
        <li>Select template from our awesome collection</li>
        <li>Render the video with transcript in 3 clicks</li>
      </ul>
      <br></br>
      <div>Upload from computer</div>
      <br></br>
      <input type="file" onChange={hasUploaded}></input>
      <div>Or</div>
      <div styles={styles}>
        <FileDrop
          onFrameDragEnter={(event) => {}}
          onFrameDragLeave={(event) => {}}
          onFrameDrop={(event) => {}}
          onDragOver={(event) => {}}
          onDragLeave={(event) => {}}
          onDrop={(files, event) => {
            hasDropped(files, event);
          }}
        >
          {filename === ""
            ? "Drag and drop an audio file"
            : `${filename} (or) Drop a different file`}
        </FileDrop>
      </div>
      <br></br>
      <button onClick={upload}>Upload</button>
      <div>We currently support only 60 seconds</div>
      <div>
        {transcription === "" ? (
          <>
            <h4>Transcription:</h4>
            <div>(Please upload a file)</div>
          </>
        ) : (
          <>
            <h4>Transcription:</h4>
            <div>{transcription}</div>
          </>
        )}
      </div>
      <br></br>
      <Link href="/app/template">
        <button>Proceed</button>
      </Link>
      {/* <h3>Create Projects</h3>
      <ul>
        {data.currentUser.projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/app/${project.slug}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
      <input
        placeholder="Hooli Inc."
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <button
        disabled={!name}
        onClick={() => {
          createProject({
            name,
          }).then((result) => {
            const slug = result.data?.createProject?.slug;
            if (slug) router.push(`/app/${slug}`);
          });
        }}
      >
        Create project
      </button> */}
      <br></br>
    </>
  );
}

export default Homepage;
