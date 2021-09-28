function showSearchPanel() {
    $('#search-panel').show();
    $('#search-results-panel').hide();
    $('#favourites-panel').hide();
}

$(function () {
    $('#search-btn').click(showSearchResultsPanel);
   });
