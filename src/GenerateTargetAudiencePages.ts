import test from 'node:test';
import fs from 'fs';

const TARGET_AUDIENCE_MAPS_PATH = "mkdocs/docs/config/maps";
const OUTPUT_FILE_PATH = "mkdocs/docs/prompts/target_audience";
const TARGET_AUDIENCE_FILE = "mkdocs/docs/config/targetAudience.json";
const SCRIPTS_TO_INJECT_FILE = "mkdocs/docs/scriptsToInject.txt";
const PROMPTS_JSON_PATH = "mkdocs/docs/json";
let outputText = "";

test('Generate target audience pages', (t) => {
  let targetAudienceEntries = JSON.parse(fs.readFileSync("./" + TARGET_AUDIENCE_FILE, "utf8"));
  targetAudienceEntries.forEach((targetAudienceEntry: string) => {
    let fileName = targetAudienceEntry.toLowerCase().replace(' ','_');

    // Add page header
    outputText += "# " + targetAudienceEntry;

    // Add scripts to inject text
    outputText += fs.readFileSync("./" + SCRIPTS_TO_INJECT_FILE, "utf8");

    // Add target audience sentence
    outputText += "Contains all the prompts that help " + targetAudienceEntry.toLowerCase() + "s.";

    // Read the data in the target audience map file
    let data = fs.readFileSync("./" + TARGET_AUDIENCE_MAPS_PATH + '/' +
        fileName + "Map.json", "utf8");
    let mapEntries: Map<string, string[]> = new Map(Object.entries(JSON.parse(data)));

    // Add all the prompts accordingly
    outputText = addPrompts(outputText, mapEntries);

    // Make sure the parent path is created, otherwise the code would fail.
    if (!fs.existsSync(OUTPUT_FILE_PATH)) {
      fs.mkdirSync(OUTPUT_FILE_PATH);
    }

    // Write the extracted info in a json file
    const OUTPUT_FILE = OUTPUT_FILE_PATH + "/" + fileName.replace('Map.json', '') + ".md";
    fs.writeFileSync(OUTPUT_FILE, outputText, "utf8");

    // clear the output object, so new iterations start fresh
    outputText = "";
  });
});

function addPrompts(outputText: string, mapEntries: Map<string, string[]>){
  // Loop on all keys in the map and add them one by one
  mapEntries.forEach( (values, key) => {
    // Add the category header
    outputText += "\n## " + key + "\n";

    outputText += "<ol class=\"list-group list-group-numbered\">\n";

    // Loop on all prompts and add each of them
    values.forEach(value => {
      // Read the prompt's JSON file first
      let promptFilePath = PROMPTS_JSON_PATH + "/" + value + ".json";
      let promptData = JSON.parse(fs.readFileSync("./" + promptFilePath, "utf8"));

      // Add the prompts in the category
      outputText += "    <li class=\"list-group-item d-flex justify-content-between align-items-start\">\n" +
          "        <div class=\"ms-2 me-auto\">\n";
      outputText += "          <a href=\"../prompt_page.html?prompt="+ value + "\"><small>" + `${promptData.title}` + "</small></a>\n";
      outputText += "        </div>\n";

      // Add badges
      let badges = `${promptData.badges}`.split(',');
      if(badges.length != 0){
        outputText = addBadges(outputText, badges);
      }

      // Add the ending tags
      outputText += "    </li>\n";
    });

    outputText += "</ol>\n";
  });

  return outputText;
}

function addBadges(outputText: string, badges: string[]) {
  outputText += "        <div>\n";

  badges.forEach( (badge) => {
    switch (badge){
      case ("New"):
        outputText += "            <span class=\"badge bg-primary rounded-pill\"><small>New</small></span>\n";
        break;
      case ("Advanced"):
        outputText += "            <span class=\"badge bg-danger rounded-pill\"><small>Advanced</small></span>\n";
        break;
      case ("Interactive"):
        outputText += "            <span class=\"badge bg-success rounded-pill\"><small>Interactive</small></span>\n";
        break;
      case ("Intermediate"):
        outputText += "            <span class=\"badge bg-warning rounded-pill\"><small>Intermediate</small></span>\n";
        break;
    }
  })

  outputText += "        </div>\n";

  return outputText;
}
