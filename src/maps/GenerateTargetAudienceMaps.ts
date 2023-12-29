import test from 'node:test';
import fs from 'fs';

const MK_DOCS_JSON_PATH = "mkdocs/docs/json";
const OUTPUT_FILE_PATH = "mkdocs/docs/config/maps";
const TARGET_AUDIENCE_FILE = "mkdocs/docs/config/targetAudience.json";
let jsonOutput = new Map<string, string[]>;

test('Generate target audience maps', (t) => {
  let targetAudienceEntries = JSON.parse(fs.readFileSync("./" + TARGET_AUDIENCE_FILE, "utf8"));
  targetAudienceEntries.forEach((targetAudienceEntry: string) => {
    // Get all the files in the directory
    let files = fs.readdirSync(MK_DOCS_JSON_PATH);

    // Read each file and extract the info from it
    files.forEach(function (file) {
      let data = fs.readFileSync("./" + MK_DOCS_JSON_PATH + '/' + file, "utf8");
      let jsonObject = JSON.parse(data);

      if (`${jsonObject.targetAudience}`.split(",").includes(targetAudienceEntry)) {
        // check if the key already exists in the map
        if (jsonOutput.has(`${jsonObject.category}`)) {
          let internalArray = jsonOutput.get(`${jsonObject.category}`);

          if (internalArray != undefined) {
            internalArray.push(file.replace('.json', ''));
            jsonOutput.set(`${jsonObject.category}`, internalArray);
          }
        } else {
          jsonOutput.set(`${jsonObject.category}`, [file.replace('.json', '')]);
        }
      }
    });

    // Make sure the parent path is created, otherwise the code would fail.
    if (!fs.existsSync(OUTPUT_FILE_PATH)) {
      fs.mkdirSync(OUTPUT_FILE_PATH);
    }

    // Write the extracted info in a json file
    // TODO: convert file name to camelCase
    const OUTPUT_FILE = OUTPUT_FILE_PATH + "/" + targetAudienceEntry.toLowerCase().replace(' ', '_') + "Map.json";
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(Object.fromEntries(jsonOutput)), "utf8");

    // clear the output object, so new iterations start fresh
    jsonOutput = new Map<string, string[]>;
  });
});
