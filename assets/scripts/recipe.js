
$(document).ready(function() {
    
    $(".hero").css("background-image","url(" + "https://spoonacular.com/recipeImages/Creamy-Avocado-Pasta-547775.jpg" +  ")");
    
    var recipes = JSON.parse(localStorage.getItem("recipes"));

    $(".results-title").append(localStorage.getItem(recipes.title))
});

