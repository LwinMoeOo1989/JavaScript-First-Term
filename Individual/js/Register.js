"use strict";
//generate random function according to given lenght
function generateRandomPassword(length){
    try{
        const charset="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password="";
        for(let i=0;i<length;i++)
        {
            const randomIndex=Math.floor(Math.random()*charset.length);
            password+=charset[randomIndex];
        }
        return password;
    }catch(error){
        alert("Error generating password: ",error);
        return null;
    }
    
}
//validate email function
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
//validate phone number
function isValidatePhoneNumber(phoneNumber){
    try{
        const phoneRegex=/^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phoneNumber);

        
    }catch(error){
        console.error("Error validating phone number : ",error);
        return false;
    }
    
}
//validate DOB
function validateDOB(dob){
    try{
        const today=new Date().toISOString().split('T')[0];
        return dob<=today;
    }catch(error){
        console.error("Error validating date of birth : ",error);
        return false;
    }
}

//validate user email,password, phone number, secruity pin and date of birth
function validateUser(){
    try{
        if(!validateEmail($("#Email").val().trim())){
            $("#Email").focus();
            alert("Please enter valid Email address");
            return false;
        }
        else if($("#password").val().length<5){
            $("#password").focus();
            alert("The password must be greater than or equal to 5 characters");
            return false;
        }
        else if($("#password").val()!=$("#confirmpassword").val()){
            $("#confirmpassword").focus();
            alert("Password and Confirm Password should be match");
            return false;
        }
        else if(!isValidatePhoneNumber($("#PhoneNo").val())){
            alert("Please enter valid Phone Number (999-999-9999)");
            $("#PhoneNo").focus();
            return false;
        }
        else if(isNaN($("#SecurityPin").val().trim())){
            alert("Security Pin only accept Numbers.");
            $("#SecurityPin").focus();
            return false;
        }
        else if(!validateDOB($("#DOB").val())){
            alert("DOB can't be greater than today's date");
            $("#DOB").focus();
            return false;
        }
        else if($("#SecurityPin").val().length<5){
            $("#SecurityPin").focus();
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


//generate password click added into both password and confirm password
$("#generatePassword").on('click',function(){
   const password= generateRandomPassword(24);
   $("#password").val(password);
   $("#confirmpassword").val(password);
});
//clear function
$("#Clear").on('click',function(){
    $("#register")[0].reset();
});


$("#Back").on('click',function(){
    $("#register").attr('action','RegisteredUser.html').off('submit').submit();
});

$(document).ready(function(){
   try{
        const currentuser=JSON.parse(localStorage.getItem('currentUser'))? JSON.parse(localStorage.getItem('currentUser')):null;
          
        if(currentuser==null){
            const roleSelect=$('#Role');
            const adminOption=roleSelect.find('option[value="Administrator"]');
               
            if(adminOption.length>0){
                adminOption.remove();
            }
        }
        //submit button for register 
        $("#register").on("submit",function(event){
            event.preventDefault();
            let check= validateUser();
            if(check==false){
                return;   
            }
            const ExistingUserData=JSON.parse(localStorage.getItem('users'))||[];
            //get the userdata
            const UserData={
                username: $("#username").val().trim(),
                email: $("#Email").val().trim(),
                password:$("#password").val().trim(),
                PhoneNumber: $("#PhoneNo").val().trim(),
                DOB: $("#DOB").val(),
                securityQuestion:$("#SecurityQuesition").val(),
                securityAnswer:$("#SecurityAnswer").val().trim(),
                pin:$("#SecurityPin").val().trim(),
                role:$("#Role").val(),
                gender:$('input[name="gender"]').filter(':checked').val()
            };
            //do not accept duplicate value 
            let userIndex=ExistingUserData.findIndex(u=>u.email==UserData.email || 
                                                        u.PhoneNumber==UserData.PhoneNumber);
            if(userIndex>-1){
                alert("Email address or Phone number already exists");
                return;
            }
            ExistingUserData.push(UserData);
            //if there is no user exists enter the user into the local storage
            localStorage.setItem('users',JSON.stringify(ExistingUserData));
            
            alert('User Registered Successful!');
            $("#register").attr('action','RegisteredUser.html').off('submit').submit();
        });
        //clear all the text box
        $("#Clear").on('click',function(event){
            event.preventDefault();
            $("#username").val("");
            $("#Email").val("");
            $("#password").val("");
            $("#DOB").val("");//datefield
            $('input[name="gender"]').prop('checked',false);
            $("#SecurityQuesition").val("0");
            $("#SecurityAnswer").val("");
            $("#SecurityPin").val("");
            $("#confirmpassword").val("");
            $("#Role").val("0");
            $("#PhoneNo").val("");
        });    
   } catch(error){
       alert("Error during document ready : ",error);
   };
   //animate for opacity button
    $(".hover-opacity").hover(
        function(){
            $(this).stop(true,true).animate({opacity:0.5},200);
        },
        function(){
            $(this).stop(true,true).animate({opacity:1},200);
        });
});

















































































































