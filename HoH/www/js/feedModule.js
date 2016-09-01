$(document).ready(function () {
    var getFeed = function() {
        //alert('getFeed fired!');
        dbFeed($);
    };

    //test
    function displayFeed(feedArray){
        //alert('displayFeed!');
        var jsonObject = $.parseJSON(feedArray);
        jsonObject.forEach(function (dat) {
           //Begin Feed Unit
           if(dat.storeId == '0') {
                $('.feedUnit')
                    .append('<div class="feed">\
                    <span class ="postId" style="display: none"> ' + dat.postId + '</span>\
                    <span class ="userLiked" style="display: none"> ' + dat.userLiked + '</span>\
                    <span class ="postType" style="display: none"> ' + dat.storeId + '</span>\
                    <span class ="numLikes" style="display: none"> ' + dat.postLikes + '</span>\
                    <div class="feed-img"><img src="'+dat.avatar+'" /></div>\
                     <div class="feed-text"><p><span class="name_highlight">\
                    '+ dat.firstName + ' ' + dat.lastName + '</span> helped a friend last night.</p>\
                     </div><div class="feed-likes"><h5>' + dat.postLikes + ' Heroes Liked This\
                     <img src="img/like.png" class="like"></img></h5></div></div>');
           }
           else {
               $('.feedUnit')
                    .append('<div class="feed">\
                    <span class ="postId" style="display: none"> ' + dat.postId + '</span>\
                    <span class ="userLiked" style="display: none"> ' + dat.userLiked + '</span>\
                    <span class ="postType" style="display: none"> ' + dat.storeId + '</span>\
                    <span class ="numLikes" style="display: none"> ' + dat.postLikes + '</span>\
                    <div class="feed-img"><img src="'+dat.avatar+'" /></div>\
                     <div class="feed-text"><p><span class="name_highlight">\
                    '+ dat.firstName + ' ' + dat.lastName + '</span> used their hero points to win '
                     + dat.prize + ' at ' + dat.storeName + '</p>\
                     </div><div class="feed-likes"><h5>' + dat.postLikes + ' Heroes Liked This\
                     <img src="img/like.png" class="like"></img></h5></div></div>');
           }
           if(dat.userLiked != 0) {
               //alert('this was already liked by you!');
               $('.feed-likes').last().html('<h5> You liked this.<img src="img/like_on.png" class="like" /></h5>');
           }
           
        });
        
        //like button logic
        $('.feed').bind('click', '.like', function() {
            //alert('has been clicked!');
            var postId = $(this).find('.postId').text();
            var userLiked = $(this).find('.userLiked').text().trim();
            var postType = $(this).find('.postType').text();
            var numLikes = $(this).find('.numLikes').text();
            //alert('userLiked is '+userLiked+'.');
            //alert('userId is '+userId+'.');
            
            //if post HAS been liked.
            if(userLiked != 0) {
                $(this).find('.userLiked').html(0);
                $(this).find('.feed-likes')
                    .html('<h5> ' + numLikes + ' Heroes Liked This\
                     <img src="img/like.png" class="like" /></h5>');
                postUnliked(postId, postType, numLikes);
                
            }
            //if post HAS NOT been liked
            else {
                $(this).find('.userLiked').html("1");
                $(this).find('.feed-likes')
                    .html('<h5> You liked this.\
                     <img src="img/like_on.png" class="like" /></h5>');
                postLiked(postId, postType, numLikes);
            }
        });
        

    };
    
    var postLiked = function(postId, postType, numLikes) {
        //this function sends remaining info, attached to the new user, to the db
        $.ajax({
            type: "POST",
            url: "http://www.hallofheroesapp.com/php/postLiked.php",
            data: {postId: postId, postType: postType},
            success: function () {
                //alert('postLiked!');
            }
        });
    };
    
    var postUnliked = function(postId, postType, numLikes) {
        //this function sends remaining info, attached to the new user, to the db
        $.ajax({
            type: "POST",
            url: "http://www.hallofheroesapp.com/php/postUnliked.php",
            data: {postId: postId, postType: postType},
            success: function () {
                //alert('postUnliked!');
                //if(numLikes !== 0) {
                   // numLikes--;
            }
        });
    };

    var dbFeed = (function($) {

        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/getFeed.php",
            success: function (response) {
                //alert('success!');
                //console.log(response);
                displayFeed(response);
            },
            error: function(response){
                alert("Error:" + response);
            }
        });
    });
    $(getFeed);
 });
