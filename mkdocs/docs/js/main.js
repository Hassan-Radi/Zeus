const actions = new Actions;
const ui = new UI;
let JSON_FILE;

function populateThePage() {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
  const jsonFileName = urlParams.get('prompt');
  JSON_FILE = '/json/' + jsonFileName + '.json';

  actions.enableTooltips();

  ui.showPageTitle();
  ui.showPromptBookmarkOptions();
  ui.showPromptDetails();
  ui.showPromptHistory();

  // show the correct bookmark icons
  actions.loadBookmarkIcon();
  actions.loadRemoveAllBookmarksIcon();
}

function injectLink(linkHref, linkRel, linkIntegrity, linkCrossOrigin,
    linkReferrerPolicy) {
  const linkEle = document.createElement('link');

  if (linkHref != null) {
    linkEle.href = linkHref;
  }

  if (linkRel != null) {
    linkEle.rel = linkRel;
  }

  if (linkIntegrity != null) {
    linkEle.integrity = linkIntegrity;
  }

  if (linkCrossOrigin != null) {
    linkEle.crossOrigin = linkCrossOrigin;
  }

  if (linkReferrerPolicy != null) {
    linkEle.referrerPolicy = linkReferrerPolicy;
  }

  // inject the link in the head of the page
  document.head.appendChild(linkEle);
}

function injectScript(scriptSrc, scriptIntegrity, scriptCrossOrigin,
    scriptType) {
  const scriptEle = document.createElement('script');

  if (scriptSrc != null) {
    scriptEle.src = scriptSrc;
  }

  if (scriptIntegrity != null) {
    scriptEle.integrity = scriptIntegrity;
  }

  if (scriptCrossOrigin != null) {
    scriptEle.crossOrigin = scriptCrossOrigin;
  }

  if (scriptType != null) {
    scriptEle.type = scriptType;
  }

  document.body.lastChild.before(scriptEle);
}
