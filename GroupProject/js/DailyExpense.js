"use strict";
$(document).ready(function() {    

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Redirect to login page if not logged in
        window.location.href = './SignIn.html';
        return; 
    }

    let userExpenses = getExpenses().filter(expense => 
        expense.User == currentUser.email &&
        expense.Day == new Date().getDate() &&
        expense.Month == new Date().toLocaleString('default', { month: 'long' }) &&
        expense.Year == new Date().getFullYear()
    );

    if (userExpenses.length > 0) {
        // Ask the user if they want to replace the existing entry
        if (confirm("An expected expense for this month already exists. Do you want to replace it?")) {
            // Remove existing expenses for the current month and year
            RemoveExistingExpenses(new Date().getDate() ,
            new Date().toLocaleString('default', { month: 'long' }), new Date().getFullYear());
        }
        else
        {   //redirect
            window.location.href = './Home.html';
        }
    }

    renderExpenses(); 

    $('#expense-form').submit(function(event) {
        event.preventDefault(); 

        // Validation for amount
        if (!$('#Amount').val() || $('#Amount').val() <= 0) {
            alert("Please enter a valid amount greater than zero.");
            return;
        }

        // Validation for category fields
        else if (!$('#Categories').val()) {
            alert("Please select a valid category.");
            return;
        }

        else {
            addExpense($('#Amount').val(), $('#Categories').val(),  $('#Description').val());
            $('#Amount').val('');
            $('#Description').val('');
            $('#Categories').val('');
        }
    });

    function addExpense(Amount, Categories, Description) {
        const currentDate = new Date();
        const expense = {
            Amount,
            Categories,
            Description,
            User: currentUser.email,
            Day:  currentDate.getDate(),
            Month: new Date().toLocaleString('default', { month: 'long' }),
            Year: currentDate.getFullYear()
        };

        let expenses = getExpenses();
        expenses.push(expense);
        localStorage.setItem('DailyExpenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function getExpenses() {
        const expenses = localStorage.getItem('DailyExpenses');
        return expenses ? JSON.parse(expenses) : [];
    }

    function renderExpenses() {
        const expenses = getExpenses();
        const userExpenses = expenses.filter(expense => expense.User == currentUser.email &&
                                                        expense.Day == new Date().getDate() &&
                                                        expense.Month == new Date().toLocaleString('default', { month: 'long' }) &&
                                                        expense.Year == new Date().getFullYear());
        $('#expense-table tbody').empty();
        let total = 0;

        userExpenses.forEach((expense, index) => {
            total += parseFloat(expense.Amount);
            $('#expense-table tbody').append(`
                <tr>                   
                    <td>${expense.Categories}</td>
                    <td>${expense.Description}</td>
                    <td>${expense.Amount}</td>
                    <td>${expense.Month}</td>
                    <td><button class="delete" data-index="${index}">Delete</button></td>
                </tr>
            `);
        });

        $('#total-expenses').text(total.toFixed(2));
    }

    $('#expense-table').on('click', '.delete', function() {
        // Get the selected row
        const selectedRow = $(this).closest('tr');
    
        // Extract data from the selected row
        const selectedCategory = selectedRow.find('td:eq(0)').text();
        const selectedDescription = selectedRow.find('td:eq(1)').text();
        const selectedAmount = parseFloat(selectedRow.find('td:eq(2)').text());
        const selectedMonth = selectedRow.find('td:eq(3)').text();
        //get the expense data
        let expenses = getExpenses();
    
        // Find the expense in the array that matches the data from the selected row
        const originalIndex = expenses.findIndex(expense => 
            expense.User == currentUser.email && 
            expense.Categories == selectedCategory &&
            expense.Description == selectedDescription &&
            parseFloat(expense.Amount) == selectedAmount &&
            expense.Month == selectedMonth &&
            expense.Day == new Date().getDate() &&
            expense.Year == new Date().getFullYear()
        );
    
        // Remove the expense from the main expenses array
        if (originalIndex !== -1) {
            expenses.splice(originalIndex, 1);
        }
    
        // Update localStorage with the modified expenses array
        localStorage.setItem('DailyExpenses', JSON.stringify(expenses));
        
        // Re-render the expenses table
        renderExpenses();
    });

    function RemoveExistingExpenses(day, month, year) {
        let expenses = getExpenses();
        expenses = expenses.filter(expense => 
            !(expense.User == currentUser.email && 
              expense.Day == day && 
              expense.Month == month && 
              expense.Year == year)
        );
       
        localStorage.setItem('DailyExpenses', JSON.stringify(expenses));
    }

    $("#showresult").on('click',function(event){
        window.location.href = './DailyExpenseResult.html';
    });   

});