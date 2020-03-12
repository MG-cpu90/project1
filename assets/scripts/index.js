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

    $(".modal-card-title").text(filterType);

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
        case "Diets":
        DrawFilterCheckbox(diets);
        break;
        case "Cuisines":
        DrawFilterCheckbox(cuisines);
        break;
        case "Intolerances":
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
// Sets GLOBAL scope for API key
let apiKey = "&number=25&apiKey=4472f39041d44dff8bb30e65b380b0a2"

function getFilterTextFromDict(dict, name){

    var filterString = ""; 

    keys = Object.keys(dict);

    keys.forEach(k => { 

        if(dict[k])
            filterString += "&" + name + "=" + k; 
    })

    return filterString;
}

function getFilterText(){

    var filterString = "";

    filterString += getFilterTextFromDict(cuisines,"cuisine");
    filterString += getFilterTextFromDict(diets,"diet");
    filterString += getFilterTextFromDict(intolerances,"intolerance");

    return filterString;
}

// When user hits Search button
// Grabs the value in the text
$("#searchBtn").on("click", function() {

    // Add loading spinner to search box while awaiting response
    $("search-box").addClass("is-loading");

    let search = $("#search").val()

    let queryURL = "https://api.spoonacular.com/recipes/search?query=" + search + apiKey

    queryURL += getFilterText();

    console.log(queryURL);

    var recipes = [];
 
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
  
    console.log(data)

     data.results.forEach(function(recipe){
     
      if (recipe.readyInMinutes <= 90) {

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

// When the YOLO button is clicked
$("#randomBtn").on("click", function() {
     // Add loading spinner to search box while awaiting response
     $("search-box").addClass("is-loading");

     // emtpies values from local storage
     localStorage.clear();

     
     function randoNumber() {

        let min = Math.ceil(1000)
        let max = Math.floor(9500)
        result = Math.floor(Math.random() * (max - min + 1)) + min
        return result

    }
    
    
    var id = randoNumber()
    let queryURL2 = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=18f2f6ffa1da41b0b161e90498f0d67a"

    //Makes ajax API call to get the various recipe info
    // dumps info into local storage
    $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (data){
        localStorage.setItem("title", JSON.stringify(data.title))
        localStorage.setItem("minutes", JSON.stringify(data.readyInMinutes))
        localStorage.setItem("id",JSON.stringify(id))
        window.location.href = "recipe.html"

      })
})
