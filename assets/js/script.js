$(document).ready(function (){
    $("#jobs-output-page").hide();
    $("#job-details-screen").hide();

    var adzunaJobsArray = [];

function runHomeSearch () {
    var occupationInput = $("#occupation-input").val();
    var cityInput = $("#city-input").val();
    var apiKey = "34c685494080bb76386590eb0d7c02f9";
    var queryURL =
    "https://cors-anywhere.herokuapp.com/https://api.adzuna.com/v1/api/jobs/us/search/6?app_id=d279677d&app_key=" +
    apiKey +
    "&what=" +
    occupationInput +
    "&where=" +
    cityInput;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
//    console.log(response);
    for (var i = 0; i < 6; i++) {

        var jobObject = {
            company: response.results[i].company.display_name,
            position: response.results[i].title,
            city: response.results[i].location.area[3],
            state: response.results[i].location.area[1],
            description: response.results[i].description,
          };
      
          console.log(jobObject);
          adzunaJobsArray.push(jobObject);
          }
    }
  )};

function createJobCards () {

    
for (var t = 0; t < 6; t++) {


        var newRow = $("<div>").addClass("row");
        var newCol = $("<div>").addClass("col-lg-10");
        var newForm = $("<form>").addClass("jobs-output text-center");
        var newFormGroup = $("<div>").addClass("form-group");
        var newH1 = $("<h1>");
        var newH2 = $("<h2>");
        var newH3 = $("<h3>");
        var newP = $("<p>");
        // var newSaveBtn = $("<button>");
        var newDetailsBtn = $("<button>");
    
        newH1.text(adzunaJobsArray[t].company);
        newH2.text(adzunaJobsArray[t].position);
        newH3.text(adzunaJobsArray[t].city + ", " + adzunaJobsArray[t].state);
        newP.text(adzunaJobsArray[t].description);
        // newSaveBtn.text("Save");
        newDetailsBtn.text("Details");

        // newSaveBtn.addClass("btn btn-lg btn-info m-4 saveButton");
        newDetailsBtn.addClass("btn btn-lg btn-info m-4 detailsButton");


        $(".detailsButton").on("click", function (event) {
            event.preventDefault();
            $("#jobs-output-page").hide();
            $("#job-details-screen").show();
        });
        // $(".saveButton").on("click", function (event) {
        //     event.preventDefault();
        //     $("#jobs-output-page").hide();
        // });


        newFormGroup.prepend(newDetailsBtn);
        // newFormGroup.prepend(newSaveBtn);
        newFormGroup.prepend(newP);
        newFormGroup.prepend(newH3);
        newFormGroup.prepend(newH2);
        newFormGroup.prepend(newH1);
        newForm.append(newFormGroup);
        newCol.append(newForm);
        newRow.append(newCol);
        $("#jobs-output-page").append(newRow);
    }

}


$("#home-submit-button").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    runHomeSearch();
    createJobCards();
    $("#home-page").hide();
    $("#jobs-output-page").show();
});




});
