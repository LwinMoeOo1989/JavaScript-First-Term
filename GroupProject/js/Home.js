"use strict";
document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById('Signup-btn');
    const signInButton = document.getElementById('signin-btn');
    const addExpensesButton = document.getElementById('Daily_Expense');
    const addExpectedExpensesButton = document.getElementById('Expected_Expense');
    const signOutButton = document.getElementById('signout-btn');

    // Check if the user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // User is logged in
        signUpButton.style.display = 'none';
        signInButton.style.display = 'none';
        addExpensesButton.style.display = 'inline-block';
        addExpectedExpensesButton.style.display = 'inline-block';
        signOutButton.style.display = 'inline-block';

        // Display welcome message with user's name
        const mainTextContainer = document.querySelector('.main-text-container p');
        mainTextContainer.innerHTML = `Welcome, ${currentUser.username}!<br><br>You can add your expenses and track them down using our budget buddy.`;

        // Handle Add Expenses button click
        addExpensesButton.addEventListener('click', function() {
            window.location.href = './DailyExpense.html';  // Replace with the actual page where users can add expenses
        });

        // Handle Add Expected Expenses button click
        addExpectedExpensesButton.addEventListener('click', function() {
            window.location.href = './MonthlyExpected.html';  // Replace with the actual page where users can add expenses
        });

        // Handle Sign Out button click
        signOutButton.addEventListener('click', function() {
            localStorage.removeItem('currentUser');  // Remove the user from local storage
            window.location.href = './Home.html';    // Reload the home page
        });
    } else { 
        // User is not logged in
        signUpButton.style.display = 'inline-block';
        signInButton.style.display = 'inline-block';
        addExpensesButton.style.display = 'none';
        addExpectedExpensesButton.style.display = 'none';
        signOutButton.style.display = 'none';

        // Handle Sign Up button click
        signUpButton.addEventListener('click', function() {
            window.location.href = './SignUp.html';
        });

        // Handle Sign In button click
        signInButton.addEventListener('click', function() {
            window.location.href = './SignIn.html';
        });
    }

    const ExpectedExpensesData = JSON.parse(localStorage.getItem('ExpectedExpenses')) || [];
  
    const filteredData = ExpectedExpensesData.filter(item => 
        item.User === currentUser.email &&
        item.Month === new Date().toLocaleString('default', { month: 'long' }) && 
        item.Year === new Date().getFullYear()
    );
    // Get unique categories from the filtered data
    const categories = [...new Set(filteredData.map(item => item.Categories))];

    // Calculate the total amount for each category
    const amounts = categories.map(Categories => {
        return filteredData
            .filter(item => item.Categories === Categories)
            .reduce((total, item) => total + parseFloat(item.Amount), 0);
    });    
    // Create the donut chart
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut', //'doughnut'
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'left',
                },
                title: {
                    display: true,
                    text: 'Expenses by Category',
                    color: '#fff'//color of the font for title
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.forEach(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                    color: '#fff',//color of the font for datlabels
                }
            },
            events: ['mousemove']  // Disable click events to prevent interaction
        },
        plugins: [ChartDataLabels]
    });
});