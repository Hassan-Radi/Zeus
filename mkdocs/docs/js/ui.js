const CATEGORIES_FILE_PATH = '/config/categories.json';

class UI {
  constructor() {
    this.addActiveClass();
  }

  showPromptHistory() {
    fetch(JSON_FILE_PATH)
      .then(response => response.json())
      .then(json => {
        for (let i = 1; i <= Object.keys(json.promptHistory).length; i++) {
          let detailsElement = document.createElement('details');
          detailsElement.classList.add('details');
          let summaryElement = document.createElement('summary');
          summaryElement.classList.add('summary');
          let summaryWrapperElement = document.createElement('div');
          summaryWrapperElement.classList.add('summary-wrapper');

          summaryWrapperElement.innerHTML = `
          <div class="summary-closed-image">${SUMMARY_CLOSED_ICON}</div>
          <div class="summary-open-image">${SUMMARY_OPEN_ICON}</div>
          <div class="summary-title">Version ${i}</div>`;

          summaryElement.appendChild(summaryWrapperElement);

          let divElement = document.createElement('div');
          divElement.innerHTML = `
          <div class="info-block">
            <div class="info-block__general">
                <div>Type:</div>
                <div>Changelog:</div>
                <div>LLM Model:</div>
            </div>
            <div class="info-block__data">
                <div>${this.getPromptTypeAsLinks(json.promptHistory[i].promptType)}</div>
                <div>${JSON.stringify(json.promptHistory[i].changeLog).replaceAll('"', '')}</div>
                <div>${JSON.stringify(json.promptHistory[i].llmModel).replaceAll('"', '')}</div>
            </div>
          </div>
          <div class="prompt-block-heading">Prompt</div>`;

          divElement.innerHTML = this.addDataItemGroup(
            divElement.innerHTML,
            null,
            json.promptHistory[i].revisedPrompt.replaceAll('"', '')
          );

          this.displayVariables(json, divElement, i);

          // add the text to the HTML document
          const historyHeading = document.getElementById('prompt-iterations-history');
          historyHeading.classList.add('iterations-history-heading', 'prompt-block-heading');
          historyHeading.after(detailsElement);
          detailsElement.appendChild(summaryElement);
          detailsElement.appendChild(divElement);
        }
      });
  }

  showPromptDetails() {
    fetch(JSON_FILE_PATH)
      .then(response => response.json())
      .then(json => {
        let divElement = document.createElement('div');
        divElement.innerHTML = `
        <div class="info-block">
          <div class="info-block__general">
              <div>Submitted originally by:</div>
              <div>Optimized by:</div>
              <div>Type:</div>
              <div>LLM Model:</div>
          </div>
          <div class="info-block__data">
              <div>${json.submittedOriginallyBy.join(', ')}</div>
              <div>${json.optimizedBy.join(', ')}</div>
              <div>${this.getPromptTypeAsLinks(json.promptHistory[Object.keys(json.promptHistory).length].promptType)}</div>
              <div>${JSON.stringify(json.promptHistory[Object.keys(json.promptHistory).length].llmModel).replaceAll('"', '')}</div>
          </div>
        </div>
        <div class="prompt-block-heading">Prompt</div>`;

        divElement.innerHTML = this.addDataItemGroup(
          divElement.innerHTML,
          null,
          json.promptHistory[Object.keys(json.promptHistory).length].revisedPrompt.replaceAll(
            '"',
            ''
          )
        );

        this.displayVariables(json, divElement, Object.keys(json.promptHistory).length);

        // add the download as .json button
        divElement.innerHTML += `
        <button class="button button-primary download-json-button" onclick="navigateTo(JSON_FILE_PATH);">
          ${DOWNLOAD_ICON}
          Download as .json
        </button>
`;

        // add the text to the HTML document
        document.getElementsByTagName('h1')[0].after(divElement);
      });
  }

  getPromptTypeAsLinks(promptTypes) {
    const promptTypesMap = {
      'Zero-shot prompt': '#zero-shot-prompt',
      'One-shot prompt': '#oneshot-prompt',
      'Few-shot prompt': '#few-shot-prompt',
      'User prompt': '#user-prompt',
      'System prompt': '#system-prompt',
      'Template prompt': '#template-prompt',
      'Interactive prompt': '#interactive-prompt',
    };

    return promptTypes.reduce(
      (acc, promptType) =>
        (acc += `<a class="button-secondary button-link prompt__link" href="/prompt_types.html${promptTypesMap[promptType]}">${promptType}</a>`),
      ''
    );
  }

  addDataItemGroup(html, dataItemName, dataItemValue) {
    html += '<div class="clipboard-block">';

    if (dataItemName !== null) {
      html += `<div class="clipboard-block__name">${dataItemName}</div>`;
    }

    html += `<div class="clipboard-block__text">${dataItemValue}</div>`;

    html += `
      <button 
        id="copy-button" 
        class="clipboard-block__button" 
        data-toggle="tooltip" 
        type="button" 
        title="${ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP}" 
        onclick="actions.copyToClipboard(event);" 
        onmouseleave="actions.resetClipboardTooltip(event);"
      >
        ${COPY_TO_CLIPBOARD_ICON}
      </button>`;

    html += '</div>';

    return html;
  }

  displayVariables(json, divElement, entryIndex) {
    // add the sample data if any exists
    if (json.promptHistory[entryIndex].variables !== undefined) {
      let variablesHtml = '';
      let numberOfEntries = Object.keys(json.promptHistory[entryIndex].variables).length;

      for (let i = 0; i < numberOfEntries; i++) {
        let dataItemName = json.promptHistory[entryIndex].variables[i].split(':')[0].trim();
        let dataItemValue = json.promptHistory[entryIndex].variables[i]
          .substring(dataItemName.length + 1)
          .trim();

        variablesHtml = this.addDataItemGroup(variablesHtml, dataItemName, dataItemValue);
      }

      // add all the sample data
      divElement.innerHTML += `
        <div class="variables-block">
          <div class="prompt-block-heading">Variables</div>${variablesHtml}
        </div>`;
    }
  }

  showPageTitle() {
    fetch(JSON_FILE_PATH)
      .then(response => response.json())
      .then(json => {
        const pageTitle = `[${json.category}] ${json.title}`;

        document.getElementById('header').innerHTML =
          `<span class="header--category">[${json.category}]</span></br> ${json.title}`;
        document.title = pageTitle;
        /**
         * Show the same header text when you scroll down
         */
        this.getElementByXpath("//div[@data-md-component='header-topic']/span").textContent =
          pageTitle;
      });
  }

  showPromptButtons(showCreatePrompt, showExportPrompts, showBookmarkPrompt, showEditPrompt) {
    const divElement = document.createElement('div');
    divElement.classList.add('d-flex', 'justify-content-end', 'prompt-buttons');

    if (showBookmarkPrompt) {
      divElement.innerHTML += `
        <button 
          id="bookmark-prompt" 
          class="button button-secondary bookmark-removed"  
          type="button" 
          title 
          onclick="actions.bookmarkPrompt(event);"
          onmouseleave="actions.resetBookmarkTooltip(event);"
        >
          ${BOOKMARK_ICON}
          Add to Export
        </button>`;
    }

    if (showExportPrompts) {
      divElement.innerHTML += `
        <button 
          id="export-prompts" 
          class="button button-secondary button-icon" 
          type="button" 
          title="Export prompts" 
          onclick="window.location='/export.html';"
        >
          ${ADD_TO_EXPORT_ICON}
        </button>`;
    }

    if (showEditPrompt) {
      divElement.innerHTML += `
        <button 
          id="edit-prompt" 
          class="button button-secondary button-icon" 
          type="button" 
          title="Edit prompt" 
          onClick="window.location='/prompts/create_prompt.html?action=edit&prompt=${JSON_FILE_NAME}';"
        >
          ${EDIT_ICON}
        </button>`;
    }

    if (showCreatePrompt) {
      divElement.innerHTML += `
        <button 
         id="create-prompt" 
         class="button button-secondary button-icon" 
         type="button" 
         title="Create prompt" 
         onclick="window.location='/prompts/create_prompt.html';"
        >
          ${CREATE_ICON}
        </button>`;
    }

    document.getElementsByTagName('h1')[0].before(divElement);
  }

  showCreatePromptButton() {
    const divElement = document.createElement('div');
    divElement.classList.add('d-flex', 'justify-content-end');

    divElement.innerHTML += `
     <button 
       id="create-prompt" 
       class="d-flex justify-content-center align-items-center button button-primary create-prompt-button" 
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
      .then(response => response.json())
      .then(json => {
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

  showEditFields(show) {
    if (!show) {
      document.getElementById('variables').classList.add('d-none');
      document.getElementById('changelogDiv').classList.add('d-none');
      document.getElementById('optimizedByGroupDiv').classList.add('d-none');
      document.getElementById('cancelEditPrompt').classList.add('d-none');
    }
  }

  getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue;
  }

  loadValuesInFields(jsonFileName) {
    let jsonFilePath = '/json/' + jsonFileName + '.json';

    fetch(jsonFilePath)
      .then(response => response.json())
      .then(json => {
        document.getElementById('promptTitle').value = json.title;
        document.getElementById('submittedBy').value = json.submittedOriginallyBy;
        document.getElementById('optimizedBy').value = json.optimizedBy;
        this.selectByText('category', json.category);
        this.selectByText(
          'llmModel',
          json.promptHistory[Object.keys(json.promptHistory).length].llmModel
        );
        document.getElementById('promptTextArea').value =
          json.promptHistory[Object.keys(json.promptHistory).length].revisedPrompt;

        // Here we use +2 to ignore the extra space after the :
        if (json.promptHistory[Object.keys(json.promptHistory).length].variables) {
          json.promptHistory[Object.keys(json.promptHistory).length].variables.forEach(variable => {
            actions.addVariableToTable(
              variable.split(':')[0].trim(),
              variable.substring(variable.indexOf(':') + 2)
            );
          });
        }

        json.badges.forEach(badge => this.selectByText('selectBadges', badge));
        json.targetAudience.forEach(targetAudience =>
          this.selectByText('selectTargetAudience', targetAudience)
        );
        json.promptHistory[Object.keys(json.promptHistory).length].promptType.forEach(type =>
          this.selectByText('selectPromptType', type)
        );
      });
  }

  selectByText(id, text) {
    $(`#${id} option`)
      .filter(function () {
        return $(this).text() === text.trim();
      })
      .prop('selected', true);

    $(`#${id}`).trigger('change');
  }

  addActiveClass() {
    if (window.location.pathname === '/') {
      const homeNavListItem = document.querySelector(
        '.md-nav--primary > .md-nav__list > li:first-child'
      );
      const homeNavListItemLink = homeNavListItem.querySelector('a');

      homeNavListItem.classList.add('md-nav__item--active');
      homeNavListItemLink.classList.add('md-nav__link--active');
    }
  }
}
