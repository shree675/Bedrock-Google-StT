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

  // const audio = {
  //   content: req.files.file.data.toString("base64"),
  // };

  const audio = {
    content: fs.readFileSync("./audiofile.flac").toString("base64"),
  };

  // console.log(audio.content);
  async function test() {
    const config = {
      encoding: "FLAC",
      languageCode: "en-US",
      enableWordTimeOffsets: true,
    };

    const request = {
      config: config,
      audio: audio,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
  }
  test();
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
