var emailValidationModule = (function($){
    
    var verifyFormat = function (param) {
        var suffix = "@txstate.edu";
            if(param.indexOf(suffix, param.length - suffix.length) !== -1) {
                //alert("Your email format looks good!");
                verifyEmail(param);
            }
            else {
                alert('Please check your email format and try again.');
                return false;
            }
    };
    
    var verifyEmail = function (email) {
        //this verifies that the email is in the db
        var userId;
        $.ajax({
            type: "GET",
            //php checkEmail.php file gets called
            url: "http://www.hallofheroesapp.com/php/checkEmail.php",
            crossDomain: true,
            dataType: 'json',
            data: {email: email, userId: userId},
            success: function (response) {
                if(response === 0) {
                    alert("Your email is NOT in the database! Please try again.");
                    return false;
                }
                else if(response === -1) {
                    alert("You already have an account! Please sign in.")
                    window.location = "sign_in.html";
                }        
                else {
                    console.log(response);
                    alert("Your email has been validated!");
                    //alert('your residence hall is ' + response);
                    contactsModule.getContacts();
                    toggle_visibility("hiddenDiv");
                }
            },
            error: function (response) {
                alert("Error:" + response);
            }
        });
    };
    
    return { 
        verifyFormat: verifyFormat
    };
}(jQuery));


