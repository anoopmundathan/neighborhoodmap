'use strict';
//My Favourites Places around in London
var locationsList = [
    {name: 'Buckingham Place', icon: './img/monument.png', location: {lat: 51.501518, lng: -0.141890}},
    {name: 'Tower Bridge', icon: './img/bridge.png', location: {lat: 51.505450, lng: -0.075432}},
    {name: 'London Eye', icon: './img/london-eye.png', location: {lat: 51.503712, lng: -0.119532}},
    {name: 'St Paul Cathedral', icon: './img/stpaul.png', location: {lat: 51.514006, lng: -0.098340}},
    {name: 'Houses of Parliment', icon: './img/monument.png', location: {lat: 51.500943, lng: -0.124615}},
    {name: 'Piccadelly Circus', icon: './img/monument.png', location: {lat: 51.510284, lng: -0.134573}},
   
    {name: 'Hyde Park', icon: './img/nature.png', location: {lat: 51.507308, lng: -0.165816}},
    {name: 'Green Park', icon: './img/nature.png', location: {lat: 51.503975, lng: -0.143924}},
    {name: 'Regents Park', icon: './img/nature.png', location: {lat: 51.533359, lng: -0.142210}},
    
    {name: 'Natural History Museum', icon: './img/building.png', location: {lat: 51.496895, lng: -0.176335}},
    {name: 'British Museum', icon: './img/building.png', location: {lat: 51.519527, lng: -0.126967}},
    {name: 'Tate Modern', icon: './img/building.png', location: {lat: 51.507796, lng: -0.099324}},
    
    {name: 'Wembley Football Stadium', icon: './img/football.png', location: {lat: 51.556661, lng: -0.279433}},
    {name: 'Chelsea FC', icon: './img/football.png', location: {lat: 51.481892, lng: -0.191019}},
    {name: 'Arsenal FC', icon: './img/football.png', location: {lat: 51.557135, lng: -0.106335}}
    
];

//Location class constructor
var Location = function (item) {
    this.name = ko.observable(item.name);
    this.location = ko.observable(item.location);
    this.marker = ko.observable();
};

//Initialize google map
var map;

/* This init function is call back function for google map api loading*/
var initMap = function () {

    //Create google map object
    map = new google.maps.Map(document.getElementById('map'),{
            center: {lat:51.500943,lng:-0.124615},
            zoom: 12,
            mapTypeControl: false
    });

    //Bind view Model to knockout
    ko.applyBindings(new viewModel());
};

var googlemapError = function () {
    $('#map').append('<div class="error"><h3>OOPS...Something went wrong. Google Map is not Loaded</h3></div>');
};

var viewModel = function () {
    
    var self = this;
    
    this.locations = ko.observableArray ();
    
    //Create InfoWindow object
    var infoWindow = new google.maps.InfoWindow({});

    /*Loop through all locationsList array of objects and create location object
      This forEach loop does following
        1. create 'location' object using 'Location' constructor
        2. create google Map Marker object
        3. Register click event for marker
        4. Add all created objects into 'locations' observableArray
    */
    locationsList.forEach(function (item) {

        //Create location object
        var location = new Location (item);

        //Create marker object
        var marker = new google.maps.Marker({
                position: item.location,
                map: map,
                title: item.name,
                icon: item.icon,
                animation: google.maps.Animation.DROP
        });
            //Register click event for marker
            marker.addListener('click', function (){
                self.openInfoWindow(this);
        });
            
        //Set marker property to the marker just created
        location.marker = marker;

        //this keyword can not be used as it was giving locations undefined error, so using self.
        //Push created location object into observable Array
        self.locations.push(location);  
    });

    /* Open InfoWindow when marker or list item is clicked.
       This function receives marker object.
       Do the Asynchronous call to foursquare api to get review details of marker/location that is clicked.
    */
    this.openInfoWindow = function (marker) {

        /* Error handling for Ajax request. If it takes more than 8 sec, display below message */
        var forsquareRequestTimeOut = setTimeout(function () {
               infoWindow.setContent("<h4> FourSquare info unavailable at the moment. Please try back later.</h4>");
               infoWindow.open(map, marker);
        },8000);

        //Make Ajax request to foursquare API end point.
        $.ajax({
                url: 'https://api.foursquare.com/v2/venues/explore',
                type: 'GET',
                dataType: 'json',

                data: {
                        client_id: 'QDHBVRFOZVOOUF442VUWKDQOKBZVX50VMPJAYIZ3DCXFGP4S',
                        client_secret: 'EUSSHEJASZD33QUGVHXHNH4TI1D24S0MVZTFJN2ROWTOH4YA',
                        v: '20160407',
                        limit: 1,
                        ll: marker.position.lat() + ',' + marker.position.lng(),
                        query: marker.title,
                        async: true
                    },

                //Execute success function once response is received from 3rd party. Show InfoWindw
                success: function(results) {
                        infoWindow.open(map, marker);
                        infoWindow.setContent('<div class="infowindow"><h3>'+marker.title+'</h3>Rating:' +results.response.groups[0].items[0].venue.rating    + 
                            '</p><h4> Phone:' + results.response.groups[0].items[0].venue.contact.formattedPhone  + 
                            '</h4><p>' + results.response.groups[0].items[0].tips[0].text + 
                            '</p><a href=' + results.response.groups[0].items[0].tips[0].canonicalUrl + '>FourSquare</a></p></div>');
                            clearTimeout(forsquareRequestTimeOut);
                        },
                            
                });

        //Bounce marker for 2 seconds, when clicked.
         marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            },2000);
    };

    /* Observable for Filter Functionality*/
    this.places = ko.observableArray(self.locations());
    this.userInput = ko.observable('');

    /* Filter Functionality for List View */
    this.filteredList = ko.computed (function () {
        return ko.utils.arrayFilter(self.places(), function(loc) {
           if (loc.name().toLowerCase().indexOf(self.userInput().toLowerCase()) >= 0) {
                loc.marker.setVisible(true);
                return true;
            } else {
                loc.marker.setVisible(false);
                return false;
            }
        });
    });

    //Trigger click event when location is clicked from list view.
    this.locationClicked = function (loc) {
        self.openInfoWindow(loc.marker);
    };

};
