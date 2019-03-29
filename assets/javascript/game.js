
$(document).ready(function(){

    var fighter
    var enemy
    var isThereADefender
    

    //Each character needs a set of values: Health Points, Attack Power and Counter Attack Power
    var fighterPower = {
        martell: {
            healthPoints: 100,
            attackPower: 9,
            counterAttackPower: 23,
        },
        snow: {
            healthPoints: 110,
            attackPower: 8,
            counterAttackPower: 20,
        },
        mountain: {
            healthPoints: 120,
            attackPower: 7,
            counterAttackPower: 18,
        }, 
        night: {
            healthPoints: 130,
            attackPower: 6,
            counterAttackPower: 15,
        },

    };


    // User will click an image to pick fighter.

    $(".character").on("click", function(){
        fighter = $(this);
        const fighterID = fighter.find("img").attr("id");

        // Enemies will move to a different area of the page.
        $(this).siblings()
        .addClass("enemiesAvailable")
        .appendTo("#enemy")
        .on("click", function(){ // User will click on an enemy to choose it.
            enemy = $(this);
            const enemyID = enemy.find("img").attr("id");

            $("#defender").html(this);
            isThereADefender = true;

            if (isThereADefender === true){
                $(".enemiesAvailable").off("click");
            };
        });
    });


    // $(".character").on("click", function(){

    //     if (isThereAFighter === false) {
    //         fighter = $(this);
    //         const fighterID = fighter.find("img").attr("id");
    //         isThereAFighter === true
    
    //         // Enemies will move to a different area of the page.
    //         $(this).siblings()
    //         .addClass("enemiesAvailable")
    //         .appendTo("#enemy");
    //     } else if (isThereAFighter === true) {
    //         enemy = $(this);
    //         console.log("hello");
    //         const enemyID = enemy.find("img").attr("id");

    //         $(this).appendTo("#defender");

    //         isThereADefender = true; 
    //     } else if (isThereADefender === true){
    //         $(".character").off("click");
    //     }
        
    // });

    //User will play the game when clicking the attack button.

    $("#attack").on("click", function(){
        const enemyID = enemy.find("img").attr("id");
        const fighterID = fighter.find("img").attr("id");

        console.log(enemyID + "attacked by" + fighterID);
        console.log("new fighter health", fighterPower[enemyID].healthPoints - fighterPower[fighterID].attackPower);
    });

    
    

})