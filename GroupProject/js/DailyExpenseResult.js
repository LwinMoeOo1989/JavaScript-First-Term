

"use strict";
$(document).ready(function() {
    //Get currentUser and check if there is currentUser will rediect to SignIn
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Redirect to login page if not logged in
        window.location.href = './SignIn.html';
        return; 
    }

    // jQuery UI sortable function
    $(function() {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
    });

    //Get Local Storage Data
    const dailyExpensesData = JSON.parse(localStorage.getItem('DailyExpenses')) || [];
    //Filter the data by Date,Month and Year from DailyExpenses
    const filteredData = dailyExpensesData.filter(item => 
        item.User=currentUser &&
        item.Day ==  new Date().getDate() && 
        item.Month == new Date().toLocaleString('default', { month: 'long' }) && 
        item.Year == new Date().getFullYear()
    );

    //Group the data to show according to Categorires
    const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.Categories]) {
            acc[item.Categories] = [];
        }
        acc[item.Categories].push(item);
        return acc;
    }, {});

    // Append data to respective categories to show the details  in tag
    for (const [category, items] of Object.entries(groupedData)) {
        items.forEach(item => {
            const htmlOutput = `Description: ${item.Description} <br> Amount: ${item.Amount} <br><br>`;
            switch (category) {
                case "Food":
                    $("#outputFood").append(htmlOutput);
                    break;
                case "Transportation":
                    $("#outputTransportation").append(htmlOutput);
                    break;
                case "Utilities":
                    $("#outputUtilities").append(htmlOutput);
                    break;
                case "Saving":
                    $("#outputSaving").append(htmlOutput);
                    break;
                case "Debt":
                    $("#outputDebt").append(htmlOutput);
                    break;
                case "Health":
                    $("#outputHealth").append(htmlOutput);
                    break;
                case "Miscellaneous":
                    $("#outputMiscellaneous").append(htmlOutput);
                    break;
            }
        });
    } 

    // Get unique categories from the filtereddata
    const categories = [...new Set(filteredData.map(item => item.Categories))];

    // Calculate the totalamount of daily expenses for each category
    const amounts = categories.map(Categories => {
        return filteredData
            .filter(item => item.Categories == Categories)
            .reduce((total, item) => total + parseFloat(item.Amount), 0);
    });  
   
    // Create the pie chart
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: [
                    'rgba(255, 99, 132,1)',
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
                    text: 'Expenses by Category'
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
                }
            },
            onClick: (e) => {//prevent user from clicking label
                e.preventDefault();
                e.stopPropagation();
            },
            events: ['mousemove']
        },
        plugins: [ChartDataLabels]
    });
});