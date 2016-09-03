function getCallerLocation(firstName, lastName) {
    var hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded == 0) {
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/getCallerLocation.php",
            data: {
                lastName: lastName,
                firstName: firstName
            },
            dataType: "json",
            success: function (data) {
                var latitude = data[0].latitude;
                var longitude = data[0].longitude;
                sessionStorage.setItem('callerLat', latitude);
                sessionStorage.setItem('callerLong', longitude);
                var callersPushToken = data[0].pushToken;
                sessionStorage.setItem('callersPushToken', callersPushToken);
                var callerInfo = {
                    latitude: latitude,
                    longitude: longitude,
                    firstName: firstName,
                    lastName: lastName
                }
                setIfCallPending(callerInfo);

            },
            error: function (error) {
               // var msg = $.parseJSON(error).msg;
               // alert(msg);

            }
        });
    }
    else {
        var lat = sessionStorage.getItem('callerLat');
        var long = sessionStorage.getItem('callerLong');
    }
}
function setIfCallPending(callerInfo) {
    var userId = sessionStorage.getItem("userId");
    $.ajax({
        type: "POST",
        url: "http://www.hallofheroesapp.com/php/setIfCallPending.php",
        data: {
            userId: userId,
            latitude: callerInfo.latitude,
            longitude: callerInfo.longitude,
            isPending: 0,
            lastName: callerInfo.lastName,
            firstName: callerInfo.firstName
        },
        dataType: "json",
        success: function (data) {
        },
        error: function (error) {
        }
    });
}
function getHeroLocation() {
    var userId = sessionStorage.getItem("userId");
    $.ajax({
        type: "GET",
        url: "http://www.hallofheroesapp.com/php/getHeroLatAndLong.php",
        dataType: "json",
        data: {userId: userId},
        success: function (data) {
            var latitude = data.latitude;
            var longitude = data.longitude;
            $('#signalHeroes').html(data.firstName + ' ' + data.lastName + ' ' + 'is on the way!');
            sessionStorage.setItem('heroLat', latitude);
            sessionStorage.setItem('heroLong',longitude);
            sessionStorage.setItem('heroFirstName', data.firstName);
            sessionStorage.setItem('heroLastName', data.lastName);
            sessionStorage.setItem('pushToken', data.pushToken);
            sessionStorage.setItem('heroAvatar', data.avatarUrl);
            var heroAvatarUrl = sessionStorage.getItem('heroAvatar');
            $("#imageTask").attr("src", heroAvatarUrl);
        },
        error: function (error) {
        }
    });
}
function dropMarker(latitude,longitude)
{
    var callersMarker;

    if (sessionStorage.getItem('isHero') == 1 && sessionStorage.getItem('hasLoaded')==0) {
        sessionStorage.setItem('initalHeroLat', sessionStorage.getItem('latitude'));
        sessionStorage.setItem('initialHeroLong', sessionStorage.getItem('longitude'));
    }
    if (sessionStorage.getItem('isCaller') == 1 && sessionStorage.getItem('isLoadedCaller') == 0) {
        sessionStorage.setItem('initalHeroLat', latitude);
        sessionStorage.setItem('initialHeroLong', longitude);
    }
    var latLong2 = new google.maps.LatLng(latitude, longitude);

    //app.markerTwo = callersMarker;

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsDisplay.setMap(app.map);

    calcRoute(directionsDisplay, directionsService, latLong2);

    //set marker for the other person, either the caller or hero depending on 
    //who you are
    app.markerTwo = new google.maps.Marker({
        position: latLong2,
        //map: app.map,
        title: 'Other persons Location',
        label: "hero"
    });
    
    //reset the marker for you, also should update your 
    //position and move your marker when you move
    if (sessionStorage.getItem('isCaller') == 1) {
        //app.marker.setMap(app.map);
        app.markerTwo.setMap(app.map);
        updateMarker();
    }
    if (sessionStorage.getItem('isHero') == 1) {
        checkHeroDistance();
    }
  
}
function checkHeroDistance() {
    var dist;
    var lon1 = sessionStorage.getItem('longitude');
    var lat1 = sessionStorage.getItem('latitude');
    var lon2 = sessionStorage.getItem('callerLong');
    var lat2 = sessionStorage.getItem('callerLat');
    var initialDistance = distance(lat1, lon1, lat2, lon2, 'M');
    sessionStorage.setItem('initialDistance', initialDistance);

    var heroInterval = setInterval(function(){
        lon1 = sessionStorage.getItem('longitude');
        lat1 = sessionStorage.getItem('latitude');
        lon2 = sessionStorage.getItem('callerLong');
        lat2 = sessionStorage.getItem('callerLat');

        dist = distance(lat1, lon1, lat2, lon2, 'M');
        if (dist < 1) {
            jQuery('#callerName').html('You are less than 1 mile away');
        }
        else {
            jQuery('#callerName').html('You are ' + Math.trunc(dist) + ' miles away');
        }

        if (dist < 0.005) {
            var initialDist = Math.trunc(sessionStorage.getItem('initialDistance'));
            if (window.confirm("Have You found the caller?")) {
                var userId = sessionStorage.getItem("userId");
                $.ajax({
                    type: "POST",
                    url: "http://www.hallofheroesapp.com/php/callCompleted.php",
                    dataType: "json",
                    data: {userId: userId, initialPoints: initialDist},
                    success: function (response) {
                        alert("Congratulations you have gained " + initialDist + " points!");
                        clearInterval(heroInterval);
                        window.location = "home.html";
                    },
                    error: function (response) {
                      alert("Error:" + response + " Init dist " + initialDist);
                    }
                });
            }
        }
       
     },5000);
        
}
function initialize(directionsDisplay) {
    directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsDisplay.setMap(app.map);
}
function calcRoute(directionsDisplay, directionsService, latLong2) {
    
    var heroLat = sessionStorage.getItem('initalHeroLat');
    var heroLong = sessionStorage.getItem('initialHeroLong');
    var heroMarker = new google.maps.LatLng(heroLat, heroLong);
    var heroMarkerNew;
    var callerMarker;
    var request;
    //testing new markers
    var heroIcon = 'http://www.hallofheroesapp.com/img/hospitals.png';
    var callerIcon = 'http://www.hallofheroesapp.com/img/phoneImage.png';
   

    if (sessionStorage.getItem('isCaller') == 1) {
        heroMarkerNew = new google.maps.Marker({
            position: heroMarker,
            map: app.map,
            title: 'hero location',
            icon: heroIcon
        });
        callerMarker = new google.maps.Marker({
            position: app.marker.position,
            map: app.map,
            title: 'caller location',
            icon: callerIcon
        });
        request = {
            origin: app.marker.position,
            destination: heroMarker,
            travelMode: 'WALKING' // google.maps.TravelMode.WALKING
        };
    }
    else {
        heroMarkerNew = new google.maps.Marker({
            position: heroMarker,
            map: app.map,
            title: 'hero location',
            icon: heroIcon
        });
        callerMarker = new google.maps.Marker({
            position: latLong2,
            map: app.map,
            title: 'caller location',
            icon: callerIcon
        });
        request = {
            origin: heroMarker,
            destination: latLong2,
            travelMode: 'WALKING' // google.maps.TravelMode.WALKING
        };
    }
    
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
    if (sessionStorage.getItem("isCaller") == 1) {
        app.marker.setMap(null);
    }
}
//this function updates the heros marker every few seconds so
// the caller can see the heros progress and the marker moving
function updateMarker() {
    var userId = sessionStorage.getItem("userId");
    if (app.markerTwo) {
        var markerInterval = setInterval(function () {
            var latitude;
            var longitude;
            $.ajax({
                type: "GET",
                url: "http://www.hallofheroesapp.com/php/getHeroLatAndLong.php",
                dataType: "json",
                data: {userId: userId},
                success: function (data) {
                    latitude = data.latitude;
                    longitude = data.longitude;
                    var latLong = new google.maps.LatLng(latitude, longitude);
                    //app.markerTwo.setMap(null);
                    app.markerTwo.setPosition(latLong);
                    /*app.markerTwo = new google.maps.Marker({
                        position: latLong,
                        //map: app.map,
                        title: 'Caller Location',
                        label: 'hero'
                    });
                    app.markerTwo.setMap(app.map);*/
                    var lat1 = sessionStorage.getItem('latitude');
                    var lon1 = sessionStorage.getItem('longitude');
                    var lat2 = latitude;
                    var lon2 = longitude;
                    var dist = distance(lat1, lon1, lat2, lon2, 'M');

                    if (dist < 0.005) {
                        if (window.confirm("Have You been found?")) {
                            clearInterval(markerInterval);
                            window.location = "home.html";
                        }
                        else {
                            //window.location = "green.html";
                        }
                    }
                },
                error: function (error) {
                }
            });
        }, 3000);
    }
}
function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
}