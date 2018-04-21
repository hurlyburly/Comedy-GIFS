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

var topics = ["the office", "parks and recreation", "brooklyn 99", "psych"];
$(document).ready(function() {
  $("#clear-GIFs").on("click", function(event) {
    //clear gifs on page and buttons created
  });

  $(".gif-button").on("click",function(event){
    event.preventDefault();
    var button=$(".search-GIF").val();
    
    topics.push(button);
    console.log(topics);
    var newButton=topics[topics.length-1];
      $(".button-area").append(
    `
     <button type="button" class="btn btn-info get-GIFs" data-search=${newButton} data-state="still" >${newButton}</button>
    `

   );
   console.log(newButton);
   console.log(topics);
  })
  

  $(".button-area").on("click",".get-GIFs", function() {
    var search = $(this).data("search");
    var apiKey = "8ZCbydXTYkPNLN7AffE0dj7uiERD5sZZ";
    var limit = $(".gif-amount").val();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      search +
      "&api_key=" +
      apiKey +
      "&limit=" +
      limit;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //callback
      var gifList = response.data;

      for (i = 0; i < limit; i++) {
        var rated = "rating:" + gifList[i].rating;
        var gifStill = gifList[i].images.fixed_height_still.url;
        var gifAnimated = gifList[i].images.fixed_height.url;
        //prepend the gifs for the topics button pressed
        $(".main-feed").prepend(
          `<div class=GIFs>
          <h4>${rated}</h2>
          <img src=${gifStill} data-still=${gifStill} data-animated=${gifAnimated} data-state="still">
          
          </div>`
          
        );
      }
      $("img").on("click", function() {
        //Clicking the image will change the src from the still image source to the animated image source or vice versa, depending on the data state.
        var state = $(this).attr("data-state");
        //assigning a variable with this format ($) to reduce the amount of "this" in the code and increase readability while also making it clear that this is changing something dynamically
        var $img = $(this);
        
        if (state == "still") {
          var animatedImg = $img.attr("data-animated");
          $img.attr({ "src": animatedImg, "data-state": "animate" });
          
        } else {
          var stillImg = $img.attr("data-still");
          $img.attr({ "src": stillImg, "data-state": "still" });
        }
      });
    });
  });
});
