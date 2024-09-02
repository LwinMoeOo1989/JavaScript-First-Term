/* Following references are used in this Java script code
(i) web development-Java Script course -term 1- Ch.9-Example-Slide-show-fadinf1
(ii) https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/ 
(iii) https://stackoverflow.com/questions/68911279/register-user-using-json-and-local-storage

*/

"use strict";
// the following ling will execute first once page loaded in browser
document.addEventListener("DOMContentLoaded",() =>{ 

 //Lwin Moe Oo Code       
//validate user email,password, phone number, secruity pin and date of birth
        
    function validateUser(){
            try{
                if(!validateEmail($("#email").val().trim())){
                    $("#email").focus();
                    alert("Please enter valid Email address");
                    return false;
                }
                else if($("#password").val().length<5){
                    $("#password").focus();
                    alert("The password must be greater than or equal to 5 characters");
                    return false;
                }
                else if($("#password").val()!=$("#confirm_password").val()){
                    $("#confirm_password").focus();
                    alert("Password and Confirm Password should be match");
                    return false;
                }
                else if(!isValidatePhoneNumber($("#contact_number").val())){
                    alert("Please enter valid Phone Number (999-999-9999)");
                    $("#contact_number").focus();
                    return false;
                }
                else if(isNaN($("#pinInput").val().trim())){
                    alert("Security Pin only accept Numbers.");
                    $("#pinInput").focus();
                    return false;
                }
                else if(!validateDOB($("#dob").val())){
                    alert("DOB can't be greater than today's date");
                    $("#DOB").focus();
                    return false;
                }
                else if($("#pinInput").val().length<5){
                    $("#pinInput").focus();
                    alert("The Security Pin must be greater than or equal to 5 characters");
                    return false;
                }
                else{
                    return true;
                }
            }catch(error){
                return false;
            }
        }

    // handle registration/sign up form submission(Darshankumar)     
    $('#SignUp').on('submit',function(event){
        // prevent the default form submission
        event.preventDefault();
        // get the value of username,email and password and all other sign up related fields        
        let check= validateUser();
        if(check==false){
            return;   
        }

        let username=$('#username').val();
        let email=$('#email').val();
        let password=$('#password').val();
        let confirm_password=$('#confirm_password').val();
        let contact_number=$('#contact_number').val();
        let dob=$('#dob').val();
        let SecurityQuestion=$('#SecurityQuestion').val();
        let securityAnswer=$('#securityAnswer').val();
        let pinInput=$('#pinInput').val();
        let gender=$('#gender').val();
            
            // if both email and password are entered
        if(username && email && password)
        {
            // get the list of users from local storage
            let users=JSON.parse(localStorage.getItem('users')) || [];
            // check if user already exists
            let userExists=users.some(user=>user.email===email);
            if(userExists)
            {                
                alert('user already registered');                
            }
            else
            {
                // add a new user to the list and save to local storage
                users.push({username:username,email:email,password:password,confirm_password:confirm_password,contact_number:contact_number,dob:dob,SecurityQuestion:SecurityQuestion,securityAnswer:securityAnswer,pinInput:pinInput,gender:gender});
                localStorage.setItem('users',JSON.stringify(users));          
                alert('User Successfully Register');           
                // Redirect to home page after successful login
                window.location.href = './Home.html';                
            }
        }
        else
        {
             alert('fill in all fields');
        }
    });   
});

//validate email function(Lwin Moe Oo)
function validateEmail(email){
    try{
        return String(email)
                .toLowerCase()
                .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)*[a-zA-Z]{2,}))$/
                );

    } catch(error){
        alert("Error validating email: ",error);
        return false;
    }
}
//validate phone number(Lwin Moe Oo)
function isValidatePhoneNumber(phoneNumber){
    try{
        const phoneRegex=/^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phoneNumber);

        
    }catch(error){
        console.error("Error validating phone number : ",error);
        return false;
    }
    
}
//validate DOB (Lwin Moe Oo)
function validateDOB(dob){
    try{
        const today=new Date().toISOString().split('T')[0];
        return dob<=today;
    }catch(error){
        console.error("Error validating date of birth : ",error);
        return false;
    }
}