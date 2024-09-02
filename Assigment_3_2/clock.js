"use strict";
const $ = selector => document.querySelector(selector);

const padSingleDigit = num => num.toString().padStart(2, "0");

const displayCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours(); //change the const to let because const can't reassign
    let ampm = "AM"; // set default value
    
    // correct hours and AM/PM value for display
    if (hours > 12) { // convert from military time
        hours = hours - 12;
        ampm = "PM";
    } else { // adjust 12 noon and 12 midnight
         switch (hours) {
            case 12: // noon
                ampm = "PM";
                break;
            case 0:  // midnight
                hours = 12;
                ampm = "AM";
        }
    }
    
    $("#hours").textContent =padSingleDigit(hours) ;
    $("#minutes").textContent = padSingleDigit(now.getMinutes());
    $("#seconds").textContent = padSingleDigit(now.getSeconds());
    $("#ampm").textContent = ampm;
};


//global stop watch timer variable and elapsed time object
let stopwatchTimer = null;
let elapsedhours = 0;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;
    /* 3- Immeplement tickStopwatch function first added the  15 milliseconds 
    After that added the seconds and then minutes and hours begin*/ 
const tickStopwatch = () => {    

    elapsedMilliseconds+=15;
    if(elapsedMilliseconds>=1000){
        elapsedMilliseconds=0;
        elapsedSeconds+=1;
    }
    
    if(elapsedSeconds>=60){
        elapsedSeconds=0;
        elapsedMinutes+=1;
    }
    
     if(elapsedMinutes>=60){
        elapsedMinutes=0;
        elapsedhours+=1;
    }
    
    $("#timer-milliseconds").textContent =elapsedMilliseconds.toString().padStart(3,"0");
    $("#timer-seconds").textContent = padSingleDigit(elapsedSeconds);
    $("#timer-minutes").textContent = padSingleDigit(elapsedMinutes);
    $("#timer-hours").textContent=padSingleDigit(elapsedhours);
     
};
    /* 3- Immeplement tickStopwatch function first added the  15 milliseconds 
    After that added the seconds and then minutes and hours end*/ 

const startStopwatch = event => {
    
    // 4- startStopwatch implement start the stop watch every 15 seconds call the tickStopwatch added preventDefault(); begin
    event.preventDefault();
    if(stopwatchTimer==null){  
        stopwatchTimer=setInterval(tickStopwatch,15);
   }
     // 4- startStopwatch implement start the stop watch every 15 seconds call the tickStopwatch added preventDefault(); end
};

// 5- stopStopwatch and  resetStopwatch methods and added preventDefault according to requriement begin 
const stopStopwatch = event => {
    
    event.preventDefault();
    if(stopwatchTimer!=null){
     clearInterval(stopwatchTimer);
     stopwatchTimer=null;
    }
};

const resetStopwatch = event => {
    event.preventDefault();
    if(stopwatchTimer!=null){
     clearInterval(stopwatchTimer);
     stopwatchTimer=null;
    }
    
    elapsedhours=0;
    elapsedMinutes=0;
    elapsedSeconds=0;
    elapsedMilliseconds=0;
    
    $("#timer-milliseconds").textContent ="000";
    $("#timer-seconds").textContent = "00";
    $("#timer-minutes").textContent = "00";
    $("#timer-hours").textContent="00";
};
// 5- stopStopwatch and  resetStopwatch methods and added preventDefault according to requriement end 

document.addEventListener("DOMContentLoaded", () => {
 // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
 // set up stopwatch event handlers
 
    // 6- DOMContentLoaded attach the event with the handler
    $("#start").addEventListener("click",startStopwatch);
    $("#stop").addEventListener("click",stopStopwatch);
    $("#reset").addEventListener("click",resetStopwatch);
});


























































