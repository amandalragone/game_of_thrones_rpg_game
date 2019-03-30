
$(document).ready(function(){

    var fighter
    var fighterID
    var enemy
    var enemyID
    var isThereADefender
    var isThereAFighter
    var enemiesDefeated

    //Each character needs a set of values: Health Points, Attack Power and Counter Attack Power

    var fighterPower
    var clickCount
    var enemyHealth
    var fighterHealth
    
    
    var newGame = function(){

        enemiesDefeated = 0;
        clickCount = 0;
        isThereADefender = false;
        isThereAFighter = false;
        fighterPower = {
            martell: {
                fullName: "Oberyn Martell",
                healthPoints: 115,
                attackPower: 9,
                counterAttackPower: 16,
            },
            snow: {
                fullName: "John Snow",
                healthPoints: 140,
                attackPower: 8,
                counterAttackPower: 13,
            },
            mountain: {
                fullName: "The Mountain",
                healthPoints: 150,
                attackPower: 7,
                counterAttackPower: 11,
            }, 
            night: {
                fullName: "The Night King",
                healthPoints: 170,
                attackPower: 6,
                counterAttackPower: 9,
            },
        };
        

    }


    // User will click an image to pick fighter and enemy.

    $(".character").on("click", function() {

        //If Defender has been chosen, click is turned off.

        if (isThereADefender === true) {
            $(".enemiesAvailable").off("click");

        //If Fighter has not been chosen, element clicked will become the Fighter.
        } else if (isThereAFighter === false) {
            fighter = $(this);
            fighterID = fighter.find("img").attr("id");
            console.log(fighterID);
            isThereAFighter = true
    
            // Enemies will move to a different area of the page.
            $(this).siblings()
            .addClass("enemiesAvailable")
            .appendTo("#enemy");

        //If Fighter has been chosen, element clicked will become the Defender.  
        } else {
            enemy = $(this);
            console.log("hello");
            enemyID = enemy.find("img").attr("id");
            enemyHealth = fighterPower[enemyID].healthPoints;
            console.log(enemyID);

            //Defender will move to the appropriate area.
            $("#defender").html(this);

            $("#wins_losses").empty();

            isThereADefender = true; 
        };
        
    });

    //User will play the game when clicking the attack button.

    $("#attack").on("click", function(){

        if (isThereADefender === false) {

            $("#defender").html("<div class='col'><p></br></br>No enemy here.</p></div>");
            
        } else {

            fighterID = fighter.find("img").attr("id");
            enemyID = enemy.find("img").attr("id");

                clickCount++;
                $("#fightStatus_attack").text("You attacked " + fighterPower[enemyID].fullName + " for " + (fighterPower[fighterID].attackPower * clickCount) + " damage.");
                $("#fightStatus_counterAttack").text(fighterPower[enemyID].fullName + " attacked you back for " + fighterPower[enemyID].counterAttackPower + " damage.");
        }

        if (clickCount === 1) {
            enemyHealth = fighterPower[enemyID].healthPoints - fighterPower[fighterID].attackPower;
            $("#defender .health_points").text(enemyHealth);

            fighterHealth = fighterPower[fighterID].healthPoints - fighterPower[enemyID].counterAttackPower;
            $("#fighter .health_points").text(fighterHealth);
        } else if (clickCount > 1) {
            enemyHealth = enemyHealth - (fighterPower[fighterID].attackPower * clickCount);
            $("#defender .health_points").text(enemyHealth);

            fighterHealth = fighterHealth - fighterPower[enemyID].counterAttackPower;
            $("#fighter .health_points").text(fighterHealth);
        };
        
        
        if (enemyHealth <= 0) {

            enemiesDefeated = enemiesDefeated++;
            $("#defender .health_points").text(0);
            $("#wins_losses").text("You have defeated " + fighterPower[enemyID].fullName + " . You can choose to fight another enemy.");
            $("#defender").empty();
            $("#fightStatus_attack").empty();
            $("#fightStatus_counterAttack").empty();
            isThereADefender = false;
        } else if (fighterHealth <= 0) {

            $("#fighter .health_points").text(0);
            $("#wins_losses").html("<div class='col'><p></br></br>You've been defeated. GAME OVER!</p></div> <div class='row'><div class='col'><button id='restart'>Restart</button></div></div>");
        
            $("#fightStatus_attack").empty();
            $("#fightStatus_counterAttack").empty();
            
            $(document).on("click", "#restart", function() {
                newGame();
            });
        } else if (enemiesDefeated === 3) {
            $("#wins_losses").html("<div class='col'><p></br></br>You won!!! GAME OVER!!!</p></div> <div class='row'><div class='col'><button id='restart'>Restart</button></div></div>");
            $("#defender").empty();
            $("#fightStatus_attack").empty();
            $("#fightStatus_counterAttack").empty();

            $(document).on("click", "#restart", function() {
                newGame();
            });
        };
    

    });
    

    newGame();
    

})