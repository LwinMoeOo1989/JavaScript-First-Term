const $ = selector => document.querySelector(selector);


function validateInput(selector)
{
    const inputNum = parseInt($("#cents").value);
    if (inputNum >= 0 && inputNum <= 100) {    
        calculateAverage(inputNum);
    }
    else {
        alert("Score must be a valid number from 0 through 100");
    }
    $("#cents").focus();
}

function calculateAverage(amount) {
  
    // Initialize variables for each coin type
    let quarters = 0;
    let dimes = 0;
    let nickels = 0;
    let pennies = 0;
  
//looping to produce quarter
let results = new Array(4); 

    // Calculate the number of quarters
    quresultsarters = Math.floor(amount / 25); // Use Math.floor for whole quarters
    amount %= 25;  // Update remaining amount after quarters
    results[0] =Math.floor(amount / 25);
    // Calculate the number of dimes
    dimes = Math.floor(amount / 10);
    amount %= 10;  // Update remaining amount after dimes
    results[1] =Math.floor(amount / 10);
    // Calculate the number of nickels
    nickels = Math.floor(amount / 5);
    amount %= 5;  // Update remaining amount after nickels
    results[2] =Math.floor(amount / 5);
    // Calculate the number of pennies
    pennies = amount;
    results[3] =Math.floor(amount);
    // Display the results (assuming you have elements with IDs for each coin type)

    $("#quarters").val(results[0]);
    $("#dimes").val(results[1]);
    $("#nickels").val(results[2]);
    $("#pennies").val(results[3]);
    /*
    document.getElementById("quarters").value = results[0];
    document.getElementById("dimes").value = results[1];
    document.getElementById("nickels").value = results[2];
    document.getElementById("pennies").value = results[3];*/
  }


document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#calculate").addEventListener("click", validateInput);   
	// $("#degrees_entered").focus();
});