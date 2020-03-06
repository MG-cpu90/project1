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
                "Vietnamese":false};

var diets = { "Gluten Free":false,
              "Ketogenic":false,
              "Vegetarian":false,
              "Lacto-Vegetarian":false,
              "Ovo-Vegetarian":false,
              "Vegan":false,
              "Pescetarian":false,
              "Paleo":false,
              "Primal":false,
              "Whole30":false};


var intolerances ={ "Gluten Free":false,
                    "Ketogenic":false,
                    "Vegetarian":false,
                    "Lacto-Vegetarian":false,
                    "Ovo-Vegetarian":false,
                    "Vegan":false,
                    "Pescetarian":false,
                    "Paleo":false,
                    "Primal":false,
                    "Whole30":false};

// Show Modal
$(".show-modal-button").click(function() {

    var filterType = this.getAttribute("data-type");

    populateModal(filterType);

    $(".modal").attr("class","is-active");
    })

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

function DrawFilterCheckbox(dict) {
    var modalBody = $(".modal-card-body");

    modalBody.click(function() { 

        var target = event.target;

        dict[target.getAttribute("data-type")] = target.checked;

        console.log(target.checked);
        
    });

    modalBody.empty();

    Object.entries(dict).forEach(([key,value]) => {

    var input = $("<input>").attr("type","checkbox").attr("data-value",key);

    input.checked = value;

    var label = $("<label>").attr("class","filter-label").text(key);

    label.prepend(input);

    modalBody.append(label);

    });
}