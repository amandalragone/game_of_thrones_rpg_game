
$(document).ready(function(){

    var fighter
    var enemy
    var isThereADefender

    // User will click an image to pick fighter.

    $(".character").on("click", function(){
        fighter = ($(this));

        // Enemies will move to a different area of the page.
        $(this).siblings()
        .addClass("enemiesAvailable")
        .appendTo("#enemy")
        .on("click", function(){ // User will click on an enemy to choose it.
            enemy = ($(this));

            $("#defender").html(this);
            isThereADefender = true;

            if (isThereADefender === true){
                $(".enemiesAvailable").off("click");
            };
        });
    });

    

})