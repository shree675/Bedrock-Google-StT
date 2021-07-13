import Link from "next/link";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";
// import { useGetTranscriptsQuery } from "../client/graphql/getTranscripts.generated";
// import { useCreateTranscriptsQuery } from "../client/graphql/getTranscripts.generated";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../client/graphql/createProject.generated";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";
import { useCreateTranscriptMutation } from "../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";
import {BounceLoader} from 'react-spinners'
// import Wavesurfer from "react-wavesurfer";
// import WaveSurfer from "wavesurfer";
// import dynamic from "next/dynamic";

// const WaveSurfer = dynamic(() => import("wavesurfer.js"), {
//   ssr: false,
// });

function Homepage() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const [, createTranscript] = useCreateTranscriptMutation();
  const currentUser = data?.currentUser;
  const router = useRouter();
  const [, createProject] = useMutation(CreateProjectDocument);
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [filename, setFileName] = useState("");
  const [loading, setLoading]= useState(false);
  const [transcription, setTranscription] = useState(
    "(Please upload an audio file)"
  );
  const [apiData, setApiData] = useState({});
  const [timestamps, setTimestamps] = useState("");
  const [audiourl, setAudiourl] = useState("");

  useEffect(() => {}, [filename]);

  const upload = async () => {
    var formData = new FormData();
    console.log(uploadedFile);
    // window.File = uploadedFile;
    // console.log(window.File);
    formData.append("file", uploadedFile);

    // var reader = new FileReader();
    // reader.onload = function (event) {
    //   // var res = event.target.result;
    //   // console.log(res);
    //   // setAudiourl(res);
    //   // var blob = new window.Blob([new Uint8Array(event.target.result)]);
    //   // console.log(blob);
    // };
    // reader.readAsDataURL(uploadedFile);

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
  };

  const hasDropped = (files: any, event: any) => {
    setUploadedFile(files[0]);
    console.log(uploadedFile);
    // console.log(files[0]);
    // setFileName(files[0].name);
    setTranscription("");
    window.File = files[0];
    console.log(window.File);
    upload();

    setLoading(true);
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
    <div className="ml-40 mt-8">
      <h1 className="text-2xl font-bold mb-4">Getting Started</h1>
      <h2 className="mb-4 text-lg">
        👋Welcome {data.currentUser.name}! This is your onboading page to play
        around with.
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
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input className="hidden" type="file" onChange={hasUploaded}></input>
        </label>
      </div>
      <br></br>
      <div style={{ textAlign: "center" }}>OR</div> */}
      <br></br>
      <div className="flex items-center justify-center bg-grey-lighter ">
        <FileDrop
          className="border-dashed border-2 rounded border-gray-400 py-16 px-96"
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
            {filename === ""
              ? <div >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-20 mb-4 stroke-current text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p>Drag and drop an audio file</p>
                  <p className="bg-clip-content bg-green-300 mt-4 text-xs rounded">We currently support only 60 seconds</p>
              </div>
              : `${filename} (or) Drop a different file`}
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
      {loading?<div className="mt-8">
        {transcription === "" ? (
          <div className="w-full h-full inset-0 fixed bg-opacity-30 bg-gray-700">
          <div className="absolute top-1/2 left-1/3 ml-24 ">
            <BounceLoader loading/>
          </div>
          </div>
        ) : (
          <>
            
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
          </>
        )}
      </div>:null}

      <br></br>


      <div style={{ height: "50px" }}></div>
    </div>
  );
}

export default Homepage;
