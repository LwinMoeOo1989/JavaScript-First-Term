$(document).ready(function() {
    // Move the focus to the first link on the page when it loads
    $("#image_links a:first").focus();

    // Preload images and setup click handlers
    $("#image_links a").each(function() {
        // Preload the image
        var img = new Image();
        img.src = $(this).attr("href");

        // Click handler
        $(this).click(function(event) {
            event.preventDefault(); // Cancel the default action of the link
            var imageURL = event.curr
            var captionText = $(this).attr("title");

            // Hide current image and caption with sliding motion
            $("#image, #caption").slideUp(3000, function() {
                // Set new image and caption
                $("#image").attr("src", imageURL);
                $("#caption").text(captionText);

                // Display new image and caption with sliding motion
                $("#image, #caption").slideDown(3000);
            });
        });
    });
});