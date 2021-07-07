const fs = require("fs");

export default async function (req, res, next) {
  var folders = fs.readdirSync("./sample1.mp3");
  console.log(folders);
}
