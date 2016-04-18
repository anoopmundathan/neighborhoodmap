//My Favourite restaurants near Canary Wharf...
var myLocations = [

    {
        place:'Wasabi',
        loc : {lat: 51.505131,lng: -0.020333}
    },

    {
        place:'Nandos',
        loc : {lat: 51.505156,lng: -0.020095}
    },
                
    {
        place:'Jamies',
        loc : {lat: 51.504699,lng: -0.014747}
    },

    {
        place:'Turkish',
        loc : {lat: 51.501607,lng: -0.019250}
    },

    {
        place:'Pizza',
        loc : {lat: 51.503397,lng: -0.018879}
    },

    {
        place:'Tortilla',
        loc : {lat: 51.505283,lng: -0.020682}
    },

    {
        place:'Itsu', 
        loc : {lat: 51.505367, lng: -0.020247}
    }
];

//Initialize the google map
var map;


initMap = function() {

    map = new google.maps.Map(document.getElementById('map'),{
            center: {lat:51.504699,lng:-0.014747},
            zoom: 16
    });

    ko.applyBindings(viewModel);
    loadMarkers();

}


viewModel = function() {

   this.allMarkers = ko.observableArray();

   //load all the Markers into marker observable Array
   loadMarkers = function() {
        myLocations.forEach(function(loc){

            //Create marker 
             var marker = new google.maps.Marker({
                position: loc.loc,
                map: map,
                title: loc.place,
                animation: google.maps.Animation.DROP,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10
                }
            });

           
            //Add event Listener to Marker
            marker.addListener('click', toggleBounce);

            function toggleBounce () {

               marker.setAnimation(google.maps.Animation.BOUNCE);

               //setTimeout(marker.setAnimation(null),1000);
            }

            //Push marker to observable Array
            this.allMarkers.push(marker);
   })};

    removeMarker = function() {};

}
    
