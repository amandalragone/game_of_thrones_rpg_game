
$(document).ready(function(){

    var fighter
    var fighterID
    var enemy
    var enemyID
    var isThereADefender
    var isThereAFighter
    var enemiesAvailable = 3


    //Each character needs a set of values: Health Points, Attack Power and Counter Attack Power

    var fighterPower
    var clickCount
    var enemyHealth
    var fighterHealth
    
    
    var newGame = function(){
        
        enemiesAvailable = 3;
        
        $("#defender").empty();
        $("#fightStatus_attack").empty();
        $("#fightStatus_counterAttack").empty();
        $("#wins_losses").empty();
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
            isThereAFighter = true;
    
            // Enemies will move to a different area of the page.
            $(this).siblings()
            .addClass("enemiesAvailable")
            .appendTo("#enemy").css( {
                "background-color": "red",
                "border-color": "black"
            } );

        //If Fighter has been chosen, element clicked will become the Defender.  
        } else {
            enemy = $(this);
            console.log("hello");
            enemyID = enemy.find("img").attr("id");
            enemyHealth = fighterPower[enemyID].healthPoints;
            console.log(enemyID);

            //Defender will move to the appropriate area.
            $("#defender").html(this)
            $("#defender .character").css( {
                "background-color": "black",
                "border-color": "green",
                "color": "white"
            });

            $("#wins_losses").empty();

            isThereADefender = true; 
            --enemiesAvailable;
            console.log(enemiesAvailable);
        };
        
    });

    //User will play the game when clicking the attack button.

    $("#attack").on("click", function() {

        console.log(enemiesAvailable);

        if (isThereADefender === false) {

            $("#defender").html("<div class='col'><p></br></br>No enemy here.</p></div>");
            
        } else if (isThereADefender === true) {

            fighterID = fighter.find("img").attr("id");
            enemyID = enemy.find("img").attr("id");

                clickCount++;
                $("#fightStatus_attack").text("You attacked " + fighterPower[enemyID].fullName + " for " + (fighterPower[fighterID].attackPower * clickCount) + " damage.");
                $("#fightStatus_counterAttack").text(fighterPower[enemyID].fullName + " attacked you back for " + fighterPower[enemyID].counterAttackPower + " damage.");
        

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

    };

        if ((enemiesAvailable > 0) && (enemyHealth <= 0)) {

    
            $("#defender .health_points").text(0);
            $("#wins_losses").text("You have defeated " + fighterPower[enemyID].fullName + " . You can choose to fight another enemy.");
            $("#defender").empty();
            $("#fightStatus_attack").empty();
            $("#fightStatus_counterAttack").empty();
            isThereADefender = false;

        } else if ((enemiesAvailable === 0) && (enemyHealth <= 0)) {
    
            $("#defender .health_points").text(0);
            $("#wins_losses").html("<p></br></br>You won!!! GAME OVER!!!</p><button id='restart'>Restart</button>");
            $("#defender").empty();
            $("#fightStatus_attack").empty();
            $("#fightStatus_counterAttack").empty();
    
            $(document).on("click", "#restart", function() {
                newGame();
                document.location.reload();
            });
        } else if (fighterHealth <= 0) {
    
            $("#fighter .health_points").text(0);
            $("#wins_losses").html("<p></br></br>You've been defeated. GAME OVER!</p><button id='restart'>Restart</button>");
        
            $("#fightStatus_attack").empty();
            $("#fightStatus_counterAttack").empty();
            
            $(document).on("click", "#restart", function() {
                newGame();
                document.location.reload();
            });
        };

    
        
    });

    
    

    newGame();
    // document.location.reload();
    

})