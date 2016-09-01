var storeModule = (function ($){
 
    // for store -User details
    var createStoreMarkup = function (userArray) {
        userArray.forEach(function (dat) {
            var userPoints = dat.userPoints;
            sessionStorage.setItem("userPoints", userPoints);
            $('.store-main')
                    .append('<div class="award"><div class="points">' +  dat.userPoints  + '</div> \
                            <img src="img/trophy.png" /> \
                            <p>Points</p> \
                            </div> \
                            <div class="profile-img"><img id="imageTask" src="' + dat.avatarUrl + '" /></div> \
                            <h2> ' + dat.firstName + ' ' + dat.lastName + '</h2> \
                            <h3>Latest Prizes</h3>');
        });
    };

    var getStoreInfo = function () {
        var userId = sessionStorage.getItem("userId");
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/userTest.php",
            dataType: "json",
            data: { userId: userId },
            success: function (response) {
              //  alert("success");
                createStoreMarkup(response);
            },
            error: function (response) {
               // alert("Error:" + response);
            }
        });
    };
     

    // for displaying stores on store.html
    var showStores = function (userArray) {
        userArray.forEach(function (dat) {
            $('.store')
                .append('<div class="selectStore"><div class ="idstores">\
                <div class="store-img"><img src="' + dat.storeImageUrl + '" /></div>\
                <div class="store-text" id="storeImg">\
                <div class="" id="storeVal" ><h3>'+ dat.storeName + '</h3>\
                <p>' + dat.prize + ' at </p>' + '<h3 class="store-points">' + dat.pointsNeeded + ' Hero Points</h3><div class="store-name" id="storeID" style="display: none">' + dat.idstores + '</div></div></div></div></div>');
           
        });
        
        $('.selectStore').on('click', '.idstores', function () {
            var storeString = $(this).find('.store-name');
            var storeID = $(storeString).text();
            sessionStorage.setItem("storeID", storeID);
        });             
    };
    
    var getStores = function () {
        
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/store.php",
            dataType: "json",
            success: function (response) {
        
                showStores(response);
            },
            error: function (response) {
               // alert("Error:" + response);
            }
        });
    };
  
    // for displaying stores for redeem.html
    var showStoreDetails = function (userArray) {

        userArray.forEach(function (dat) {
           
            var storePoints = parseInt(dat.pointsNeeded);
            sessionStorage.setItem("storePoints", storePoints);
            var storeName = dat.storeName;
            var storeCode = dat.storeCode;
            sessionStorage.setItem("storeName", storeName);
            sessionStorage.setItem("storeCode", storeCode);
            var dt2 = new Date();
            var startdate = dataCollection.getFormattedDate(dt2);
            var str = "lookedAt&" + storeName;
            dataCollection.getData(startdate, str);
            var userPoints = parseInt(sessionStorage.getItem('userPoints'));
            var flag;
   

            if (storePoints <= userPoints) {

                flag = 1;
                $('.storeDetails')
                        .append('<div class="selectedStore"><div class="redeem-code"><h2>Code:<br>' + dat.storeCode + ' </h2></div>\
                    <div class="redeem-img" id="storeImg"><img src="' + dat.storeImageUrl + '" /></div>\
                <article><h3>'+ dat.storeName + '</h3><br>' + dat.location + '</article>\
                <h3 class="redeem-text" id="redeem-text">' + dat.prize + '</h3>\
                <div class="instructions"><p><em>Show this coupon to the clerk to recieve your prize. The clerk will press the redeem button and points will be deducted.</em></p></div>\
               <div><button onClick="storeModule.myFunction()" class="coupon">Clerk Use Only: Redeem Coupon</button></div>\
         </div>');
            }
            else {
                var pointsRem = storePoints - userPoints;
                flag = 2;
                $('.storeDetails')
                      .append('<div class="selectedStore"><div class="redeem-code"><h2>Code:<br>' + dat.storeCode + ' </h2></div>\
                    <div class="redeem-img" id="storeImg"><img src="' + dat.storeImageUrl + '" /></div>\
                <article><h3>'+ dat.storeName + '</h3><br>' + dat.location + '</article>\
                <h3 class="redeem-text" id="redeem-text">' + dat.prize + '</h3>\
                <h5 class="redeem-message1" id="redeem-text"><em>Wah Wah Wah</em>,<br />You don&rsquo;t have enough points :(</h5>\
                <h5 class="redeem-message2" id="redeem-text">Earn ' + pointsRem + ' more Hero Points and it&rsquo;s all yours!</h5></div>');

               
            }
        });
    };

    var getStoreAddress = function () {
        var idstores = sessionStorage.getItem('storeID');
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/getStoreDetails.php",
            data: { idstores: idstores },
            dataType: "json",
            success: function (response) {
                
                showStoreDetails(response);
            },
            error: function (response) {
              //  alert("Error:" + response.innerText);
            }
        });
    };
      
    var onConfirm = function (buttonIndex) {
        if (buttonIndex == 1) {
            storeModule.checkRedeemPoints();
        }
        else {
            storeModule.getStoreAddress;
        }
    };

    var myFunction = function () {


        navigator.notification.confirm(
    'Would you like to redeem the coupon?', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Confirm Redeem',           // title
    ['Yes', 'No']     // buttonLabels
);

    };

    
    var checkRedeemPoints = function () {

        var storePoints = parseInt(sessionStorage.getItem('storePoints'));
        var userPoints1 = parseInt(sessionStorage.getItem('userPoints'));
        var dt6 = new Date();
        var startdate1 = dataCollection.getFormattedDate(dt6);
        var userPoints = userPoints1 - storePoints;
        var idUsers = sessionStorage.getItem('userId');
        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/updateRedeemPoints.php",
            data: { idUsers:idUsers, userPoints: userPoints },
            dataType: "json",
            success: function (response) {
          
                callStoreDetails();
            },
            error: function (response) {
            //  alert("Error:" + response.innerText);
            }             
        });

    };



    var storePointsRedeem = function () {
        var storeCode = parseInt(sessionStorage.getItem('storeCode'));
        var dt6 = new Date();
        var startdate2 = dataCollection.getFormattedDate(dt6);
        var idUsers = sessionStorage.getItem('userId');
         $.ajax({
        type: "GET",
        url: "http://www.hallofheroesapp.com/php/insertpointRedeemed.php",
        data: { idUsers: idUsers, storeCode: storeCode, startdate2: startdate2 },
        dataType: "json",
        success: function (response) {

            //alert("Success");
        },
        error: function (response) {
            //  alert("Error:" + response.innerText);
        }
         });
    };
    
    var getDataColl = function (str) {
        //alert("inside 1");
        var firstName = sessionStorage.getItem("firstName");
        var lastName = sessionStorage.getItem("lastName");
        var email = sessionStorage.getItem("email");
        var data = firstName + lastName + "^" + email + "^" + firstName + lastName + "&" + str;
        alert(data);
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


    
    var callStoreDetails = function () {
        storePointsRedeem();
        var storeName = sessionStorage.getItem('storeName');
        var dt3 = new Date();
        var startdate = dataCollection.getFormattedDate(dt3);
        var str = "redeemedCouponAt^" + storeName;
        dataCollection.getData(startdate, str);
        //setTimeout(function () {
        //    dataCollection.exitFromstorePage("couponPage");
        //}, 1000);
        setTimeout(function () {
            dataCollection.exitFromstorePage("couponPage");
            window.location = "store.html";
        }, 500);

    };

    return {
        myFunction: myFunction,
        getStoreInfo: getStoreInfo,
        getStores: getStores,
        getStoreAddress: getStoreAddress,
        checkRedeemPoints: checkRedeemPoints,
        getDataColl: getDataColl,
        storePointsRedeem: storePointsRedeem,
        
    };
}(jQuery));

