import Link from "next/link";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";
// import { useGetTranscriptsQuery } from "../client/graphql/getTranscripts.generated";
// import { useCreateTranscriptsQuery } from "../client/graphql/getTranscripts.generated";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../client/graphql/createProject.generated";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";
import Navbar from "../client/components/Navbar";
import { useCreateTranscriptMutation } from "../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";

function Homepage() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const [, createTranscript] = useCreateTranscriptMutation();
  const currentUser = data?.currentUser;

  // const [data1] = useGetTranscriptsQuery();

  const router = useRouter();
  const [, createProject] = useMutation(CreateProjectDocument);
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [filename, setFileName] = useState("");
  const [transcription, setTranscription] = useState("(empty)");
  const [apiData, setApiData]=useState({});

  const styles = {
    border: "1px solid black",
    width: 600,
    color: "black",
    padding: 20,
  };

  useEffect(() => {}, [filename]);

  

  const upload = async () => {
    var formData = new FormData();
    console.log(uploadedFile);
    formData.append("file", uploadedFile);

    // --------------------------------------------

    fetch("/api/uploadfile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setTranscription(apiData.transcription)
        console.log("apiData: ",apiData);
        console.log("data : ",data.words);
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
    console.log(files[0]);
    setFileName(files[0].name);
    setTranscription("");
  };

  const hasUploaded = (event) => {
    setUploadedFile(event.target.files[0]);
    setTranscription("");
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
      {/* <Navbar /> */}
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
      {/* <Link href="/proceed">
        <button
          onClick={async () => {
            toast.promise(
              createTranscript({
                title: "title_abc",
                transcript: transcription,
                filetype: "audio file",
                expirationdate: new Date().toDateString(),
                renderdate: new Date().toDateString(),
                status: "OK",
                userid: currentUser ? currentUser.id : "",
              }),
              {
                loading: `Updating settings...`,
                success: `Settings updated!`,
                error: (err) => err,
              }
            );
          }}
        >
          Save
        </button>
      </Link>
      <br></br> */}
      <Link
        href={{
          pathname: "/app/choosetemplate",
          query: {
            transcript: transcription, ////////////////////////////////// also pass timestamps
          },
        }}
      >
        <button>Proceed</button>
      </Link>
      <br></br>
    </>
  );
}

export default Homepage;
