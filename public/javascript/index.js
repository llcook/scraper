// PUBLIC/INDEX/JAVASCRIPT/INDEX.JS

// Grab articles as JSON
$.getJSON("/api/headlines/all", function (data) {
    // For each one

    // LIMIT RESULTS TO 10 (replace data.length)
    // INCORPORATE PAGINATION... TO SHOW REST OF DATA ON SUBSEQUENT PAGES
    for (var i = 0; i < data.length; i++) {
        // Display info on page
        $("#headlines").append("<div class='article'><h4 class='headline' data-id='" + data[i]._id + "'><a href='" + data[i].link + "'>" + data[i].headline + "</a></h4><p id='save-btn' data-id='" + data[i]._id + "'>Save</p><p class='description'>" + data[i].description + "</p></div>");
    }
});