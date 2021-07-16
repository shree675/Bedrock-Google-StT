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
import { BounceLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(false);

  // const {
  //   query: { profileid },
  // } = router;
  // console.log(profileid);

  useEffect(() => {
    const transcripts = data1?.data?.transcript;
    setResults(transcripts);
  }, [filename, data1?.data?.transcript]);

  const upload = async () => {
    var formData = new FormData();

    formData.append("file", window.File);
    console.log(window.File);
    // if (!localStorage.getItem("audiofile")) {
    //   localStorage.setItem("audiofile", window.File);
    // }
    // console.log(localStorage.getItem("audiofile"));

    var reader = new FileReader();
    reader.readAsDataURL(window.File);
    reader.onload = function () {
      if (localStorage.getItem("audiofile")) {
        localStorage.removeItem("audiofile");
      }
      localStorage.setItem("audiofile", reader.result);
    };
    // console.log(localStorage.getItem("audiofile"));

    fetch("/api/uploadfile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setTimestamps(JSON.stringify(data.words));
        setTranscription(data.transcription);
        setApiData(data);
        router.push({
          pathname: "/app/choosetemplate",
          query: {
            transcript: data.transcription,
            timestamps: JSON.stringify(data.words),
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const hasDropped = (files: any, event: any) => {
    setUploadedFile(files[0]);
    setFileName(files[0].name);
    setTranscription("");
    window.File = files[0];
    console.log(window.File);
    upload();
    setLoading(true);
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
          {/* <div className="flex items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <svg
                className="w-8 h-8"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Upload a file</span>
              <input
                className="hidden"
                type="file"
                onChange={hasUploaded}
              ></input>
            </label>
          </div>
          <br></br>
          <div style={{ textAlign: "center" }}>OR</div> */}
          <br></br>
          <div className="flex items-center justify-center bg-grey-lighter ">
            <FileDrop
              className="border-dashed border-2 text-center items-center justify-center rounded border-gray-400 py-16 px-96"
              onFrameDragEnter={(event) => {}}
              onFrameDragLeave={(event) => {}}
              onFrameDrop={(event) => {}}
              onDragOver={(event) => {}}
              onDragLeave={(event) => {}}
              onDrop={(files, event) => {
                hasDropped(files, event);
              }}
            >
              <div className="">
                {filename === "" ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-20 mb-4 stroke-current text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    <p>Drag and drop an audio file</p>
                    <p className="bg-clip-content bg-green-300 mt-4 text-xs rounded">
                      We currently support only 60 seconds
                    </p>
                  </div>
                ) : (
                  `${filename} (or) Drop a different file`
                )}
              </div>
            </FileDrop>
          </div>

          <br></br>
          {/* <button
            onClick={upload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Upload
          </button> */}
          <br></br>
          {loading ? (
            <div className="mt-8">
              {transcription === "" ? (
                <div className="w-full h-full inset-0 fixed bg-opacity-30 bg-gray-700">
                  <div className="absolute top-1/2 left-1/3 ml-24 ">
                    <BounceLoader loading />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

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
