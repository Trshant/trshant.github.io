function MakeDataSet() {
		  var data = [] ;		
		  for (i = 0; i < 3; i++) {
			for (j = 0; j < 105; j++) {
			  data.push({
				start_time: Math.floor((Math.random()*24)+1), 
				end_time: Math.floor(Math.random()*24),
				loc: Math.floor((Math.random()*3)+1) ,
				date:  new Date( 2013 ,Math.floor(Math.random()*12), Math.floor(Math.random()*31), 0,0,0,0).getTime() ,
				severity: Math.floor((Math.random()*10)+1),
				type: Math.floor((Math.random()*3)+1)
			  });
			}
		  } 
		  
		  return data;
	}
	
	PrepareData = function(Data){
		preReturnData = {};
		returnData = [];
		for ( i = 0 ; i < Data.length ; i++ ){
			if( preReturnData[ "loc"+Data[i].loc ] === undefined ){ preReturnData[ "loc"+Data[i].loc] = [] ; }
			preReturnData[ "loc"+Data[i].loc ].push( {
				x    : ( 24 + ( Data[i].end_time - Data[i].start_time ) )%24 , 
				y    : new Date( Data[i].date ).getDate() , 
				size : Data[i].severity  
			} ) ;
		}
		for( i in preReturnData ) {
			returnData.push( { key: i , values: preReturnData[i]  } ) ;
		}	
		return returnData ;
	}
	
	function MakeGraph(DataSet){
	nv.addGraph(function() {
		chart = nv.models.scatterChart()
						.showDistX(true)
						.showDistY(true)
						.useVoronoi(true)
						.color(d3.scale.category10().range())
						.transitionDuration(300).showLegend(false);
						;

		chart.xAxis.tickFormat(d3.format('.02f'));
		chart.yAxis.tickFormat(d3.format('.02f'));
		
		chart.tooltipContent(function(key) {
			 return '<h2>' + key + '</h2>';
		});

		d3.select('#test1 svg')
			  .datum( DataSet )
			  .transition().duration(50)
			  .call(chart);

		nv.utils.windowResize(chart.update);

		chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });

		return chart;
	});
	
	
}

	
	
	var dataset = crossfilter( MakeDataSet() );
	var L = dataset.size();
	var dataByDate = dataset.dimension(function(d) { return d.date; });
	Y = dataByDate.top(L);
	D = PrepareData( Y );
	MakeGraph(D);
	var X = dataByDate.group()
			.reduce( 
				function(a,b){ ++a.count; a.date = b.date; return a; }, 
				function(a,b){ --a.count; a.date = b.date; return a; }, 
				function(){return 		 {count:0,date:new Date()} ; } 
			)
			.order( function(o){ return o.date ; }).top(L) ; 

	// Bar graph code begins
	
	var w = 1000;
	var h = 150;

	var x = d3.time.scale().domain([new Date( 2013 , 0, 1 ,0,0,0,0 ), new Date( 2014 , 0, 1 ,0,0,0,0 )]).range([0, w-100]) ;

	var brush = d3.svg.brush()
    .x(x)
	.extent([new Date( 2013 , 1, 1 ,0,0,0,0 ), new Date( 2013 , 2, 2 ,0,0,0,0 )])	
    .on("brush", brushed);

//Create SVG element
var svg = d3.select('#test2')
            .append("svg")
            .attr("width", w-75)
            .attr("height", h )
			.append("g") ;
			
			svg.selectAll("rect")
			   .data(X) 
			   .enter()
			   .append("rect")
			   .attr("x", function(d) {
			   		return ( ( ( new Date(d.key).getTime() - new Date( 2013 , 0, 1 ).getTime() ) / ( 24 * 36 * 100000 ) ) * ( (w-100) / 365) );
			   })
			   .attr("y", function(d) {
			   		return (h-50) - ( d.value.count * 20);
			   })
			   .attr("width",((w-100) / 365) - 1 )
			   .attr("height", function(d) {
			   		return d.value.count * 20;
			   })
			   .attr("fill", function(d) {
					return "rgb( " + ( d.value.count * 10) + " , 0, 0)";
			   });

svg.append("g")
    .attr("class", "x axis").attr("width",w)
    .attr("transform", "translate(0," + (h-50) + ")")
    .call(d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.months, 1)
      .tickPadding(0))
  .selectAll("text")
    .attr("x", 4)
    .style("text-anchor", null);
			   
var gBrush = svg.append("g")
    .attr("class", "brush")
    .call(brush);			   
	
gBrush.selectAll("rect")
    .attr("height", h-50);
	
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("x", function(d, i) {
			   		return i * (w / 15) + 5;
			   })
			   .attr("y", function(d) {
			   		return (h-400) - (d * 4) + 15;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");

function brushed() {
	var extent0 = brush.extent() ;
	filterbybrush = dataByDate.filter( [ extent0[0] , extent0[1] ] ) ;
	document.getElementById("data").innerHTML = "From : "+ extent0[0].toDateString() +"  To: "+ extent0[1].toDateString() +" Total: "+ filterbybrush.top(L).length ;
	
	if( filterbybrush.top(L).length != 0 ){ 
		D = PrepareData( filterbybrush.top(L) );
		MakeGraph(D);
	} else { refresh(); }
}	

brushed(); 
 
function refresh(){
	//brush.extent( [ new Date(2013,0,1,0,0,0,0) , new Date(2013,0,1,0,0,0,0) ] );
	//brushed();
	d3.selectAll(".brush").call(brush.clear());
	filterbyAll = dataByDate.filterAll() ;
	filtereddata = filterbyAll.top(L)
	document.getElementById("data").innerHTML = "From : "+ new Date( filtereddata[0].date).toDateString() +"  To: "+ new Date( filtereddata[filtereddata.length - 1].date).toDateString() +" Total: "+ filterbyAll.top(L).length ;
	D = PrepareData( filterbyAll.top(L) );
	MakeGraph(D);
}