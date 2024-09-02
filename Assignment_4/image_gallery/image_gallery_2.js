"use strict";
$(document).ready( () => {
    
    let imageCache=[];
    //3) predload images begin
    $("#image_links a").each( (index, link) => {
       const tempimage=new Image();
       tempimage.src=link.href;
       tempimage.title=link.title;
       imageCache[index]=tempimage;
    });
    //3) preload images end
    //4) attach event handlers for link and parameter named event and cancel default action begin
    $("#image_links a").click( (event) => {
        event.preventDefault();
        let imageURL= $(this).attr("href");
        let captionText=$(this).attr("title");
        
        $("#image, #caption").slideUp(3000, () =>  {
            $("#image").attr("src",imageURL);
            $("#caption").text(captionText);
            
            $("#image, #caption").slideDown(3000);
        });
    });
    //4) attach event handlers for link and parameter named event and cancel default action end
    
    //5) added the jquery statement that move the first link 
     $("li :first-child a").focus();
});

/*"use strict";
$(document).ready(() => {
    
    let imageCache = [];
    
    // Preload images
    $("#image_links a").each((index, link) => {
        const tempImage = new Image();
        tempImage.src = link.href;
        tempImage.title = link.title;
        imageCache[index] = tempImage;
    });
    
    // Attach event handlers for link click
    $("#image_links a").click(function(event) {
        event.preventDefault();
        
        const imageURL = $(this).attr("href");

        const captionText = $(this).attr("title");
        
        $("#image, #caption").slideUp(3000, function() {
            $("#image").attr("src", imageURL);
            $("#caption").text(captionText);
            $("#image, #caption").slideDown(3000);
        });
    });
    
    // Move the focus to the first link on the page when it loads
    $("#image_links a:first").focus();
});
*/

