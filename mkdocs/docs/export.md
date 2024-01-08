<div class="float-end">
    <button id="clear-bookmarked-prompts" class="btn btn-light fa-solid fa-delete-left" data-toggle="tooltip" type="button" title="Clear all bookmarked prompts" onclick="actions.removeAllBookmarks(false);" onmouseleave="actions.resetRemoveAllBookmarksTooltip(event);"></button>
</div>
<h1>Export prompts</h1>

Below you'll find a list of all the available prompts, with the ones that you bookmarked already
pre-selected. Check any other prompts you'd like to export and then click on the export option
whenever you are ready.
<script type="text/javascript" src="/js/ui.js"></script>
<script type="text/javascript" src="/js/actions.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
<script type="text/javascript">
    actions.injectEnableTooltipsEventListener();
    actions.loadRemoveAllBookmarksIcon();
    actions.listAllPrompt();
</script>
<h4>Prompts</h4>
<div class="container overflow-auto" style="max-height: clamp(20em,10vh,250px);">
    <table class="table table-sm table-bordered table-responsive table-hover">
      <thead class="sticky-top table-secondary">
        <tr class="bg-light">
          <th class="text-center" scope="col" style="width: 5%;"><input id="select-all-checkbox" class="form-check-input" type="checkbox" onclick="actions.toggleCheckAllPrompts(event);"></th>
          <th class="text-center fw-bold" scope="col" style="width: 5%;">#</th>
          <th class="fw-bold" scope="col" style="width: 90%">Prompt name</th>
        </tr>
      </thead>
      <tbody id="table-body">
      </tbody>
    </table>
</div>
<h4>Formats</h4>
<div>
    <a id="export-to-zeus" class="btn btn-sm btn-primary float-end m-1 link-light" data-toggle="tooltip" type="button" title="Export to our custom Zeus format" onclick="actions.exportToZeus(event);"><i class="fa-solid fa-medal"></i> Zeus</a>
    <a id="export-to-epam-dial" class="btn btn-sm btn-success float-end m-1 link-light" data-toggle="tooltip" type="button" title="Export to Epam AI Dial" onclick="actions.exportToEpamAIDial(event);"><i class="fa-solid fa-rocket"></i> Epam AI Dial</a>
</div>
