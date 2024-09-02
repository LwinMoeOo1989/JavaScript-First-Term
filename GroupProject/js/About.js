/* This JavaScript file is part of a group project(about-page), This page of code is coded by Mamidi Nithin Sai Kumar/9002544.  */
"use strict";
$(document).ready(function() {
    //check the user exit or not (lwin)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // Redirect to login page if not logged in
        window.location.href = './SignIn.html';
        return; 
    }
    
    // Initialize the accordion
    $("#accordion").accordion({
        collapsible: true,  // Allows the accordion to be collapsed
        active: false,      // Keeps all sections closed initially
    });
      
    // Slideshow with fade and slide effect
    let currentIndex = 0;
    const slides = $(".slide");
    const slideCount = slides.length;

    // Initially show the first slide (image + caption)
    slides.hide().eq(currentIndex).show();

    // Function to show the next slide
    function showNextSlide() {
        slides.eq(currentIndex).fadeOut(1000, function() {
            currentIndex = (currentIndex + 1) % slideCount;
            slides.eq(currentIndex).fadeIn(1000);
        });
    }

    // Set the interval for the slideshow
    setInterval(showNextSlide, 4000);  // Change slide every 4 seconds
});

// Handle clicking on the .main-faq class
$(".main-faq").on("click", function() {
    if ($(".faq").is(":visible")) {
        // If .faq is visible, close all .faq and .faq-answer elements
        $(".faq").slideUp();       // Close the .faq section
        $(".faq-answer").slideUp(); // Close the .faq-answer
    } else {
        // If .faq is not visible, open it
        $(".faq").slideDown(); // Slide down and show the .faq section
    }
});

// Handle clicking on the .faq class to toggle the .faq-answer
$(".faq").on("click", function() {
    $(this).next(".faq-answer").slideToggle();  // Toggle the visibility of the next .faq-answer element
});