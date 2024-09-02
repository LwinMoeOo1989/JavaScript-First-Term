"use strict";



const $=selector=>document.querySelector(selector);

const region1 = [1540, 1130, 1580, 1105];
const region2 = [2010, 1168, 2305, 4102];
const region3 = [2450, 1847, 2710, 2391];
const region4 = [1845, 1491, 1284, 1575];
const region5 = [2120, 1767, 1599, 3888];

//4. Write the code for summing the quarterly sales for each the five regions [Start]
const CalculateQuarter=(quater) =>{
    let Quartertotal=region1[quater]+region2[quater]+region3[quater]+region4[quater]+region5[quater];
    return Quartertotal;
};
//looping to produce quarter
const QuarterSalesResults=[];
for(let i=0 ;i < 4; i++)
{
    QuarterSalesResults.push("Q"+i+": $"+CalculateQuarter(i));
}
//4. Write the code for summing the quarterly sales for each the five regions [End]

//5. Write the code for getting and displaying the regional sales data.[START]
const CalculateRegion=(Tempregion)=>{
  let TempSales_Region=Tempregion[0]+Tempregion[1]+Tempregion[2]+Tempregion[3];
  return TempSales_Region;
};

const SalesRegionresult1="Region 1: $"+CalculateRegion(region1);
const SalesRegionresult2="Region 2: $"+CalculateRegion(region2);
const SalesRegionresult3="Region 3: $"+CalculateRegion(region3);
const SalesRegionresult4="Region 4: $"+CalculateRegion(region4);
const SalesRegionresult5="Region 5: $"+CalculateRegion(region5);
//5. Write the code for getting and displaying the regional sales data.[END]


//6. Write the code for getting and displaying the total sales data.[START]
let Sales_Total= CalculateRegion(region1)+CalculateRegion(region2)+CalculateRegion(region3)+CalculateRegion(region4)+CalculateRegion(region5);
//6. Write the code for getting and displaying the total sales data.[END]

//4. Write the code for summing the quarterly sales for each the five regions and displaying them on the page with the document.write() method.
//To do that, use an <h2> tag for each header and a <br> tag for a line break at the end of each line of sales data. [START]
const html = `<h2> Sales By Quarter </h2>
             ${QuarterSalesResults[0]}<br>
             ${QuarterSalesResults[1]}<br>
             ${QuarterSalesResults[2]}<br>
             ${QuarterSalesResults[3]}<br><br>
            <h2> Sales By Region </h2>
              ${SalesRegionresult1}<br>
              ${SalesRegionresult2}<br>
              ${SalesRegionresult3}<br>
              ${SalesRegionresult4}<br>
              ${SalesRegionresult5}<br><br>
             <h2>Total Sales</h2>
             $${Sales_Total}<br><br>`;
document.write(html);
//4. Write the code for summing the quarterly sales for each the five regions and displaying them on the page with the document.write() method.
//To do that, use an <h2> tag for each header and a <br> tag for a line break at the end of each line of sales data. [END]







































