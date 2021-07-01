/**
 * This is a redundant file used for testing
 * This file is not being used anywhere in the code
 * But please do not delete this file
 */

// ------------------------------------------------------------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const speech = require("@google-cloud/speech");
const cors = require("cors");

const client = new speech.SpeechClient();

app.use(express.json());

app.use(cors());

app.post("/upload", fileUpload(), async function (req, res) {
  console.log(req.files.file);

  const config = {
    encoding: "7BIT",
    languageCode: "en-US",
    sampleRateHertz: 16000,
    enableWordTimeOffsets: true,
  };

  const audio = {
    content: req.files.file.data.toString("base64"),
  };

  // console.log(audio.content);

  const request = {
    config: config,
    audio: audio,
  };

  const mes = {
    response: "hello",
  };
  res.statusText = "hello";
  res.send("hello");

  // const [response] = await client.recognize(request);
  // console.log(response);

  // const transcription = response.results
  //   .map((result) => result.alternatives[0].transcript)
  //   .join("\n");

  // console.log("Transcription: ", transcription);

  // res.send("uploaded");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
