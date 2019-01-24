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
})