const PROMPTS_NAME_IN_LOCAL_STORAGE = "prompts";
const ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP = "Copy to clipboard";
const COPIED_TO_CLIPBOARD_TOOLTIP = "Copied!";
const ORIGINAL_BOOKMARK_TOOLTIP = "Bookmark prompt";
const BOOKMARK_ADDED_TOOLTIP = "Bookmarked!";
const BOOKMARK_REMOVED_TOOLTIP = "Bookmark removed!";
const ORIGINAL_CLEAR_ALL_PROMPTS_TOOLTIP = "Clear all bookmarked prompts";
const ALL_JSON_PROMPTS_PATH = "config/allPrompts.json";
const TOKEN_FILE_PATH = "/config/token.json";
const GIT_BASE_URL = "https://git.epam.com";
const PROJECT_ENCODED_URL = "epmc-tst%2Fzeus%2Fzeus-site-generator";

class Actions {

  constructor() {
  }

  enableTooltips() {
    window.addEventListener('load', function () {
      document.querySelectorAll('[data-toggle="tooltip"]').forEach((el) => {
        $(el).tooltip();
      });
    });
  }

  // tooltip actions
  copyToClipboard(event) {
    new ClipboardJS('#copy-button', {
      target: function (trigger) {
        $(trigger).attr('data-bs-original-title', COPIED_TO_CLIPBOARD_TOOLTIP)
        .tooltip('show');

        return trigger.nextElementSibling;
      }
    });
  }

  resetClipboardTooltip(event) {
    event.target.setAttribute('data-bs-original-title',
        ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP);

    // hide the tooltip
    $(event.target).tooltip("hide");

    // remove the text election from all elements on the window
    window.getSelection().removeAllRanges();
  }

  // bookmark actions
  bookmarkPrompt(event) {
    // check whether the prompt is bookmarked or not
    if (event.target.classList.contains('fa-regular')) {
      // change tooltip
      $(event.target).attr('data-bs-original-title', BOOKMARK_ADDED_TOOLTIP)
      .tooltip('show');

      // change the icon
      event.target.classList.remove('fa-regular');
      event.target.classList.add('fa-solid');

      this.storePromptInLocalStorage(JSON_FILE_NAME);
    } else {
      // change tooltip
      $(event.target).attr('data-bs-original-title', BOOKMARK_REMOVED_TOOLTIP)
      .tooltip('show');

      // change the icon
      event.target.classList.remove('fa-solid');
      event.target.classList.add('fa-regular');

      this.removePromptFromLocalStorage(JSON_FILE_NAME);
    }

    // update the remove all bookmarks button
    this.loadRemoveAllBookmarksIcon();
  }

  resetBookmarkTooltip(event) {
    // reset the bookmark's tooltip if we removed the bookmark
    if (event.target.classList.contains('fa-regular')) {
      event.target.setAttribute('data-bs-original-title',
          ORIGINAL_BOOKMARK_TOOLTIP);
    }

    // hide the tooltip
    $(event.target).tooltip("hide");
  }

  removeAllBookmarks(loadBookmarkIcons) {
    let promptCount = JSON.parse(
        localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE)).length;
    if (confirm(
            `You currently have (${promptCount}) prompts bookmarked. Are you sure you want to clear them all?`)
        === true) {
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
    $(event.target).tooltip("hide");
  }

  loadBookmarkIcon() {
    const element = document.getElementById('bookmark-prompt');
    if (this.isPromptInLocalStorage(JSON_FILE_NAME)) {
      element.classList.remove('fa-regular');
      element.classList.add('fa-solid');

      // update the tooltip
      element.setAttribute('data-bs-original-title',
          BOOKMARK_ADDED_TOOLTIP);
    } else {
      element.classList.remove('fa-solid');
      element.classList.add('fa-regular');

      // update the tooltip
      element.setAttribute('data-bs-original-title',
          ORIGINAL_BOOKMARK_TOOLTIP);
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

  toggleCheckAllPrompts(event) {
    document.querySelectorAll('#prompt-checkbox').forEach(checkBox => {
      let checkAllCheckBoxesElment = document.getElementById(
          'select-all-checkbox');

      if ($(checkAllCheckBoxesElment).prop('checked') === true) {
        $(checkBox).prop('checked', true);
      } else {
        $(checkBox).prop('checked', false);
      }
    })
  }

  hasBookmarks() {
    return localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE) !== null
        && JSON.parse(
            localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE)).length !== 0;
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
      localStorage.setItem(PROMPTS_NAME_IN_LOCAL_STORAGE,
          JSON.stringify(prompts));
    }
  }

  removePromptFromLocalStorage(prompt) {
    // check if there are any prompts in local storage to load first
    let prompts = JSON.parse(
        localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE));

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
      localStorage.setItem(PROMPTS_NAME_IN_LOCAL_STORAGE,
          JSON.stringify(newPromptsArray));
    }
  }

  isPromptInLocalStorage(prompt) {
    // check if there are any prompts in local storage
    if (localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE) === null) {
      return false;
    } else {
      let prompts = JSON.parse(
          localStorage.getItem(PROMPTS_NAME_IN_LOCAL_STORAGE));

      return prompts.includes(prompt);
    }
  }

  // export prompt actions
  listAllPrompt() {
    window.addEventListener('load', () => {
      const element = document.getElementById('table-body');

      fetch(ALL_JSON_PROMPTS_PATH)
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          const trElement = document.createElement('tr');
          trElement.id = "table-row";

          if (this.isPromptInLocalStorage(json[i].fileName.replace('.json', ''))) {
            trElement.innerHTML += `<th class="text-center" scope="row"><input id="prompt-checkbox" class="form-check-input" type="checkbox" checked></th>`;
          } else {
            trElement.innerHTML += `<th class="text-center" scope="row"><input id="prompt-checkbox" class="form-check-input" type="checkbox"></th>`;
          }
          trElement.innerHTML +=
              `<td class="text-center">${i + 1}</td>
              <td id="prompt-name">
                <a class="link-primary" href="/prompts/prompt_page.html?prompt=${json[i].fileName
                  .replace('.json', '')}">${json[i].category} - ${json[i].title}</a>
              </td>
            </tr>
            `;

          element.appendChild(trElement);
        }
      });
    });
  }

  async exportToEpamAIDial(event) {
    let allRows = document.querySelectorAll('#table-row');

    // check if no prompts are selected
    if (this.isNoCheckBoxesChecked(allRows)) {
      alert(
          "No prompts are selected. Please select at least one prompt to export.");
      return;
    }

    let jsonOutput = {
      "folders": [],
      "prompts": []
    };

    for (let i = 0; i < allRows.length; i++) {
      let isChecked = this.isCheckBoxChecked(allRows[i].querySelector(
          '#prompt-checkbox'));

      // move on quickly if the prompt is not selected
      if(!isChecked){
        continue;
      }

      let promptContent;
      let promptJsonFileName = await this.getPromptJsonFile(
          allRows[i].querySelector('#prompt-name').textContent);

      await fetch(promptJsonFileName)
      .then((response) => response.json())
      .then((json) => {
        promptContent = json.promptHistory[Object.keys(
            json.promptHistory).length].revisedPrompt;

        if (isChecked) {
          jsonOutput.prompts.push({
            "id": `${this.generateUuidv4()}`,
            "folderId": null,
            "name": `${allRows[i].querySelector(
                '#prompt-name').textContent.trim()} (V${Object.keys(
                json.promptHistory).length})`,
            "content": `${promptContent}`
          })
        }
      });
    }

    this.saveAsJson("EpamAiDial.json", jsonOutput);
  }

  async exportToZeus(event) {
    let allRows = document.querySelectorAll('#table-row');

    // check if no prompts are selected
    if (this.isNoCheckBoxesChecked(allRows)) {
      alert(
          "No prompts are selected. Please select at least one prompt to export.");
      return;
    }

    let jsonOutput = {
      "prompts": []
    };

    for (let i = 0; i < allRows.length; i++) {
      let isChecked = this.isCheckBoxChecked(allRows[i].querySelector(
          '#prompt-checkbox'));

      // move on quickly if the prompt is not selected
      if(!isChecked){
        continue;
      }

      let promptJsonFileName = await this.getPromptJsonFile(
          allRows[i].querySelector('#prompt-name').textContent);

      await fetch(promptJsonFileName)
      .then((response) => response.json())
      .then((json) => {
        if (isChecked) {
          jsonOutput.prompts.push(json);
        }
      });
    }

    this.saveAsJson("Zeus.json", jsonOutput);
  }

  isNoCheckBoxesChecked(allRows) {
    for (let i = 0; i < allRows.length; i++) {
      if (this.isCheckBoxChecked(allRows[i].querySelector(
          '#prompt-checkbox'))) {
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
    const blob = new Blob([JSON.stringify(dataObjToWrite)],
        {type: "text/json"});
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
        ":");

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  }

  generateUuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c
            / 4).toString(16)
    );
  }

  async getPromptJsonFile(promptReadableName) {
    let promptTitle = promptReadableName.substring(promptReadableName.indexOf('-') + 1).trim();
    let output;

    await fetch(ALL_JSON_PROMPTS_PATH)
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        if (json[i].title === promptTitle) {
          output = "json/" + json[i].fileName;
        }
      }
    });

    return output;
  }

  submitNewPrompt(event){
    // check if the user didn't agree to the terms
    if(!this.isCheckBoxChecked(document.getElementById('agreeToTerms'))){
      this.showModalMessage(false,"Error!", false, "Please agree to the terms first.");
      return;
    }

    // check if the user didn't select any badges
    if($('#selectBadges').val() == 0){
      this.showModalMessage(false,"Error!", false, "Please select at least one badge!");
      return;
    }

    // check if the user didn't select any target audience
    if($('#selectTargetAudience').val() == 0){
      this.showModalMessage(false,"Error!", false, "Please select at least one target audience!");
      return;
    }

    // check if the user didn't select any prompt type
    if($('#selectPromptType').val() == 0){
      this.showModalMessage(false, "Error!", false, "Please select at least one prompt type!");
      return;
    }

    // user agreed, create a json object in preparation for the next steps
    let newPromptData = {
      "title": `${document.getElementById('promptTitle').value}`,
      "pageHeader": `${document.getElementById('pageHeader').value}`,
      "category": `${document.getElementById('category').value}`,
      "badges": `${$('#selectBadges').val()}`.split(',').map(index => $('#selectBadges option').eq(index - 1).text()),
      "targetAudience": `${$('#selectTargetAudience').val()}`.split(',').map(index => $('#selectTargetAudience option').eq(index - 1).text()),
      "submittedOriginallyBy": `${document.getElementById('submittedBy').value}`.split(',').map(item => item.trim()),
      "optimizedBy": `${document.getElementById('optimizedBy').value}`.split(',').map(item => item.trim()),
      "promptHistory": {
        "1": {
          "revisedPrompt": `${document.getElementById('promptTextArea').value}`,
          "changeLog": `${document.getElementById('changelogTextArea').value}`,
          "promptType": `${$('#selectPromptType').val()}`.split(',').map(index =>
              $('#selectPromptType option').eq(index - 1).text().toUpperCase()
              .replaceAll(' ', '_')
              .replaceAll('-', '_')),
          "llmModel": `${$("#llmModel option:selected").text()}`
        }
      }
    };

    let branchName = Date.now();
    let createdFileName = newPromptData.category.replaceAll(' ', '_') + "-" +
        newPromptData.title.replaceAll(' ', '_') + ".json";

    // create a branch
    this.createBranch(branchName).then(r => {
      // commit the json object as a file to the created branch
      this.commitToBranch(branchName, createdFileName, newPromptData).then(r => {
        // create a merge request using the created branch
        this.createMergeRequest(branchName, createdFileName).then(async mergeRequestID => {
          this.showModalMessage(true, "Your prompt is getting created!", true,
              "<br>Waiting for merge request to be approved and merged...");

          await this.waitForMergeRequestToBeMerged(mergeRequestID, createdFileName);
        });
      });
    });
  }

  completeMergeRequestPipeline(mergeRequestState, createdFileName){
    if (mergeRequestState === "merged") {
      setTimeout(async () => {
        // Get the pipeline ID
        // TODO: find a way to tie the MR with the pipeline
        let intervalID = window.setInterval(async () => {
          await this.getPipelineUrl().then(pipelineUrl => {
            if(pipelineUrl === undefined){
              this.showModalMessage(true, "Your prompt is getting created!", true,
                  "<br>Waiting for pipeline...");
            } else {
              this.showModalMessage(true, "Your prompt is getting created!", true,
                  `<br><i class="fa-solid fa-check" style="color: #00ff4c;"></i> Pipeline created [<a href=\"${pipelineUrl}\" target="_blank" rel="noopener">URL</a>].`);
              window.clearInterval(intervalID);
            }
          });
        }, 1000);

        // TODO: Find a better way to do this, so we don't repeat the request
        await this.getPipelineUrl().then(pipelineUrl => {
          let mergeRequestPipelineID = pipelineUrl.substring(pipelineUrl.lastIndexOf("/") + 1)
          this.waitForPipelineToFinish(mergeRequestPipelineID, createdFileName);
        });

      }, 5000);
    } else {
      console.log("Merge request wasn't merged in time. Moving on...");
    }
  }

  showNewPromptPage(createdFileName){
    // Show the new page
    setTimeout(() => {
      window.location.href = `${window.location.origin}/prompts/prompt_page.html?prompt=${createdFileName.replace('.json', '')}`;
    }, 1000);
  }

  async waitForMergeRequestToBeMerged(mergeRequestID, createdFileName) {
    let x = 0;
    let mergeRequestState;
    let intervalID = window.setInterval(async () => {
      mergeRequestState = await this.getMergeRequestState(mergeRequestID);

      if (mergeRequestState === "merged") {
        this.showModalMessage(true, "Your prompt is getting created!", true,
            `<br><i class="fa-solid fa-check" style="color: #00ff4c;"></i> Merge request is successfully merged.`);

        window.clearInterval(intervalID);
        this.completeMergeRequestPipeline(mergeRequestState, createdFileName);
      } else {
        this.showModalMessage(true, "Your prompt is getting created!", true,
            `<br>[${x
            + 1}] Merge request is [${mergeRequestState}]. Waiting until it gets merged...`);
      }

      // show failure message when timing out
      if (++x === 9) {
        this.showModalMessage(true, "Your prompt is getting created!", true,
            `<br>[${x
            + 1}] No one approved the merge request on time, please contact one of the code maintainers to approve it.`);
        window.clearInterval(intervalID);
      }
    }, 5000);
  }

  waitForPipelineToFinish(pipelineID, createdFileName){
    let x = 0;
    let intervalID = window.setInterval(async () => {
      let pipelineStatus = await this.getPipelineStatus(pipelineID);

      if(pipelineStatus === "success"){
        this.showModalMessage(true, "Your prompt is getting created!", true,
            `<br><i class="fa-solid fa-check" style="color: #00ff4c;"></i> Pipeline succeeded.`);
        window.clearInterval(intervalID);
        this.showNewPromptPage(createdFileName);
      } else {
        this.showModalMessage(true, "Your prompt is getting created!", true,
            `<br>[${x
            + 1}] Pipeline status is [${pipelineStatus}]. Waiting until it finishes...`);
      }

      // show failure message when timing out
      if (++x === 30) {
        this.showModalMessage(true, "Your prompt is getting created!", true,
            `<br>[${x
            + 1}] Pipeline timed out.`);
        window.clearInterval(intervalID);
      }
    }, 10000);
  }

  async commitToBranch(branchName, createdFileName, newPromptData) {
    this.showModalMessage(true, "Your prompt is getting created!", true,
        "<br>Creating a JSON file from the provided data and committing it to the branch...");

    return fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/repository/commits`,
      {
        method: "POST",
        headers: {
          "PRIVATE-TOKEN": `${await this.readToken()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "branch": `${branchName}`,
          "commit_message": "Automated PR creation from the GUI.",
          "actions": [
            {
              "action": "create",
              "file_path": "mkdocs/docs/json/" + `${createdFileName}`,
              "content": `${JSON.stringify(newPromptData, null, 2)}`
            }
          ]
        }),
    }).then(async r => {
      // Show file committed message
      let commitUrl = await r.json().then(json => json.web_url);
      this.showModalMessage(true, "Your prompt is getting created!", true,
          `<br><i class="fa-solid fa-check" style="color: #00ff4c;"></i> File committed to branch [<a href=\"${commitUrl}\" target="_blank" rel="noopener">URL</a>].`);
    }).catch(ex => console.log(ex));
  }

  async createBranch(branchName) {
    this.showModalMessage(true, "Your prompt is getting created!", false, "Creating a new branch in the code repository...");

    return fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/repository/branches?`+
        `branch=${branchName}` +
        `&ref=main`,
      {
        method: "POST",
        headers: {
          "PRIVATE-TOKEN": `${await this.readToken()}`
        }
    }).then(async r => {
      // show branch URL message
      let branchUrl = await r.json().then(json => json.web_url);
      this.showModalMessage(true, "Your prompt is getting created!", true,
          `<br><i class="fa-solid fa-check" style="color: #00ff4c;"></i> Branch created [<a href=\"${branchUrl}\" target="_blank" rel="noopener">URL</a>].`);
    }).catch(ex => console.log(ex));
  }

  async createMergeRequest(branchName, createdFileName) {
    this.showModalMessage(true, "Your prompt is getting created!", true,
        "<br>Creating a merge request to merge your changes to the main branch...");

    let mergeRequestID;
    await fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/merge_requests?` +
        `source_branch=${branchName}` +
        `&target_branch=main` +
        `&remove_source_branch=true` +
        `&squash=true` +
        `&title=[Zeus Bot] Added file "${createdFileName}"`,
        {
          method: "POST",
          headers: {
            "PRIVATE-TOKEN": `${await this.readToken()}`
          }
    }).then(async r => {
      // Show merge request message
      let mergeRequestUrl = await r.json().then(json => json.web_url);
      mergeRequestID = mergeRequestUrl.substring(mergeRequestUrl.lastIndexOf("/") + 1);
      this.showModalMessage(true, "Your prompt is getting created!", true,
          `<br><i class="fa-solid fa-check" style="color: #00ff4c;"></i> Merge request created [<a href=\"${mergeRequestUrl}\" target="_blank" rel="noopener">URL</a>].`);
    }).catch(ex => console.log(ex));

    return mergeRequestID;
  }

  async getMergeRequestState(mergeRequestID){
    let mergeRequestState;
    await fetch(
      `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/merge_requests/${mergeRequestID}`,
      {
        method: "GET",
        headers: {
          "PRIVATE-TOKEN": `${await this.readToken()}`
        }
    }).then(async r => {
      mergeRequestState = await r.json().then(json => json.state);
    }).catch(ex => console.log(ex));

    return mergeRequestState;
  }

  async getPipelineUrl(){
    let pipelineUrl;
    await fetch(
        `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/pipelines?status=running`,
        {
          method: "GET",
          headers: {
            "PRIVATE-TOKEN": `${await this.readToken()}`
          }
    }).then(async r => {
      // TODO: handle the case where you receive multiple pipelines in the response
      pipelineUrl = r.json().then(json => json[0].web_url);
    }).catch(ex => {});

    return pipelineUrl;
  }

  async getPipelineStatus(pipelineID){
    let pipelineStatus;
    await fetch(
        `${GIT_BASE_URL}/api/v4/projects/${PROJECT_ENCODED_URL}/pipelines/${pipelineID}`,
        {
          method: "GET",
          headers: {
            "PRIVATE-TOKEN": `${await this.readToken()}`
          }
    }).then(async r => {
      pipelineStatus = await r.json().then(json => json.status);
    }).catch(ex => console.log(ex));

    return pipelineStatus;
  }

  async readToken(){
    let tokenValue;

    await fetch(TOKEN_FILE_PATH)
    .then((response) => response.json())
    .then((json) => {
      tokenValue = json.token;
    }).catch(ex => console.log(ex));

    return tokenValue;
  }

  showModalMessage(hideFooter, headerText, isAppendMode, message){
    if(hideFooter){
      document.getElementById('modalFooter').classList.add('visually-hidden');
    }

    document.getElementById('submitPromptModalHeader').textContent = headerText;

    isAppendMode ?
      document.getElementById('submitPromptModalBody').innerHTML += message :
      document.getElementById('submitPromptModalBody').innerHTML = message;
  }
}
