//This module activates when the user clicks submit for account registration
var accountSetupModule = (function($) {
   
    var sendLoginInfo = function(password, sex) {
        //this function sends remaining info, attached to the new user, to the db
        $.ajax({
            type: "POST",
            url: "http://www.hallofheroesapp.com/php/registerAccount.php",
            data: {password: password, sex: sex},
            complete: function () {
                //alert('sendLoginInfo Ajax complete!');
                updateFavoritesModule.newFavorites();
            }
        });
    };
    
    var submitAccount = function(password, sex) {
        //alert('submitAccount fired!');
        sendLoginInfo(password, sex);
    };
    return {
        //return signIn function from the module to make this function public.
        submitAccount: submitAccount
    };

}(jQuery));

