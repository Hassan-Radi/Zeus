const PROMPTS_NAME_IN_LOCAL_STORAGE = "prompts";
const ORIGINAL_COPY_TO_CLIPBOARD_TOOLTIP = "Copy to clipboard";
const COPIED_TO_CLIPBOARD_TOOLTIP = "Copied!";
const ORIGINAL_BOOKMARK_TOOLTIP = "Bookmark prompt";
const BOOKMARK_ADDED_TOOLTIP = "Bookmarked!";
const BOOKMARK_REMOVED_TOOLTIP = "Bookmark removed!";
const ORIGINAL_CLEAR_ALL_PROMPTS_TOOLTIP = "Clear all bookmarked prompts";
const ALL_JSON_FILES = [
  "/json/test_case_generation--generate_api_test_cases_from_headers_and_parameters.json",
  "/json/test_case_conversion--convert_plain_test_case_to_gherkin-style.json",
  "/json/test_case_generation--create_a_decision_table_from_parameters.json",
  "/json/test_case_generation--decompose_a_user_story_and_test_it.json",
  "/json/test_case_generation--exhaustive_testing_for_a_scenario.json",
  "/json/test_case_generation--generate_api_tests_from_swagger_link.json",
  "/json/test_code_generation--generate_code_from_bdd_test_case.json",
  "/json/test_estimation_generation--do_a_3_point_test_estimation_with_data.json",
  "/json/interview_question_generation--create_an_automation_practical_task_for_an_interview.json",
  "/json/test_documentation_generation--test_automation_strategy_document.json",
  "/json/test_documentation_generation--test_plan_document.json",
  "/json/ux--evaluating_heuristics.json",
  "/json/test_automation_how_to--api_tool_selection_&_comparison.json",
  "/json/test_data_generation--fill_sql_table_with_random_data.json",
  "/json/mentoring--provide_study_materials_for_juniors.json"
];

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

      this.storePromptInLocalStorage(JSON_FILE);
    } else {
      // change tooltip
      $(event.target).attr('data-bs-original-title', BOOKMARK_REMOVED_TOOLTIP)
      .tooltip('show');

      // change the icon
      event.target.classList.remove('fa-solid');
      event.target.classList.add('fa-regular');

      this.removePromptFromLocalStorage(JSON_FILE);
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
    if (this.isPromptInLocalStorage(JSON_FILE)) {
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
      for (let i = 0; i < ALL_JSON_FILES.length; i++) {
        let promptName = this.getPromptReadableName(ALL_JSON_FILES[i]);

        const trElement = document.createElement('tr');
        trElement.id = "table-row";

        if (this.isPromptInLocalStorage(ALL_JSON_FILES[i])) {
          trElement.innerHTML += `<th class="text-center" scope="row"><input id="prompt-checkbox" class="form-check-input" type="checkbox" checked></th>`;
        } else {
          trElement.innerHTML += `<th class="text-center" scope="row"><input id="prompt-checkbox" class="form-check-input" type="checkbox"></th>`;
        }
        trElement.innerHTML +=
            `<td class="text-center">${i + 1}</td>
              <td id="prompt-name">${promptName}</td>
            </tr>
            `;

        element.appendChild(trElement);
      }
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
      let promptContent;
      let promptJsonFileName = this.getPromptOriginalName(
          allRows[i].querySelector('#prompt-name').textContent);

      await fetch(promptJsonFileName)
      .then((response) => response.json())
      .then((json) => {
        promptContent = json.assessment.promptHistory[Object.keys(
            json.assessment.promptHistory).length].revisedPrompt;

        if (isChecked) {
          jsonOutput.prompts.push({
            "id": `${this.generateUuidv4()}`,
            "folderId": null,
            "name": `${allRows[i].querySelector(
                '#prompt-name').textContent} (V${Object.keys(
                json.assessment.promptHistory).length})`,
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
      let promptJsonFileName = this.getPromptOriginalName(
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

  getPromptReadableName(promptOriginalName) {
    let promptNameBefore = promptOriginalName.replace('/json/', '').replace(
        '.json', '').replaceAll(
        '_', ' ').replaceAll('--', ' - ');
    return promptNameBefore.charAt(0).toUpperCase()
        + promptNameBefore.slice(1);
  }

  getPromptOriginalName(promptReadableName) {
    return "/json/" + promptReadableName.toLowerCase().replaceAll(' - ',
            '--').replaceAll(' ',
            "_")
        + ".json";
  }
}
