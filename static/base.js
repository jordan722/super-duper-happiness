//Dummy test data

var dataset;
var slider = document.getElementById("time");

var update = function(){
    makeRequest(slider.value);
};

$.ajax({
	url: "/getData",
	type: "GET",
}).done(function(data){
    dataset = JSON.parse(data);
    //console.log(dataset);
    plot(dataset, 2006);

});
slider.addEventListener("mouseup", update);

function makeRequest(year){
   $.ajax({
	url: "/getData",
	type: "GET",
}).done(function(data){
    dataset = JSON.parse(data);
    //console.log("move!" + year);
    transitiondata(year);

});
}
   
   
   /*
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
    
    //*/

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
    .range([0, 2*w]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([h, 0]);

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("width", "210px")
    .style("height", "70px")
    .style("padding", "2px")
    .style("font", "12px sans-serif")
    .style("background", "lightsteelblue")
    .style("border", "0px")
    .style("border-radius", "8px")
    .style("z-index", "10")
    .style("visibility", "hidden")




var plot = function(dataset, year) {
    ///*

    svg.selectAll("circle")
	.data(dataset[year.toString()])
	.enter()
	.append("circle")
	.call(updateDot)
	.sort(order)
	.attr("fill", function(d) {
	    //console.log(d);
	    //console.log(year.toString());
	    //console.log(dataset);
	    //return regionColors[d["region"]];
	    return "green";
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
		return 0.25;
	    }
	})		    
	
    	.on("mouseover", function(d){
	    tooltip.html(d["country"] + "<br/>"  + "Naturalized:" + d["naturalized"] + "<br/>" + "Inadmissible:" + d["inadmissible"] + "<br/>" + "Total:" + d["total"]);
	    return tooltip.style("visibility", "visible");})
	.on("mousemove", function(){return tooltip.style("top",
							 (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    
    //svg.selectAll("circle")
	//.data(dataset[year.toString()])
    
    
    
    
    //*/
    
    
    // Due to the structure of the JSON object (dataset), I have concluded that it is 
    // too difficult to attempt interpolating data to create seamless data
    //
    // Reason : We should have been keying the countries not the years
    //          since JSON stores objects, which countries are more so
    //          than years
    //          Because it is structured by year, it makes it
    //          extremely difficult to cross-reference country by year
    //          data (e.g Canada inadmissable in 2006 vs Canada 
    //          inadmissable in 2007) and passing functions that deal
    //          with such. 
    //          In other words, functions like interpolateValues 
    //          cannot be generalized easily because it would have to 
    //          search through every object in the next year for the same 
    //          country to find the desired value for comparison
    //          If it were by country 
    //
    // This feature was not implemented because of the unfortunate lack of foresight
    // and partly my late realization of how the data should have been structured
    // This will be a lesson learned
    //  - Jerry
    
    
    
    
    ///////////////////////////////////////////////////////////////
    //Functions

    /*
    
    
    function interpolateValues(item, value, year) {
        var est = d3.interpolateNumber(item[value])
        return dataset[]
    }
    
    //year can be float
    function interpolateData(year) {
        var old = (int)(Math.floor(year));
        if ((float)(old) == year) 
            return dataset[old.toString()];
        return dataset[old.toString()].map(function(d) {
            return {
                country: d.country,
                total: interpolateValues(d.country, "total", year),
                inadmissable : interpolateValues(d.country, "inadmissable", year),
                naturalized: interpolateValues(d.country, "naturalized", year),
                highlight: d.highlight,
                region: d.region
            };
        });
    }
    
    function plotYear(year) {
        svg.selectAll("circle")
            .data(interpolateData(year), function(d){return d.country})
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
    //*/

    
    //Transistion
    /*
    svg.transition()
        .duration(20000)
        .ease("linear")
        .tween("year", tweenYear)
    
    // Cancel the current transition, if any.
    svg.transition().duration(0);

  
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
      .text("% Naturalized");

    svg.append("g")
	.attr("class", "axis")
	.call(d3.axisLeft(yScale).ticks(10, "%"));
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -(h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("% Inadmissible");      

};

function radius(d) {return d.total}

function order(a, b) {
    return radius(b) - radius(a);
  }

function plotYear(year) {
        return svg.selectAll("circle")
            .data(dataset[year.toString()], function(d){return d.country});
        //svg.selectAll("circle").call(updateDot);
        //console.log();
}

function updateDot(dot) {
        dot .attr("cx", function(d) { return xScale(d["naturalized"] * 10); })
            .attr("cy", function(d) { return yScale(d["inadmissible"] * 100); })
            .attr("r", function(d) { return d["total"]/50000; });
}



function transitiondata(year){
   var t = d3.transition()
             

   plotYear(year)
     .transition()
       .duration(5000)
       .ease(d3.easeLinear)
     .call(updateDot);
     
}




//plot(2005);
