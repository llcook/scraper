// FRONT-END JS FOR SAVED PAGE

// Delete saved articles
$(".saved").on("click", "#delete-btn", function () {
    const selectedHead = $(this).parents("li").data();
    console.log(selectedHead);

    selectedHead.saved = false;

    $.ajax({
        method: "PUT",
        url: "/api/headlines/" + selectedHead.headlineId,
        data: selectedHead
    }).then(function(data) {
        if (data.saved) {
            console.log("Headline unsaved: " + selectedHead.headlineId);
        }
    })
});

// Notes

// Save note from note-modal
// $("button").on("click", "#save-note", function() {
//     const noteText = $("#note-input").val();
//     console.log(noteText);
// });

// NOTE BUTTON CLICK EVENT

// $("button").on("click", "#note-btn", function() {
//     const selectedHead = $(this).parents("li").data();
//     console.log(selectedHead);

//     $.ajax({
//         method: "GET",
//         url: "/api/headlines/" + selectedHead.headlineId,
//         data: selectedHead
//     }).then(function(data) {
//         if (data.note.body) {
//             $("#notes-content").append("<p>" + data.note.body + "</p>");
//         } else {
//             $("#notes-content").append("<p>No notes added.</p>");
//         }
//     })

// })