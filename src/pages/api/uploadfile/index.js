const fs = require("fs");
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function test(req, res) {
  var ufile = "";

  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;

  form.on("fileBegin", function (name, file) {
    //rename the incoming file to the file's name
    // fs.rename(file.path, form.uploadDir + "uploadedaudiofile");
    file.path = form.uploadDir + "uploadedaudiofile";
  });

  form.parse(req, async (err, fields, files) => {
    // console.log(files.file);
    ufile = files.file;

    const audio = {
      content: fs
        .readFileSync(form.uploadDir + "uploadedaudiofile")
        .toString("base64"),
    };

    console.log(audio.content.slice(0, 200));

    const config = {
      languageCode: "en-US",
      enableWordTimeOffsets: true,
    };

    const request = {
      config: config,
      audio: audio,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    // console.log("response : ",response.results.alternatives.words[0][2]);
    const [words] = response.results.map((result) => result.alternatives[0].words)
    console.log('words:', words[0].word)
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
    const apiData ={
      words:words,
      transcription:transcription,
    }
    res.send(apiData);
    // res.send(
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // );
  });
}
// test();
