
$(document).ready(function(){

    var fighter
    var enemy

    // User will click an image to pick fighter.

    $(".character").on("click", function(){
        fighter = ($(this));

        // Enemies will move to a different area of the page.
        $(this).siblings().appendTo(".enemy");
    })

    // User will click on an enemy to choose it.
    //this is not working yet:
    $(".enemy .character").addClass("enemies_available");

    $(".enemies_available").on("click", function(){
        enemy = ($(this));
        $(this).appendTo(".defender");

    })

})