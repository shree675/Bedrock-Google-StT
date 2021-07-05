/*
const fs = require("fs");
const speech = require("@google-cloud/speech");
import formidable from "formidable";

const client = new speech.SpeechClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      encoding: "FLAC",
      languageCode: "en-US",
      sampleRateHertz: 16000,
      enableWordTimeOffsets: true,
    };

    const request = {
      config: config,
      audio: audio,
    };

    res.send(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    );

    // const [response] = await client.recognize(request);

    // console.log(response);

    // const transcription = response.results
    //   .map((result) => result.alternatives[0].transcript)
    //   .join("\n");
    // console.log("Transcription: ", transcription);
  });

  // const config = {
  //   encoding: "FLAC",
  //   languageCode: "en-US",
  //   sampleRateHertz: 16000,
  //   enableWordTimeOffsets: true,
  // };

  // const audio = {
  //   content: fs
  //     .readFileSync(
  //       "D:\\Enshrine Global Systems\\bedrock-1.2.0\\src\\pages\\api\\uploadfile\\audiofile.flac"
  //     )
  //     .toString("base64"),
  // };

  // // const audio = {
  // //   uri: "gs://cloud-samples-tests/speech/brooklyn.flac",
  // // };

  // // content: fs.readFileSync(__dirname + "audiofile.flac").toString("base64"),

  // // content: fs.readFileSync(__dirname + "audiofile.flac").toString("base64"),
  // // content: fs
  // //   .readFileSync(
  // //     "D:\\Enshrine Global Systems\\bedrock-1.2.0\\src\\pages\\api\\uploadfile\\audiofile.flac"
  // //   )
  // //   .toString("base64"),

  // const audio = {
  //   content: fs.readFileSync(ufile.path).toString("base64"),
  // };

  // console.log(audio.content);

  // const request = {
  //   config: config,
  //   audio: audio,
  // };
  // const [response] = await client.recognize(request);
  // console.log(response);
  // const transcription = response.results
  //   .map((result) => result.alternatives[0].transcript)
  //   .join("\n");
  // console.log("Transcription: ", transcription);

  // res.send(req.body.headers);
  // res.send(req.body);
};
*/

// set GOOGLE_APPLICATION_CREDENTIALS=C:\Tools\googlekey.json
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
    console.log();

    const config = {
      languageCode: "en-US",
      enableWordTimeOffsets: true,
    };

    const request = {
      config: config,
      audio: audio,
    };

    return new Promise(async (resolve, reject) => {
      const [response] = await client.recognize(request);
      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
      console.log(`Transcription: ${transcription}`);
      resolve(transcription);
    });

    // const [response] = await client.recognize(request);
    // const transcription = response.results
    //   .map((result) => result.alternatives[0].transcript)
    //   .join("\n");
    // console.log(`Transcription: ${transcription}`);
    // res.send(transcription);
  });
}
