import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import { useMutation } from "urql";
import { useCreateTranscriptMutation } from "../../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

// const WaveSurfer = dynamic(() => import("wavesurfer.js"), {
//   ssr: false,
// });

const EditTemplate = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [textcolor, setTextcolor] = useState("");
  const [backgroundcolor, setBackgroundcolor] = useState("");
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

  const [f, setf] = useState("");

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
    // var modurl = "";
    // var i = 0;
    // for (i = 0; i < audiourl.length; i++) {
    //   if (audiourl[i] === ",") break;
    // }
    // modurl = audiourl.slice(i + 1, 100000);
    // console.log(modurl);
    import("wavesurfer.js")
      .then((x) => x.default)
      .then((WaveSurfer) => {
        console.log(document.querySelector("#wave"));
        const waveSurfer = WaveSurfer.create({
          container: document.querySelector("#wave"),
          responsive: true,
          barWidth: 2,
          barHeight: 10,
          cursorWidth: 5,
          backend: "MediaElement",
          waveColor: "turquoise",
          progressColor: "blue",
        });
        setWS(waveSurfer);
        // console.log(
        // "D:\\Enshrine Global Systems\\bedrock-1.2.0\\src\\pages\\app\\audiofile.flac"
        // );
        // console.log(f);
        // console.log();
        waveSurfer.load("/app/sample1.mp3");

        // waveSurfer.load(
        // "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
        // );
        waveSurfer.on("ready", () => {
          // waveSurferRef.current = waveSurfer;
          if (play) waveSurfer.play();
          else waveSurfer.pause();
        });
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

  const hasUploaded = (event) => {
    setf(event.target.files[0]);
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

  return (
    <div>
      <br></br>
      <div>Upload cover art:</div>
      <img src={imageurl} width="600"></img>
      <br />
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={onChangeImage}
      />
      <br />

      <label>Title</label>
      <input type="text" name="title" onChange={onChangeTitle} value={title} />
      <br />

      <label>Subtitle</label>
      <input
        type="text"
        name="subtitle"
        onChange={onChangeSubTitle}
        value={subtitle}
      />
      <br />

      <label>text color</label>
      <input
        type="text"
        name="textcolor"
        onChange={onChangeTextColor}
        value={textcolor}
      />
      <br />

      <label>background color</label>
      <input
        type="text"
        name="backgroundcolor"
        onChange={onChangeBackgroundColor}
        value={backgroundcolor}
      />
      <br />

      <div id="wave"></div>

      <input type="file" onChange={hasUploaded}></input>

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
        {play ? "Pause" : "Play"}
      </button>
      <div ref={containerRef} />

      <h4>Transcript:</h4>
      {transcript}
      <br></br>
      <h4>Timestamps:</h4>
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
                <hr></hr>
              </>
            ))
          : null}
      </div>
      <button
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
              imageurl: imageurl,
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
        <button>Download</button>
      </Link>
    </div>
  );
};

export default EditTemplate;
