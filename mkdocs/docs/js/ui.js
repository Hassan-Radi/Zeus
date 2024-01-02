const CATEGORIES_FILE_PATH = "/config/categories.json";

class UI {

  showPromptHistory() {
    fetch(JSON_FILE_PATH)
    .then((response) => response.json())
    .then((json) => {
      for (let i = 1; i <= Object.keys(json.promptHistory).length;
          i++) {
        let detailsElement = document.createElement("details");
        let summaryElement = document.createElement("summary");
        let summaryText = document.createTextNode("Version " + i)
        summaryElement.appendChild(summaryText);

        let divElement = document.createElement("div");
        divElement.innerHTML = `
          <br><b>Type:</b> ${this.getPromptTypeAsLinks(
            json.promptHistory[i].promptType)} <br>
          <b>Changelog:</b> ${JSON.stringify(
            json.promptHistory[i].changeLog).replaceAll('\"', '')} <br>
          <b>LLM Model:</b> ${JSON.stringify(
            json.promptHistory[i].llmModel).replaceAll('\"', '')} <br>
          <h5 class="link-primary">Prompt:</h5
        `;

        divElement.innerHTML = this.addDataItemGroup(divElement.innerHTML, null,
            'link-primary',
            json.promptHistory[i].revisedPrompt.replaceAll('\"', ''))

        this.displaySampleData(json, divElement, i);

        // add the text to the HTML document
        document.getElementById('prompt-iterations-history').after(
            detailsElement);
        detailsElement.appendChild(summaryElement);
        detailsElement.appendChild(divElement);
      }
    });
  }

  showPromptDetails() {
    fetch(JSON_FILE_PATH)
    .then((response) => response.json())
    .then((json) => {
      let divElement = document.createElement("div");
      divElement.innerHTML = `
        <b>Submitted originally by:</b> ${JSON.stringify(
          json.submittedOriginallyBy).replaceAll('\"', '')
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll(',', ', ')} <br>
        <b>Optimized by:</b> ${JSON.stringify(
          json.optimizedBy).replaceAll('\"', '')
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll(',', ', ')} <br>
        <b>Type:</b> ${this.getPromptTypeAsLinks(
          json.promptHistory[Object.keys(
              json.promptHistory).length].promptType)} <br>
        <b>LLM Model:</b> ${JSON.stringify(
          json.promptHistory[Object.keys(
              json.promptHistory).length].llmModel).replaceAll('\"',
          '')} <br>
        <hr>
        <h5 class="link-primary">Prompt:</h5>
      `;

      divElement.innerHTML = this.addDataItemGroup(divElement.innerHTML, null,
          'link-primary',
          json.promptHistory[Object.keys(
              json.promptHistory).length].revisedPrompt.replaceAll(
              '\"', ''))

      this.displaySampleData(json, divElement,
          Object.keys(json.promptHistory).length);

      // add the download as .json button
      divElement.innerHTML += `<br><a type="button" class="btn btn-sm btn-primary link-light float-end" href="${JSON_FILE_PATH}"><i class="fa-solid fa-download"></i> Download as .json</a><br>`;

      // add the text to the HTML document
      document.getElementsByTagName('h1')[0].after(divElement);
    });
  }

  getPromptTypeAsLinks(promptTypes) {
    let outputLinks = "";
    for (let i = 0; i < promptTypes.length; i++) {
      let promptType = promptTypes[i];

      // we are using root-relative links here (that's why the links start with '/')
      switch (promptType) {
        case 'ZERO_SHOT_PROMPT':
          outputLinks += '<a class="link-primary" href="/prompt_types.html#zero-shot-prompt">Zero-shot prompt</a>';
          break;
        case 'ONESHOT_PROMPT':
          outputLinks += '<a class="link-secondary" href="/prompt_types.html#oneshot-prompt">Oneshot prompt</a>';
          break;
        case 'FEW_SHOT_PROMPT':
          outputLinks += '<a class="link-dark" href="/prompt_types.html#few-shot-prompt">Few-shot prompt</a>';
          break;
        case 'USER_PROMPT':
          outputLinks += '<a class="link-success" href="/prompt_types.html#user-prompt">User prompt</a>';
          break;
        case 'SYSTEM_PROMPT':
          outputLinks += '<a class="link-danger" href="/prompt_types.html#system-prompt">System prompt</a>';
          break;
        case 'TEMPLATE_PROMPT':
          outputLinks += '<a class="link-warning" href="/prompt_types.html#template-prompt">Template prompt</a>';
          break;
        case 'INTERACTIVE_PROMPT':
          outputLinks += '<a class="link-info" href="/prompt_types.html#interactive-prompt">Interactive prompt</a>';
          break;
      }

      // add a comma as long as we aren't processing the last entry in the array
      if (i != promptTypes.length - 1) {
        outputLinks += ', ';
      }
    }

    return outputLinks;
  }

  addDataItemGroup(html, dataItemName, dataItemNameColor,
      dataItemValue) {
    html += `
        <div class="card">
          <div class="card-body">
          `;

    if (dataItemName != null) {
      html += `<small class="${dataItemNameColor}"><b>${dataItemName}:</b></small>`;
    }

    html += `
            <button id="copy-button" class="btn btn-sm btn-outline-secondary float-end fa-regular fa-clipboard" data-toggle="tooltip" type="button" title="${ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP}" onclick="actions.copyToClipboard(event);" onmouseleave="actions.resetClipboardTooltip(event);"></button>
          `;

    if (dataItemName == null) {
      html += `<p class="card-text">${dataItemValue}</p>
            `;
    } else {
      html += `<small class="card-text">${dataItemValue}</small>`;
    }

    html += `
          </div>
        </div>
          `;
    return html;
  }

  displaySampleData(json, divElement, entryIndex) {
    // add the sample data if any exists
    if (json.promptHistory[entryIndex].sampleData !== undefined) {
      let sampleDataHtml = "";
      let numberOfEntries = Object.keys(
          json.promptHistory[entryIndex].sampleData).length;

      for (let i = 0; i < numberOfEntries; i++) {
        let dataItemName = json.promptHistory[entryIndex].sampleData[i].split(
            ':')[0].trim();
        let dataItemValue = json.promptHistory[entryIndex].sampleData[i].substring(
            dataItemName.length + 1).trim();

        sampleDataHtml = this.addDataItemGroup(sampleDataHtml, dataItemName,
            'link-success',
            dataItemValue);

        // add a space if we aren't processing the last entry
        if (i != numberOfEntries - 1) {
          sampleDataHtml += '<br>';
        }
      }

      // add all the sample data
      divElement.innerHTML += `<h5 class="link-danger">Sample data:</h5>${sampleDataHtml}`;
    }
  }

  showPageTitle() {
    fetch(JSON_FILE_PATH)
    .then((response) => response.json())
    .then((json) => {
      document.getElementById('header').innerText = json.pageHeader;
      document.title = json.pageHeader;
      /**
       * Show the same header text when you scroll down
       */
      this.getElementByXpath("//div[@data-md-component='header-topic']/span").textContent = json.pageHeader;
    });
  }

  showPromptButtons(showCreatePrompt, showExportPrompts, showBookmarkPrompt,
      showClearBookmarks) {
    const divElement = document.createElement('div');
    divElement.classList = 'float-end';

    if (showClearBookmarks) {
      divElement.innerHTML += `
       <button id="clear-bookmarked-prompts" class="btn btn-light fa-solid fa-delete-left" data-toggle="tooltip" type="button" title="${ORIGINAL_CLEAR_ALL_PROMPTS_TOOLTIP}" onclick="actions.removeAllBookmarks(true);" onmouseleave="actions.resetRemoveAllBookmarksTooltip(event);"></button>`;
    }

    if (showBookmarkPrompt) {
      divElement.innerHTML += `
       <button id="bookmark-prompt" class="btn btn-light fa-regular fa-bookmark" data-toggle="tooltip" type="button" title onclick="actions.bookmarkPrompt(event);" onmouseleave="actions.resetBookmarkTooltip(event);"></button>`;
    }

    if (showExportPrompts) {
      divElement.innerHTML += `
       <button id="export-prompts" class="btn btn-light fa-solid fa-file-export" data-toggle="tooltip" type="button" title="Export prompts" onclick="window.location='/export.html';"></button>`;
    }

    if (showCreatePrompt) {
      divElement.innerHTML += `
       <button id="create-prompt" class="btn btn-light fa-regular fa-square-plus btn-block" data-toggle="tooltip" type="button" title="Create prompt" onclick="window.location='/prompts/create_edit_prompt.html';"></button>
      `;
    }

    document.getElementsByTagName('h1')[0].before(divElement);
  }

  loadCategoryOptions(){
    fetch(CATEGORIES_FILE_PATH)
    .then((response) => response.json())
    .then((json) => {
      let index = 0;
      json.forEach(item => {
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(item);
        newOption.appendChild(optionText);
        newOption.setAttribute('value', index.toString());
        index++;
        document.getElementById('category').appendChild(newOption);
      });
    });
  }

  getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
}
