# neighborhoodmap

[Live Demo](http://anoopmundathan.github.io/neighborhoodmap/dist)

> Udacity FrontEnd Developer Nanodegree - Project

App displays my favourite locations around London using google map.

### Getting started
#### Setup
```
$ git clone https://github.com/anoopmundathan/neighborhoodmap.git
$ cd neighborhoodmap
```
#### Install
```
$ npm install
```
#### Build
```
$ gulp
```
#### Run
```
$ open dist/index.html
```

####Functionality

* When you open the App, first it displays google Map, location markers and hamburger icon
* Click on the hamburger menu to open or close the list view with Search Bar
* The Search bar allows to filter the locations. List View and Map shows the filtered locations as per the query on the Search Bar
* Listview data and filtering functionalities are implemented using KnockoutJS
* Clicking on the List View, or the Marker on the map  animates the marker, and pops open the info window.
* Info Window pops with Foresquare review details (Ajax request) about the place marker that has been clicked.
* Code has been separated based on MVVM best practises and avoiding updating the DOM manually. Code uses obervables instead.
* In Model, all locations are hard coded in JSON format.
* Application utilizes Google's Map API in a synchronous manner
* Code is ready for personal review and is neatly formatted with comments where appropriate

#### Change Log - Based on Udacity code reviewer comments 
* Error Handling for Google Maps
* Error Handling for FourSquare API
* Created a click handler function that is bind to List View and Marker
* Used computed observable for Filtering List View
* Close menu when location list is clicked

#### 3rd Part API
[Foursquare API]( https://developer.foursquare.com/docs/) used to get the review details about the location. API request is made using JQuery $ajax function.

#### gulp plugins used
* [gulp](http://gulpjs.com/) 
* [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
* [gulp-cssmin](https://www.npmjs.com/package/gulp-cssmin)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

#### Credits

All Google Marker Icons are downloaded from http://www.flaticon.com/

#### References:
* https://github.com/udacity/fend-office-hours/tree/master/Javascript%20Design%20Patterns/P5%20Project%20Overview
* https://developers.google.com/maps/
* http://knockoutjs.com/documentation/
* http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
* https://developer.foursquare.com/docs/
* http://jshint.com/
* http://api.jquery.com/
* https://www.udacity.com/course/viewer#!/c-ud893-nd/l-3561069759/m-3530719305
* https://www.youtube.com/watch?v=9_pbp26vrco
