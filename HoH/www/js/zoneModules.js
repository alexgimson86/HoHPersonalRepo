var zoneModules = (function ($) {
    // private - for displaying troublezone
    var showTroubleZone = function (userArray) {
        var count = 0;
        var longitude = [];
        var latitude = [];
        var i = 0;
        userArray.forEach(function (dat) {
            count++;
            longitude[i] = dat.longitude;
            latitude[i] = dat.latitude;
            i++;
        });

        var markers = [];
        for (var i = 0; i < count; i++) {
            var latLng = new google.maps.LatLng(latitude[i], longitude[i]);
            var marker = new google.maps.Marker({
                position: latLng
            });
            markers.push(marker);
        }

        var options = {
            
            imagePath: 'img/m'
        };

        var markerCluster = new MarkerClusterer(app.map, markers, options);

    };




    //public
    var getLocations = function () {
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/updateTroubleZone.php",
            dataType: "json",
            success: function (response) {
                showTroubleZone(response);
            },
            error: function (response) {
                alert("Error:" + response);
            }
        });
    };

    return {
        getLocations: getLocations,

    };

}(jQuery));


