import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
// import { useGetTranscriptsQuery } from "../client/graphql/getTranscripts.generated";
import { useMutation } from "urql";
import { useCreateTranscriptMutation } from "../../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Wavesurfer from 'react-wavesurfer.js';

const WaveSurfer = dynamic(() => import("wavesurfer.js"), {
  ssr: false,
});

const EditTemplate = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [textcolor, setTextcolor] = useState("");
  const [backgroundcolor, setBackgroundcolor] = useState("");
  const [image, setImage] = useState("");
  const [imageurl, setImageURL] = useState("");
  // const [audiourl, setAudiourl] = useState("");
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const [, createTranscript] = useCreateTranscriptMutation();
  var renderdate = new Date().toDateString();
  var timestampstring = [];


  useEffect(() => {
    // console.log(audiofile);
    timestampstring = JSON.parse(timestamps);
    console.log(timestampstring);
  }, []);

  // var wavesurfer = WaveSurfer.create({
  //   container: document.getElementById("wave"),
  //   backend: "MediaElement",
  // });
  // wavesurfer.on("ready", function () {
  //   wavesurfer.play();
  // });
  // wavesurfer.load(audiofile);

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURL(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeSubTitle = (e) => {
    setSubtitle(e.target.value);
  };

  const onChangeTextColor = (e) => {
    setTextcolor(e.target.value);
  };

  const onChangeBackgroundColor = (e) => {
    setBackgroundcolor(e.target.value);
  };

  const router = useRouter();
  const {
    query: { transcript, timestamps},
  } = router;
  return (
    <div className="ml-40">
      <br></br>
      <div>Upload cover art:</div>
      <img src={imageurl} width="600"></img>
      <br />
      <div class="flex bg-grey-lighter">
      <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
      <span class="mt-2 text-base leading-normal">Select a image</span>
      <input
        className="hidden"
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={onChangeImage}
      />
      </label>
      </div>
      <br />

      <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="Title">Title</label>
     <input class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" name="title" onChange={onChangeTitle} value={title} />
      <br />

      <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="Subtitle">Subtitle</label>
      <input class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Subtitle" type="text" placeholder="Subtitle"
        name="subtitle"
        onChange={onChangeSubTitle}
        value={subtitle}
      />
      <br />

      <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="text color">text color</label>
      <input class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text color" type="text" placeholder="text color"
        name="textcolor"
        onChange={onChangeTextColor}
        value={textcolor}
      />
      <br />

      <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="background color">background color</label>
      <input class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" id="background color" type="text" placeholder="background color"
        name="backgroundcolor"
        onChange={onChangeBackgroundColor}
        value={backgroundcolor}
      />
      <br />
      <div id="wave"></div>

      <h4 class="font-bold text-lg mb-4 ">Transcript:</h4>
      <div className="mr-64">{transcript}</div>
      <br></br>
      <h4 class="font-bold text-lg mb-4 mt-8">Timestamps:</h4>
      <div>
        {JSON.parse(timestamps).map((e) => (
          <>
            <div>Word: {e.word}</div>
            <div>
              Start time: {e.startTime.seconds} seconds + {e.startTime.nanos}{" "}
              nanoseconds
            </div>
            <div>
              End time: {e.endTime.seconds} seconds + {e.endTime.nanos}{" "}
              nanoseconds
            </div>
            <div>SpeakerTag: {e.speakerTag}</div>
            <hr className="font-bold my-4 color-black"></hr>
          </>
        ))}
      </div>
      <button
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={async () => {
          toast.promise(
            createTranscript({
              title: title,
              transcript: transcript,
              filetype: "audio file",
              expirationdate: new Date().toDateString(),
              renderdate: new Date().toDateString(),
              status: "Done",
              userid: currentUser ? currentUser.id : "",
              subtitle: subtitle,
              textcolor: textcolor,
              audiourl: "(empty)",
              imageurl: "imageurl",
              backgroundcolor: backgroundcolor,
              timestamps: timestamps,
            }),
            {
              loading: `Saving transcript...`,
              success: `Transcript saved successfully!`,
              error: (err) => err,
            }
          );
        }}
      >
        Save
      </button>
      <br></br>
      <Link
        href={{
          pathname: "/app/details",
          query: { transcript, title, renderdate },
        }}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Download</button>
      </Link>
    </div>
  );
};

export default EditTemplate;
