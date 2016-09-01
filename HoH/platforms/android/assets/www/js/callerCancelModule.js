var callerCancelModule = (function () {
    var sendSmsToCancel = function () {
        alert("inside caller cancel module" + 'isHero = ' + sessionStorage.getItem('isHero'));
        var isHero = sessionStorage.getItem('isHero');
        var token;
        if (isHero == 1)
            token = sessionStorage.getItem('callersPushToken');
        else
            token = sessionStorage.getItem('pushToken');
        alert(token);

        var callerFname = sessionStorage.getItem('firstName');
        var callerLname = sessionStorage.getItem('lastName');
        var requestObject = { "platform": [1], "token": token, "msg": callerFname + ' ' + callerLname + ' has cancelled the call. Sorry about it!' };
        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("x-pushbots-appid", "5758e8cd4a9efa067f8b4567");
                request.setRequestHeader("x-pushbots-secret", "c701b6d3137870dc0f082715aa19d964");
                request.setRequestHeader("Content-Type", "application/json");
            },
            type: "POST",
            url: "https://api.pushbots.com/push/one",
            data: JSON.stringify(requestObject),
            complete: function () {

            },
            success: function () {
                window.location = "home.html";
            },
            error: function (response) {
                // alert("Error:" + response);
            }
        });
    };
    var openDialog = function () {
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            buttons: {
                "Cancel Call": function () {
                    //var token = sessionStorage.getItem('pushToken');
                    //if (token != null) {
                        $(this).dialog('close');
                        sendSmsToCancel();
                       
                   /* }
                    else {
                        $(this).dialog("close");
                        window.location = "home.html";
                    }*/
                },
                "Stay on page": function () {
                    $(this).dialog("close");
                    //window.location = "green.html";
                }
            }
        });
    };


    return {
        sendSmsToCancel: sendSmsToCancel,
        openDialog: openDialog
    };

}());
$(function () {
    callerCancelModule.openDialog();
    $('#cancelButton').click(function () {
        $('#dialog').dialog('open');
    });
});