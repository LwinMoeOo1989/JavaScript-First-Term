"use strict";
const $ = selector => document.querySelector(selector);

/*********************
*  helper functions  *
**********************/
const calculateCelsius = temp => (temp-32) * 5/9;
const calculateFahrenheit = temp => temp * 9/5 + 32;

const toggleDisplay = (label1Text, label2Text) => {
	$("#degree_label_1").textContent = label1Text;
    $("#degree_label_2").textContent = label2Text;
    $("#degrees_computed").value = "";
    $("#message").textContent = "";
}

/****************************
*  event handler functions  *
*****************************/
const convertTemp = () => {   
	
	const degreesEntered = parseFloat($("#degrees_entered").value);
    const messageElement = $("#message");
    messageElement.textContent = "";

	if(isNaN(degreesEntered))
		{
			messageElement.textContent = "Please enter a valid number.";
			$("#degrees_computed").value = "";
			return;
		}
		
		let degreesComputed;
		if ($("#to_fahrenheit").checked) {
			$("#degrees_computed").value=	calculateFahrenheit(degreesEntered);
		}
		else
		{
			$("#degrees_computed").value=	calculateCelsius(degreesEntered);
		}
};

const toCelsius = () => toggleDisplay("Enter F degrees:", "Degrees Celsius:");
const toFahrenheit = () => toggleDisplay("Enter C degrees:", "Degrees Fahrenheit:");

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#convert").addEventListener("click", convertTemp);
    $("#to_celsius").addEventListener("click", toCelsius);
    $("#to_fahrenheit").addEventListener("click", toFahrenheit);
	
	// move focus
	$("#degrees_entered").focus();
});