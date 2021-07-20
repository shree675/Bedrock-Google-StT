import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../../client/graphql/createProject.generated";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";
import { use } from "passport";
import { useGetTranscriptsMutation } from "../../client/graphql/getTranscripts.generated";
import { GetStaticProps } from "next";
import { BounceLoader } from "react-spinners";
import prisma from "../../server/db/prisma";
import { useCreateUserMutation } from "../../client/graphql/createUser.generated";
import toast from "react-hot-toast";
import { setInterval } from "timers";
import { useGetUserEmailMutation } from "../../client/graphql/getUserEmail.generated";

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const [, createUser] = useCreateUserMutation();
  const currentUser = data?.currentUser;
  // const [data1] = useTranscriptQuery();
  const [, getTranscripts] = useGetTranscriptsMutation();
  const [uploadedFile, setUploadedFile] = useState("");
  const [filename, setFileName] = useState("");
  const [transcription, setTranscription] = useState("");
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [timestamps, setTimestamps] = useState("");
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [, getUserEmail] = useGetUserEmailMutation();
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState("en-US");

  const languages = [
    [
      {
        name: "Arabic",
        value: "ar-DZ",
      },
      {
        name: "Czech",
        value: "cs-CZ",
      },
      {
        name: "Dutch",
        value: "nl-BE",
      },
      {
        name: "English",
        value: "en-US",
      },
      {
        name: "French",
        value: "fr-FR",
      },
    ],
    [
      {
        name: "German",
        value: "de-DE",
      },
      {
        name: "Hindi",
        value: "hi-IN",
      },
      {
        name: "Italian",
        value: "it-IT",
      },
      {
        name: "Indonesian",
        value: "id-ID",
      },
      {
        name: "Japanese",
        value: "ja-JP",
      },
    ],
    [
      {
        name: "Korean",
        value: "ko-KR",
      },
      {
        name: "Malay",
        value: "ms-MY",
      },
      {
        name: "Portuguese",
        value: "pt-PT",
      },
      {
        name: "Polish",
        value: "pl-PL",
      },
      {
        name: "Russian",
        value: "ru-RU",
      },
    ],
    [
      {
        name: "Spanish",
        value: "es-ES",
      },
      {
        name: "Swedish",
        value: "sv-SE",
      },
      {
        name: "Thai",
        value: "th-TH",
      },
      {
        name: "Turkish",
        value: "tr-TR",
      },
      {
        name: "Vietnamese",
        value: "vi-VN",
      },
    ],
  ];

  // const {
  //   query: { profileid, username, emailad },
  // } = router;

  const t = setInterval(() => {
    setX(x + 1);
    if (x >= 3) {
      clearInterval(t);
    }
  }, 2000);

  if (x >= 3) {
    clearInterval(t);
  }

  useEffect(() => {
    getTranscripts({
      userid: localStorage.getItem("userid"),
    }).then((e) => {
      setResults(e.data?.getTranscripts);
    });

    setName(localStorage.getItem("name"));

    // if (profileid) {
    //   localStorage.setItem("isloggedin", "true");
    //   console.log(localStorage.getItem("isloggedin"));
    //   getUserEmail({
    //     id: profileid,
    //   }).then((data) => {
    //     // console.log(data);
    //     localStorage.setItem("isloggedin", "true");
    //     if (data.data?.getUserEmail) {
    //       setEmail(data.data?.getUserEmail.email);
    //       setName(data.data?.getUserEmail.name);
    //       localStorage.setItem("name", data.data?.getUserEmail.name);
    //       localStorage.setItem("userid", data.data.getUserEmail.id);
    //     } else {
    //       localStorage.setItem("userid", profileid);
    //       localStorage.setItem("name", username);
    //       setEmail(emailad);
    //       setName(username);
    //       createUser({
    //         id: profileid,
    //         name: username,
    //         email: emailad,
    //       });
    //       router.push("/");
    //     }
    //   });
    // } else {
    //   setName(localStorage.getItem("name"));
    // }

    if (localStorage.getItem("isloggedin") === "false" && x >= 3) {
      clearInterval(t);
      router.push("/signup");
    } else if (localStorage.getItem("isloggedin") === "true" && x >= 3) {
      clearInterval(t);
    }
    if (x >= 3) {
      clearInterval(t);
    }

    if (
      localStorage.getItem("isloggedin") === null ||
      localStorage.getItem("isloggedin") === undefined
    ) {
      router.push("/signup");
    }
  }, [filename, lang]);

  const upload = async () => {
    if (localStorage.getItem("isloggedin") === "false") {
      alert("You are not logged in. Please login");
      router.push("/signup");
    }
    var formData = new FormData();

    formData.append("file", window.File);
    formData.append("language", lang);
    console.log(window.File);

    var reader = new FileReader();
    reader.readAsDataURL(window.File);
    reader.onload = function () {
      if (localStorage.getItem("audiofile")) {
        localStorage.removeItem("audiofile");
      }
      localStorage.setItem("audiofile", reader.result);
    };

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
    setLoading(false);
  };

  const hasDropped = (files: any, event: any) => {
    setShow(true);
    setUploadedFile(files[0]);
    setFileName(files[0].name);
    setTranscription("");
    window.File = files[0];
    console.log(window.File);
  };

  if (fetching) return <p></p>;

  if (error) return <p>{error.message}</p>;

  // if (!data?.currentUser) {
  //   if (process.browser) router.push("/login");
  //   return (
  //     <p>
  //       Redirecting to <Link href="/login">/login</Link>
  //       ...
  //     </p>
  //   );
  // }

  return (
    <div className="ml-72 mt-8 font-body">
      {localStorage.getItem("isloggedin") === "false" ? (
        <>
          <h3>Sign up to our account and get started</h3>
          <br></br>
          <Link href="/get-started">Get started</Link>
          <br></br>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <>
          <div className="mb-8 flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-current text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
            <p className="text-lg text-green-400 font-bold">Dashboard</p>
          </div>
          <h1 className="text-4xl font-bold mb-4">Hello, {name}</h1>
          <div className="text-2xl mb-4">Welcome to xyz</div>

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
          <div className="flex bg-grey-lighter ">
          <FileDrop
          className="border-dashed border-2 rounded border-gray-400 py-8 px-64 mr-56"
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
              <div >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 ml-56 mb-4 stroke-current text-blue-600 bg-green-200 rounded-full p-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <div className="px-44 text-center text-xs mb-8">
                <p >Uplaoad file from computer or <span className="font-bold">drag and drop </span>an mp3</p>
                
                </div>
                <div className="px-36">
                <div className="bg-clip-content bg-green-300 mt-4   rounded flex">
                 <span className="rounded-full w-1 h-1 bg-green-600 ml-1 mr-1 mt-2 px-1 py-1"></span> 
                 <p className="my-1 text-xs">We currently support only 60 seconds</p>
                </div>
                </div>
              </div>
            ) : (
              `${filename} (or) Drop a different file`
            )}
          </div>
        </FileDrop>
          </div>

          {show ? (
            <div className="w-full h-full inset-0 fixed">
              <div className="w-full h-full inset-0 fixed bg-opacity-30 bg-gray-700">
                <div
                  className="absolute top-20 left-16 ml-64 w-3/5 bg-white text-center px-44 pt-8 rounded"
                  
                >
                  <img
                    src="/dotsworld.svg"
                    width="180"
                    height="180"
                    className="ml-48"
                  ></img>
                  <br></br>
                  <h1 className="font-bold text-3xl">Select Language</h1>
                  <br></br>
                  <div className="text-center">
                    <table>
                      {languages.map((language) => (
                        <tr>
                          {language.map((lan) => (
                            <td>
                              <button
                                className={
                                  lang === lan.value
                                    ? "bg-blue-800 text-white py-2 px-4 rounded mb-4 font-bold w-24 m-2 py-2"
                                    : "bg-blue-200 hover:bg-blue-800 text-blue-800 hover:text-white py-2 px-4 rounded mb-4 w-24 m-2 py-2"
                                }
                                onClick={() => {
                                  setLang(lan.value);
                                }}
                              >
                                <div className="text-sm">
                                  {lan.name}
                                </div>
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </table>
                    <br></br>
                    <br></br>
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                    style={{ width: `96%` }}
                    onClick={() => {
                      upload();
                      setShow(false);
                    }}
                  >
                    Select Template
                  </button>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          ) : null}

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

          <hr></hr>

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
                                      <div className="flex">
                                        {row["title"] ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                          </svg>
                                        ) : null}
                                        <div className="text-sm font-medium text-gray-900">
                                          {row["title"]
                                            ? row["title"]
                                            : "(untitled)"}
                                        </div>
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
                                        <div className="flex">
                                          <div className="rounded-full w-2 h-2 bg-green-600 px-2 py-2 mt-1 mr-2"></div>
                                          {row["status"]}
                                        </div>
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
