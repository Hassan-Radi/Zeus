import fs from 'fs';
import test from "node:test";

const OUTPUT_FILE_PATH = "mkdocs/docs/config";
const OUTPUT_FILE = OUTPUT_FILE_PATH + "/token.json";
let jsonOutput = {
  "token": ""
};

test('Create the token file', (t) => {
  // Get the token value from the environment variables
  let envValue = process.env.GIT_TOKEN ? process.env.GIT_TOKEN.toString() : "";

  if(envValue !== ""){
    jsonOutput.token = envValue;
  } else {
    throw new Error("There is no such variable with this name!");
  }

  // Write the extracted info in a json file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(jsonOutput), "utf8");
});
