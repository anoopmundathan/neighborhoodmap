'use strict';

//Favourite restaurants & take away near Canary Wharf, London
var locationsList = [
    {name:'Wasabi',location : {lat: 51.505131,lng: -0.020333}},
    {name:'Nandos',location : {lat: 51.505156,lng: -0.020095}},
    {name:'Jamies',location : {lat: 51.504699,lng: -0.014747}},
    {name:'Turkish',location : {lat: 51.501607,lng: -0.019250}},
    {name:'Pizza Express',location : {lat: 51.503397,lng: -0.018879}},
    {name:'Tortilla',location : {lat: 51.505283,lng: -0.020682}},
    {name:'Itsu', location : {lat: 51.505367, lng: -0.020247}},
    {name:'Pret a Manger', location : {lat: 51.505467, lng: -0.020647}}
];

//Location class constructor
var Location = function (item) {
    this.name = ko.observable(item.name);
    this.location = ko.observable(item.location);
    this.marker = ko.observable();
}

//Initialize the google map
var map;

var initMap = function () {

    map = new google.maps.Map(document.getElementById('map'),{
            center: {lat:51.504699,lng:-0.014747},
            zoom: 16,
            mapTypeControl: false
    });

    ko.applyBindings(new viewModel);
}


var viewModel = function () {
    
    var self = this;
    
    this.locations = ko.observableArray ();
    this.visibleLocations = ko.observableArray();
    this.userInput = ko.observable();

    locationsList.forEach(function (item) {

        //Create location object
        var location = new Location (item);

        //Create marker object
        var marker = new google.maps.Marker({
                position: item.location,
                map: map,
                title: item.name,
                animation: google.maps.Animation.DROP
        });

        var infoWindow = new google.maps.InfoWindow({
                content: item.name
            });
            
        //Register click event for each marker
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            },2000);
        });

        //Set marker property to the marker just created
        location.marker = marker;

        //this keyword can not be used as it was giving locations undefined error, so using self.
        //Push element into observable Array
        self.locations.push(location);  
        self.visibleLocations.push(location);   
    });


    this.filterMarkers = function () {

        //Retrieve the user input and convert to lower case
        var search = this.userInput().toLowerCase();

        //Remove all items from Observable array 'locations'
        this.locations.removeAll();

        //Remove markers
        this.visibleLocations().forEach(function (item) {
            
            //Make Marker invisible
            item.marker.setVisible(false);

            //Load only items into 'locations' obeservable Array, if the match is found
            if(item.name().toLowerCase().indexOf(search) !== -1){
                self.locations.push(item);
            }
        });

        //Make Marker visible
        this.locations().forEach(function (item) {
            item.marker.setVisible(true);
        })

    }

}
    
