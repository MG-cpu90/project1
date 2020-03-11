
$(document).ready(function() {
    
    // Grabs the needed info from storage
    $(".hero").css("background-image","url(" + "https://spoonacular.com/recipeImages/Creamy-Avocado-Pasta-547775.jpg" +  ")");
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    var reciID = JSON.parse(localStorage.getItem("id"));
    var reciTitle = JSON.parse(localStorage.getItem("title"));
    var reciMinutes = JSON.parse(localStorage.getItem("minutes"));

    //Appends unique recipe to Header
    $("#recipeTitle").append(reciTitle)
    $("#readyToServe").text("Will be ready in: " + reciMinutes + " minutes")

    var reciIngSite = "https://api.spoonacular.com/recipes/" + reciID + "/ingredientWidget.json?apiKey=18f2f6ffa1da41b0b161e90498f0d67a"
    console.log(reciIngSite)

    $.ajax({
        url: reciIngSite,
        method: "GET"
      }).then(function(data) {
        for(i = 0; i < data.ingredients; i++){
            printResult(data[i]);
        }
          console.log(data)
          var classEl = $("<ul>").addClass("ingredients-list")
          var ingBullet = $("<li>").addClass("ingredient-bullet")
          var ingQuan = $("<span>").addClass("ingredient-quantity")      
          var ingName = $("<p>").addClass("ingredient-name").text(data.ingredients.name)

         $(".ingredients").append(ingName)


      
      })
});

