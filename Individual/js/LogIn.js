"use strict";
//email checking function
function validateEmail(email){
    return String(email)
            .toLowerCase()
            .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
}

$(document).ready(function(){
  
    let imageCache=[];
    $("#sides img").each((index,img) => {
        let tempImage=new Image();
        tempImage.src=$(img).attr("src");
        imageCache[index]=tempImage;
    });
   
    let ImageCounter=0;
    setInterval(() => {
        $("#asideImage").fadeOut(1000,() => {
            ImageCounter=(ImageCounter+1) % imageCache.length;
            const nextImage=imageCache[ImageCounter];
            $("#asideImage").attr("src",nextImage.src).fadeIn(1000);
        });
    },3000);
    
    
    $("#LoginForm").submit(function(event){
        event.preventDefault(); 
        //remove the currentuser 
        localStorage.removeItem('users');
        localStorage.removeItem('currentUser');
        let isValid=true;
        const email=$("#email").val().trim();
        const password=$("#Password").val().trim();
            
        try{
            let users=JSON.parse(localStorage.getItem('users'))||[];
            // first time no user added default user
            if(users.length==0){
                users.push({username: "lwinmoeoose@gmail.com",password: "lwin", securityquestion:"WhatisYourLastName", securityanswer:"test", pin:"123456", DOB:"", email:"lwinmoeoose@gmail.com",gender:"Male",PhoneNumber: "",role:"Administrator"});
                localStorage.setItem('users',JSON.stringify(users));
                localStorage.removeItem('currentUser');
                localStorage.setItem('currentUser',JSON.stringify([{username:"lwinmoeoose@gmail.com",password:"lwin", email:"lwinmoeoose@gmail.com",role:"Administrator"}]));
               
                $("#LoginForm").attr('action','RegisteredUser.html').off('submit').submit();
            }
            else{
                //check email address and password
                let test=validateEmail(email);
                 if(!validateEmail(email)){
                     alert("Please enter valid email address");
                     isValid=false;
                 }
              
                 if(isValid){
                     if(users.length>0){
                         isValid=false;
                         for(let i=0;i<users.length;i++){
                             if(email==users[i].email && password==users[i].password){   
                                localStorage.removeItem('currentUser');
                                localStorage.setItem('currentUser',JSON.stringify([{username:users[i].username,password:users[i].password, email:users[i].email,role:users[i].role}]));
                                $("#LoginForm").attr('action','RegisteredUser.html').off('submit').submit();
                                isValid=true;
                                break;
                            }
                         }
                         if(isValid==false){
                            alert("Email address or Password incorrect.");
                        }
                    }
                }
            }
        } catch(error){
            console.error("Error in login in: " ,error);
            alert("An error occured duing login. Please try again");
        }
   }); 
   
   //Sign Up click go to signup
   
   $("#SignUp").on('click',function(event){
        $("#LoginForm").attr('action','Register.html').off('submit').submit();
    });
   //animate for opacity button
   $(".hover-opacity").hover(function(){
       $(this).stop(true,true).animate({opacity:0.5},200);
   },
   function(){
       $(this).stop(true,true).animate({opacity:1},200);
   })
});

















































































