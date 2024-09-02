"use strict";
$(document).ready(function() {    
    
    //Check the Currnt user exists
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Redirect to login page if not logged in
        window.location.href = './SignIn.html';
        return; 
    }
    //The expected user is only accept only monthly and accept only once so if the user need to edit after one time inserting user need to 
    //delete all the data and read it.
    let userExpectedExpenses = GetExpected().filter(expected => 
        expected.User == currentUser.email &&
        expected.Month == new Date().toLocaleString('default', { month: 'long' }) &&
        expected.Year == new Date().getFullYear()
    );

    if (userExpectedExpenses.length > 0) {
        // Ask the user if they want to replace the existing entry
        if (confirm("An expected expense for this month already exists. Do you want to replace it?")) {
            // Remove existing expenses for the current month and year
            RemoveExistingExpectedExpenses(new Date().toLocaleString('default', { month: 'long' }), new Date().getFullYear());
        }
        else
        {   //Cancel will redirect to the home page.
            window.location.href = './Home.html';
        }
    }
    //Reload the page according to user email so calling the RenderExpected
    RenderExpected();

    //Click Expected function
    $('#Expected').submit(function(event) {
        event.preventDefault(); 

        // Validation for amount
        if (!$('#Amount').val() || $('#Amount').val() <= 0) {
            alert("Please enter a valid amount greater than zero.");
            return;
        }
        // Validation for category fields
        else if (!$('#Categories').val()) {
            alert("Please select a valid Categories.");
            return;
        }
        else {
            AddExpected($('#Amount').val(), $('#Categories').val());//calling the AddExpected to add the expected data monthly line by line
            $('#Amount').val('');
            $('#Categories').val('');
        }
    });
    //add the expected data 
    function AddExpected(Amount, Categories) {
        const currentDate = new Date();
        // add  data according to email, month and Year
        const Expectedexpense = {            
            Categories,
            Amount,
            User: currentUser.email,
            Month: new Date().toLocaleString('default', { month: 'long' }),
            Year: currentDate.getFullYear()
        };
        //get all the expected data group
        let Expectedexpenses = GetExpected();
        Expectedexpenses.push(Expectedexpense);//Added the current data into the group data
        localStorage.setItem('ExpectedExpenses', JSON.stringify(Expectedexpenses));
        RenderExpected();//calling this method show in table 
    }
    //Get the Expected Expense from localStorage
    function GetExpected() {
        const Expected = localStorage.getItem('ExpectedExpenses');
        return Expected ? JSON.parse(Expected) : [];
    }  
    //Binding table  according to user email,month and Year 
    function RenderExpected() {
        const ExpectedExpenses = GetExpected();//get all the expcted data
        const UserExpectedExpenses = ExpectedExpenses.filter(expectedexpense => expectedexpense.User === currentUser.email &&
                                                                expectedexpense.Month == new Date().toLocaleString('default', { month: 'long' }) &&
                                                                expectedexpense.Year == new Date().getFullYear()
        );//Filter the data according to month and year
        $('#ExpectedTableData tbody').empty();//clear the table first
        let total = 0;
        //bind the all the filter data into the table 
        UserExpectedExpenses.forEach((expectedexpense, index) => {
            total += parseFloat(expectedexpense.Amount);
            $('#ExpectedTableData tbody').append(`
                <tr>                   
                    <td>${expectedexpense.Categories}</td>
                    <td>${expectedexpense.Amount}</td>
                    <td>${expectedexpense.Month}</td>
                    <td><button class="delete" data-index="${index}">Delete</button></td>
                </tr>
            `);
        });

        $('#Total-Expected').text(total.toFixed(2));//total 
    }
    
    $('#Expected-Table').on('click', '.delete', function() {
        const index = $(this).data('index');
        let Expected = GetExpected();
        
        // Filter the expenses based on the current user's email
        const userExpected = Expected.filter(Expected => Expected.User == currentUser.email &&
                                                         Expected.Month == new Date().toLocaleString('default', { month: 'long' }) &&
                                                         Expected.Year == new Date().getFullYear()
        );
        
        // Find the original index in the main expenses array
        const ExpectedToRemove = userExpected[index];
        const originalIndex = Expected.findIndex(Expected => 
            Expected.User == currentUser.email && 
            Expected.Amount == ExpectedToRemove.Amount &&
            Expected.Categories == ExpectedToRemove.Categories &&
            Expected.Month == ExpectedToRemove.Month &&
            Expected.Year == ExpectedToRemove.Year 
        );
        
        // Remove the expense from the main expenses array
        if (originalIndex !== -1) {
            Expected.splice(originalIndex, 1);
        }
        
        // Update localStorage with the modified expenses array
        localStorage.setItem('ExpectedExpenses', JSON.stringify(Expected));
        
        // Re-render the expenses table
        RenderExpected();
    });

    
    $('#ExpectedTableData').on('click', '.delete', function() {
        // Get the selected row
        const selectedRow = $(this).closest('tr');
    
        // Extract data from the selected row 
        const selectedCategory = selectedRow.find('td:eq(0)').text();
        const selectedAmount = parseFloat(selectedRow.find('td:eq(1)').text());
        const selectedMonth = selectedRow.find('td:eq(2)').text();
        //get the expense data
        let expenses = GetExpected();
    
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
        

         // Filter the expenses based on the current user's email
         const userExpected = Expected.filter(Expected => Expected.User == currentUser.email &&
                                                          Expected.Categories == selectedCategory &&
                                                          Expected.Amount == selectedAmount &&
                                                          Expected.Month == new Date().toLocaleString('default', { month: 'long' }) &&
                                                          Expected.Year == new Date().getFullYear());

        // Remove the expense from the main expenses array
        if (originalIndex !== -1) {
            expenses.splice(originalIndex, 1);
        }
    
        // Update localStorage with the modified expenses array
        localStorage.setItem('DailyExpenses', JSON.stringify(expenses));
        
        // Re-render the expenses table
        renderExpenses();
    });
    

    //RemoveExistingExpenses according to user,month,year
    function RemoveExistingExpectedExpenses(month, year) {
        let ExpectedExpenses = GetExpected();
        //get the Expected Expense which are not same with current month and year
        ExpectedExpenses = ExpectedExpenses.filter(expectedexpense => 
            !(expectedexpense.User === currentUser.email && expectedexpense.Month == month && expectedexpense.Year == year)
        );
        //Save only the thing which are not same with current month and year
        localStorage.setItem('ExpectedExpenses', JSON.stringify(ExpectedExpenses));
    }
});