// Grab articles as JSON
$.getJSON("/headlines", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display info on page
        $("#headlines").append("<p data-id='" + data[i]._id + "'><h4><a href='" + data[i].link + "'>" + data[i].headline + "</a></h4></p><p>" + data[i].description + "</p>");
    }
});

// When user clicks p tag
$(document).on("click", "p", function () {
    // Empty notes from note section
    $("#notes").empty();
    // Save ID from p tag
    var thisId = $(this).attr("data-id");

    // Now make ajax call for the Headline
    $.ajax({
        method: "GET",
        url: "/headlines/" + thisId
    })
        // Then add note info to the page
        .then(function (data) {
            console.log(data);
            // Headline of article
            $("#notes").append("<h2>" + data.headline + "</h2>");
            // Input to enter new headline
            $("#notes").append("<input id='titleinput' name='title' >");
            // Textarea to add new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></texarea>");
            // Button to submit new note with Headline ID saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save note</button>");

            //If there's a note in the article
            if (data.note) {
                // Place note title in title input
                $("#titleinput").val(data.note.title);
                // Place note body in body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click savenote button
$(document).on("click", "#savenote", function () {
    // Grab ID associated with article from submit button
    var thisId = $(this).attr("data-id");

    // Run POST request to change note, using what's entered in inputs
    $.ajax({
        method: "POST",
        url: "/headlines/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty notes section
            $("#notes").empty();
        });

    // And remove values entered in input + textarea for note entry
    $("#titleinput").val("");
    $("bodyinput").val("");
});