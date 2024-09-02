"use strict";
$(document).ready(function(){
    //get data from user 
    const currentuser=JSON.parse(localStorage.getItem('currentUser'))||[];
    //check if there is no user want to go back to edituserform
    if(currentuser.length===0){
        $("#EditUserForm").attr('action','LogIn.html').off('submit').submit();
        return;
    }
    
    const users=JSON.parse(localStorage.getItem('users'))||[];
    
    if(users && Array.isArray(users)){
       BindUserComboBox(users);
    }
    //bind the data according to selction
    $("#User").change(function(){
        let selectedEmail=$(this).val();
        let selectedUser= users.find(user=>user.email==selectedEmail);
        if(selectedUser){
            let output=` User Name : ${selectedUser.username}<br> Email Address : ${selectedUser.email}<br> Phone Number : ${selectedUser.PhoneNumber}<br> Password : ${selectedUser.password}<br> Date of Birth : ${selectedUser.DOB}<br> Gender : ${selectedUser.gender}<br> Role : ${selectedUser.role}<br> Security Question : ${selectedUser.securityQuestion}<br> Security Answer : ${selectedUser.securityAnswer}<br> Pin : ${selectedUser.pin}<br>`;
            
        $("#output").html(output);
        }
    });
    //delete the binding user
     $("#EditUserForm").on("submit",function(event){
        event.preventDefault();
        
        let selectedUserEmail=$('#User').val();
        
        let userIndex=users.findIndex(u=>u.email==selectedUserEmail);
        
        if(userIndex!=-1)
        {
            users.splice(userIndex,1);
            BindUserComboBox(users);
            $("#output").html('');
            localStorage.setItem('users',JSON.stringify(users));
        }
    });
    //go back to registereduser
    $("#BackToRegistered").on('click',function(event){
        $("#EditUserForm").attr('action','RegisteredUser.html').off('submit').submit();
    });
    //animate for bigger button
    $(".hover-enlarge").hover(
        function(){
            $(this).stop(true,true).animate(
                {fontSize:"150%",padding:"20px"},200
                );
        },
        function(){
            $(this).stop(true,true).animate(
                {fontSize:"100%",padding: "10px"},200)
        });
});


//Bind ComboBox 
function BindUserComboBox(users){
    $("#User").empty();
    $("#User").append('<option value="">--Select One--</option>');
    users.forEach(user=>{
        const option=$('<option></option>').val(user.email).text(user.email);
        $("#User").append(option);
    });
}












































