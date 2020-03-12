
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

    var reciIngSite = "https://api.spoonacular.com/recipes/" + reciID + "/ingredientWidget.json?apiKey=4472f39041d44dff8bb30e65b380b0a2"
    var recIns = "https://api.spoonacular.com/recipes/" + reciID + "/analyzedInstructions?apiKey=4472f39041d44dff8bb30e65b380b0a2"
  
    $.ajax({
        url: reciIngSite,
        method: "GET"
      }).then(function(data) {
     
        for(x = 0; x < data.ingredients.length; x++){
            printResultIng(data.ingredients[x]);
           
        }
    })
        // Prints the ingredients to
      function printResultIng(ingredient){
          
          var ingQuan = $("<span>").addClass("ingredient-quantity").text(ingredient.amount.metric.value + " ");
          var ingName = $("<p>").addClass("ingredient-name").text(ingredient.name + " " + ingredient.amount.metric.unit );
          var ingBullet = $("<li>").addClass("ingredient-bullet")
          
        
        ingQuan.append(ingName);
        ingBullet.append(ingQuan);
      
         $(".ingredients").append(ingBullet);


          }

          //Prints the instructions to page
          $.ajax({
            url: recIns,
            method: "GET"
          }).then(function(data){
            
            for (y = 0; y < data[0].steps.length; y++){
              printResultInstuc(data[0].steps[y]);
            }
          })

          function printResultInstuc(steps){
            var recStep = $("<p>").addClass("recipe-steps").text(steps.step)

            $(".instructions").append(recStep)
          }
          
        })

      