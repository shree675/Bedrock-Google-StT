import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import { useMutation } from "urql";
import { useCreateTranscriptMutation } from "../../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BlockPicker } from "react-color";
import Tippy from "@tippyjs/react";
import ReactPlayer from "react-player";
import { FileDrop } from "react-file-drop";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// import dynamic from "next/dynamic";

// const WaveSurfer = dynamic(() => import("wavesurfer.js"), {
//   ssr: false,
// });

const EditTemplate = () => {
  // try {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [titlecolor, setTitlecolor] = useState("");
  const [subtitlecolor, setSubtitlecolor] = useState("");
  const [image, setImage] = useState("");
  const [imageurl, setImageURL] = useState("");
  const [play, setPlay] = useState(false);
  // const [audiourl, setAudiourl] = useState("");
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const [, createTranscript] = useCreateTranscriptMutation();
  var renderdate = new Date().toDateString();
  var timestampstring = [];
  const [wavesurfer, setWS] = useState(null);
  const [file, setFile] = useState("");
  const [showHide, setShowHide] = useState(false);

  const router = useRouter();
  const {
    query: { transcript, timestamps },
  } = router;

  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    timestampstring = timestamps ? JSON.parse(timestamps) : {};
    // console.log(timestampstring);
  }, []);

  useEffect(() => {
    setFile(window.File);

    import("wavesurfer.js")
      .then((x) => x.default)
      .then((WaveSurfer) => {
        try {
          console.log(document.querySelector("#wave"));
          const waveSurfer = WaveSurfer.create({
            container: document.querySelector("#wave"),
            responsive: true,
            barWidth: 2,
            barHeight: 10,
            cursorWidth: 5,
            backend: "MediaElement",
            waveColor: "darkseagreen",
            progressColor: "cadetblue",
          });
          setWS(waveSurfer);

          // console.log(file);
          // console.log(window.File);

          let audio = new Audio();
          audio.src = URL.createObjectURL(window.File);
          waveSurfer.load(audio);

          // waveSurfer.load(
          //   "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
          // );
          waveSurfer.on("ready", () => {
            if (play) waveSurfer.play();
            else waveSurfer.pause();
          });
        } catch (err) {
          console.log(err);
          console.log(window.File);
          alert(
            "Contents are lost because of refreshing. Page will redirect to the home page."
          );
          router.push("/");
        }
      });
  }, []);

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

  const hasDropped = (files, e) => {
    setImage(files[0]);
    console.log(files[0]);
    setFileName(files[0].name);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURL(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const hasUploaded = (event) => {
    setf(event.target.files[0]);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeSubTitle = (e) => {
    setSubtitle(e.target.value);
  };

  const onChangeTitleColor = (e) => {
    setTitlecolor(e.target.value);
  };

  // const onChangeBackgroundColor = (e) => {
  //   setBackgroundcolor(e.target.value);
  // };

  const onClickSubtitleColor = (color) => {
    setSubtitlecolor(color);
  };

  const onClickSaveHandler = () => {
    setShowHide(!showHide);

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
        titlecolor: titlecolor,
        audiourl: "(empty)",
        imageurl: imageurl,
        subtitlecolor: subtitlecolor,
        timestamps: timestamps,
      }),
      {
        loading: `Saving transcript...`,
        success: `Transcript saved successfully!`,
        error: (err) => err,
      }
    );
  };

  return (
    <div className="ml-40">
      <br></br>
      <div className="flex">
        <div>
          <div class="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Upload cover art:
          </div>
          <img src={imageurl} width="600" style={{ borderRadius: "5px" }}></img>
          <br />
          <div class="flex bg-grey-lighter">
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <svg
                class="w-8 h-8"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Select an image</span>
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

          <div className="flex ">
            <Tippy
              interactive={true}
              placement={"left"}
              content={
                <BlockPicker
                  color={titlecolor}
                  onChangeComplete={(color) => setTitlecolor(color.hex)}
                />
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 my-8 mx-4 cursor-pointer stroke-current text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Tippy>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                htmlFor="Title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                name="title"
                onChange={onChangeTitle}
                value={title}
              />
            </div>
          </div>
          <br />

          <div className="flex ">
            <Tippy
              interactive={true}
              placement={"left"}
              content={
                <BlockPicker
                  color={subtitlecolor}
                  onChangeComplete={(color) => setSubtitlecolor(color.hex)}
                />
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 my-8 mx-4 cursor-pointer stroke-current text-blue-600 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Tippy>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                htmlFor="Subtitle"
              >
                Subtitle
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Subtitle"
                type="text"
                placeholder="Subtitle"
                name="subtitle"
                onChange={onChangeSubTitle}
                value={subtitle}
              />
            </div>
          </div>
          <br />
        </div>

        <div className="ml-8">
          <ReactPlayer
            controls
            url="https://www.youtube.com/watch?v=9P8mASSREYM"
          />
        </div>
      </div>

      <div id="wave" style={{ marginRight: `3%` }}></div>

      <button
        onClick={() => {
          if (play) {
            wavesurfer.pause();
          } else {
            wavesurfer.play();
          }
          setPlay(!play);
        }}
        type="button"
      >
        {play ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mt-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mt-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>
      <div ref={containerRef} />

      <h4 class="font-bold text-lg mb-4 ">Transcript:</h4>
      <div className="mr-64">{transcript}</div>
      <br></br>
      {/* <h4 class="font-bold text-lg mb-4 mt-8">Timestamps:</h4>
        <div>
          {timestamps
            ? JSON.parse(timestamps).map((e) => (
                <>
                  <div>Word: {e.word}</div>
                  <div>
                    Start time: {e.startTime.seconds} seconds +{" "}
                    {e.startTime.nanos} nanoseconds
                  </div>
                  <div>
                    End time: {e.endTime.seconds} seconds + {e.endTime.nanos}{" "}
                    nanoseconds
                  </div>
                  <div>SpeakerTag: {e.speakerTag}</div>
                  <hr className="font-bold my-4 color-black"></hr>
                </>
              ))
            : null}
        </div> */}
      <button
        className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 w-1/4"
        onClick={onClickSaveHandler}
      >
        Render video
      </button>
      <br></br>
      {showHide ? (
        <div className="w-full h-full inset-0 fixed">
          <div
            onClick={() => {
              setShowHide(!showHide);
            }}
            className="w-full h-full inset-0 fixed bg-opacity-30 bg-gray-700"
          >
            <div className="absolute top-20 left-1/3 ml-24 bg-white max-w-xl w-1/4 text-center px-12 pt-8 rounded">
              <h1 className="font-bold text-lg">video is ready</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <Link
                href={{
                  pathname: "/app/details",
                  query: { transcript, title, renderdate },
                }}
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                  Download Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
  // }
  // catch (err) {
  //   console.log(err);
  //   // if (!window.File) {
  //   alert("redirect");
  //   // }
  //   return <div></div>;
  // }
};

export default EditTemplate;
