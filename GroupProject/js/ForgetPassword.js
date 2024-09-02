"use strict";
$(document).ready(function(){
    //opened panel when the user clicks on it and if the panel is opened, it closed
    $("#accordion").accordion({  
        collapsible:true,
        active:false,
        heightStyle:"content"
    });

    //Get all the users from Local Storage
    let users=JSON.parse(localStorage.getItem('users'))||[];
 
    //Only show the pin and hide the button and show password field and save button
    $("#Check").on('click',function(event){
        event.preventDefault();        
        const email=$('#email').val();      
        try{
            //Validate the user email with the user
            let userIndex=users.findIndex(u=>u.email==email);              
            if(userIndex==-1){
                alert("User not found");
                return;
            }
      
            let user=users[userIndex];
            // there are two verification method according to the tag
            // if tag is security Question or Pin if it is security qusetion need to choose questioon and answer 
            // or if the user choose the pin need to enter the pin and 
            const securityQuestion=$("#SecurityQuesition").val();
            const securityAnswer=$("#securityAnswer").val();
            const Pin=$("#pinInput").val();               
                //Security question checking
            if((user.SecurityQuestion==securityQuestion &&
                user.securityAnswer==securityAnswer)||(user.pinInput==Pin)){
                    $("#NewPasswordClass").show();
                    $("#ChangePassword").show();
                    $("#Check").hide();
                }
            else{
                alert("Invalid Verification");
                    return;
                }                    
            
        }catch (error){
            alert("An error occured during verification. Please try again.");
        }
    });  
    //After security question and answer or pin is correct
    $("#ForgotPassword").on("submit",function(event){
        //if the security pin or question is correct change the password
        event.preventDefault();       
        const currentemail=$('#email').val();
        const CreatePassword=$("#newPassword").val();        
        try{
            if(CreatePassword!="" && CreatePassword.length>5){
                let userIndex=users.findIndex(u=>u.email==currentemail);            
            if(userIndex!=-1){
                users[userIndex].password =CreatePassword;
            }
            localStorage.setItem('users',JSON.stringify(users));            
            alert("Password Changed");

            $("#ForgotPassword").attr('action','./Home.html').off('submit').submit();
            }
            else{
            alert("The password must be greater than or equal to 5 characters");
            }
        }catch(error){
            console.error("Error updating password:",error);
            alert("An error occured while updating the password. Please try again.");
        }
     });
    
    //BackButton rediect
    $("#Back").on('click',function(event){
        $("#ForgotPassword").attr('action','./SignIn.html').off('submit').submit();
    });
    
    //clear button function
    $("#Clear").on('click',function(event){
        event.preventDefault();
        $("#email").val("");
        $('input[name="verificationMethod"]').prop('checked',false);
        $("#SecurityQuesition").val("0");
        $("#securityAnswer").val("");
        $("#pinInput").val("");
        $("#newPassword").val("");
        $("#SecurityQuestionField").hide();
        $("#SecurityAnswerField").hide();
        $("#pinInputClass").hide();
        $("#NewPasswordClass").hide();        
    });
   
    //animate for bigger button
    $(".hover-enlarge").hover(
        function() {
            $(this).stop(true,true).animate(
                { fontSize:"150%",padding:"20px"},200
                );  
        },
        function(){
            $(this).stop(true,true).animate(
                {fontSize:"100%",padding:"10px"},200);
        }
    );
});