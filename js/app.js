'use strict';
//My Favourite restaurants near Canary Wharf...
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
            zoom: 16
    });


    ko.applyBindings(new viewModel);
}


var viewModel = function () {
    
    var self = this;
    
    this.locations = ko.observableArray ();
    this.visibleLocations = ko.observableArray();
    this.userInput = ko.observable();

    locationsList.forEach(function (item) {

        //create a new location object
        var location = new Location (item);

        //create marker
        var marker = new google.maps.Marker({
                position: item.location,
                map: map,
                title: item.name,
                animation: google.maps.Animation.DROP
        });


        location.marker = marker;

        //this keyword can not be used as it was giving locations undefined error.
        self.locations.push(location);  
        self.visibleLocations.push(location);   
    });


    this.filterMarkers = function () {

        //remove list items
        this.locations.removeAll();

        //remove markers
        var search = this.userInput().toLowerCase();
        this.visibleLocations().forEach(function (item) {
            item.marker.setVisible(false);

            if(item.name().toLowerCase().indexOf(search) !== -1){
                self.locations.push(item);
            }
        });

        this.locations().forEach(function (item) {
            item.marker.setVisible(true);
        })

    }

}
    
