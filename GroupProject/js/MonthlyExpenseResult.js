"use strict";
document.addEventListener('DOMContentLoaded', function () {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // Redirect to login page if not logged in
        window.location.href = './SignIn.html';
        return; 
    }

    const ExpectedExpensesData = JSON.parse(localStorage.getItem('ExpectedExpenses')) || [];
    const ExpensesData = JSON.parse(localStorage.getItem('DailyExpenses')) || [];

    // Filter expected expenses data based on the current user and current month and year
    const filteredExpectedExpenses = ExpectedExpensesData.filter(item => 
        item.User === currentUser.email &&
        item.Month === new Date().toLocaleString('default', { month: 'long' }) && 
        item.Year === new Date().getFullYear()
    );
    // Filter expenses data based on the current user and current month and year
    const filteredExpenses = ExpensesData.filter(item => 
        item.User === currentUser.email &&
        item.Month === new Date().toLocaleString('default', { month: 'long' }) && 
        item.Year === new Date().getFullYear()
    );

    // Get unique categories from the expected expenses
    const categories = [...new Set([
        ...filteredExpectedExpenses.map(item => item.Categories),
        ...filteredExpenses.map(item => item.Categories)
    ])];


    // Calculate the total amount for each category in expected expenses
    const expectedAmounts = categories.map(category => {
        return filteredExpectedExpenses
            .filter(item => item.Categories === category)
            .reduce((total, item) => total + parseFloat(item.Amount), 0);
    });


    // Calculate the total amount for each category in actual expenses
    const actualAmounts = categories.map(category => {
        return filteredExpenses
            .filter(item => item.Categories === category)
            .reduce((total, item) => total + parseFloat(item.Amount), 0);
    });

    //showing the picture 
    const ctx = document.getElementById('ds_expense_charts').getContext('2d');
    let chart;
    //i have added this code function to draw graph
    function ds_updateGraph(type) {
        if (chart) {
            chart.destroy();
        }
        //this code will create new chart with different type: I have added bar chart,line graph and pie    
        chart = new Chart(ctx, {
            type: type,
            data: {
                labels: categories,
                datasets: [
                    {
                        label: 'Expected Expenses',//label for Expected Expenses 
                        data: expectedAmounts, //Expected amount
                        backgroundColor: '#2D3E50',//bg color
                        borderColor: 'rgba(75, 192, 192, 1)',//border color
                        borderWidth: 1//border width
                    },
                    {
                        label: 'Actual Expenses',//label for Actual Expenses 
                        data: actualAmounts, //Actual amount
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',//bg color
                        borderColor: 'rgba(255, 99, 132, 1)',//border color
                        borderWidth: 1//border width
                    }
                ]
            },
            options: {
                responsive: true,//this code is to make chart responsive for diff screens
                scales: {
                    y: {
                        beginAtZero: true// this code is to start chart with zero initially
                    }
                }
            }
        });
    }
    //this code will update the chart when user will click on button "update"
    document.getElementById('ds_updateGraph').addEventListener('click', function () {
        const selectedGraphType = document.getElementById('graphType').value;
        ds_updateGraph(selectedGraphType);
    });
    //this will start with bar chart when page will load
    ds_updateGraph('bar');
});