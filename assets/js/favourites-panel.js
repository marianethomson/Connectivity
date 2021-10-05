function showSearchPanel() {
  $("#search-panel").show();
  $("#search-results-panel").hide();
  $("#favourites-panel").hide();
}
function showSearchResultsPanel() {
  $("#search-panel").hide();
  $("#search-results-panel").show();
  $("#favourites-panel").hide();
}
function showFavouritesPanel() {
  $("#search-panel").hide();
  $("#search-results-panel").hide();
  $("#favourites-panel").show();
}

$(function () {
  $("#search-btn").click(showSearchResultsPanel);
  $("#save-event").click(showFavouritesPanel);
  $("#home-btn").click(showSearchPanel);
  showSearchPanel();
});
