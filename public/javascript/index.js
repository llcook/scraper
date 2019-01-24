// FRONT-END JS FOR HOME PAGE

// Save articles
$(".unsaved").on("click", "#save-btn", function () {

    // Find the headline ID
    const selectedHead = $(this).parents("li").data();
    console.log(selectedHead);

    // Change its saved boolean
    selectedHead.saved = true;

    // Update the object
    $.ajax({
        method: "PUT",
        url: "/api/headlines/" + selectedHead.headlineId,
        data: selectedHead
    }).then(function(data) {
        if (data.saved) {
            console.log("Headline saved: " + selectedHead.headlineId);
        }
    })
});