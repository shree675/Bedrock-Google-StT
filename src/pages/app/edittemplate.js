import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
// import { useGetTranscriptsQuery } from "../client/graphql/getTranscripts.generated";
import { useMutation } from "urql";
import { useCreateTranscriptMutation } from "../../client/graphql/createTranscript.generated";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

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
    query: { transcript, timestamps },
  } = router;
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
      <h4>Transcript:</h4>
      {transcript}
      <br></br>
      <h4>Timestamps:</h4>
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
            <hr></hr>
          </>
        ))}
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
        <button>Download</button>
      </Link>
    </div>
  );
};

export default EditTemplate;
