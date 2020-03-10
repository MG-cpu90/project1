$(document).ready(function() {
    

    var recipes = JSON.parse(localStorage.getItem("recipes"));
    console.log(recipes);

    $(".results-subtitle").append(localStorage.getItem("search"))


    printResults(recipes)

});


function printResults(recipes){

    for(i = 0; i < recipes.length; i++){
        printResult(recipes[i]);
    }
}

function printResult(recipe){

    var cardEl = $("<div>").addClass("card recipe-result").attr("data-id",recipe.id);
    var cardContentEl = $("<div>").addClass("card-content recipe-result-content");
    var mediaEl = $("<div>").addClass("media");
    var mediaLeftEl = $("<div>").addClass("media-left");
    var figureEl = $("<figure>").addClass("image is-96x96");
    var imgEl = $("<img>").addClass("result-thumbnail").attr("src","https://spoonacular.com/recipeImages/" + recipe.image).attr("alt",recipe.title);
    
    figureEl.append(imgEl);
    mediaLeftEl.append(figureEl);

    var mediaContentEl = $("<div>").addClass("media-content");
    var recipeNameEl = $("<p>").addClass("is-6 recipe-name").text(recipe.title)
    
    var popoverEl = getPopOver();
    
    var contentEl = $("<div>").addClass("content is-small").text("placeholder text");

    mediaContentEl.append(recipeNameEl).append(popoverEl).append(contentEl);

    mediaEl.append(mediaLeftEl).append(mediaContentEl);

    cardContentEl.append(mediaEl);
    
    cardEl.append(cardContentEl);

    $(".results").append(cardEl);

}

function getPopOver(){

    var popoverEl = $("<div>").addClass("popover is-popover-bottom is-inline");
    var buttonEl = $("<button>").addClass("button is-info popover-trigger info-button").text("i");
    var contentEl = $("<div>").addClass("popover-content");
    var iframeEl = $("<iframe>").addClass("info-frame");

    contentEl.append(iframeEl);
    buttonEl.append(contentEl);
    popoverEl.append(buttonEl).append(contentEl);

    return popoverEl;
}


// APPEND BUTTON WITH WIKIPEDIA LINK
// I need to fix the tags so that they work as right now they apply to a generic page I had used to test out the JS
var popOver = "";
var infoButton = $("#info1");
var recipeName = $(".results").text();
console.log(recipeName);

infoButton.on("click", function(event) {
    event.preventDefault();
    var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + recipeName;

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET",
        crossDomain: true,
        dataType: 'jsonp',
      })
        // After data comes back from the request
        .then(function(response) {
         var result = response[3][0];
        var wikiLink = JSON.stringify(result);
        console.log(wikiLink);

            // Append a "Learn more" button with the link to the Wikipedia page on said foot item
            // infoButton.append($("<iframe src=" + wikiLink + "</iframe>"));

            $("#frame").attr("src", wikiLink);


        });
  });

