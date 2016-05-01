'use strict';

//Favourite restaurants & take away near Canary Wharf, London
var locationsList = [
    {name:'Wasabi', icon:'./images/japanese.png',location : {lat: 51.505131,lng: -0.020333}},
    {name:'Nandos', icon:'./images/restaurant.png',location : {lat: 51.505156,lng: -0.020095}},
    {name:"Jamie's Italian",icon:'./images/italian.png',location : {lat: 51.504699,lng: -0.014747}},
    {name:'Turkish',icon:'./images/turkish.png',location : {lat: 51.501607,lng: -0.019250}},
    {name:'Pizza Express',icon:'./images/pizzaria.png',location : {lat: 51.503397,lng: -0.018879}},
    {name:'Tortilla',icon:'./images/takeaway.png',location : {lat: 51.505283,lng: -0.020682}},
    {name:'Itsu', icon:'./images/takeaway.png',location : {lat: 51.505367, lng: -0.020247}},
    {name:'Pret a Manger', icon:'./images/takeaway.png',location : {lat: 51.505467, lng: -0.020647}}
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


    var infoWindow = new google.maps.InfoWindow({});

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

        
            
        //Register click event for each marker
        marker.addListener('click', function () {

            $.ajax({
                url: 'https://api.instagram.com/v1/media/search?lat=' + 
                item.location.lat +'&lng=' + item.location.lng + '&access_token=1183052.0815fb2.fafb30a0e819477d93f79c0cce36b70e',

                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                }
            });
            //Make asynchronous call to forsquare API to get restaurant review.
            /*$.ajax({
                        url: 'https://api.foursquare.com/v2/venues/explore',
                        type: 'GET',
                        dataType: 'json',

                        data: {
                            client_id: 'UDAIBO0KLAVZAXOV1QCFE5WMROTWBLH5EVIGT1YT4QE5GBZI',
                            client_secret: 'UN3EV2ASZGLNVNKEUSMUNMRLA2WDOZVC1SSWD33SUESQ1FFT',
                            v: '20160407',
                            limit: 1,
                            ll: item.location.lat + ',' + item.location.lng,
                            query: item.name,
                            async: true

                        },

                        //Execute callback function once response is received from 3rd party. Show InfoWindw
                        success: function(results) {

                            infoWindow.open(map, marker);
                            infoWindow.setContent('<div>Rating:' +results.response.groups[0].items[0].venue.rating    + 
                                '</p><h4> Phone:' + results.response.groups[0].items[0].venue.contact.formattedPhone  + 
                                '</h4><p>' + results.response.groups[0].items[0].tips[0].text + 
                                '</p><a href=' + results.response.groups[0].items[0].tips[0].canonicalUrl + '>FourSquare</a></p></div>');
    

                        },

                        error: function(e) {
                            infoWindow.setContent("<h4> FourSquare info unavailable at the moment. Please try back later.</h4>");

                        }
                    });
            */
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

    };

    this.locationClicked = function (loc) {
        //console.log(loc);
        google.maps.event.trigger(loc.marker, 'click');
    }

    this.locationClick = function (loc) {
        console.log(loc);
    }

}
    
