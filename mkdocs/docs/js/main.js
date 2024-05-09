const actions = new Actions();
const ui = new UI();
let JSON_FILE_PATH; // TODO: find a better way to replace this
let JSON_FILE_NAME; // TODO: find a better way to replace this

function getUrlParameters() {
  return new URLSearchParams(window.location.href.split('?')[1]);
}

const navigateTo = path => {
  window.location.href = path;
};

function populateThePage() {
  const jsonFileName = getUrlParameters().get('prompt');
  JSON_FILE_NAME = jsonFileName;
  JSON_FILE_PATH = '/json/' + jsonFileName + '.json';

  actions.injectEnableTooltipsEventListener();

  ui.showPageTitle();
  ui.showPromptButtons(true, true, true, true);
  ui.showPromptDetails();
  ui.showPromptHistory();

  // show the correct bookmark icons
  actions.loadBookmarkIcon();
}
