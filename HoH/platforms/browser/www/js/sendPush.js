﻿var pushModule = (function () {
    var sendPush = function (color, name) {
        var requestObject = { "msg": "You are receiving a " + color + " call from " + name, "platform": [1] };
        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("x-pushbots-appid", "5758e8cd4a9efa067f8b4567");
                request.setRequestHeader("x-pushbots-secret", "c701b6d3137870dc0f082715aa19d964");
                request.setRequestHeader("Content-Type", "application/json");
            },
            type: "POST",
            url: "https://api.pushbots.com/push/all",
            data: JSON.stringify(requestObject),
            complete: function () {
                if (color == "green")
                    window.location = "green.html";
                else if (color == "yellow")
                    window.location = "yellow.html";
                else if (color == "red")
                    window.location = "red.html";
                else
                    alert("unrecognized color.");
            },
            success: function () {
                alert("push was successful");
            },
            error: function (response) {
                //alert("Error:" + response);
            }
        });
    }
    var sendPushToOneCallback = function (color, senderName, pushTokenArray, callback) {
        if (pushTokenArray.length >= 1) {
            var pushToken = pushTokenArray.shift();
            var requestObject = { "platform": [1], "token": pushToken, "msg": color + " call from " + senderName + "." };
            if (requestObject.token !== null) {
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
                        //callback(color, senderName, pushTokenArray, callback);
                    },
                    success: function (data) {
                        callback(color,senderName,pushTokenArray.shift(),callback);
                        //alert
                    },
                    error: function (response) {
                        // alert("Error:" + response);
                    }
                });
            }
        }
    }
    var sendPushToOne = function (color, senderName, pushToken) {
        var pushToken = String(pushToken);
        var requestObject = { "platform": [1], "token": pushToken, "msg": color + " call from " + senderName + ". " + sessionStorage.getItem('signalMessage') };
        if (requestObject.token !== null) {
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
                    //callback(color, senderName, pushTokenArray, callback);
                },
                success: function (data) {
                    //callback(color, senderName, pushTokenArray.shift(), callback);
                    //alert
                },
                error: function (response) {
                    // alert("Error:" + response);
                }
            });
        }
        
    }
    return {
        sendPushToOne: sendPushToOne,
        sendPushToAll : sendPush
    }
}());
