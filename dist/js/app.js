"use strict";var locationsList=[{name:"Buckingham Place",icon:"./img/monument.png",location:{lat:51.501518,lng:-.14189}},{name:"Tower Bridge",icon:"./img/bridge.png",location:{lat:51.50545,lng:-.075432}},{name:"London Eye",icon:"./img/london-eye.png",location:{lat:51.503712,lng:-.119532}},{name:"St Paul Cathedral",icon:"./img/stpaul.png",location:{lat:51.514006,lng:-.09834}},{name:"Houses of Parliment",icon:"./img/monument.png",location:{lat:51.500943,lng:-.124615}},{name:"Piccadelly Circus",icon:"./img/monument.png",location:{lat:51.510284,lng:-.134573}},{name:"Hyde Park",icon:"./img/nature.png",location:{lat:51.507308,lng:-.165816}},{name:"Green Park",icon:"./img/nature.png",location:{lat:51.503975,lng:-.143924}},{name:"Regents Park",icon:"./img/nature.png",location:{lat:51.533359,lng:-.14221}},{name:"Natural History Museum",icon:"./img/building.png",location:{lat:51.496895,lng:-.176335}},{name:"British Museum",icon:"./img/building.png",location:{lat:51.519527,lng:-.126967}},{name:"Tate Modern",icon:"./img/building.png",location:{lat:51.507796,lng:-.099324}},{name:"Wembley Football Stadium",icon:"./img/football.png",location:{lat:51.556661,lng:-.279433}},{name:"Chelsea FC",icon:"./img/football.png",location:{lat:51.481892,lng:-.191019}},{name:"Arsenal FC",icon:"./img/football.png",location:{lat:51.557135,lng:-.106335}}],Location=function(n){this.name=ko.observable(n.name),this.location=ko.observable(n.location),this.marker=ko.observable()},map,initMap=function(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:51.500943,lng:-.124615},zoom:12,mapTypeControl:!1}),ko.applyBindings(new viewModel)},viewModel=function(){var n=this;this.locations=ko.observableArray(),this.visibleLocations=ko.observableArray(),this.userInput=ko.observable();var o=new google.maps.InfoWindow({});locationsList.forEach(function(e){var a=new Location(e),i=new google.maps.Marker({position:e.location,map:map,title:e.name,icon:e.icon,animation:google.maps.Animation.DROP});i.addListener("click",function(n){$.ajax({url:"https://api.foursquare.com/v2/venues/explore",type:"GET",dataType:"json",data:{client_id:"QDHBVRFOZVOOUF442VUWKDQOKBZVX50VMPJAYIZ3DCXFGP4S",client_secret:"EUSSHEJASZD33QUGVHXHNH4TI1D24S0MVZTFJN2ROWTOH4YA",v:"20160407",limit:1,ll:e.location.lat+","+e.location.lng,query:e.name,async:!0},success:function(n){o.open(map,i),o.setContent('<div class="infowindow"><h3>'+e.name+"</h3>Rating:"+n.response.groups[0].items[0].venue.rating+"</p><h4> Phone:"+n.response.groups[0].items[0].venue.contact.formattedPhone+"</h4><p>"+n.response.groups[0].items[0].tips[0].text+"</p><a href="+n.response.groups[0].items[0].tips[0].canonicalUrl+">FourSquare</a></p></div>")},error:function(n){o.setContent("<h4> FourSquare info unavailable at the moment. Please try back later.</h4>")}}),i.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){i.setAnimation(null)},2e3)}),a.marker=i,n.locations.push(a),n.visibleLocations.push(a)}),this.filterMarkers=function(){var o=this.userInput().toLowerCase();this.locations.removeAll(),this.visibleLocations().forEach(function(e){e.marker.setVisible(!1),-1!==e.name().toLowerCase().indexOf(o)&&n.locations.push(e)}),this.locations().forEach(function(n){n.marker.setVisible(!0),map.setZoom(13)})},this.locationClicked=function(n){google.maps.event.trigger(n.marker,"click")}};