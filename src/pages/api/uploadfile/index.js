const fs = require("fs");
const speech = require("@google-cloud/speech");
import Formidable from "formidable";

const client = new speech.SpeechClient();
var file = "";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async (req, res) => {
  // const form = new Formidable.IncomingForm({
  //   multiples: true,
  //   keepExtensions: true,
  // });
  // form.once("error", console.error);
  // form
  //   .on("fileBegin", (name, file) => {
  //     console.log("start uploading: ", file.name);
  //   })
  //   .on("aborted", () => console.log("Aborted..."));
  // form.once("end", () => {
  //   console.log("Done!");
  // });

  // await form.parse(req, async (err, fields, files) => {
  //   if (err) {
  //     throw String(JSON.stringify(err, null, 2));
  //   }

  //   // console.log(files.file);

  //   var bb = files.file;

  //   // const config = {
  //   //   encoding: "LINEAR16",
  //   //   sampleRateHertz: 16000,
  //   //   languageCode: "en-US",
  //   // };
  //   // const audio = {
  //   //   // content: fs.readFileSync(bb).toString("base64"),
  //   //   content: toBase64(bb),
  //   // };
  //   // console.log("Conteafklasdklflksafklasld;kfklads;klfa:\n", audio.content);
  //   // const request = {
  //   //   config: config,
  //   //   audio: audio,
  //   // };
  //   // const [response] = await client.recognize(request);
  //   // const transcription = response.results
  //   //   .map((result) => result.alternatives[0].transcript)
  //   //   .join("\n");
  //   // console.log("Transcription: ", transcription);
  //   // res.send(transcription);

  //   // await fs.rename(files.file.path, `./audiofile.flac`, (err) => {
  //   //   if (err) throw err;
  //   // });
  //   // console.log(files.file.path);
  //   // fs.renameSync(files.file.path, `public/upload/${files.file.name}`);
  //   // req.form = { fields, files };
  //   // return resolve(next(req, res));
  // });

  console.log(__dirname);
  console.log(__filename);

  // console.log(req.body);

  // var i;
  // for (i = 0; i < req.body.bb.length; i++) {
  //   if (req.body.bb[i] === ",") {
  //     break;
  //   }
  // }

  // var x = req.body.bb.slice(i + 1, req.body.bb.length);
  // console.log(x);

  main();

  async function main() {
    const config = {
      encoding: "LINEAR16",
      languageCode: "en-US",
      sampleRateHertz: 16000,
    };
    //     enableWordTimeOffsets: true,

    // content: fs.readFileSync(__dirname + "audiofile.flac").toString("base64"),
    // content: fs
    //   .readFileSync(
    //     "D:\\Enshrine Global Systems\\bedrock-1.2.0\\src\\pages\\api\\uploadfile\\audiofile.flac"
    //   )
    //   .toString("base64"),
    const audio = {
      content: req.body.data,
    };
    // console.log(audio.content);
    const request = {
      config: config,
      audio: audio,
    };
    // console.log(request);
    const [response] = await client.recognize(request);
    console.log(response);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log("Transcription: ", transcription);
  }

  res.send(req.body);
};
