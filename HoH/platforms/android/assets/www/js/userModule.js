var userModule = (function ($){
    //private
    var createUserMarkup = function(userArray){
        userArray.forEach(function (dat) {
            dat.avatarUrl = dat.avatarUrl + new Date().getTime();
            sessionStorage.setItem('firstName', dat.firstName);
            sessionStorage.setItem('lastName', dat.lastName);
            sessionStorage.setItem('url', dat.avatarUrl);
            sessionStorage.setItem('email', dat.email);
            var startdate = dataCollection.getFormattedDate(dt);
            var str = "enters&home";
            dataCollection.getData(startdate, str);
            $('.profile-main')
                    .append('<div class="award"><div class="points">' +  dat.userPoints  + '</div> \
                    <img src="img/trophy.png" /> \
                    <p>Points</p> \
                    </div> \
                    <div class="profile-container"> \
                        <div id="edit" class="plus-sign"> \
                            <img src="img/camera.png" alt="edit your avatar" /> \
                         </div> \
                        <div class="profile-img"><img id="imageTask" src="' + dat.avatarUrl + '" /></div> \
                    </div> \
                    <h2> ' + dat.firstName + ' ' + dat.lastName + '</h2>');
        });
    };
    
    //public
    var getUserInfo = function(){
        $.ajax({
              type: "GET",
              url: "http://www.hallofheroesapp.com/php/user.php",
              dataType: "json",
              success: function (response) {
                createUserMarkup(response);
              },
              error: function(response) {
                console.log("Error:" + response);
              }
        });
    };

    return {
        getUserInfo:getUserInfo
    };
}(jQuery));





