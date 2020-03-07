$(document).ready(function() {
    

    var recipes = JSON.parse(localStorage.getItem("recipes"));
    console.log(recipes);

    $(".results-subtitle").append(localStorage.getItem("search"))

    // Displays array into the results page
    function showNames() {
        for(var i = 0; i < recipes.length; i++){
            
            let div = $("<div>")
            let resultItem = $(".recipe-result-content")
            let resultName = $(".is-6")
            
    
            $(resultName).append('<div>' + recipes[i].title + '</div>')
            //   resultName.append(recipes[i].title)
             
    
            // $(recipe[i]).appendto(resultItem.resultName)
        
            // resultItem.resultName.append(recipes.title)
        }
        }
        showNames()
});

