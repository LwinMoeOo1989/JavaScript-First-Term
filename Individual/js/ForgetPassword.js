"use strict";
$(document).ready(function(){

   let users=JSON.parse(localStorage.getItem('users'))||[];
   
   /*Show and hide the Security Question According to user choice*/
   $('input[name="verificationMethod"]').change( function() {
     if($(this).val()=="securityQuestion"){
         //if the verification type is securityquestion show security question, answer but hide the pin
        $("#SecurityQuestionField").show();
        $("#SecurityAnswerField").show();
        $("#pinInputClass").hide();
        $("#NewPasswordClass").hide();
        $("#Check").show();
        $("#ChangePassword").hide();
     } else if($(this).val()=="pin"){
        //if the verification type is securityquestion hide security question, answer but show the pin 
        $("#SecurityQuestionField").hide();
        $("#SecurityAnswerField").hide();
        $("#pinInputClass").show();
        $("#NewPasswordClass").hide();
        $("#Check").show();
        $("#ChangePassword").hide();
     } 
   });
   
    //Only show the pin and hide the button and show password field and save button
    $("#Check").on('click',function(event){
        event.preventDefault();
        const email=$('#email').val();
        const verificationMethod=$('input[name="verificationMethod"]:checked').val();
        
        try{
            let userIndex=users.findIndex(u=>u.email==email);
               
            if(userIndex==-1){
                alert("User not found");
                return;
            }
            let user=users[userIndex];
            // there are two verification method  security Question or Pin if it is security qusetion need to choose questioon and answer 
            if(verificationMethod=="securityQuestion"){
                const securityQuestion=$("#SecurityQuesition").val();
                const securityAnswer=$("#securityAnswer").val();
                //Security question checking
                 if(user.securityQuestion==securityQuestion &&
                    user.securityAnswer==securityAnswer){
                        $("#NewPasswordClass").show();
                        $("#ChangePassword").show();
                        $("#Check").hide();
                    }
                else{
                    alert("Invalid Question and Answer");
                    return;
                }
            }
            else{
                //security answer checking
                const Pin=$("#pinInput").val();
                if(user.pin==Pin){
                        $("#NewPasswordClass").show();
                        $("#ChangePassword").show();
                        $("#Check").hide();
                }
                else{
                    alert("Invalid PIN");
                    return;
                }
            }
        }catch (error){
            alert("An error occured during verification. Please try again.");
        }
    });
    
    
    
    $("#forgotPasswordForm").on("submit",function(event){
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
            $("#forgotPasswordForm").attr('action','RegisteredUser.html').off('submit').submit();
            }
            else{
            alert("The password must be greater than or equal to 5 characters");
            }
        }catch(error){
            console.error("Error updating password:",error);
            alert("An error occured while updating the password. Please try again.");
        }
     });
     
    $("#Back").on('click',function(event){
        $("#forgotPasswordForm").attr('action','RegisteredUser.html').off('submit').submit();
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
     //animate for opacity button
    $(".hover-opacity").hover(
        function(){
             $(this).stop(true,true).animate({opacity:0.5},200);
        },
        function(){
             $(this).stop(true,true).animate({opacity:1},200);
    
    });
});




































































































