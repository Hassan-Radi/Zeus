import test from 'node:test';
import path from 'path';
import fs from 'fs';

const MK_DOCS_JSON_PATH = "mkdocs/docs/json";
const OUTPUT_FILE_PATH = "mkdocs/docs/config";
const OUTPUT_FILE = OUTPUT_FILE_PATH + "/allPrompts.json";
let jsonOutput: Object[] = [];

test('List all Json Prompt Files', (t) => {
  // Get all the files in the directory
  let files = fs.readdirSync(MK_DOCS_JSON_PATH);

  // Read each file and extract the info from it
  files.forEach(function (file) {
    let data = fs.readFileSync("./" + MK_DOCS_JSON_PATH + '/' + file, "utf8");
    let jsonObject = JSON.parse(data);

    jsonOutput.push({
      "title": `${jsonObject.title}`,
      "fileName": `${file}`,
      "category": `${jsonObject.category}`
    });
  });

  const directoryPath = path.join(OUTPUT_FILE);

  fs.mkdirSync(OUTPUT_FILE_PATH);

  // Write the extracted info in a json file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(jsonOutput), "utf8");
});
