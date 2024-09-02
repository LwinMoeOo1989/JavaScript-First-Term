"use strict";
$(document).ready( () => {

$("#rollovers li h2").hover(
    evt => {
        $(evt.target).next('p').show();
    },
    evt =>{
        $(evt.target).next('p').hide();
    })
});

/*
"use strict";
$(document).ready( () => {

$("#rollovers li h2").hover(
    evt => {
        $(evt.target).next('p').show();
    },
    evt =>{
        $(evt.target).next('p').show();
    });
});
*/





/*


"use strict";
$(document).ready( () => {
$("#faqs h2").click( evt => {
const target = evt.currentTarget;
$(target).toggleClass("minus");
if ($(target).attr("class") != "minus") {
$(target).next().fadeOut(1000);
}
else {
$(target).next().slideDown(1000);
}
});
});














/*
$(document).ready(() => {
    $("#rollovers li h2").mouseenter(evt => {
        $(evt.target).next('p').show();
    }).mouseleave(evt => {
        $(evt.target).next('p').hide();
    });
});
*/



