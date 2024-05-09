<h1>Export prompts</h1>
<div class="export-prompt__description">
  Below you'll find a list of all the available prompts, with the ones that you bookmarked already
  pre-selected. Check any other prompts you'd like to export and then click on the export option
  whenever you are ready.
</div>
<script type="text/javascript" src="/js/ui.js"></script>
<script type="text/javascript" src="/js/actions.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
<script type="text/javascript" src="/js/constants.js"></script>

<div class="export-prompt">
  <div class="float-end">
     <button id="clear-bookmarked-prompts" class="button-secondary button-link" data-toggle="tooltip" type="button" title="Clear all selected prompts" onclick="actions.removeAllBookmarks(false);" onmouseleave="actions.resetRemoveAllBookmarksTooltip(event);">Clear all</button>
  </div>
  <h2 class="export-prompt__title">Prompts</h2>
    <table class="table table-bordered table-responsive export-prompt__table">
      <thead>
        <tr>
          <th class="text-center" scope="col"><input id="select-all-checkbox" class="form-check-input" type="checkbox" onclick="actions.toggleCheckAllPrompts(event);"></th>
          <th class="text-center fw-bold" scope="col"><i class="fa-solid fa-hashtag"></i></th>
          <th scope="col">Prompt name</th>
        </tr>
      </thead>
      <tbody id="table-body">
      </tbody>
    </table>
  <h2 class="export-prompt__title">Formats</h2>
  <div>
    <button id="export-to-zeus" class="button button-primary m-1 float-end" data-toggle="tooltip" title="Export to our custom Zeus format" onclick="actions.exportToZeus(event);"><i class="fa-solid fa-medal"></i> Zeus</button>
    <button id="export-to-epam-dial" class="button button-secondary float-end m-1" data-toggle="tooltip" title="Export to Epam AI Dial" onclick="actions.exportToEpamAIDial(event);"><i class="fa-solid fa-rocket"></i> Epam AI Dial</button>
  </div>
</div>
<script type="text/javascript">
  actions.injectEnableTooltipsEventListener();
  actions.loadRemoveAllBookmarksIcon();
  actions.listAllPrompt();
</script>
