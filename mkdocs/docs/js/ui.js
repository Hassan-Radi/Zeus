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

        this.displayVariables(json, divElement, i);

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

      this.displayVariables(json, divElement,
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
        case 'Zero-shot prompt':
          outputLinks += '<a class="link-primary" href="/prompt_types.html#zero-shot-prompt">Zero-shot prompt</a>';
          break;
        case 'One-shot prompt':
          outputLinks += '<a class="link-secondary" href="/prompt_types.html#oneshot-prompt">Oneshot prompt</a>';
          break;
        case 'Few-shot prompt':
          outputLinks += '<a class="link-dark" href="/prompt_types.html#few-shot-prompt">Few-shot prompt</a>';
          break;
        case 'User prompt':
          outputLinks += '<a class="link-success" href="/prompt_types.html#user-prompt">User prompt</a>';
          break;
        case 'System prompt':
          outputLinks += '<a class="link-danger" href="/prompt_types.html#system-prompt">System prompt</a>';
          break;
        case 'Template prompt':
          outputLinks += '<a class="link-warning" href="/prompt_types.html#template-prompt">Template prompt</a>';
          break;
        case 'Interactive prompt':
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

  displayVariables(json, divElement, entryIndex) {
    // add the sample data if any exists
    if (json.promptHistory[entryIndex].variables !== undefined) {
      let variablesHtml = "";
      let numberOfEntries = Object.keys(
          json.promptHistory[entryIndex].variables).length;

      for (let i = 0; i < numberOfEntries; i++) {
        let dataItemName = json.promptHistory[entryIndex].variables[i].split(
            ':')[0].trim();
        let dataItemValue = json.promptHistory[entryIndex].variables[i].substring(
            dataItemName.length + 1).trim();

        variablesHtml = this.addDataItemGroup(variablesHtml, dataItemName,
            'link-success',
            dataItemValue);

        // add a space if we aren't processing the last entry
        if (i != numberOfEntries - 1) {
          variablesHtml += '<br>';
        }
      }

      // add all the sample data
      divElement.innerHTML += `<h5 class="link-danger">Variables:</h5>${variablesHtml}`;
    }
  }

  showPageTitle() {
    fetch(JSON_FILE_PATH)
    .then((response) => response.json())
    .then((json) => {
      let pageTitle = `[${json.category}] ${json.title}`;
      document.getElementById('header').innerText = pageTitle;
      document.title = pageTitle;
      /**
       * Show the same header text when you scroll down
       */
      this.getElementByXpath("//div[@data-md-component='header-topic']/span").textContent = pageTitle;
    });
  }

  showPromptButtons(showCreatePrompt, showExportPrompts, showBookmarkPrompt,
      showClearBookmarks, showEditPrompt) {
    const divElement = document.createElement('div');
    divElement.classList.add('float-end');

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

    if (showEditPrompt) {
      divElement.innerHTML += `<button id="edit-prompt" class="btn btn-light fa-regular fa-pen-to-square btn-block" data-toggle="tooltip" type="button" title="Edit prompt" onClick="window.location='/prompts/create_prompt.html?action=edit&prompt=${JSON_FILE_NAME}';"></button>`;
    }

    if (showCreatePrompt) {
      divElement.innerHTML += `
       <button id="create-prompt" class="btn btn-light fa-regular fa-square-plus btn-block" data-toggle="tooltip" type="button" title="Create prompt" onclick="window.location='/prompts/create_prompt.html';"></button>`;
    }

    document.getElementsByTagName('h1')[0].before(divElement);
  }

  showCreatePromptButton() {
    const divElement = document.createElement('div');
    divElement.classList.add('d-flex', 'justify-content-end');

    divElement.innerHTML += `
     <button 
       id="create-prompt" 
       class="btn btn-light btn-block d-flex justify-content-center align-items-center create-prompt-button" 
       type="button" 
       title="Create prompt" 
       onclick="navigateTo('/prompts/create_prompt.html');"
     >
       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7.46838 1.37573H6.53088C6.44755 1.37573 6.40588 1.4174 6.40588 1.50073V6.40698H1.75C1.66667 6.40698 1.625 6.44865 1.625 6.53198V7.46948C1.625 7.55282 1.66667 7.59448 1.75 7.59448H6.40588V12.5007C6.40588 12.5841 6.44755 12.6257 6.53088 12.6257H7.46838C7.55172 12.6257 7.59338 12.5841 7.59338 12.5007V7.59448H12.25C12.3333 7.59448 12.375 7.55282 12.375 7.46948V6.53198C12.375 6.44865 12.3333 6.40698 12.25 6.40698H7.59338V1.50073C7.59338 1.4174 7.55172 1.37573 7.46838 1.37573Z" fill="white"/>
       </svg>
       Create prompt
     </button>`;

    document.getElementsByTagName('h2')[0].before(divElement);
  }

  loadCategoryOptions() {
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

  showEditFields(show){
    if(!show){
      document.getElementById('variables').classList.add('d-none');
      document.getElementById('changelogDiv').classList.add('d-none');
      document.getElementById('optimizedByGroupDiv').classList.add('d-none');
    }
  }

  getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  loadValuesInFields(jsonFileName) {
    let jsonFilePath = '/json/' + jsonFileName + '.json';

    fetch(jsonFilePath)
    .then((response) => response.json())
    .then((json) => {
      document.getElementById('promptTitle').value = json.title;
      document.getElementById('submittedBy').value = json.submittedOriginallyBy;
      document.getElementById('optimizedBy').value = json.optimizedBy;
      this.selectByText("category", json.category);
      this.selectByText("llmModel", json.promptHistory[Object.keys(
          json.promptHistory).length].llmModel);
      document.getElementById('promptTextArea').value = json.promptHistory[Object.keys(
          json.promptHistory).length].revisedPrompt;

      // Here we use +2 to ignore the extra space after the :
      if(json.promptHistory[Object.keys(json.promptHistory).length].variables){
        json.promptHistory[Object.keys(
            json.promptHistory).length].variables.forEach(variable => {
          actions.addVariableToTable(variable.split(":")[0].trim(), variable.substring(variable.indexOf(':') + 2));
        });
      }

      json.badges.forEach(badge => this.selectByText("selectBadges", badge));
      json.targetAudience.forEach(targetAudience => this.selectByText("selectTargetAudience", targetAudience));
      json.promptHistory[Object.keys(
          json.promptHistory).length].promptType.forEach(type => this.selectByText("selectPromptType", type));
    });
  }

  selectByText(id, text){
    $(`#${id} option`).filter(function() {
      return $(this).text() === text.trim();
    }).prop('selected', true);

    $(`#${id}`).trigger('change');
  }
}
