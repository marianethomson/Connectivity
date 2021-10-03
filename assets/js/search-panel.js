var apiMoviesKey = "kxGjghc3HTcDjcm1Tq3Cp4Uj0TpCC4Dd";
var apiBooksKey = "C1TDrksFmBX6rwRPyWGH6t6yIkYDeYxq";
var baseMoviesURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
var baseBooksURL = "https://api.nytimes.com/svc/books/v3/reviews.json";

 function showSearchPanel() {
  $("#search-panel").show();
  $("#topBookResultsPanel").hide();
  $("#search-results-panel").hide();
  $("#favourites-panel").hide();
} 

function isMoviesSelected() {
  return $("#movies-by-title").prop("checked");
}

function isBooksByAuthorSelected() {
  return $("#books-by-author").prop("checked");
}

function isBooksByTitleSelected() {
  return $("#books-by-title").prop("checked");
}

function initiateSearch() {
  $("#book-results-container").addClass("is-hidden");
  $("#movie-results-container").addClass("is-hidden");
  $("#movie-results").html("");
  $("#book-results").html("");
  
  var param = getSearchParam();
  if(!isParameterValid(param)){
    return;
  }
      
  if (isMoviesSelected()) {
    $("#movie-results-container").removeClass("is-hidden");
    getMoviesByTitle(param);
  } else if (isBooksByAuthorSelected()) {
    $("#book-results-container").removeClass("is-hidden");
    getBooksByAuthor(param);
  } else if (isBooksByTitleSelected()) {
    $("#book-results-container").removeClass("is-hidden");
    getBooksByTitle(param);
  } else {
    $("#movie-results-container").removeClass("is-hidden");
    $("#book-results-container").removeClass("is-hidden");
    getMoviesByTitle(param);
    getBooksByTitle(param);
  }
}

//tests movies critics-picks
$(function () {
  $("#critics-btn").on("click", function (event) {
    event.preventDefault();
    getMoviesPicks();
  });
});

// Books tab takes the user to the best sellers section
$(function () {
  $("#topBooksTab").on("click", function (event) {
   /*  event.preventDefault(); */
    getTopSellers();
    $("#search-panel").hide();
    $("#topBookResultsPanel").show();
    $("#favourites-panel").hide();
  });
});


$(function () {
  $("#homePageTab").on("click",function (event) {
    $("#search-panel").show();
    $("#topBookResultsPanel").hide();
    $("#favourites-panel").hide();
  });
});


function isParameterValid(param){
  var infoStatus = $("#infoStatus");
  if (!param || param.trim().length === 0) {
    infoStatus.text("Please inform something to search for");
    return false;
  } else {
    infoStatus.text(" ");
    return true;
  }
}

function getSearchParam() {
  return $("#search").val();
}

//calls the NYT Movies API and get the critics picks
function getMoviesPicks() {
  var apiPicksUrl =
    baseMoviesURL + "?critics-pick=Y" + "&api-key=" + apiMoviesKey;
  getMovieDetails(apiPicksUrl);
}

//calls the NYT Movies API search movies by param
function getMoviesByTitle(param) {
  var apiQueryUrl =
    baseMoviesURL + "?query=" + param + "&api-key=" + apiMoviesKey;
  getMovieDetails(apiQueryUrl);
}

// Function to get book details by user's choice of title
function getBooksByTitle(param) {
  var searchByTitleUrl = new URL(
    baseBooksURL + "?title=" + param + "&api-key=" + apiBooksKey
  );
  getBookDetails(searchByTitleUrl);
}

// Function to get user choice  by author's name
function getBooksByAuthor(param) {
  var searchByAuthorUrl = new URL(
    baseBooksURL + "?author=" + param + "&api-key=" + apiBooksKey
  );
  getBookDetails(searchByAuthorUrl);
}

// Function to get Books data
function getTopSellers() {
  var topSellerBooksUrl = new URL(
    "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" +
      apiBooksKey
  );

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

function getMovieDetails(searchURL) {
  fetch(searchURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (queryRes) {
      renderMovieResult(queryRes);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderMovieResult(queryRes) {
  var innerHTML = "";
  if (queryRes.num_results > 0) {
    queryRes.results.forEach((result) => {
      innerHTML += renderMovieResultTemplate(result);
    });
  } else {
    innerHTML += "<h3>No Results Found!</h3>"
  }
  $("#movie-results").html(innerHTML);
}

// Function to display books by an author or title
//fix image - works for critics picks, but doesn't for searched movie?!
//<div class="media">
//      <div class="media-left">
//      <figure class="image is-48x48">
//      <img onerror="this.src='./assets/images/no-image.jpg';this.onerror='';" src="${result.multimedia.src}" alt="${result.display_title}">
//      </figure>
//     </div>

function renderMovieResultTemplate(result) {
  return `
  <div class="card">
    <div class="card-content">
        <div class="media-content">
          <p class="title is-4">${result.display_title}</p>
          <p class="subtitle is-6">Rating: ${result.mpaa_rating}</p>
        </div>
      </div>
      <div class="content">
      ${result.summary_short}
        <br>
        <time datetime>Release Date: ${result.opening_date}</time>
      </div>
    </div>
  </div>`;
}

// Functionto display the top 5 bestsellers - books
// Display results for the user's choice of book by title
function renderBookResult(queryRes) {
  var innerHTML = "";
  if (queryRes.results.length > 0) {
    queryRes.results.forEach((result) => {
      innerHTML += renderBookResultTemplate(result);
    });
  } else {
    innerHTML += "<h3>No Results Found!</h3>"
  }
  $("#book-results").html(innerHTML);
}

// Function to display books by an author or title
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

/*  getTopSellers();  */
// Function to display top five books
function renderTopSellers(queryRes) {
  $("#topBookResultsPanel").html("");
  var innerHTML = "";
  queryRes.slice(0, 5).forEach((result) => {
    innerHTML += renderTopFiveBookResultTemplate(result);
  });
  $("#topBookResultsPanel").html(innerHTML);
}

function renderTopFiveBookResultTemplate(result) {
  return `
  <article class="media is-10 is-offset-2" >
    <figure class="media-left">
    <p class="image is-64x64">
    <img onerror="this.src='./assets/images/no-image.jpg';this.onerror='';" src="https://storage.googleapis.com/du-prd/books/images/${result.isbns[0].isbn13}.jpg" alt="${result.book_title}">
    </p>
  </figure>
  
  <div class="media-content" class="column">
    <div class="content" class="column">
      <p>
        <strong>${result.title}</strong><small><br>
        By: ${result.author}</small>
        <br>
       ${result.description}
      </p>
    </div>
    
  <div class="media-right">
    <button class="is-danger">&#x2764;</button>
  </div>
</article>`;
}

//on-ready init funcs
$(function() {
  $("#search-btn").click(initiateSearch);
  
  //Monitors the radio'S
  // $("#movies-by-title").change(initiateSearch);
  // $("#books-by-author").change(initiateSearch);
  // $("#books-by-title").change(initiateSearch);
  // $("#books-and-movies").change(initiateSearch);
})




