## Neighborhood Map Project

This Project is part of Udacity Front End Web Developer Nanodegree.

This App displays google map with my favourite locations around London.

### Getting started
Open the index.html to view the application from src or dist folder.

####Functionality

1. When you open the App, first it displays google Map, location markers and hamburger icon
1. Click on the hamburger menu to open or close the list view with Search Bar
1. The Search bar allows to filter the locations. List View and Map shows the filtered locations as per the query on the Search Bar
1. Listview data and filtering functionalities are implemented using KnockoutJS
1. Clicking on the List View, or the Marker on the map  animates the marker, and pops open the info window.
1. Info Window pops with Foresquare review details (Ajax request) about the place marker that has been clicked.
1. Code has been separated based on MVVM best practises and avoiding updating the DOM manually. Code uses obervables instead.
1. In Model, all locations are hard coded in JSON format.
1. Application utilizes Google's Map API in a synchronous manner
1. Code is ready for personal review and is neatly formatted with comments where appropriate

#### 3rd Part API
[Foursquare API]( https://developer.foursquare.com/docs/) used to get the review details about the location. API request is made using JQuery $ajax function.

####Build tools
[gulp](http://gulpjs.com/) is used to 

##### Minify HTML, CSS & JS
	 Minify index.html  using [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) plugin.
	 Minify CSS using [gulp-cssmin](https://www.npmjs.com/package/gulp-cssmin) plugin.
	 Uglify JS using [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) plugin.

####Credits
All Google Marker Icons are downloaded from http://www.flaticon.com/

####References:
* https://github.com/udacity/fend-office-hours/tree/master/Javascript%20Design%20Patterns/P5%20Project%20Overview
* https://developers.google.com/maps/
* http://knockoutjs.com/documentation/
* http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
* https://developer.foursquare.com/docs/
* http://jshint.com/
* http://api.jquery.com/
* https://www.udacity.com/course/viewer#!/c-ud893-nd/l-3561069759/m-3530719305
*
