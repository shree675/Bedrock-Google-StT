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
import { BlockPicker, CirclePicker } from "react-color";
import Tippy from "@tippyjs/react";
import ReactPlayer from "react-player";
import { FileDrop } from "react-file-drop";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

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
  const [filename, setFileName] = useState("");

  const router = useRouter();
  const {
    query: { transcript, timestamps },
  } = router;

  // if (!localStorage.getItem("audiofile")) {
  //   localStorage.setItem("audiofile", window.File);
  // }
  // console.log(localStorage.getItem("audiofile"));
  // const checkout =
  //   typeof window !== "undefined" ? localStorage.getItem("checkout") : null;
  // console.log(checkout);

  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    timestampstring = timestamps ? JSON.parse(timestamps) : {};
    // console.log(timestampstring);
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

  useEffect(() => {
    // console.log(window.File);

    import("wavesurfer.js")
      .then((x) => x.default)
      .then((WaveSurfer) => {
        try {
          // console.log(document.querySelector("#wave"));
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

          // console.log(window.File);

          // let audio = new Audio();
          // audio.src = URL.createObjectURL(window.File);
          // waveSurfer.load(audio);

          // fetch(localStorage.getItem("audiofile"))
          //   .then(function (res) {
          //     return res.arrayBuffer();
          //   })
          //   .then(function (buf) {
          //     console.log(new File([buf], "my file", { type: "audio/*" }));
          //   });

          fetch(localStorage.getItem("audiofile"))
            .then((res) => res.blob())
            .then((data) => {
              waveSurfer.loadBlob(data);
            });
          waveSurfer.load(localStorage.getItem("audiofile"));

          // waveSurfer.load(
          //   "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
          // );
          waveSurfer.on("ready", () => {
            if (play) waveSurfer.play();
            else waveSurfer.pause();
          });
        } catch (err) {
          console.log(err);
          alert(
            "An error occurred. Please select the correct language of the uploaded file, if not already done."
          );
          router.push("/app");
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

  const onClickSubtitleColor = (color) => {
    setSubtitlecolor(color);
  };

  const onClickSaveHandler = () => {
    setShowHide(!showHide);
    // localStorage.getItem("userid")
    toast.promise(
      createTranscript({
        title: title,
        transcript: transcript,
        filetype: "audio file",
        expirationdate: new Date().toDateString(),
        renderdate: new Date().toDateString(),
        status: "Done",
        userid: localStorage.getItem("userid"),
        subtitle: subtitle,
        titlecolor: titlecolor,
        audiourl: "(empty)", // localStorage.getItem("audiofile")
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
    // audiourl: localStorage.getItem("audiofile")
  };

  return (
    <div className="flex relative">
      <div style={{ flex: "0.3" }} className="ml-72 mt-8 ">
        <div>
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
            <p className="text-lg text-gray-400 font-bold">Dashboard</p>
            <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
            <p className="text-lg text-gray-400 font-bold">Template</p>
            <p className="mx-4 text-gray-300 text-lg font-bold">/</p>
            <p className="text-lg text-green-400 font-bold">Transcript</p>
          </div>
          <div>
            <div className="flex ">
              <Tippy
                interactive={true}
                placement={"left"}
                content={
                  <CirclePicker
                    color={titlecolor}
                    onChangeComplete={(color) => setTitlecolor(color.hex)}
                  />
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-4 cursor-pointer stroke-current text-white p-2 bg-blue-500 rounded-full"
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
                <input
                  className=" border-none w-full py-2 px-3 font-bold text-3xl text-gray-700 focus:outline-none rounded"
                  id="title"
                  type="text"
                  placeholder="/Empty title"
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
                  <CirclePicker
                    color={subtitlecolor}
                    onChangeComplete={(color) => setSubtitlecolor(color.hex)}
                  />
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-4 cursor-pointer stroke-current text-white p-2 bg-blue-500 rounded-full"
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
                <input
                  className="border-none focus:border-none focus:outline-none outline-none w-full py-2 px-3 text-xl text-gray-700 font-bold rounded"
                  id="Subtitle"
                  type="text"
                  placeholder="/Empty subtitle"
                  name="subtitle"
                  onChange={onChangeSubTitle}
                  value={subtitle}
                />
              </div>
            </div>

            <div className="block text-gray-700 text-lg font-bold mb-2 ml-16 mt-8">
              Upload cover art:
            </div>

            <img
              src={imageurl}
              width="600"
              style={{ borderRadius: "5px" }}
            ></img>
            <br />
            {/* <div class="flex bg-grey-lighter">
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
        </div> */}

            <div className="flex bg-grey-lighter ">
              <FileDrop
                className="border-dashed border-2 rounded border-gray-400 py-4 px-24 ml-16 mr-16"
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
                        className="h-8 w-8 ml-32 stroke-current text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm px-8 text-center">
                        <spn className="text-blue-700">Upload a file or</spn>{" "}
                        drag and drop PNG, JPG, GF up to 50kb
                      </p>
                    </div>
                  ) : (
                    `${filename} (or) Drop a different file`
                  )}
                </div>
              </FileDrop>
            </div>

            <br />

            <br />
          </div>

          <div id="wave" className="mr-8 mt-24 hidden"></div>
          <div className="flex">
            <div>
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
                  <div className="bg-gray-200 rounded-full p-2 m-4">
                    <PauseIcon />
                  </div>
                ) : (
                  <div className="bg-gray-200 rounded-full p-2 m-4">
                    <PlayArrowIcon />
                  </div>
                )}
              </button>
            </div>
            <div>
              <div ref={containerRef} />

              <h4 className="font-bold text-lg mb-4 ">Transcript:</h4>
              <div className="mr-24">{transcript}</div>
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
                className="mt-8 bg-green-600 w-4/5  hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded mb-4 w-1/4"
                onClick={onClickSaveHandler}
              >
                Render video
              </button>
            </div>
          </div>
          <br></br>
          {showHide ? (
            <div className="w-full h-full inset-0 fixed z-30">
              <div
                onClick={() => {
                  setShowHide(!showHide);
                }}
                className="w-full h-full inset-0 absolute z-30 bg-opacity-30 bg-gray-700"
              >
                <div className="absolute z-30 top-56 left-1/3 ml-24 bg-white max-w-xl w-1/4 text-center px-12 pt-8 rounded">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 ml-28 mb-4 bg-green-200 rounded-full p-2 stroke-current text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h1 className="font-bold text-lg">video is ready</h1>
                  <p className="text-sm mb-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link
                    href={{
                      pathname: "/app/details",
                      query: { transcript, title, subtitle, renderdate },
                    }}
                  >
                    <button className="bg-blue-800 w-full hover:bg-blue-900 text-white py-1 px-4 rounded mb-4">
                      Download Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ flex: "0.7" }}>
        <div className=" mt-48 ml-64 z-10 absolute">
          <img src="/dots.png" height="280px" width="280px" className="" />
        </div>
        <div className=" mt-64 mr-8 z-20 absolute">
          <p className="bg-gray-300 w-1/3 pl-8 mb-16 ml-32">
            Original <span className="ml-6">v</span>
          </p>
          <ReactPlayer
            width="480px"
            height="360px"
            controls
            url="https://www.youtube.com/watch?v=9P8mASSREYM"
          />
        </div>
      </div>
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
