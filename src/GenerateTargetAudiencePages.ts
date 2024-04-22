import test from 'node:test';
import fs from 'fs';

const TARGET_AUDIENCE_MAPS_PATH = 'mkdocs/docs/config/maps';
const OUTPUT_FILE_PATH = 'mkdocs/docs/prompts/target_audience';
const TARGET_AUDIENCE_FILE = 'mkdocs/docs/config/targetAudience.json';
const SCRIPTS_TO_INJECT_FILE = 'mkdocs/docs/scriptsToInject.txt';
const PROMPTS_JSON_PATH = 'mkdocs/docs/json';
let outputText = '';

test('Generate target audience pages', t => {
  let targetAudienceEntries = JSON.parse(fs.readFileSync('./' + TARGET_AUDIENCE_FILE, 'utf8'));
  targetAudienceEntries.forEach((targetAudienceEntry: string) => {
    let fileName = targetAudienceEntry.toLowerCase().replace(' ', '_');

    // Add page header
    outputText += '# ' + targetAudienceEntry;

    // Add scripts to inject text
    outputText += fs.readFileSync('./' + SCRIPTS_TO_INJECT_FILE, 'utf8');

    // Add target audience sentence
    outputText += 'Contains all the prompts that help ' + targetAudienceEntry.toLowerCase() + 's.';

    // Read the data in the target audience map file
    let data = fs.readFileSync(
      './' + TARGET_AUDIENCE_MAPS_PATH + '/' + fileName + 'Map.json',
      'utf8'
    );
    let mapEntries: Map<string, string[]> = new Map(Object.entries(JSON.parse(data)));

    // Add all the prompts accordingly
    outputText = addPrompts(outputText, mapEntries);

    // Make sure the parent path is created, otherwise the code would fail.
    if (!fs.existsSync(OUTPUT_FILE_PATH)) {
      fs.mkdirSync(OUTPUT_FILE_PATH);
    }

    // Write the extracted info in a json file
    const OUTPUT_FILE = OUTPUT_FILE_PATH + '/' + fileName.replace('Map.json', '') + '.md';
    fs.writeFileSync(OUTPUT_FILE, outputText, 'utf8');

    // clear the output object, so new iterations start fresh
    outputText = '';
  });
});

function addPrompts(outputText: string, mapEntries: Map<string, string[]>) {
  const liClassName =
    'list-group-item prompt-list__item d-flex justify-content-between align-items-center';
  const arrowRight = `
    <span>      
      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\">
        <path d=\"M9.39777 5.66281L3.36027 0.947189C3.34449 0.934768 3.32553 0.92705 3.30557 0.924919C3.2856 0.922788 3.26544 0.926332 3.2474 0.935143C3.22936 0.943955 3.21417 0.957676 3.20357 0.974732C3.19298 0.991787 3.18741 1.01149 3.1875 1.03156V2.06683C3.1875 2.13246 3.2183 2.1954 3.2692 2.23558L8.09063 6.00031L3.2692 9.76505C3.21697 9.80522 3.1875 9.86817 3.1875 9.9338V10.9691C3.1875 11.0588 3.29063 11.1083 3.36027 11.0534L9.39777 6.33781C9.44908 6.29779 9.4906 6.24658 9.51915 6.1881C9.5477 6.12962 9.56254 6.06539 9.56254 6.00031C9.56254 5.93523 9.5477 5.87101 9.51915 5.81253C9.4906 5.75404 9.44908 5.70284 9.39777 5.66281Z\" fill=\"#A2AAB5\"/>
      </svg>  
    </span>`;
  // Loop on all keys in the map and add them one by one
  mapEntries.forEach((values, key) => {
    // Add the category header
    outputText += `
## ${key}
`;

    outputText += `
<ol class=\"list-group list-group-numbered prompt-list\">`;

    // Loop on all prompts and add each of them
    values.forEach((value, index) => {
      // Read the prompt's JSON file first
      const promptFilePath = `${PROMPTS_JSON_PATH}/${value}.json`;
      const prompt = JSON.parse(fs.readFileSync(`./${promptFilePath}`, 'utf8'));
      const liCounter = index + 1;

      // Add the prompts in the category
      outputText += `  
  <li onclick='navigateTo("../prompt_page.html?prompt=${value}")' class='${liClassName}'>
    <div class="prompt-list__item-content d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
      <div class=\"mb-1 mb-sm-0\">${liCounter}. ${prompt.title}</div>`;

      // Add badges
      let badges = `${prompt.badges}`.split(',');
      if (badges.length) {
        outputText = addBadges(outputText, badges);
      } else {
        outputText += '</div>';
      }

      // Add the ending tags
      outputText +=
        arrowRight +
        `
  </li>`;
    });

    outputText += `
</ol>
`;
  });

  outputText += `
<script type=\"text/javascript\">ui.showCreatePromptButton();</script>`;

  return outputText;
}

function addBadges(outputText: string, badges: string[]) {
  outputText += `
      <div>`;

  badges.forEach(badge => {
    switch (badge) {
      case 'New':
        outputText += `
        <span class=\"badge bg-new\">New</span>`;
        break;
      case 'Advanced':
        outputText += `
        <span class=\"badge bg-advanced\">Advanced</span>`;
        break;
      case 'Interactive':
        outputText += `
        <span class=\"badge bg-interactive\">Interactive</span>`;
        break;
      case 'Intermediate':
        outputText += `
        <span class=\"badge bg-intermediate\">Intermediate</span>`;
        break;
    }
  });

  outputText += `
      </div>    
    </div>`;

  return outputText;
}
