import Link from "next/link";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../client/graphql/createProject.generated";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";
import { useCreateTranscriptMutation } from "../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";

function Homepage() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const [, createTranscript] = useCreateTranscriptMutation();
  const currentUser = data?.currentUser;
  const router = useRouter();
  const [, createProject] = useMutation(CreateProjectDocument);
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [filename, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState(
    "(Please upload an audio file)"
  );
  const [apiData, setApiData] = useState({});
  const [timestamps, setTimestamps] = useState("");
  const [audiourl, setAudiourl] = useState("");
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

  useEffect(() => {}, [filename, lang]);

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

  const upload = async () => {
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
    console.log(uploadedFile);
    setFileName(files[0].name);
    setTranscription("");
    window.File = files[0];
    console.log(window.File);
  };

  const hasUploaded = (event: any) => {
    setUploadedFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setAudiourl(ev.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setTranscription("");
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
        <p className="text-lg text-green-400 font-bold">Dashboard</p>
      </div>
      <h1 className="text-2xl font-bold mb-4">Getting Started</h1>
      <h2 className="mb-4 text-lg">
        ????Welcome {localStorage.getItem("name")}! This is your onboading page to
        play around with.
      </h2>

      <br></br>
      <h3 className="text-lg font-bold text-gray-500 mb-4">
        Lets start by uploading an audio file
      </h3>
      <ul>
        <li className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Upload audio file, max of 60 seconds in length (.wav, .mp3, .flac,
          etc.)
        </li>
        <li className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Select template from our awesome collection
        </li>
        <li className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Render the video with transcript in 3 clicks
        </li>
      </ul>


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
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input className="hidden" type="file" onChange={hasUploaded}></input>
        </label>
      </div>
      <br></br>
      <div style={{ textAlign: "center" }}>OR</div> */}
      
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
                            <div className="text-sm">{lan.name}</div>
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
                className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded mb-4"
                
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


      {/* <div style={{ height: "50px" }}></div> */}
    </div>
  );
}

export default Homepage;
