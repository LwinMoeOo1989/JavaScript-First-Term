"use strict";

$(document).ready(function(){
    try{
        //check the current user exitsts or not
        const currentuser=JSON.parse(localStorage.getItem('currentUser'))||[];     
        if(currentuser.length===0){
            $("#RegisteruserForm").attr('action','LogIn.html').off('submit').submit();
            return;
        }    
        const users=JSON.parse(localStorage.getItem('users'))||[];
        
        if(users.length>0){
            //show the user into table format
            let outputHtml='<table><tr><th>UserName</th><th>Email</th><th>Phone No</th><th>Password</th><th>DOB</th><th>Gender</th><th>Role</th>';
            // check the user is administrator  or not 
            if(currentuser[0].role=="Administrator"){   
                //if the user is the admin show password, security Q & A and pin filed
                outputHtml+='<th>Security Question</th><th>Security Answer</th><th>Security Pin</th></tr>';    
                users.forEach((user,index) => {
                    outputHtml+=`<tr><td>${user.username}</td><td>${user.email}</td><td>${user.PhoneNumber}</td><td>${user.password}</td><td>${user.DOB}</td><td>${user.gender}</td><td>${user.role}</td><td>${user.securityQuestion}</td><td>${user.securityAnswer}</td><td>${user.pin}</td></tr>`;
               
                });
            } else {
                //if the current user is not the admin hide all the button and hide user password and pin and security Q & A
                $("#RegisterNewUser").hide();
                $("#DeleteUser").hide();
                outputHtml+="</tr>";
                users.forEach((user,index) => {
                     outputHtml+=`<tr><td>${user.username}</td><td>${user.email}</td><td>${user.PhoneNumber}</td><td>${user.password}</td><td>${user.DOB}</td><td>${user.gender}</td><td>${user.role}</td></tr>`;
               
                });
            }
         
             outputHtml+='</table>';
              //bind the html table
            $("#output").html(outputHtml);
        } else{
            $("#output").html('<p>No data found in local storage.</p>');
        }
        
        $("#RegisterNewUser").on('click',function(){
            $("#RegisteruserForm").attr('action','Register.html').off('submit').submit();
        });
        
        $("#DeleteUser").on('click',function(){
            $("#RegisteruserForm").attr('action','DeleteUser.html').off('submit').submit();
        });
        
        $("#BackToLogIn").on('click',function(event){
            event.preventDefault();
            localStorage.removeItem('currentUser');
            $("#RegisteruserForm").attr('action','LogIn.html').off('submit').submit();
            
        });
    } catch(error){
        alert("Error during document ready : ",error);
    }
    
    
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







































































