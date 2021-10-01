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


// Function to get movies data

function getTopSellers() {
  var topSellerBooksUrl = new URL(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=C1TDrksFmBX6rwRPyWGH6t6yIkYDeYxq"
  );
  /*  topSellerBooksUrl.searchParams.set("api-key",apiKey);
   */
  console.log(topSellerBooksUrl);

  fetch(topSellerBooksUrl)
      .then(function (response) {
          if (!response.ok) {
              throw response.json();
          }
          return response.json();
      })
      .then(function (queryRes) {
          console.log(queryRes.results.books);
          renderTopSellers(queryRes.results.books);
      })
      .catch(function (error) {
          console.error(error);
      });
}

// Functionto display the top 5 bestsellers - books

function renderTopSellers(queryRes) {
  if (!queryRes) {
      return;
  } else {
      $("#top1").text(
          "Rank: " +
          queryRes[0].rank +
          " " +
          queryRes[0].title +
          " By the best selling author " +
          queryRes[0].author
      );
      /*   $("#userChoiceBook").attr("src", queryRes[0].book_image); */
      $("#img1Disp").attr(
          "src",
          queryRes[0].book_image
      );

      $("#top2").text(
          "Rank: " +
          queryRes[1].rank +
          " " +
          queryRes[1].title +
          " By the best selling author " +
          queryRes[1].author
      );
      $("#img2Disp").attr(
          "src",
          queryRes[1].book_image
      );
      $("#top3").text(
          "Rank: " +
          queryRes[2].rank +
          " " +
          queryRes[2].title +
          " By the best selling author " +
          queryRes[2].author
      );
      $("#img3Disp").attr(
          "src",
          queryRes[2].book_image
      );
      $("#top4").text(
          "Rank: " +
          queryRes[3].rank +
          " " +
          queryRes[3].title +
          " By the best selling author " +
          queryRes[3].author
      );
      $("#img4Disp").attr(
          "src",
         "./assets/images/empty-book-cover1.png"
      );
      $("#top5").text(
          "Rank: " +
          queryRes[4].rank +
          " " +
          queryRes[4].title +
          " By the best selling author " +
          queryRes[4].author
      );
      $("#img5Disp").attr(
          "src",
          "./assets/images/empty-book-cover2.png"
      );
  }
}

// Function to get book details by user's choice of title

function getBookDetails(userChoicebyTitle) {
  userChoicebyTitle = "THE PAPER PALACE";

  var searchByTitleUrl = new URL(
      "https://api.nytimes.com/svc/books/v3/reviews.json?title=" +
      userChoicebyTitle +
      "&api-key=C1TDrksFmBX6rwRPyWGH6t6yIkYDeYxq"
  );
  /*  topSellerBooksUrl.searchParams.set("api-key",apiKey);
   */
  console.log(searchByTitleUrl);

  fetch(searchByTitleUrl)
      .then(function (response) {
          if (!response.ok) {
              throw response.json();
          }
          return response.json();
      })
      .then(function (queryRes) {
          console.log(queryRes.results[0]);
          renderUserChoiceBook(queryRes.results[0]);
      })
      .catch(function (error) {
          console.error(error);
      });
}

// Display results for the user's choice of book by title

function renderUserChoiceBook(bookRes) {
  $("#userChoiceBook").text(
      " Published date: " +
      bookRes.publication_dt + 
      " Title: " +
      bookRes.book_title +
      " Author: " +
      bookRes.book_author +
      " Summary: " +
      bookRes.summary
  );
}


