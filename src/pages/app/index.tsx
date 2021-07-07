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
import { useTranscriptQuery } from "../../client/graphql/getTranscripts.generated";
import { GetStaticProps } from "next";
import index from "../index.tsx";

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const [data1] = useTranscriptQuery();
  const [uploadedFile, setUploadedFile] = useState("");
  const [filename, setFileName] = useState("");
  const [transcription, setTranscription] = useState("");
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [timestamps, setTimestamps] = useState("");
  const [apiData, setApiData] = useState({});

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
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setTranscription(data.transcription);
        // console.log("transcript: ", data.transcription);
        // console.log("data : ", data.words);
        setTimestamps(JSON.stringify(data.words));
        // console.log(JSON.stringify(data.words));
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

  return (
    <div className="ml-20 mt-8">
      {!data?.currentUser ? (
        <>
          <h3>Sign up to our account and get started</h3>
          <br></br>
          <Link href="/get-started">Get started</Link>
          <br></br>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">
            Hello, {data.currentUser.name}
          </h1>
          <div className="text-2xl mb-4">Welcome to xyz</div>

          <br></br>
          <div className="mb-4 font-bold">Upload from computer</div>

          <br></br>
          <div class="flex items-center justify-center bg-grey-lighter">
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <svg
                class="w-8 h-8"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Upload a file</span>
              <input
                className="hidden"
                type="file"
                onChange={hasUploaded}
              ></input>
            </label>
          </div>
          <br></br>
          <div style={{ textAlign: "center" }}>OR</div>
          <br></br>
          <div class="flex items-center justify-center bg-grey-lighter">
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
              <div>
                {filename === ""
                  ? "Drag and drop an audio file"
                  : `${filename} (or) Drop a different file`}
              </div>
            </FileDrop>
          </div>

          <br></br>
          <button
            onClick={upload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Upload
          </button>
          <br></br>
          <div>We currently support only 60 seconds</div>
          <div className="mt-8">
            {transcription === "" ? (
              <>
                <h4 className="mb-4 font-bold">Transcription:</h4>
                <div>(Please upload a file)</div>
              </>
            ) : (
              <>
                <h4 className="mb-4 font-bold">Transcription:</h4>
                <div className="mr-64">{transcription}</div>
              </>
            )}
          </div>
          <br></br>
          <Link
            href={{
              pathname: "/app/choosetemplate",
              query: {
                transcript: transcription,
                timestamps: timestamps,
              },
            }}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Proceed
            </button>
          </Link>

          <div style={{ height: "50px" }}></div>

          <hr></hr>

          <div style={{ height: "50px" }}></div>

          <h3 className="mb-4 font-bold text-2xl">Previous Transcriptions</h3>

          <div style={{ width: "90%" }}>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-x divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            TITLE
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            FILETYPE
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            EXPIRATION DATE
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            STATUS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results
                          ? results.map((row) => (
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
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
                                    <button
                                      // style={{ width: `100%` }}
                                      onClick={() => {
                                        setTitle(row["title"]);
                                        setTranscript(row["transcript"]);
                                      }}
                                    >
                                      <div className="text-sm font-medium text-gray-900">
                                        {row["title"]
                                          ? row["title"]
                                          : "(untitled)"}
                                      </div>
                                    </button>
                                  </Link>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
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
                                    <button
                                      // style={{ width: `100%` }}
                                      onClick={() => {
                                        setTitle(row["title"]);
                                        setTranscript(row["transcript"]);
                                      }}
                                    >
                                      {row["filetype"]}
                                    </button>
                                  </Link>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
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
                                    <button
                                      // style={{ width: `100%` }}
                                      onClick={() => {
                                        setTitle(row["title"]);
                                        setTranscript(row["transcript"]);
                                      }}
                                    >
                                      {row["expirationdate"]}
                                    </button>
                                  </Link>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
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
                                    <button
                                      // style={{ width: `100%` }}
                                      onClick={() => {
                                        setTitle(row["title"]);
                                        setTranscript(row["transcript"]);
                                      }}
                                    >
                                      <>
                                        <div>{row["status"]}</div>
                                        <div>
                                          Render Date: {row["renderdate"]}
                                        </div>
                                      </>
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "50px" }}></div>
        </>
      )}
    </div>
  );
}
