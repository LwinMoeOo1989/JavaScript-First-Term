"use strict"

const $ = selector => document.querySelector(selector);

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)*[a-zA-Z]{2,}))$/
              
        );
}



// 1)requirement added "e" argument. 
const joinList = (e)  => {
    // get user entries from text boxes
    const email1 = $("#email_1").value;
    const email2 = $("#email_2").value;
    const firstName = $("#first_name").value;
     
    // check user entries
    let isValid = true;
    if (email1 == "") { 
        $("#email_1_error").textContent = "Email is required.";
        isValid = false;
    } else { 
        $("#email_1_error").textContent = ""; 
    }

    if (email1 != email2) { 
        $("#email_2_error").textContent = "Emails must match.";
        isValid = false;
    } else { 
        $("#email_2_error").textContent = ""; 
    }

    if (firstName == "") {
        $("#first_name_error").textContent = "First name is required.";
        isValid = false;
    } else { 
        $("#first_name_error").textContent = ""; 
    }
    if(!validateEmail(email1)){
        
        $("#email_1_error").textContent = "Please enter valid email address.";
        isValid = false;
    }
    if(!validateEmail(email2)){
        
            $("#email_2_error").textContent = "Please enter valid email address.";
            isValid = false;
    }

    // submit the form if user entries are valid
    if ( isValid ) {
        $("#email_form").submit(); 
    }
    else
    {  
        // 2) requirement to prevent defult fuction.
       e.preventDefault();
    }
};

const clearForm = () => {
    // clear text boxes
    $("#email_1").value = "";
    $("#email_2").value = "";
    $("#first_name").value = "";

    // clear span elements
    $("#email_1_error").textContent = "*";
    $("#email_2_error").textContent = "*";
    $("#first_name_error").textContent = "*"; 

    // set focus on first text box after resetting the form
    $("#email_1").focus();
};

document.addEventListener("DOMContentLoaded", () => {
    // hook up click events for both buttons
    $("#join_list").addEventListener("click", joinList);
    $("#clear_form").addEventListener("click", clearForm);

    // set focus on first text box after the form loads
    $("#email_1").focus();
});




















