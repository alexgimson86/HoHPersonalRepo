var updateFavoritesModule = (function($) {
    
    //public
    var updateFavorites = function() {
        pushFavorites($);
    };
    
    var newFavorites = function() {
        pushNewFavorites($);
    };
    
    //private
    function pushFavorites(){
        //alert("pushFavorites fired!");
        var newHeroes = [];
        $('div input:checkbox:checked').each(function(){
            var heroId = $(this).parent().parent().find('.userId').text();
            newHeroes.push(heroId);
        });

        $.ajax({
            type: "POST",
            url: "http://www.hallofheroesapp.com/php/pushFavorites.php",
            data: {newHeroes: newHeroes},
            complete: function () {
                //alert('pushFavorites Ajax complete!');
                $('#favoriteHeroes').html('');
                favoritesModule.getFavoriteHeroes();
                getClosestHeroesModule.getAllHeroesInfo();
                $('#div1').toggle("slide", "left", 200);
                $('#div2').toggle("slide", "left", 200);
            }
        });

    };
    
        //private
    function pushNewFavorites(){
        //alert("pushNewFavorites fired!");
        var newHeroes = [];
        $('.HH-hero').each(function() {
            var heroId = $(this).data('userId');
            newHeroes.push(heroId);
        });

        $.ajax({
            type: "POST",
            url: "http://www.hallofheroesapp.com/php/pushFavorites.php",
            data: {newHeroes: newHeroes},
            complete: function () {
                alert('Account created successfully!');
                window.location.href = "home.html";
            }
        });

    };

    return {
        updateFavorites: updateFavorites,
        newFavorites: newFavorites
    };
 }(jQuery));

