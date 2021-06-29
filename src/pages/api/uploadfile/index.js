const fs = require("fs");
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

var file='';

export default async (req, res) => {
  var bytes = new Uint8Array(req.body.length);
  for (var i = 0; i < req.body.length; i++) {
    bytes[i] = req.body.charCodeAt(i);
  }
  console.log(bytes);
    // res.send("File uploaded");
    file=bytes;
  const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
    };
    const audio = {
        content: file.toString("base64"),
    };
    const request = {
        config: config,
        audio: audio,
    };
    const [response] = await client.recognize(request);
    const transcription = response.results.map((result) => result.alternatives[0].transcript).join("\n");
    console.log("Transcription: ", transcription);
    res.send(transcription);
};
