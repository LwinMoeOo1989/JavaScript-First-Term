"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("#image_rollovers img");
        // 3- preload the images begin
        const Oldimagelist=[];
        const Newimagelist=[];
        for(let image of images){
        const newimage1 = new Image();
        newimage1.src = image.src;
        Oldimagelist.push(newimage1);
        const newimag2 = new Image();
        newimag2.src = image.id;
        Newimagelist.push(newimag2);
        }
         // 3- preload the images end
        
        // process each img tag
        for (let i = 0;i < images.length;i++) {
        // set up event handlers for hovering an image
          // 4- Added timer fro rollover image after user mouse over
        images[i].addEventListener("mouseover", () => {
           setTimeout(() => { images[i].src = Newimagelist[i].src;
           },2000);
        });
        // 5- Added timer fro rollover image after user mouse out
        images[i].addEventListener("mouseout", () => {
             setTimeout(() => { images[i].src = Oldimagelist[i].src;
           },3000);
        });
    }
   
});




































