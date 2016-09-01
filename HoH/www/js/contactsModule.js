var contactsModule = (function($) {
    
    var getContacts = function() {
        //alert('getContacts fired!');
        dbContacts($);
    };

    function displayContacts(contactArray){
        //alert('displayContacts!');
        var jsonObject = $.parseJSON(contactArray);
        var prevLetter = null;
        jsonObject.forEach(function (dat) {
            //Begin Contact Unit
            var lastLetter = dat.lastName[0];
            if(lastLetter !== prevLetter) {
                $('.contactUnit')
                    .append('<h3 class = "letterHead">'+ lastLetter + '</h3><span class = '+ lastLetter +'></span>');
            }
            $('.'+ lastLetter +'')
                .append('<div class="feed"><div class="userUnit"><div class="ckBox"><input id="checkbox" type="checkbox" value='+dat.isHero+' />\
                </div><div class="feed-img"><img src="'+dat.avatarUrl+'">\
                </div><div class="feed-text"><p><span class ="userId" style="display: none">' + dat.idUsers + '</span><span class="name_highlight">\
                <span class="firstName">' + dat.firstName + '</span><span class="lastName"> ' + dat.lastName + '</span></span></p></div></div></div>');
            //End Contact Unit
            //$('.userUnit').data("userId", dat.idUsers);      //stores the user ID
            prevLetter = dat.lastName[0];
            
            $('div input[type=checkbox][value=true]').prop('checked', true);
        });
        
        $('#onboardingDone').on('click', function() {
            var newHeroes = [];
            var numChecked = $('div input:checkbox:checked').size();
            if(numChecked > 6) {
                alert('Please select no more than 6 heroes.');
                return;
            }
            $('div input:checkbox:checked').each(function(){
                var newHero = [];
                var heroImg = $(this).parent().parent().find('img').attr("src");
                var heroName = $(this).parent().parent().find('.firstName').text();
                var heroId = $(this).parent().parent().find('.userId').text();
                newHero.push(heroImg, heroName, heroId);
                newHeroes.push(newHero);
            });
            
            //sessionStorage.setItem("newHeroesArray", newHeroes);
            var i = 0;
            $('.HH-hero').each(function() {
                //this if statement needs to be FIXED!
                if(i >= numChecked)
                    return;
                $(this).find('img').last().attr("src", newHeroes[i][0]);
                $(this).find('p').html(newHeroes[i][1]);
                $(this).data('userId', newHeroes[i][2]);
                i++;
            });
            $('#div1').toggle("slide", "left", 200);
            $('#div2').toggle("slide", "left", 200);
        });
        
        $('#homeDone').on('click', function(){
            updateFavoritesModule.updateFavorites();
        });

    };

    var dbContacts = (function($) {

        $.ajax({
            type: "GET",
            url: "http://www.hallofheroesapp.com/php/contacts.php",
            success: function (response) {
                //alert('success!');
                displayContacts(response);
            },
            error: function(response){
                alert("Error:" + response);
            }
        });
    });
    return {
        getContacts: getContacts
    };
 }(jQuery));
