var apiMoviesKey = "kxGjghc3HTcDjcm1Tq3Cp4Uj0TpCC4Dd";
var baseMoviesURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

function showSearchPanel() {
  $("#search-panel").show();
  $("#search-results-panel").hide();
  $("#favourites-panel").hide();
}

$(function () {
  var books = $("#Books").val();
  var movies = $("#Movies").val();
  console.log(movies);
  $("#search-btn").on("click", showSearchResultsPanel, function (event) {
    event.preventDefault();
    getMoviesByParam();
  });

  // process form
});

$(function () {
  $("#critics-btn").on("click", showSearchResultsPanel, function (event) {
    event.preventDefault();
    getMoviesPicks();
  });

  // tests critics call - ok
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

//calls the NYT Movies API and get the critics picks
function getMoviesPicks() {
  var criticsBtn = $("#critics-btn");
  var apiUrl = baseMoviesURL + "?critics-pick=Y" + "&api-key=" + apiMoviesKey;
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

//calls the NYT Movies API search movies by param
function getMoviesByParam() {
  var param = getSearchParam();
  var apiUrl = baseMoviesURL + "?query=" + param + "&api-key=" + apiMoviesKey;
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

// Function to get Books data

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

// Function to get book details by user's choice of title

function getUserChoiceByTitle(userChoicebyTitle) {
  /*  userChoicebyTitle = "THE PAPER PALACE"; */

  var searchByTitleUrl = new URL(
    "https://api.nytimes.com/svc/books/v3/reviews.json?title=" +
      userChoicebyTitle +
      "&api-key=C1TDrksFmBX6rwRPyWGH6t6yIkYDeYxq"
  );

  getBookDetails(searchByTitleUrl);
}

// Function to get user choice  by author's name

function getUserChoicebyAuthor(authorName) {
  /*  authorName = "Liane Moriarty"; */
  /* authorName = "Michelle"; */

  var searchByAuthorUrl = new URL(
    "https://api.nytimes.com/svc/books/v3/reviews.json?author=" +
      authorName +
      "&api-key=C1TDrksFmBX6rwRPyWGH6t6yIkYDeYxq"
  );

  getBookDetails(searchByAuthorUrl);
}

// Function to retrieve data for search by title/author

function getBookDetails(searchURL) {
  fetch(searchURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (queryRes) {
      console.log(queryRes.results);

      renderBookResult(queryRes);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Functionto display the top 5 bestsellers - books

// Display results for the user's choice of book by title

function renderUserChoiceByTitle(bookRes) {
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

// Function to display books by an author
/* getUserChoicebyAuthor("Barack Obama"); */
getUserChoiceByTitle("Becoming");

function renderBookResult(queryRes) {
  $("#bookResults").html("");
  var innerHTML = "";
  queryRes.results.forEach((result) => {
    innerHTML += renderBookResultTemplate(result);
  });
  $("#bookResults").html(innerHTML);
}

function renderBookResultTemplate(result) {
  return `
  <div class="card">
    
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img onerror="this.src='./assets/images/no-image.jpg';this.onerror='';" src="https:\/\/storage.googleapis.com\/du-prd\/books\/images\/${result.isbn13[0]}.jpg" alt="${result.book_title}">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">${result.book_title}</p>
          <p class="subtitle is-6">${result.byline}</p>
        </div>
      </div>
  
      <div class="content">
      ${result.summary}
        <br>
        <time datetime>${result.publication_dt}</time>
      </div>
    </div>
  </div>`;
}
