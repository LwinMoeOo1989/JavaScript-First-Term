"use strict";
function isNotNumber(value) {
    return !/^\d+$/.test(value);
}

let score1;
do {
    score1 = parseInt(prompt("Enter test score 1"));
    if (isNotNumber(score1)) {
        alert("The input is not a valid number. Please try again.");
    }
} while (isNotNumber(score1));

let score2;
do {
    score2 = parseInt(prompt("Enter test score 2"));
    if (isNotNumber(score2)) {
        alert("The input is not a valid number. Please try again.");
    }
} while (isNotNumber(score2));

let score3;
do {
    score3 = parseInt(prompt("Enter test score 3"));
    if (isNotNumber(score3)) {
        alert("The input is not a valid number. Please try again.");
    }
} while (isNotNumber(score3));

//3. Modify the application so it provides for a fourth test score.[START]
let score4;
do {
    score4 = parseInt(prompt("Enter test score 4"));
    if (isNotNumber(score4)) {
        alert("The input is not a valid number. Please try again.");
    }
} while (isNotNumber(score4));
//3. Modify the application so it provides for a fourth test score.[END]

const total = score1 + score2 + score3+ score4;
// calculate the average
const average = parseInt(total/4);
//3. Modify the application so it provides for a fourth test score.[END]

/*4. Modify the application so it displays the results in a dialog box 
    by using alert() method like the one above, as well as in the browser page 
    after the dialog box is closed.[START]*/
alert(`Score 1=${score1}\nScore 2=${score2}\nScore 3=${score3}\nScore 4=${score4}\n\nAverage score=${average}`);    
/*4. Modify the application so it displays the results in a dialog box 
    by using alert() method like the one above, as well as in the browser page 
    after the dialog box is closed.[END]*/    

const html = `<p>Score 1 = ${score1}</p>
    <p>Score 2 = ${score2}</p>
    <p>Score 3 = ${score3}</p>
      <p>Score 4 = ${score4}</p>
      
    <p>Average score = ${average}</p>`;
document.write(html);














