/**
 * TODO: Move constants to a separate file (kay/value pairs).
 * & make sure to move the Git-related URLs, waits and timeouts to their own
 * file (to easily edit that when using something else).
 */
const PROMPTS_NAME_IN_LOCAL_STORAGE = 'prompts';
const ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP = 'Copy to clipboard';
const COPIED_TO_CLIPBOARD_TOOLTIP = 'Copied!';
const PROMPT_ADDED_TOOLTIP = 'The prompt was added';
const PROMPT_REMOVED_TOOLTIP = 'The prompt was removed';
const ORIGINAL_CLEAR_ALL_PROMPTS_TOOLTIP = 'Clear all bookmarked prompts';
const ALL_JSON_PROMPTS_PATH = 'config/allPrompts.json';
const TOKEN_FILE_PATH = '/config/token.json';
const GIT_BASE_URL = 'https://git.epam.com';
const PROJECT_ENCODED_URL = 'epmc-tst%2Fzeus%2Fzeus-site-generator';
const EDIT_VARIABLE_HEADER_TEXT = 'Edit variable';
const ADD_VARIABLE_HEADER_TEXT = 'Add variable';
const CREATE_PROMPT_HEADER_TEXT = 'Creating the prompt!';
const EDIT_PROMPT_HEADER_TEXT = 'Editing the prompt!';
const MR_WAITING_FOR_APPROVAL_NUMBER_OF_RETRIES = 19;
const MR_WAITING_FOR_APPROVAL_INTERVAL_TIME = 5000;
const WAITING_FOR_PIPELINE_NUMBER_OF_RETRIES = 39;
const WAITING_FOR_PIPELINE_INTERVAL_TIME = 10000;

let sourceTableRow; // TODO: find a better way to replace this

class Actions {
  constructor() {}

  injectEnableTooltipsEventListener() {
    window.addEventListener('load', function () {
      actions.enableAllTooltips();
    });
  }

  enableAllTooltips() {
    document.querySelectorAll('[data-toggle="tooltip"]').forEach(el => {
      $(el).tooltip();
    });
  }

  // tooltip actions
  copyToClipboard() {
    new ClipboardJS('#copy-button', {
      target: function (trigger) {
        $(trigger).attr('data-bs-original-title', COPIED_TO_CLIPBOARD_TOOLTIP).tooltip('show');

        return trigger.previousElementSibling;
      },
    });
  }

  resetClipboardTooltip(event) {
    event.target.setAttribute('data-bs-original-title', ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP);

    // hide the tooltip
    $(event.target).tooltip('hide');

    // remove the text election from all elements on the window
    window.getSelection().removeAllRanges();
  }

  // bookmark actions
  bookmarkPrompt(event) {
    // check whether the prompt is bookmarked or not
    if (event.currentTarget.classList.contains('bookmark-removed')) {
      // change tooltip
      $(event.currentTarget).attr('data-bs-original-title', PROMPT_ADDED_TOOLTIP).tooltip('show');

      this.storePromptInLocalStorage(JSON_FILE_NAME);
    } else {
      // change tooltip
      $(event.currentTarget).attr('data-bs-original-title', PROMPT_REMOVED_TOOLTIP).tooltip('show');

      this.removePromptFromLocalStorage(JSON_FILE_NAME);
    }

    this.loadBookmarkIcon();
  }

  resetBookmarkTooltip(event) {
    event.target.setAttribute('data-bs-original-title', '');

    // hide the tooltip
    $(event.target).tooltip('hide');
  }

  removeAllBookmarks(loadBookmarkIcons) {
    let promptCount = JSON.parse(localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE)).length;
    if (
      confirm(
        `You currently have (${promptCount}) prompts bookmarked. Are you sure you want to clear them all?`
      ) === true
    ) {
      localStorage.removeItem(PROMPTS_NAME_IN_LOCAL_STORAGE);

      // update the tooltip text
      const element = document.getElementById('clear-bookmarked-prompts');

      // update the buttons
      this.loadRemoveAllBookmarksIcon();

      if (loadBookmarkIcons === true) {
        // this is triggered when we are on a prompt page
        this.loadBookmarkIcon();
      } else {
        // this is triggered when we are on the export page
        // refresh the page to reflect the new changes
        location.reload();
      }
    }
  }

  resetRemoveAllBookmarksTooltip(event) {
    // hide the tooltip
    $(event.target).tooltip('hide');
  }

  loadBookmarkIcon() {
    const element = document.getElementById('bookmark-prompt');

    if (this.isPromptInLocalStorage(JSON_FILE_NAME)) {
      element.classList.remove('bookmark-removed');
      element.classList.add('bookmark-added');
      element.innerHTML = `${REMOVE_FROM_EXPORTS_ICON} Remove from Export`;

      // update the tooltip
      element.setAttribute('data-bs-original-title', PROMPT_ADDED_TOOLTIP);
    } else {
      element.classList.remove('bookmark-added');
      element.classList.add('bookmark-removed');
      element.innerHTML = `${BOOKMARK_ICON} Add to Export`;

      // update the tooltip
      element.setAttribute('data-bs-original-title', '');
    }
  }

  loadRemoveAllBookmarksIcon() {
    const element = document.getElementById('clear-bookmarked-prompts');

    if (this.hasBookmarks()) {
      if (element.classList.contains('invisible')) {
        element.classList.remove('invisible');
      }

      element.classList.add('visible');
    } else {
      if (element.classList.contains('visible')) {
        element.classList.remove('visible');
      }

      element.classList.add('invisible');
    }
  }

  toggleCheckAllPrompts() {
    document.querySelectorAll('#prompt-checkbox').forEach(checkBox => {
      let checkAllCheckBoxesElement = document.getElementById('select-all-checkbox');

      if ($(checkAllCheckBoxesElement).prop('checked') === true) {
        $(checkBox).prop('checked', true);
      } else {
        $(checkBox).prop('checked', false);
      }
    });
  }

  hasBookmarks() {
    return (
      localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE) !== null &&
      JSON.parse(localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE)).length !== 0
    );
  }

  // local storage actions
  storePromptInLocalStorage(prompt) {
    let prompts;

    // check if there are any prompts in local storage to load first
    if (localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE) === null) {
      prompts = [];
    } else {
      prompts = JSON.parse(localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE));
    }

    // only add the prompt if it is not in local storage already
    if (!this.isPromptInLocalStorage(prompt)) {
      // add the new prompt
      prompts.push(prompt);

      // add all prompts back to local storage
      localStorage.setItem(PROMPTS_NAME_IN_LOCAL_STORAGE, JSON.stringify(prompts));
    }
  }

  removePromptFromLocalStorage(prompt) {
    // check if there are any prompts in local storage to load first
    let prompts = JSON.parse(localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE));

    // only add the prompt if it is not in local storage already
    if (this.isPromptInLocalStorage(prompt)) {
      // remove the prompt
      let newPromptsArray = [];

      for (let i = 0; i < prompts.length; i++) {
        if (prompts[i] !== prompt) {
          newPromptsArray.push(prompts[i]);
        }
      }

      // add all prompts back to local storage
      localStorage.setItem(PROMPTS_NAME_IN_LOCAL_STORAGE, JSON.stringify(newPromptsArray));
    }
  }

  isPromptInLocalStorage(prompt) {
    // check if there are any prompts in local storage
    if (localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE) === null) {
      return false;
    } else {
      let prompts = JSON.parse(localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE));

      return prompts.includes(prompt);
    }
  }

  // export prompt actions
  listAllPrompt() {
    window.addEventListener('load', () => {
      const element = document.getElementById('table-body');

      fetch(ALL_JSON_PROMPTS_PATH)
        .then(response => response.json())
        .then(json => {
          for (let i = 0; i < json.length; i++) {
            const trElement = document.createElement('tr');
            trElement.id = 'table-row';

            if (this.isPromptInLocalStorage(json[i].fileName.replace('.json', ''))) {
              trElement.innerHTML +=
                '<td class="text-center"><input id="prompt-checkbox" class="form-check-input" type="checkbox" checked></td>';
            } else {
              trElement.innerHTML +=
                '<td class="text-center"><input id="prompt-checkbox" class="form-check-input" type="checkbox"></td>';
            }
            trElement.innerHTML += `<td class="text-center">${i + 1}</td>
              <td id="prompt-name">
                <a class="link-primary" href="/prompts/prompt_page.html?prompt=${json[
                  i
                ].fileName.replace('.json', '')}">${json[i].category} - ${json[i].title}</a>
              </td>
            </tr>
            `;

            element.appendChild(trElement);
          }
        });
    });
  }

  async exportToEpamAIDial() {
    let allRows = document.querySelectorAll('#table-row');

    // check if no prompts are selected
    if (this.isNoCheckBoxesChecked(allRows)) {
      alert('No prompts are selected. Please select at least one prompt to export.');
      return;
    }

    let jsonOutput = {
      folders: [],
      prompts: [],
    };

    for (let i = 0; i < allRows.length; i++) {
      let isChecked = this.isCheckBoxChecked(allRows[i].querySelector('#prompt-checkbox'));

      // move on quickly if the prompt is not selected
      if (!isChecked) {
        continue;
      }

      let promptContent;
      let promptJsonFileName = await this.getPromptJsonFile(
        allRows[i].querySelector('#prompt-name').textContent
      );

      await fetch(promptJsonFileName)
        .then(response => response.json())
        .then(json => {
          promptContent = json.promptHistory[Object.keys(json.promptHistory).length].revisedPrompt;

          if (isChecked) {
            jsonOutput.prompts.push({
              id: `${this.generateUuidv4()}`,
              folderId: null,
              name: `${allRows[i].querySelector('#prompt-name').textContent.trim()} (V${
                Object.keys(json.promptHistory).length
              })`,
              content: `${promptContent}`,
            });
          }
        });
    }

    this.saveAsJson('EpamAiDial.json', jsonOutput);
  }

  async exportToZeus() {
    let allRows = document.querySelectorAll('#table-row');

    // check if no prompts are selected
    if (this.isNoCheckBoxesChecked(allRows)) {
      alert('No prompts are selected. Please select at least one prompt to export.');

      return;
    }

    let jsonOutput = {
      prompts: [],
    };

    for (let i = 0; i < allRows.length; i++) {
      let isChecked = this.isCheckBoxChecked(allRows[i].querySelector('#prompt-checkbox'));

      // move on quickly if the prompt is not selected
      if (!isChecked) {
        continue;
      }

      let promptJsonFileName = await this.getPromptJsonFile(
        allRows[i].querySelector('#prompt-name').textContent
      );

      await fetch(promptJsonFileName)
        .then(response => response.json())
        .then(json => {
          if (isChecked) {
            jsonOutput.prompts.push(json);
          }
        });
    }

    this.saveAsJson('Zeus.json', jsonOutput);
  }

  isNoCheckBoxesChecked(allRows) {
    for (let i = 0; i < allRows.length; i++) {
      if (this.isCheckBoxChecked(allRows[i].querySelector('#prompt-checkbox'))) {
        return false;
      }
    }

    return true;
  }

  isCheckBoxChecked(checkBoxElement) {
    // check using two techniques to cover programmatic selection and manual one
    return $(checkBoxElement).prop('checked') === true;
  }

  saveAsJson(filename, dataObjToWrite) {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: 'text/json' });
    const link = document.createElement('a');

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  }

  generateUuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  getModalHeaderText = () =>
    getUrlParameters().get('action') === 'edit'
      ? EDIT_PROMPT_HEADER_TEXT
      : CREATE_PROMPT_HEADER_TEXT;

  async getPromptJsonFile(promptReadableName) {
    let promptTitle = promptReadableName.substring(promptReadableName.indexOf('-') + 1).trim();
    let output;

    await fetch(ALL_JSON_PROMPTS_PATH)
      .then(response => response.json())
      .then(json => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].title === promptTitle) {
            output = 'json/' + json[i].fileName;
          }
        }
      });

    return output;
  }

  validateData() {
    const defaultModalErrorData = {
      isHideCloseButton: false,
      headerText: 'Error!',
      isAppendMode: false,
    };

    // check if the user didn't agree to the terms
    if (!this.isCheckBoxChecked(document.getElementById('agreeToTerms'))) {
      this.showModalMessage({
        ...defaultModalErrorData,
        message: 'Please agree to the terms first.',
      });

      return false;
    }

    // check if the user didn't select any badges
    if (!$('#selectBadges').val().length) {
      this.showModalMessage({
        ...defaultModalErrorData,
        message: 'Please select at least one badge!',
      });

      return false;
    }

    // check if the user didn't select any target audience
    if (!$('#selectTargetAudience').val().length) {
      this.showModalMessage({
        ...defaultModalErrorData,
        message: 'Please select at least one target audience!',
      });

      return false;
    }

    // check if the user didn't select any prompt type
    if (!$('#selectPromptType').val().length) {
      this.showModalMessage({
        ...defaultModalErrorData,
        message: 'Please select at least one prompt type!',
      });

      return false;
    }

    return true;
  }

  async submitPrompt() {
    if (!this.validateData()) {
      return;
    }

    // Create a json object in preparation for the next steps
    let isEditOperation = getUrlParameters().get('action') === 'edit';
    let promptIteration = '1';

    let newPromptData = {
      title: `${document.getElementById('promptTitle').value}`,
      category: `${$('#category option:selected').text()}`,
      badges: `${$('#selectBadges').val()}`.split(',').map(index =>
        $('#selectBadges option')
          .eq(index - 1)
          .text()
      ),
      targetAudience: `${$('#selectTargetAudience').val()}`.split(',').map(index =>
        $('#selectTargetAudience option')
          .eq(index - 1)
          .text()
      ),
      submittedOriginallyBy: `${document.getElementById('submittedBy').value}`
        .split(',')
        .map(item => item.trim()),
      optimizedBy: isEditOperation
        ? `${document.getElementById('optimizedBy').value}`.split(',').map(item => item.trim())
        : [],
      promptHistory: {},
    };

    if (isEditOperation) {
      let jsonFileName = '/json/' + getUrlParameters().get('prompt') + '.json';

      await fetch(jsonFileName)
        .then(response => response.json())
        .then(json => {
          promptIteration = Object.keys(json.promptHistory).length + 1;

          // Add the old prompt history entries if in edit more
          if (isEditOperation) {
            let entries = Object.keys(json.promptHistory).length;
            for (let i = 0; i <= entries; i++) {
              newPromptData.promptHistory[i] = json.promptHistory[i];
            }
          }
        });
    }

    // add the current prompt history entry
    newPromptData.promptHistory[`${promptIteration}`] = {
      revisedPrompt: `${document.getElementById('promptTextArea').value}`,
      changeLog: isEditOperation
        ? document.getElementById('changelogTextArea').value
        : 'Original version.',
      promptType: `${$('#selectPromptType').val()}`.split(',').map(index =>
        $('#selectPromptType option')
          .eq(index - 1)
          .text()
      ),
      llmModel: `${$('#llmModel option:selected').text()}`,
    };

    // add the variables
    if (isEditOperation && document.getElementById('variablesTable').rows.length > 0) {
      newPromptData.promptHistory[`${promptIteration}`].variables = Array.from(
        document.querySelectorAll('#variableRow')
      ).map(row => {
        return `${row.querySelector('#variableName').textContent}: ${row.querySelector('#sampleValue').textContent}`;
      });
    }

    let branchName = Date.now();
    let createdFileName = isEditOperation
      ? getUrlParameters().get('prompt') + '.json'
      : newPromptData.category.replaceAll(' ', '_') +
        '-' +
        newPromptData.title.replaceAll(' ', '_') +
        '.json';

    // create a branch
    this.createBranch(branchName).then(() => {
      // commit the json object as a file to the created branch
      this.commitToBranch(branchName, createdFileName, newPromptData).then(() => {
        // create a merge request using the created branch
        this.createMergeRequest(branchName, createdFileName).then(async mergeRequestID => {
          this.showModalMessage({
            headerText: this.getModalHeaderText(),
            message:
              '<div>To ensure prompt quality, your data has to be reviewed and approved by one of the code maintainers. Waiting for merge request to be merged...</div>',
          });

          await this.waitForMergeRequestToBeMerged(mergeRequestID, createdFileName);
        });
      });
    });
  }

  cancelPromptEdit() {
    const currentPath = window.location.href;

    navigateTo(currentPath.replace('create_prompt.html?action=edit&', 'prompt_page.html?'));
  }

  waitForPipelineToBeCreated(mergeRequestState, createdFileName) {
    if (mergeRequestState === 'merged') {
      setTimeout(async () => {
        // Get the pipeline ID
        // TODO: find a way to tie the MR with the pipeline
        let intervalID = window.setInterval(async () => {
          await this.getPipelineUrl()
            .then(pipelineUrl => {
              // verify that it is a valid URL by invoking the URL constructor
              new URL(pipelineUrl);
              this.showModalMessage({
                headerText: this.getModalHeaderText(),
                message: `
                  <div class="link-wrapper">
                    ${CHECK_ICON} 
                    <span>
                      Pipeline created 
                      <span class="branch-url">[<a href="${pipelineUrl}" class="button-secondary" target="_blank" rel="noopener">URL</a>]</span>.
                    </span>
                  </div>`,
              });
              window.clearInterval(intervalID);
              this.completeMergeRequestPipeline(createdFileName);
            })
            .catch(() => {
              this.showModalMessage({
                headerText: this.getModalHeaderText(),
                message: '<div>Waiting for pipeline...</div>',
              });
            });
        }, 1000);
      }, 5000);
    } else {
      console.log("Merge request wasn't merged in time. Moving on...");
    }
  }

  async completeMergeRequestPipeline(createdFileName) {
    // TODO: Find a better way to do this, so we don't repeat the request
    await this.getPipelineUrl().then(pipelineUrl => {
      let mergeRequestPipelineID = pipelineUrl.substring(pipelineUrl.lastIndexOf('/') + 1);
      this.waitForPipelineToFinish(mergeRequestPipelineID, createdFileName);
    });
  }

  showNewPromptPage(createdFileName) {
    // Show the new page
    setTimeout(() => {
      window.location.href = `${window.location.origin}/prompts/prompt_page.html?prompt=${createdFileName.replace(
        '.json',
        ''
      )}`;
    }, 1000);
  }

  async waitForMergeRequestToBeMerged(mergeRequestID, createdFileName) {
    let x = 0;
    let mergeRequestState;
    let intervalID = window.setInterval(async () => {
      mergeRequestState = await this.getMergeRequestState(mergeRequestID);

      if (mergeRequestState === 'merged') {
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `<div class="link-wrapper">${CHECK_ICON} <span>Merge request is successfully merged.</span></div>`,
        });

        window.clearInterval(intervalID);
        this.waitForPipelineToBeCreated(mergeRequestState, createdFileName);
      } else {
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `<div>[${x + 1}] Merge request is [${mergeRequestState}]. Waiting until it gets merged...</div>`,
        });
      }

      // show failure message when timing out
      if (++x === MR_WAITING_FOR_APPROVAL_NUMBER_OF_RETRIES) {
        this.showModalMessage({
          isHideCloseButton: false,
          headerText: this.getModalHeaderText(),
          message:
            '<div><i class="fa-solid fa-x" style="color: #ff0000;"></i> Timed out waiting for the merge request to be merged. Please contact one of the code maintainers.</div>',
        });
        window.clearInterval(intervalID);
      }
    }, MR_WAITING_FOR_APPROVAL_INTERVAL_TIME);
  }

  waitForPipelineToFinish(pipelineID, createdFileName) {
    let x = 0;
    let intervalID = window.setInterval(async () => {
      let pipelineStatus = await this.getPipelineStatus(pipelineID);

      if (pipelineStatus === 'success') {
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `<div>${CHECK_ICON} Pipeline succeeded.</div>`,
        });
        window.clearInterval(intervalID);
        this.showNewPromptPage(createdFileName);
      } else {
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `<div>[${x + 1}] Pipeline status is [${pipelineStatus}]. Waiting until it finishes...</div>`,
        });
      }

      // show failure message when timing out
      if (++x === WAITING_FOR_PIPELINE_NUMBER_OF_RETRIES) {
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `<div>[${x + 1}] Pipeline timed out.</div>`,
        });
        window.clearInterval(intervalID);
      }
    }, WAITING_FOR_PIPELINE_INTERVAL_TIME);
  }

  async commitToBranch(branchName, createdFileName, newPromptData) {
    this.showModalMessage({
      headerText: this.getModalHeaderText(),
      message:
        '<div>Creating a JSON file from the provided data and committing it to the branch...</div>',
    });

    return fetch(`${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/repository/commits`, {
      method: 'POST',
      headers: {
        'PRIVATE-TOKEN': `${await this.readToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        branch: `${branchName}`,
        commit_message: 'Automated PR creation from the GUI.',
        actions: [
          {
            action: getUrlParameters().get('action') === 'edit' ? 'update' : 'create',
            file_path: 'mkdocs/docs/json/' + `${createdFileName}`,
            content: `${JSON.stringify(newPromptData, null, 2)}`,
          },
        ],
      }),
    })
      .then(async r => {
        // Show file committed message
        let commitUrl = await r.json().then(json => json.web_url);
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `
            <div class="link-wrapper">
              ${CHECK_ICON} 
              <span>
                File committed to branch 
                <span class="branch-url">[<a href="${commitUrl}" class="button-secondary" target="_blank" rel="noopener">URL</a>]</span>.
              </span>
            </div>`,
        });
      })
      .catch(ex => console.log(ex));
  }

  async createBranch(branchName) {
    this.showModalMessage({
      headerText: this.getModalHeaderText(),
      isAppendMode: false,
      message: '<div>Creating a new branch in the code repository...</div>',
    });

    return fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/repository/branches?` +
        `branch=${branchName}` +
        '&ref=main',
      {
        method: 'POST',
        headers: {
          'PRIVATE-TOKEN': `${await this.readToken()}`,
        },
      }
    )
      .then(async r => {
        // show branch URL message
        let branchUrl = await r.json().then(json => json.web_url);
        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `
            <div class="link-wrapper">
              ${CHECK_ICON} 
              <span>
                Branch created 
                <span class="branch-url">[<a href="${branchUrl}" class="button-secondary" target="_blank" rel="noopener">URL</a>]</span>.
              </span>
            </div>`,
        });
      })
      .catch(ex => console.log(ex));
  }

  async createMergeRequest(branchName, createdFileName) {
    this.showModalMessage({
      headerText: this.getModalHeaderText(),
      message: '<div>Creating a merge request to merge your changes to the main branch...</div>',
    });

    let mergeRequestID;
    await fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/merge_requests?` +
        `source_branch=${branchName}` +
        '&target_branch=main' +
        '&remove_source_branch=true' +
        '&squash=true' +
        `&title=[Zeus Bot] Added file "${createdFileName}"`,
      {
        method: 'POST',
        headers: {
          'PRIVATE-TOKEN': `${await this.readToken()}`,
        },
      }
    )
      .then(async r => {
        // Show merge request message
        let mergeRequestUrl = await r.json().then(json => json.web_url);
        mergeRequestID = mergeRequestUrl.substring(mergeRequestUrl.lastIndexOf('/') + 1);

        this.showModalMessage({
          headerText: this.getModalHeaderText(),
          message: `
            <div class="link-wrapper">
              ${CHECK_ICON} 
              <span>
                Merge request created 
                <span class="branch-url">[<a href="${mergeRequestUrl}" class="button-secondary" target="_blank" rel="noopener">URL</a>]</span>.
              </span>
            </div>`,
        });
      })
      .catch(ex => console.log(ex));

    return mergeRequestID;
  }

  async getMergeRequestState(mergeRequestID) {
    let mergeRequestState;
    await fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/merge_requests/${mergeRequestID}`,
      {
        method: 'GET',
        headers: {
          'PRIVATE-TOKEN': `${await this.readToken()}`,
        },
      }
    )
      .then(async r => {
        mergeRequestState = await r.json().then(json => json.state);
      })
      .catch(ex => console.log(ex));

    return mergeRequestState;
  }

  async getPipelineUrl() {
    let pipelineUrl;
    await fetch(`${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/pipelines?status=running`, {
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': `${await this.readToken()}`,
      },
    })
      .then(async r => {
        // TODO: handle the case where you receive multiple pipelines in the response
        pipelineUrl = r.json().then(json => json[0].web_url);
      })
      .catch(() => {
        // ignore it and do nothing here
      });

    return pipelineUrl;
  }

  async getPipelineStatus(pipelineID) {
    let pipelineStatus;
    await fetch(`${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/pipelines/${pipelineID}`, {
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': `${await this.readToken()}`,
      },
    })
      .then(async r => {
        pipelineStatus = await r.json().then(json => json.status);
      })
      .catch(ex => console.log(ex));

    return pipelineStatus;
  }

  async readToken() {
    let tokenValue;

    await fetch(TOKEN_FILE_PATH)
      .then(response => response.json())
      .then(json => {
        tokenValue = json.token;
      })
      .catch(ex => console.log(ex));

    return tokenValue;
  }

  showModalMessage({ isHideCloseButton = true, headerText, isAppendMode = true, message }) {
    document.getElementById('close-button').classList.toggle('d-none', isHideCloseButton);
    document.getElementById('submitPromptModalHeader').textContent = headerText;

    let modalBody = document.getElementById('submitPromptModalBody');
    isAppendMode ? (modalBody.innerHTML += message) : (modalBody.innerHTML = message);

    // Scroll automatically to the bottom of the text
    modalBody.scrollTo(0, modalBody.scrollHeight);
  }

  submitVariable() {
    let variable = document.getElementById('variableNameInput').value;
    let sampleValue = document.getElementById('sampleValueTextArea').value;

    if (
      variable !== undefined &&
      variable !== '' &&
      sampleValue !== undefined &&
      sampleValue !== ''
    ) {
      // Execute action depending on the header text
      if (
        document.getElementById('variablesModalHeader').textContent === ADD_VARIABLE_HEADER_TEXT
      ) {
        this.addVariableToTable(variable, sampleValue);
      } else {
        sourceTableRow.querySelector('#variableName').textContent = variable;
        sourceTableRow.querySelector('#sampleValue').textContent = sampleValue;
      }

      // Reset and hide the Modal
      document.getElementById('variableNameInput').value = '';
      document.getElementById('sampleValueTextArea').value = '';
      $('#addVariableModal').modal('hide');
    } else {
      // TODO: show an error message
    }
  }

  addVariableToTable(variable, sampleValue) {
    let tableRow = document.createElement('tr');
    tableRow.id = 'variableRow';

    tableRow.innerHTML +=
      `<td id="variableName" class="text-center">${variable}</td>` +
      `<td id="sampleValue" class="text-center">${sampleValue}</td>` +
      `<td class="prompt-table__icons">` +
      `<button data-toggle="tooltip" title="Edit variable" id="editVariable" onclick="actions.editVariableEntry(event)">${PEN_ICON}</button>` +
      `<button data-toggle="tooltip" title="Delete variable" id="deleteVariable" onclick="actions.deleteVariableEntry(event);">${BIN_ICON}</button>` +
      `</td>`;

    // Add the row to the table
    document.getElementById('table-body').appendChild(tableRow);

    // show thr tooltips again
    this.enableAllTooltips();
  }

  editVariableEntry(event) {
    sourceTableRow = event.target.parentElement.parentElement.parentElement;

    // show modal header and fill the text items
    this.showVariablesModal(
      true,
      EDIT_VARIABLE_HEADER_TEXT,
      sourceTableRow.querySelector('#variableName').textContent,
      sourceTableRow.querySelector('#sampleValue').textContent
    );

    $('.tooltip').not(this).hide(); // hide the tooltip
  }

  deleteVariableEntry(event) {
    $('.tooltip').not(this).hide(); // hide the tooltip
    let sourceTableRow = event.target.parentElement.parentElement.parentElement;
    sourceTableRow.remove();
  }

  showVariablesModal(show, headerText, variableName, variableValue) {
    document.getElementById('variablesModalHeader').textContent = headerText;
    document.getElementById('variableNameInput').value = variableName;
    document.getElementById('sampleValueTextArea').value = variableValue;

    if (show) {
      $('#addVariableModal').modal('show');
    } else {
      $('#addVariableModal').modal('hide');
    }
  }
}
