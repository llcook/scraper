/////////////////////////////////////////////
// SAVE ARTICLES
/////////////////////////////////////////////

$(".unsaved").on("click", "#save-btn", function () {
    // POST ARTICLE TO JSON OBJECT
    // JSON SAVED OBJECT ROUTED TO FRONT END /saved
    const thisId = $(this).closest("li").attr("data-headline-id");
    console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/" + thisId,

        success: function(response) {
            console.log("Article saved: " + thisId);
        }
    })
});

// DELETE SAVED ARTICLES

$(document).on("click", "#unsave", function() {
    const thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/unsave/" + thisId,

        success: function(response) {
            console.log("Article unsaved: " + thisId);
        }
    })
})

/////////////////////////////////////////////
// NOTES FUNCTIONALITY
/////////////////////////////////////////////

// !!!!!!!!!!!! RECONFIGURE

// SHOW NOTES

// When user clicks p tag
// $(document).on("click", "p", function () {
//     // Empty notes from note section
//     $("#notes").empty();
//     // Save ID from p tag
//     var thisId = $(this).attr("data-id");

//     // Now make ajax call for the Headline
//     $.ajax({
//         method: "GET",
//         url: "/headlines/" + thisId
//     })
//         // Then add note info to the page
//         .then(function (data) {
//             console.log(data);
//             // Headline of article
//             $("#notes").append("<h2>" + data.headline + "</h2>");
//             // Input to enter new headline
//             $("#notes").append("<input id='titleinput' name='title' >");
//             // Textarea to add new note body
//             $("#notes").append("<textarea id='bodyinput' name='body'></texarea>");
//             // Button to submit new note with Headline ID saved to it
//             $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save note</button>");

//             //If there's a note in the article
//             if (data.note) {
//                 // Place note title in title input
//                 $("#titleinput").val(data.note.title);
//                 // Place note body in body textarea
//                 $("#bodyinput").val(data.note.body);
//             }
//         });
// });

// ADD NOTES

// When you click savenote button
$(document).on("click", "#savenote", function () {
    // Grab ID associated with article from submit button
    const thisId = $(this).attr("data-id");

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

/////////////////////////////////////////////
/////////////////////////////////////////////