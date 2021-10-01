var fetchButton = document.getElementById("search-btn");

// fetch("https://www.eventbriteapi.com/v3/users/me/?token=GE25XEDOS3NMOG436PKP")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

function getApi(event) {
  event.preventDefault();
  var requestUrl =
    "https://www.eventbriteapi.com/v3/users/me/?token=GE25XEDOS3NMOG436PKP";

  fetch(requestUrl)
    .then((response) => {
      console.log("Success:", data);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

// fetchButton.addEventListener("click", getApi);
fetchButton.addEventListener("click", getApi);
