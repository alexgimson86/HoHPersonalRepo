function savePushRegistration(token) {
﻿   var userId = sessionStorage.getItem("userId");
    $.ajax({
        type: "POST",
        url: "http://www.hallofheroesapp.com/php/savePushToken.php",
        data: { userId: userId, token: token },
        success: function () {
            alert("token was saved to the DB");
        },
        error: function (response) {
            alert("Error:" + response);
        }
    });
}