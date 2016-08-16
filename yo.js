
angular.module('app', ['appServices'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
                when('/home', {templateUrl: 'post.html',   controller: HomePageCtrl}).
                when('/tags/:tag', {templateUrl: 'linklist.html',   controller: TagsListCtrl}).
                when('/archive/:year/:month', {templateUrl: 'linklist.html',   controller: ArchivesListCtrl}).
				when('/blog/:post', {templateUrl: 'post.html',   controller: PostDisplayCtrl}).
                otherwise({redirectTo: '/home'});
}])


/* Controllers */
TagListCtrl = function( $scope, data ) {
 var tags = [];
 var ttags = {};
 for( i=0;i<data.length;i++){
 	
	var d = data[i];
	
	for( j=0;j<d.tags.length;j++){
		t = d.tags[j];
		if( ttags[t] == undefined ){ ttags[t]=1;}
		else { ttags[t] += 1 ; }
	}
	
 }
 
 for ( i in ttags){ tags.push( {tag:i,no:ttags[i]} ) ;	}
 console.log( tags );
 $scope.tags = tags;
			
}

ArchiveListCtrl = function( $scope ) {
var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var archives = [];
 var aarchives = {};
 for( i=0;i<data.length;i++){
 	
	var d = data[i];
	
		m = month[ d.date.getMonth() ] ;
		y = d.date.getFullYear() ;
		t  = m + ' ' + y ;
		
		if( aarchives[t] == undefined ){ aarchives[t]=[y,m,1];}
		else { aarchives[t][2] += 1 ; }

	
 }
 
 for ( i in aarchives){ archives.push( {month: aarchives[i][1]  , year: aarchives[i][0] , no:aarchives[ i ][2]} ) ;	}
 console.log( archives );
 $scope.archives = archives;
}

/* tag posts to show */
TagsListCtrl = function( $scope , data , $routeParams ) {
	var tags = [];
	console.log(data);
	var id = $routeParams.tag ;
	tags = data.filter( function(t){ return ( t.tags.indexOf(id) != -1 ) } )
	console.log(tags);
	$scope.tags = tags ;
	setTimeout(function(){prettyPrint();},800);
}


ArchivesListCtrl = function( $scope , data , $routeParams ) {
	var monthnames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var archives = [];
	console.log($routeParams.month , data);
	var year = $routeParams.year ;
	var month = monthnames.indexOf( $routeParams.month ) ;
	
	archives = data.filter( function(t){ 
			m = t.date.getMonth() ;
			y = t.date.getFullYear() ;
			//console.log(m , y , year , month , ( m == month ) , ( y == year ) ); // , archives);
			return ( ( m == month ) && ( y == year ) ) ;
	} )
	
	$scope.tags = archives ;
	setTimeout(function(){prettyPrint();},800);
}


/* new ones */

MainCtrl = function($scope, data) {
    //console.log(Page);
    $scope.data= data; 
} ;

HomePageCtrl = function($scope, data) {
	var old = new Date(1970,0,1);
	var loop = []
	var d ;
	for( i=0;i<data.length;i++){
		console.log( old.toDateString() , data[i].date.toDateString() );
		if( old < data[i].date ){
			d = data[i];
			old = data[i].date ;
		}
	}
	loop.push(d);
	console.log( d );
	$scope.tags = loop ;
	document.title = d.title ;
	setTimeout(function(){prettyPrint();},800);
}

PostDisplayCtrl = function($scope, data , $routeParams) {
	var loop = [] ;
	var post = $routeParams.post ;
	console.log(post);
	var d ;
	for( i=0;i<data.length;i++){
		if( post == data[i].link ){
			d = data[i];
		}
	}
	loop.push(d);
	$scope.tags = loop ;
	document.title = d.title ;
	setTimeout(function(){prettyPrint();},800);
}

/* Services */

angular.module('appServices', [])

		
		.factory('data', function(){
			return data = [
				{date: new Date(2013,04,02) , link: "lorem_ipsum_translated.html" , title:"Lorem Ipsum" , tags:["Lorem Ipsum", "Tranlated Lorem"]},
				{date: new Date(2013,06,02) , link: "only_lorem.html" , title:"Only Lorem Ipsum" , tags:["Lorem Ipsum","lorem Only"]},
				{date: new Date(2013,11,02) , link: "post3.html" , title:"post3" , tags:["code"]},
				{date: new Date(2014,00,28) , link: "crossfilterd3js.html" , title:"D3 and Crossfilter" , tags:["JavaScript", "d3.js", "crossfilter.js"]},
				{date: new Date(2014,01,25) , link: "title_change.html" , title:"Change the title of the page" , tags:["JavaScript", "angular.js"]},
				{date: new Date(2014,03,02) , link: "Things_i_learnt_and_realised_at_a_KPO.html" , title:"Things i learnt and realised at a KPO" , tags:["JavaScript", "angular.js"]},
				{date: new Date(2014,08,16) , link: "ezitor.html" , title:"A new web based editor" , tags:["JavaScript", "editor", "localstorage"]},
				{date: new Date(2015,00,02) , link: "onbeforeunload.html" , title:"Browser event to catch closing/changing pages" , tags:["JavaScript", "browser"]},
				{date: new Date(2015,00,06) , link: "string_wrangling_in_angular.html" , title:"string wrangling in angular" , tags:["JavaScript", "angular.js"]},
				{date: new Date(2015,02,19) , link: "MySublimeTextPersonalisation.html" , title:"My SublimeText Personalisation" , tags:["Editor", "SublimeText"]},
				{date: new Date(2016,08,16) , link: "hello_world.html" , title:"Well, Hello World" , tags:["R", "Hello"]}
			] ;
		}
		
		) ;
            
    
