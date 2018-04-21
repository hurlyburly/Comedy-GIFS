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

var topics = ["the office","parks and recreation","brooklyn 99","psych"];
$(document).ready(function() {
  $("#clear-GIFs").on("click", function(event) {
    //clear gifs on page and buttons created

  });

  $(".get-GIFs").on("click", function() {

    var search = $(this).data("search");
    console.log(search);
    var apiKey = "8ZCbydXTYkPNLN7AffE0dj7uiERD5sZZ";
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
        var rated = "rating:" + gifList[i].rating;
        var gifStill = gifList[i].images.fixed_height_still.url;
        var gifAnimated = gifList[i].images.fixed_height.url;

        $(".main-feed").prepend(
          `<div class=GIFs>
          <h4>${rated}</h2>
          <img src=${gifStill} data-still=${gifStill} data-animated=${gifAnimated} data-state="still">
          
          </div>`
        );
var $img = $(this);
        var state = $(this).attr("data-state");
        
        if (state == "still") {
        //   var animatedImg = $img.attr("data-animate");

          $img.attr({ src: gifAnimated, "data-state": "animate" });
        } else {
        //   var stillImg = $img.attr("data-still");

          $img.attr({ src: gifStill, "data-state": "still" });
        }
      }
    });
  });
});
