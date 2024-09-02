"use strict";
$(document).ready(function(){
    localStorage.removeItem('currentUser');
    // Handle the login/sign in form submission    
    $('#SignIn').on('submit',function(event){
        // prevent the default form submission
        event.preventDefault();
        let username=$('#username').val();
        let email=$('#email').val();
        let password=$('#password').val();
        // find the user with enetered email and password
        if(username || email && password)
        {
            let users=JSON.parse(localStorage.getItem('users')) || [];
            let user=users.find(user=>user.email===email  && user.password===password);
            if(user)
            {
                alert(`Sign In Successful, Welcome ${user.username}!`);
            // Set the current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Redirect to home page after successful login
                window.location.href = './Home.html';
            }
            else
            {
                alert('Invalid email or password');
            }
        }
        else
        {
            alert('fill in all fields');
        }
    });         
});