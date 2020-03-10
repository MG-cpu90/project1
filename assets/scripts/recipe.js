
$(document).ready(function() {
    
    $(".hero").css("background-image","url(" + "https://spoonacular.com/recipeImages/Creamy-Avocado-Pasta-547775.jpg" +  ")");
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    var reciID = JSON.parse(localStorage.getItem("id"));
    var reciTitle = JSON.parse(localStorage.getItem("title"));

    console.log(recipes)
    console.log(reciID)
    console.log(reciTitle)

    $(".results-title").append(reciTitle)
});

