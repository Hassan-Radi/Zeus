import test from 'node:test';
import fs from 'fs';

const MK_DOCS_JSON_PATH = 'mkdocs/docs/json';
const OUTPUT_FILE_PATH = 'mkdocs/docs/config';
const OUTPUT_FILE = OUTPUT_FILE_PATH + '/targetAudience.json';
let jsonOutput: Object[] = [];

test('List all target audiences', t => {
  // Get all the files in the directory
  let files = fs.readdirSync(MK_DOCS_JSON_PATH);

  // Read each file and extract the info from it
  files.forEach(function (file) {
    let data = fs.readFileSync('./' + MK_DOCS_JSON_PATH + '/' + file, 'utf8');
    let jsonObject = JSON.parse(data);

    let targetAudiences = `${jsonObject.targetAudience}`.split(',');
    targetAudiences.forEach((item: string) => {
      jsonOutput.push(item);
    });
  });

  // Make sure the parent path is created, otherwise the code would fail.
  if (!fs.existsSync(OUTPUT_FILE_PATH)) {
    fs.mkdirSync(OUTPUT_FILE_PATH);
  }

  // Write the extracted info in a json file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(Array.from(new Set(jsonOutput))), 'utf8');
});
