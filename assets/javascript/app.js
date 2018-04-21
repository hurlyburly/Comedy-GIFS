//1. Need to access the GIPHY API in order to pull gifs based on user input in the search box COMPLETE
//2. Set up topics array with some preset topics that are attached to buttons that will pull gifs based on data-id
//3. should be calling AJAX function on button click COMPLETE
//4. Look into using Firebase or Local Storage for persistence after page reload
//
//
//
//
//
//
//

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD2ZmMoVWsrJo0H4gvMjqa9o8KvYsn4NTg",
  authDomain: "comedy-gifs.firebaseapp.com",
  databaseURL: "https://comedy-gifs.firebaseio.com",
  projectId: "comedy-gifs",
  storageBucket: "",
  messagingSenderId: "220577145938"
};
firebase.initializeApp(config);

var topics = [];
$(document).ready(function() {
  $("#clear-GIFs").on("click", function(event) {
    //clear gifs on page and buttons created
  });
  $("#get-GIFs").on("click", function(event) {
    event.preventDefault();
    var apiKey = "8ZCbydXTYkPNLN7AffE0dj7uiERD5sZZ";
    var search = $(".search-GIF").val();
    var limit = $(".gif-amount").val();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      search +
      "&api_key=" +
      apiKey +
      "&limit=" +
      limit;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(queryURL);
      var gifList = response.data;

      for (i = 0; i < limit; i++) {
        var rated = gifList[i].rating;
        var gif = gifList[i].images.fixed_height_still.url;
        $(".main-feed").append(
          `<div class=GIFs>
          <h2>${rated}</h2>
          <img src=${gif}>
          </div>`
        );
      }
    
    });
  });
});
