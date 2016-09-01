var dataCollection = (function ($) {

    //public
    var getFormattedDate = function (now) {
        year = "" + now.getFullYear();
        month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        startdate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return startdate;
        
    };
    
    var getData = function (start, str) {

        var firstName = sessionStorage.getItem("firstName");
        var lastName = sessionStorage.getItem("lastName");
        var email = sessionStorage.getItem("email");
        var data = start+"^" + firstName + lastName + "^" + email + "^" + firstName + lastName + "&" + str;
      
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/dataCollection.php",
            dataType: "json",
            data: { data: data },
            success: function (response) {
              //  alert(" on Success");
            }
           
        });
    };

    var exitFromPage = function (str) {
        var enddt = new Date();
        var enddate = dataCollection.getFormattedDate(enddt);
        var time = Math.abs((dt.getTime() - enddt.getTime()) / (24 * 6 * 6)).toFixed(5);

        var str = "exits&" + str + "^ToT^" + time + "secs";
        
        dataCollection.getData(enddate, str);
    };


    var exitFromstorePage = function (str) {
        //alert("indi");
        var enddt = new Date();
        var enddate = dataCollection.getFormattedDate(enddt);
        var m = sessionStorage.getItem('dt10');
        
        var time = Math.abs((m - enddt.getTime()) / (24 * 6 * 6)).toFixed(5);

        var str = "exits&" + str + "^ToT^" + time + "secs";
        //alert(str);
        //alert(enddate);
        dataCollection.getData(enddate, str);
    };

    var exitFromInnerPage = function (str) {
        
        var enddt1 = new Date();
        var enddate1 = dataCollection.getFormattedDate(enddt1);
        var storeName = sessionStorage.getItem('storeName');
        var str = "exits&" + str + "&"+ storeName;
        dataCollection.getData(enddate1, str);

    };

   


    return {
        getData: getData,
        getFormattedDate: getFormattedDate,
        exitFromPage: exitFromPage,
        exitFromInnerPage: exitFromInnerPage,
        exitFromstorePage: exitFromstorePage,
    };
}(jQuery));





