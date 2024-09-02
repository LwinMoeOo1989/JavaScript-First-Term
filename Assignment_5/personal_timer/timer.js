"use strict"
/*
$(document).ready( () => {
	$("#reset").click(() => {
		$("#time").val("");
		$("#time_error").text("");
		$("#interval").val("");
		$("#interval_error").text("");
		$("#complete").text("");
		elapsedTime = 0;
		$("#progressbar").progressbar({
		  value: 0,
		  max: 0,
		});
	  });
    $("#start_timer").click(  () => {
		let totalTime = $("#time").val();
		let interval = $("#interval").val();
		let isValid = true;
			
		// validate the time
		if (totalTime == "") { 
			$("#time_error").text("This field is required.");
			isValid = false;
		} else if (isNaN(totalTime)) {
			$("#time_error").text("Time must be a number.");
			isValid = false;
		} else {
			$("#time_error").text("");
		} 
			
		// validate the interval
		if (interval == "") { 
			$("#interval_error").text("This field is required.");
			isValid = false;
		} else if (isNaN(interval)) {
			$("#interval_error").text("Interval must be a number.");
			isValid = false;
		} else {
			$("#interval_error").text("");
		}
			
		if (isValid) {
			totalTime = totalTime * 1000;
			interval = interval * 1000;
			let elapsedTime = 0;
			let displayMinutes = 0;
			let displaySeconds = 0;
			let timer = setInterval( () => {
				elapsedTime += interval;
				displaySeconds = elapsedTime / 1000;
				if (displaySeconds < 60) {
					$("#elapsed").val(displaySeconds + " seconds");
				} else {								
					displayMinutes = parseInt(displaySeconds / 60);
					displaySeconds = displaySeconds % 60;
					if (displaySeconds == 0) {
						$("#elapsed").val(displayMinutes + " minutes");									
					} else {
						$("#elapsed").val(displayMinutes + " minutes " + displaySeconds + " seconds");									
					}
				}
				if (elapsedTime == totalTime) {
					clearInterval(timer);
					$("#complete span").text("Time is up!");
				}
			},
			interval );
    	}
    });
	$("#totalTime").focus();
});
*/



// declare as global variable
let elapsedTime = 0;

$(document).ready(() => {
  // reset button click
  $("#reset").click(() => {
    $("#time").val("");
    $("#time_error").text("");
    $("#interval").val("");
    $("#interval_error").text("");
    $("#complete").text("");
    elapsedTime = 0;
    $("#progressbar").progressbar({
      value: 0,
      max: 0,
    });
  });

  // start timer button click
  $("#start_timer").click(() => {
    // clear complete text;
    $("#complete").text("");

    // get input data
    let interval = parseInt($("#interval").val()) * 1000;
    let totalTime = parseInt($("#time").val()) * 1000;
    let isValid = true;

    // validate the time
    if (totalTime == "") {
      $("#time_error").text("This field is required.");
      isValid = false;
    } else if (isNaN(totalTime)) {
      $("#time_error").text("Time must be a number.");
      isValid = false;
    } else {
      $("#time_error").text("");
    }

    // validate the interval
    if (interval == "") {
      $("#interval_error").text("This field is required.");
      isValid = false;
    } else if (isNaN(interval)) {
      $("#interval_error").text("Interval must be a number.");
      isValid = false;
    } else {
      $("#interval_error").text("");
    }

    if (isValid) {
      // set totalTime in progress bar
      $("#progressbar").progressbar({
        value: 0,
        max: totalTime,
      });

      // set interval time according to interval input data
      let timer = setInterval(() => {
        elapsedTime += interval;

        // update progressbar
        $("#progressbar").progressbar("value", elapsedTime);

        // clear interval if time's up
        if (elapsedTime >= totalTime) {
          clearInterval(timer);
          $("#complete").text("Time's up!");

          // reset elapsed time
          elapsedTime = 0;
        }
      }, interval);
    }
  });

  $("#totalTime").focus();
});