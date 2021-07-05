import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../../client/graphql/createProject.generated";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";
import { use } from "passport";
import { useGetTranscriptsQuery } from "../../client/graphql/getTranscripts.generated";
import { GetStaticProps } from "next";

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const [data1] = useGetTranscriptsQuery();
  const [uploadedFile, setUploadedFile] = useState("");
  const [filename, setFileName] = useState("");
  const [transcription, setTranscription] = useState("");
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");

  const styles = {
    border: "1px solid black",
    width: 600,
    color: "black",
    padding: 20,
  };

  useEffect(() => {
    const transcripts = data1?.data?.transcript;
    setResults(transcripts);
  }, [filename, data1?.data?.transcript]);

  const upload = async () => {
    var formData = new FormData();
    console.log(uploadedFile);

    formData.append("file", uploadedFile);

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

  const newTo = {
    pathname: "/app/details",
    title: title,
    transcript: transcript,
  };

  return (
    <>
      {!data?.currentUser ? (
        <>
          <h3>Sign up to our account and get started</h3>
          <Link href="/get-started">Get started</Link>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <>
          <h1>Hello, {data.currentUser.name}</h1>
          <div>Welcome to xyz</div>
          <br></br>
          <div>Upload from computer</div>

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
          <Link href="/app/details">
            <button>Proceed</button>
          </Link>
          <h3>Previous Transcriptions</h3>
          <table>
            <tr>
              <td>TITLE</td>
              <td>FILETYPE</td>
              <td>EXPIRATION DATE</td>
              <td>STATUS</td>
            </tr>
            {results
              ? results.map((row) => (
                  <>
                    <button
                      onClick={() => {
                        setTitle(row["title"]);
                        setTranscript(row["transcript"]);
                      }}
                    >
                      <Link
                        href={{
                          pathname: "/app/details",
                          query: {
                            title: row["title"],
                            transcript: row["transcript"],
                            renderdate: row["renderdate"],
                          },
                        }}
                      >
                        <tr>
                          <td>{row["title"]}</td>
                          <td>{row["filetype"]}</td>
                          <td>{row["expirationdate"]}</td>
                          <td>
                            <div>{row["status"]}</div>
                            <div>Render Date: {row["renderdate"]}</div>
                          </td>
                        </tr>
                      </Link>
                    </button>
                  </>
                ))
              : null}
          </table>
        </>
      )}
    </>
  );
}
