// The code for the chart is wrapped inside a function
// that automatically resizes the chart
// function makeResponsive() {


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width =855 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data
// d3.csv("../data/data.csv", function(healthData) {

d3.csv("../data/data.csv").then(function(healthData) {

// change data from strings
    healthData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      console.log(data.healthcare)
      console.log(data.poverty)
    });
    
// // Add X axis
var x = d3.scaleLinear()
.domain([0, 26])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 28])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));


var xLinearScale = d3.scaleLinear()
.domain([0, d3.max(healthData, d => d.poverty)])
.range([0, width]);
// console.log(xLinearScale)

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(healthData, d => d.healthcare)])
.range([height, 0]);

var tooltipsState = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var dataPoints = tooltipsState.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "6")
  .attr("fill", "blue")
  .attr("opacity", ".6")
  .text (function(d) {
    return d.abbr;});

 // text label for the y axis
 svg.append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 0 - margin.left)
 .attr("x",0 - (height / 4))
 .attr("dy", "1em")
 .style("text-anchor", "middle")
 .text("Healthcare");      

 // text label for the x axis
 svg.append("text")             
 .attr("transform",
       "translate(" + (width/2) + " ," + 
                      (height + margin.top + 25) + ")")
 .style("text-anchor", "middle")
 .text("In Poverty %");




    })