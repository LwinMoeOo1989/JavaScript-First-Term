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
  
    // Calculate the number of quarters
    quarters = Math.floor(amount / 25); // Use Math.floor for whole quarters
    amount %= 25;  // Update remaining amount after quarters
  
    // Calculate the number of dimes
    dimes = Math.floor(amount / 10);
    amount %= 10;  // Update remaining amount after dimes
  
    // Calculate the number of nickels
    nickels = Math.floor(amount / 5);
    amount %= 5;  // Update remaining amount after nickels
  
    // Calculate the number of pennies
    pennies = amount;
  
    // Display the results (assuming you have elements with IDs for each coin type)
    document.getElementById("quarters").value = quarters;
    document.getElementById("dimes").value = dimes;
    document.getElementById("nickels").value = nickels;
    document.getElementById("pennies").value = pennies;
  }


document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#calculate").addEventListener("click", validateInput);   
	// $("#degrees_entered").focus();
});