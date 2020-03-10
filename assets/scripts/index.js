var cuisines = {"African":false,
                "American":false,
                "British":false,
                "Cajun":false,
                "Caribbean":false,
                "Chinese":false,
                "Eastern European":false,
                "European":false,
                "French":false,
                "German":false,
                "Greek":false,
                "Indian":false,
                "Irish":false,
                "Italian":false,
                "Japanese":false,
                "Jewish":false,
                "Korean":false,
                "Latin American":false,
                "Mediterranean":false,
                "Mexican":false,
                "Middle Eastern":false,
                "Nordic":false,
                "Southern":false,
                "Spanish":false,
                "Thai":false,
                "Vietnamese":false
            };

var diets = { "Gluten Free":false,
              "Ketogenic":false,
              "Vegetarian":false,
              "Lacto-Vegetarian":false,
              "Ovo-Vegetarian":false,
              "Vegan":false,
              "Pescetarian":false,
              "Paleo":false,
              "Primal":false,
              "Whole30":false
            };


var intolerances ={ "Dairy":false,
                    "Egg":false,
                    "Gluten":false,
                    "Grain":false,
                    "Peanut":false,
                    "Seafood":false,
                    "Sesame":false,
                    "Shellfish":false,
                    "Soy":false,
                    "Sulfite":false,
                    "Tree Nut":false,
                    "Wheat":false,
                };

// Show Modal
$(".show-modal-button").click(function() {

    event.preventDefault;

    var filterType = this.getAttribute("data-type");

    populateModal(filterType);

    $(".modal").attr("class","modal is-active");
    })

// Hide modal
$(".delete").click(function(){

    event.preventDefault;

    $(".modal").removeClass("modal is-active").addClass("modal");
    
});

// Populate modal with correct checkboxes 
function populateModal(filterType){
    
    switch(filterType){
        case "diets":
        DrawFilterCheckbox(diets);
        break;
        case "cuisines":
        DrawFilterCheckbox(cuisines);
        break;
        case "intolerances":
        DrawFilterCheckbox(intolerances);
        break;
    }
}

// Draw checkbox and attach event listener
function DrawFilterCheckbox(dict) {
    
    var modalBody = $(".modal-card-body");

    modalBody.unbind();

    modalBody.change(function() { 

        event.preventDefault;

        var target = event.target;

        var key = target.getAttribute("data-key");

        dict[key] = target.checked;

    });

    modalBody.empty();

    Object.entries(dict).forEach(([key,value]) => {

    var input = $("<input>").attr("type","checkbox").attr("class","labelled-input").attr("data-key",key);
    
    input.prop("checked", value);

    var label = $("<label>").attr("class","checkbox filter-label").text(key);
    
    label.prepend(input);
    
    modalBody.append(label);
    
    });
}
let apiKey = "&number=5&apiKey=18f2f6ffa1da41b0b161e90498f0d67a"

// When user hits Search button
// Grabs the value in the text

$("#searchBtn").on("click", function() {

    // Add loading spinner to search box while awaiting response
    $("search-box").addClass("is-loading");

    let search = $("#search").val()
    // let timeToMake = $("#time").val()
    let queryURL = "https://api.spoonacular.com/recipes/search?query=" + search + apiKey
    
    var recipes = [];
 
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
    // if (timeToMake === ""){ss
    //   alert("WHY?")
    // }
    console.log(data)

     data.results.forEach(function(recipe){
      // console.log({timeToMake})
      if (recipe.readyInMinutes <= 50) {

        recipes.push(recipe);

      
    
    }

        // Saved recipes/search value in local storage
    localStorage.setItem("recipes",JSON.stringify(recipes));
    localStorage.setItem("search",JSON.stringify(search))

    // Navigate to results screen
    window.location.href = "recipe-results.html";
       
   });
    
 
  
  })
})
