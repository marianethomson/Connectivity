var apiKey = "C1TDrksFmBX6rwRPyWGH6t6yIkYDeYxq";

function showSearchPanel() {
  $("#search-panel").show();
  $("#search-results-panel").hide();
  $("#favourites-panel").hide();
}

$(function () {
  $("#search-btn").on("click", showSearchResultsPanel, function (event) {
    event.preventDefault();
    getMovies();
  });

  // process form
});

//get search parameters
function getSearchParam() {
  var param = $("#search").val();
  var infoStatus = $("#infoStatus");
  if (param == 0) {
    infoStatus.text = "Please inform something to search for.";
  } else {
    return param;
  }
}

//calls the NYT Movies API
function getMovies() {
  var param = getSearchParam();
  var apiUrl =
    "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" +
    param +
    "&api-key=" +
    apiKey;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to server");
    });
}
