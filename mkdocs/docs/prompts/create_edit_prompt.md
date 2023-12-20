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
  })
</script>

<div class="container">
  <div class="row">
    <div class="input-group input-group-sm mb-2">
      <span class="input-group-text text-primary"><small>Prompt title:</small></span>
      <input type="text" class="form-control" aria-label="Prompt Title input" id="promptTitle">
    </div>
  </div>
  <div class="row">
    <div class="input-group input-group-sm mb-2">
      <span class="input-group-text text-primary"><small>Page header:</small></span>
      <input type="text" class="form-control" aria-label="Page Header input" id="pageHeader">
    </div>
  </div>
  <div class="row">
    <div class="col">
        <div class="input-group input-group-sm mb-2">
          <span class="input-group-text text-primary"><small>Category:</small></span>
          <input type="text" class="form-control" aria-label="Category input" id="category">
        </div>
        <div class="input-group input-group-sm mb-2">
          <label class="input-group-text text-primary" for="llmModel"><small>LLM Model:</small></label>
          <select class="form-select" id="llmModel">
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
    </div>
    <div class="col mb-2">
        <div class="input-group input-group-sm mb-2">
          <span class="input-group-text text-primary"><small>Submitted by:</small></span>
          <input type="text" class="form-control" aria-label="Submitted By input" id="submittedBy">
        </div>
        <div class="input-group input-group-sm">
          <span class="input-group-text text-primary"><small>Optimized by:</small></span>
          <input type="text" class="form-control" aria-label="Optimized By input" id="optimizedBy">
        </div>
    </div>
  </div>
</div>

<div class="container mb-2">
    <div class="row">
        <div class="col">
            <div class="form-floating">
              <textarea class="form-control" style="height: 150px" placeholder="Add your prompt here..." id="promptTextArea"></textarea>
              <label class="text-primary" for="promptTextArea"><small>Prompt:</small></label>
            </div>
        </div>
    </div>
</div>

<div class="container mb-2">
    <div class="row">
        <div class="col">
            <div class="form-floating">
              <textarea class="form-control" placeholder="Add a text describing what you changed here..." id="changelogTextArea"></textarea>
              <label class="text-primary" for="changelogTextArea"><small>Changelog:</small></label>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row mb-2">
        <label class="col-md-3 text-primary" for="selectBadges"><small>Badges:</small></label>
        <div class="col">
            <select id="selectBadges" style="width: 100%;" multiple="multiple" class="multiple-select" aria-label="select badges">
                <option value="1">New</option>
                <option value="2">Advanced</option>
                <option value="3">Interactive</option>
                <option value="4">Intermediate</option>
            </select>
        </div>
    </div>
    <div class="row mb-2">
        <label class="col-md-3 text-primary" for="selectTargetAudience"><small>Target audience:</small></label>
        <div class="col">
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
    </div>
    <div class="row mb-2">
        <label for="selectPromptType" class="col-md-3 text-primary"><small>Prompt type:</small></label>
        <div class="col">
            <select id="selectPromptType" multiple="multiple" style="width: 100%;" class="multiple-select" aria-label="Select prompt type">
                <option value="1">Zero-shot prompt</option>
                <option value="2">One-shot prompt</option>
                <option value="3">Few-shot prompt</option>
                <option value="4">User prompt</option>
                <option value="5">System prompt</option>
                <option value="6">Template prompt</option>
                <option value="7">Interactive prompt</option>
            </select>
        </div>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="agreeToTerms">
      <label class="form-check-label" for="agreeToTerms"><small>A prompt is a form of copyrighted material. By submitting this data, you are agreeing to relinquish all your rights over this prompt to Epam&copy; and its subsidiaries.</small></label>
    </div>
    <a type="button" id="submitPrompt" class="btn btn-sm btn-success link-light float-end mb-2" onclick="actions.submitNewPrompt(event);"><i class="fa-regular fa-square-plus"></i> Submit</a>
</div>
