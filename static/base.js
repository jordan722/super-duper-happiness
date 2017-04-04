//Dummy test data
var dataset =
    {
	"2005": [
	    {
		"country": "Dummy",
		"total": 0,
		"inadmissible": 1,
		"naturalized": 1,
		"highlight": false,
		"region": ""
	    },
	    {
		"country": "Canada",
		"total": 500,
		"inadmissible": 0.1,
		"naturalized": 0.9,
		"highlight": false,
		"region": "North America"
	    },
	    {
		"country": "Egypt",
		"total": 382,
		"inadmissible": 0.38,
		"naturalized": 0.62,
		"highlight": true,
		"region": "North Africa"
	    }
	],
        
    "2050": [
	    {
		"country": "Dummy",
		"total": 100,
		"inadmissible": .7,
		"naturalized": 1,
		"highlight": false,
		"region": ""
	    },
	    {
		"country": "Canada",
		"total": 7000,
		"inadmissible": 0.35,
		"naturalized": 0.6,
		"highlight": false,
		"region": "North America"
	    },
	    {
		"country": "Egypt",
		"total": 3824,
		"inadmissible": 0.66,
		"naturalized": 0.31,
		"highlight": true,
		"region": "North Africa"
	    }
	]
    };

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


//Takes an array from the dataset (aka 1 year) and
//sorts it by total in descending
//.sort(function(a, b){
//    return parseInt(b.total) - parseInt(a.total);
//};


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


var svg = d3.select("#svg");

var w = 850;
var h = 550;

var xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, w]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([h, 0]);



var plot = function(year) {
    ///*
    svg.selectAll("circle")
	.data(dataset[year.toString()])
	.enter()
	.append("circle")
	.attr("cx", function(d) {
            return xScale(d["naturalized"]);
	})
	.attr("cy", function(d) {
            return yScale(d["inadmissible"]);
	})
	.attr("fill", function(d) {
	    return regionColors[d["region"]];
	})
	.attr("stroke", function(d) {
	    //return regionColors[d["region"]];
	    return "black";
    })
	.attr("fill-opacity", function(d) {
	    if (d["highlight"] == true) {
		return 1;
	    }
	    else {
		return 0.5;
	    }
	})		    
	.attr("r", function(d) {
	    return d["total"]/10;
	});

    //*/
    
    ///////////////////////////////////////////////////////////////
    //Functions
    
    var bisect = d3.bisector(function(d) { return d[0]; });
    function interpolateValues(values, year) {
        var i = bisect.left(values, year, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
            var b = values[i - 1],
            t = (year - a[0]) / (b[0] - a[0]);
            return a[1] * (1 - t) + b[1] * t;
        }
        return a[1];
    }
    
    function interpolateData(year) {
        return nations.map(function(d) {
            return {
                country: d.country,
                total: interpolateValues(d.total, year),
                inadmissable : interpolateValues(d.inadmissable, year),
                naturalized: interpolateValues(d.naturalized, year),
                highlight: d.highlight,
                region: d.region
            };
        });
    }
    
    function plotYear(year) {
        dot.data(interpolateData(year), function(d){return d.country})
            .call(updateDot);
    }
    
    function updateDot(dot) {
        dot .attr("cx", function(d) { return xScale(d["naturalized"]); })
            .attr("cy", function(d) { return yScale(d["inadmissible"]); })
            .attr("r", function(d) { return d["total"]/10; });
    }

    function tweenYear() {
        var year = d3.interpolateNumber(2005, 2014);
        return function(t) { plotYear(year(t)) }
    }
    
    
    //Transistion
    /*
    svg.transition()
        .duration(20000)
        .ease("linear")
        .tween("year", tweenYear)
        .each("end", enableInteraction);
    
    function enableInteraction() {
    var yearScale = d3.scale.linear()
        .domain([1800, 2009])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    // Cancel the current transition, if any.
    svg.transition().duration(0);

    overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

    function mouseover() {
      label.classed("active", true);
    }

    function mouseout() {
      label.classed("active", false);
    }

    function mousemove() {
      displayYear(yearScale.invert(d3.mouse(this)[0]));
    }
  }
    //*/
    
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //Axes
    
    svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + h + ")")
	.call(d3.axisBottom(xScale).ticks(10, "%"));
    
    svg.append("text")             
      .attr("transform",
            "translate(" + (w/2) + " ," + 
                           (h + 40) + ")")
      .style("text-anchor", "middle")
      .text("% Something");

    svg.append("g")
	.attr("class", "axis")
	.call(d3.axisLeft(yScale).ticks(10, "%"));
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -65)
      .attr("x", -(h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("% Something");      

};

plot(2005);
