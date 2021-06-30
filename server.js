const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const speech = require("@google-cloud/speech");
const cors = require("cors");

const client = new speech.SpeechClient();
// const multiparty = require("multiparty");

app.use(express.json());

app.use(cors);

app.use(express.static(path.join(__dirname, "build")));

var file = "";

app.post("/upload", fileUpload(), async function (req, res) {
  console.log("req.files", req.files);
  //   file = req.files.uploadedFile.data;
  //   // fs.ReadStream.on(req.files.uploadedFile.data, function (err, data) {
  //   //     // Do something with the data (which holds the file information)
  //   //     console.log(data);
  //   // });
  //   res.send("File uploaded");
  //   const config = {
  //     encoding: "LINEAR16",
  //     sampleRateHertz: 16000,
  //     languageCode: "en-US",
  //   };
  //   const audio = {
  //     // content: fs.readFileSync(file).toString("base64"),
  //     content: file.toString("base64"),
  //   };
  //   const request = {
  //     config: config,
  //     audio: audio,
  //   };
  //   const [response] = await client.recognize(request);
  //   const transcription = response.results
  //     .map((result) => result.alternatives[0].transcript)
  //     .join("\n");
  //   console.log("Transcription: ", transcription);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
