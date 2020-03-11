$(document).ready(function() {
    

    var recipes = JSON.parse(localStorage.getItem("recipes"));
    console.log(recipes);

    $(".results-subtitle").append(localStorage.getItem("search"))
    // var queryURL2 = "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=18f2f6ffa1da41b0b161e90498f0d67a"

    printResults(recipes)

});




function printResults(recipes){

    for(i = 0; i < recipes.length; i++){
        printResult(recipes[i]);
    }
}

function printResult(recipe){

    var cardEl = $("<div>").addClass("card recipe-result");

    var cardContentEl = $("<div>").addClass("card-content recipe-result-content");
    var mediaEl = $("<div>").addClass("media");
    var mediaLeftEl = $("<div>").addClass("media-left");
    var figureEl = $("<figure>").addClass("image is-96x96");
    var imgEl = $("<img>").addClass("result-thumbnail").attr("src","https://spoonacular.com/recipeImages/" + recipe.image).attr("alt",recipe.title);
    // var SumEl = $("<div>").addClass("content is-small").attr("https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=18f2f6ffa1da41b0b161e90498f0d67a")

    figureEl.append(imgEl);
    mediaLeftEl.append(figureEl);

    var mediaContentEl = $("<div>").addClass("media-content");
    var recipeNameEl = $("<p>").addClass("is-6 recipe-name").text(recipe.title)
    
    recipeNameEl.click(function() {
        
        // placeholder for ajax recipe detials call
        console.log(recipe.id);
    });

   

    var popoverEl = getPopOver(recipe.title);
    // var sumCont = sumEL();
    
    var contentEl = $("<div>").addClass("content is-small").text("Ready In: " + recipe.readyInMinutes + " minutes")
    var contentEl2 = $("<div>").addClass("content is-small").text("Serves up to: " + recipe.servings + " people");

    mediaContentEl.append(recipeNameEl).append(popoverEl).append(contentEl).append(contentEl2)

    mediaEl.append(mediaLeftEl).append(mediaContentEl);

    cardContentEl.append(mediaEl);
    
    cardEl.append(cardContentEl);

    $(".results").append(cardEl);

    $(".recipe-name").on("click", function() {

        event.preventDefault();

        window.location.href = "recipe.html";
    
    })

}

function getPopOver(recipeTitle){

    var popoverEl = $("<div>").addClass("popover is-popover-bottom");
    var buttonEl = $("<button>").addClass("button is-info popover-trigger info-button").attr("data-name",recipeTitle).text("More Info");

    buttonEl.click(function(){

        event.preventDefault();
        event.stopPropagation();

        var frame = $(this).parent().find("iframe");
        var recipeName = $(this).parent().siblings("p").text();
        var recipeName = recipeName.replace(" ", "-");
        recipeName = recipeName.replace(" ", "-");
        console.log(recipeName);
        
        var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+recipeName;

        console.log(wikiUrl);

        $.ajax({
            type: "get",
            url: wikiUrl,
            crossDomain: true,
            dataType: "jsonp"}).then(function (response) {

                frame.attr("src",response[3][0]);
            });

            
            console.log("title : "+recipeName);

    });

        var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + recipeNameEl;

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

            iframeEl.attr("src", wikiLink);

        });


    return popoverEl;

}

// APPEND BUTTON WITH WIKIPEDIA LINK
// I need to fix the tags so that they work as right now they apply to a generic page I had used to test out the JS


// $(".recipe-result-content").on("click", function() {
//     console.log("hello")
//     window.location.href = "recipe.html";

// })

// function SumEl (){

//     var sumCon = "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=18f2f6ffa1da41b0b161e90498f0d67a"

//     return sumCon;
// }




