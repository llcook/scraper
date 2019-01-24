// FRONT-END JS FOR HOME PAGE

// Save articles
$(".unsaved").on("click", "#save-btn", function () {
    // POST ARTICLE TO JSON OBJECT
    // JSON SAVED OBJECT ROUTED TO FRONT END /saved
    const selectedHead = $(this).parents("li").data();
    console.log(selectedHead);

    selectedHead.saved = true;

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