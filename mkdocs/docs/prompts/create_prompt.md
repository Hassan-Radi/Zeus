# Create prompt

<script type="text/javascript" src="/js/ui.js"></script>
<script type="text/javascript" src="/js/actions.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
  $(function() {
      $('.multiple-select').select2();
      $('.multiple-select-tags').select2({
          tags: true
      });
     $('#selectBadges').select2({
          placeholder: 'Please select related badges'
      });
      $('#selectTargetAudience').select2({
          placeholder: 'Please select target audiences'
      });
      $('#selectPromptType').select2({
          placeholder: 'Please select prompt types'
      });
  });

  ui.loadCategoryOptions();
  actions.injectEnableTooltipsEventListener();
  
  document.addEventListener("DOMContentLoaded", () => {
      let params = getUrlParameters();
      let action = params.get("action");
  
      if(action !== "edit"){
          ui.showEditFields(false);
      } else {
          document.title = "Edit prompt";
          ui.getElementByXpath("//div[@data-md-component='header-topic']/span").textContent = "Edit prompt";
          document.getElementsByTagName('h1')[0].innerText = "Edit prompt";
  
          ui.loadValuesInFields(params.get('prompt'));
      }
  });
</script>

<div class="prompt-wrapper">
  <div class="prompt-form">
    <div class="prompt-form__row">
      <label for="promptTitle">Title</label>
      <input class="form-control" type="text" aria-label="Prompt Title input" id="promptTitle" placeholder="Give the prompt a name">
    </div>
    <div class="prompt-form__row prompt-form__dropdowns">
      <div>
        <label for="submittedBy">Submitted by</label>
        <input type="text" class="form-control" aria-label="Submitted By input" id="submittedBy" placeholder="Please enter your name">
      </div>
      <div id="optimizedByGroupDiv">
        <label for="optimizedBy">Optimized by</label>
        <input type="text" class="form-control" aria-label="Optimized By input" id="optimizedBy" placeholder="Please enter your name">
      </div>
    </div>
    <div class="prompt-form__row prompt-form__dropdowns">
      <div>
        <label for="llmModel">LLM Model</label>
        <select class="multiple-select-tags" style="width: 100%;" id="llmModel">
          <option>GPT-3.5</option>
          <option value="1">GPT-4</option>
          <option value="2">LLaMA</option>
          <option value="3">LLaMA 2</option>
          <option value="4">PaLM</option>
          <option value="5">PaLM 2</option>
          <option value="6">Med-PaLM</option>
          <option value="7">Gemini</option>
        </select>
      </div>
      <div>
        <label class="" for="category">Category</label>
        <select id="category" style="width: 100%;" class="multiple-select-tags" aria-label="Category"></select>
      </div>
    </div>
  </div>
  <div class="prompt-form">
    <div class="prompt-form__row row">
      <div class="col">
        <label for="promptTextArea">Prompt</label>
        <textarea class="form-control prompt-form__textarea" placeholder="Please enter prompt" id="promptTextArea"></textarea>
      </div>
    </div>
  </div>
  <div id="variables" class="prompt-form">
    <div class="prompt-form__row">
      <label for="variablesTable">Variables</label>
      <div class="card-body">
        <table id="variablesTable" class="table-responsive table-hover prompt-table">
          <thead class="sticky-top table-secondary prompt-table__header">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Sample value</th>
              <th scope="col" style="width: 10%"></th>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
        </table>
        <button id="addVariables" class="button button-secondary" data-toggle="tooltip" title="Add new" onclick="actions.showVariablesModal(true, 'Add variable', '', '');"><i class="fa-regular fa-plus"></i>Add new</button>            
      </div>
    </div>
  </div>
  <div id="changelogDiv" class="prompt-form">
    <div class="prompt-form__row">
      <label for="changelogTextArea">Changelog</label>
      <textarea class="form-control prompt-form__textarea" placeholder="Please enter changelog" id="changelogTextArea"></textarea>
    </div>
  </div>
  <div class="prompt-form">
    <div class="prompt-form__row" id="selectBadgesWrapper">
      <label for="selectBadges">Badges</label>
      <div class="col">
        <select id="selectBadges" style="width: 100%;" multiple="multiple" class="multiple-select" aria-label="select badges">
          <option value="1">New</option>
          <option value="2">Advanced</option>
          <option value="3">Interactive</option>
          <option value="4">Intermediate</option>
        </select>
      </div>
    </div>
    <div class="prompt-form__row">
      <label for="selectTargetAudience">Target audience</label>
      <select id="selectTargetAudience" multiple="multiple" style="width: 100%;" class="multiple-select" aria-label="select target audience">
        <option value="1">SDET</option>
        <option value="2">Architect</option>
        <option value="3">QA Engineer</option>
        <option value="4">Business Analyst</option>
        <option value="5">Product Owner</option>
        <option value="6">Developer</option>
        <option value="7">Designer</option>
      </select>
    </div>
    <div class="prompt-form__row">
      <label for="selectPromptType">Prompt types</label>
      <select id="selectPromptType" multiple="multiple" style="width: 100%;" class="multiple-select" aria-label="Select prompt type">
        <optgroup label="# of shots">
          <option value="1">Zero-shot prompt</option>
          <option value="2">One-shot prompt</option>
          <option value="3">Few-shot prompt</option>
        </optgroup>
        <optgroup label="User/System prompt">
          <option value="4">User prompt</option>
          <option value="5">System prompt</option>
        </optgroup>
        <optgroup label="Way of providing data/variables">
          <option value="6">Template prompt</option>
          <option value="7">Interactive prompt</option>
        </optgroup>
      </select>
    </div>
    <div class="form-check prompt-form__copyright">
      <input class="form-check-input" type="checkbox" value="" id="agreeToTerms">
      <label class="form-check-label" for="agreeToTerms">
      A prompt is a form of copyrighted material. By submitting this data, you are agreeing to relinquish all your rights over this prompt to Epam&copy; and its subsidiaries.
      </label>
    </div>
    <a type="button" id="submitPrompt" class="button button-primary float-end" data-bs-toggle="modal" data-bs-target="#createEditPrompt" onclick="actions.submitPrompt();"><i class="fa-regular fa-plus"></i> Submit</a>
    <button class="button button-secondary float-end me-2" id="cancelEditPrompt" onclick="actions.cancelPromptEdit();">Cancel</button>
  </div>
</div>
<!-- Create/Edit Prompt Modal -->
<div class="modal fade" id="createEditPrompt" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="submitPromptModalHeader" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="submitPromptModalHeader"></h1>
      </div>
      <rte class="overflow-auto form-control" style="max-height: 300px;" id="submitPromptModalBody"></rte>
      <div id="promptModalFooter" class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
<!-- Add Variable Modal -->
<div class="modal fade" id="addVariableModal" tabindex="-1" aria-labelledby="variablesModalHeader" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="variablesModalHeader">Add variable</h1>
      </div>
      <div class="modal-body">
        <div class="input-group input-group-sm mb-2">
          <span id="variableNameLabel" class="input-group-text text-primary"><small>Name:</small></span>
          <input id="variableNameInput" type="text" class="form-control" aria-label="Variable-name-input" aria-describedby="variableNameLabel">
        </div>
        <div class="form-floating">
          <textarea class="form-control" style="height: 150px" placeholder="Add a variable sample value here" id="sampleValueTextArea"></textarea>
          <label class="text-primary" for="sampleValueTextArea"><small>Sample value:</small></label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="actions.submitVariable();">Submit</button>
      </div>
    </div>
  </div>
</div>
