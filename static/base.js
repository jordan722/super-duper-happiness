var svg = d3.select("#svg");

var w = 850;
var h = 550;

var dataset = [
    {
	"country": "Dummy",
	"total": 0,
	"apprehended": 1,
	"naturalized": 1,
	"highlight": false,
	"region": ""
    },
    {
	"country": "Canada",
	"total": 500,
	"apprehended": 0.1,
	"naturalized": 0.9,
	"highlight": false,
	"region": "North America"
    },
    {
	"country": "Egypt",
	"total": 382,
	"apprehended": 0.38,
	"naturalized": 0.62,
	"highlight": false,
	"region": "North Africa"
    }
];

var regionColors =
    {
	"North America" : "#800000",
	"South America" : "#FF0000",
	"The Carribean" : "#FFC9DE",
	"Central America": "#FF9900",
	"North Africa" : "#808000",
	"South Africa" : "#BEFF00",
	"West Africa" : "#00BE00",
	"East Africa" : "#AAFFC3",
	"East Asia" : "#008080",
	"Central Asia" : "#64FFFF",
	"South Asia" : "#000080",
	"Southeast Asia": "#4385FF",
	"Eastern Europe" : "#820096",
	"Western Europe" : "#FF00FF",
	"Middle East" : "#FFEA00",
	"Oceania": "#B0C4DE"
    };
//This can be reduced to continents though idrc

var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d["naturalized"]; })])
    .range([0, w]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d["apprehended"]; })])
    .range([h, 0]);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d["naturalized"]);
    })
    .attr("cy", function(d) {
        return yScale(d["apprehended"]);
    })
    .attr("fill", function(d) {
	return regionColors[d["region"]];
    })
    .attr("r", function(d) {
	return d["total"]/10;
    });

var formatAsPercentage = d3.format(".1%");

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis.tickFormat(formatAsPercentage));

svg.append("g")
    .attr("class", "axis")
    .call(yAxis.tickFormat(formatAsPercentage));
