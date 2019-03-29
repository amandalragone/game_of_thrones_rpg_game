
$(document).ready(function(){

    var fighter
    var enemy
    var isThereADefender

    //Each character needs a set of values: Health Points, Attack Power and Counter Attack Power
    var fighterPower = {
        $("#martell"): {
            healthPoints: 100,
            attackPower: 9,
            counterAttackPower: 23,
        },
        $("#snow"): {
            healthPoints: 110,
            attackPower: 8,
            counterAttackPower: 20,
        },
        $("#mountain"): {
            healthPoints: 120,
            attackPower: 7,
            counterAttackPower: 18,
        }, 
        $("#night"): {
            healthPoints: 130,
            attackPower: 6,
            counterAttackPower: 15,
        },

    };


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