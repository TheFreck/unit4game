

//These are the contenders who will duke it out

var interceptor = {
    name: "interceptor",
    HP: 125,
    groundAttack: 1,
    airAttack: 12,
}

var fighter = {
    name: "fighter",
    HP: 150,
    groundAttack: 4,
    airAttack: 9,
}

var lightBomber = {
    name: "Light Bomber",
    HP: 175,
    groundAttack: 8,
    airAttack: 5,
}

var heavyBomber = {
    name: "Heavy Bomber",
    HP: 250,
    groundAttack: 10,
    airAttack: 3,
}

var groundDefense = {
    name: "Anti Aircraft",
    HP: 200,
    groundAttack: 0,
    airAttack: 13
}

// in list form

var airPlanes = [
    interceptor,
    fighter,
    lightBomber,
    heavyBomber,
    groundDefense
]

var dragElement = {};
var ID = 0;
var airVground = "air";

var HP = [];
var Air = [];
var Ground = [];
var inGame = false;
var wins = 0;
var losses = 0;



// the players enter the arena




// add contenders button

function cleanup(){
    $("#userBench").empty();
    $("#userBox").empty();
    $("#gameBench").empty();
    $("#gameBox").empty();
}

function addContenders(){

    cleanup();

    if(inGame===false){
        
        if(airVground==="ground"){
            addPilots(3,"air");
            addPilots(1,"ground");
        }else{
            addPilots(4,"air");
        }
        $(".pick").text("Drag two planes into your area on the left. Then 'Prepare for Battle!'")
    }    
}

function addPilots(quantity,type){
    for(i=0; i<quantity; i++){
        var index;
        function getIndex(){
            if(type==="air"){
                index = Math.floor(Math.random()*3);
            }else if(type==="ground"){
                index = 4;
            }
        }

        // creating a plane or ground unit
        getIndex();
        var planeType = airPlanes[index];
        var contender = $("<plane>");
        contender.addClass("plane");
        contender.attr("id", ID);
        contender.attr("planeType", planeType);
        contender.attr("HP", planeType.HP);
        HP.push(planeType.HP);
        contender.attr("groundAttack", planeType.groundAttack);
        Ground.push(planeType.groundAttack);
        contender.attr("airAttack", planeType.airAttack);
        Air.push(planeType.airAttack);
        contender.attr("ondragstart", "drag(event)");
        contender.attr("draggable", "true");
        contender.attr("onclick", "clickme()")
        contender.appendTo(".dugout");
        
        // label it
        var nameBanner = $("<section>");
        nameBanner.attr("id",ID + 10);
        nameBanner.text(planeType.name);
        
        var hpBanner = $("<section>");
        hpBanner.attr("id",ID + 20);
        hpBanner.text(`HP: ${HP[ID]}`);

        var airBanner = $("<section>");
        airBanner.attr("id",ID + 30);
        airBanner.text(`Air: ${Air[ID]}`);
        
        var groundBanner = $("<section>");
        groundBanner.attr("id",ID + 40);
        groundBanner.text(`Ground: ${Ground[ID]}`);
        
        contender.append(nameBanner);
        contender.append(hpBanner);
        contender.append(airBanner);
        contender.append(groundBanner);
        
        ID++;
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    dragElement = event.target;
}

function drop(event) {
    event.preventDefault();
    event.target.appendChild(dragElement);
}

// prepare for battle!
function begin(){
    
    if(inGame===false){
        inGame = true;
        var dugoutChildren = $(".dugout").children();
        dragElement = dugoutChildren;
        $("#gameBench").append(dugoutChildren);
        $(".pick").text("Move one of your planes into the arena. Then 'Fight!'... repeatedly");
    
        if(Math.random() > 0.5){
            $("gameBench plane:last-child").appendTo("#gameBox");
        }else{
            $("gameBench plane:first-child").appendTo("#gameBox");
        }
    }

}


$("#airVground").click(function(){
    if(airVground==="air"){
        airVground="ground";
    }else{
        airVground="air";
    }
})






// fight!

var userBench = $("#userBench")
var gameBench = $("#gameBench")
var userBox = $("#userBox");
var gameBox = $("#gameBox");

function fight(){
    if(inGame===true){

    var attackIncrease = 1;

    // user stats
    var userChild = userBox.children();
    var userBenchChild = userBench.children();

    var userID = userChild.attr("id");
    var userBenchID = userBenchChild.attr("id");

    var fighterHP = HP[userID];
    var userBenchHP = HP[userBenchID];
    var userHP = fighterHP + userBenchHP;
    
    var fighterAirAttack = Air[userID];
    var userBenchAir = Air[userBenchID];
    var userAirAttack = fighterAirAttack + userBenchAir;
    
    var fighterGroundAttack = Ground[userID];
    var userBenchGround = Ground[userBenchID];
    var userGroundAttack = fighterGroundAttack + userBenchGround;
    
    // game stats
    var gameChild = gameBox.children();
    var gameBenchChild = gameBench.children();

    var gameID = gameChild.attr("id");
    var gameBenchID = gameBenchChild.attr("id");

    var gameFighterHP = HP[gameID];
    var gameBenchHP = HP[gameBenchID];
    var gameHP = gameFighterHP +gameBenchHP;

    var gameFighterAirAttack = Air[gameID];
    var gameBenchAir = Air[gameBenchID];
    var gameAirAttack = gameFighterAirAttack + gameBenchAir;

    var gameFighterGroundAttack = Ground[gameID];
    var gameBenchGround = Ground[gameBenchID];
    var gameGroundAttack = gameFighterGroundAttack + gameBenchGround;


    
    // apply game formula
    
    var userAttackStrength;
    var gameAttackStrength;
    var userAttack;
    var gameAttack;


    if(airVground==="air"){
    
        userAttackStrength = 1 - Math.pow(Math.random(), 5);
        gameAttackStrength = 1 - Math.pow(Math.random(), 5);
        userAttack = gameFighterAirAttack * gameAttackStrength;
        gameAttack = fighterAirAttack * userAttackStrength;
        HP[userID] -= userAttack;
        HP[gameID] -= gameAttack;
        Air[userID] += attackIncrease;
        Air[gameID] += attackIncrease;
        
    }
    
    if(airVground==="ground"){
        
        // creating a random number that stays close to 1 for attack strength
        userAttackStrength = Math.pow(Math.random(), 5);
        gameAttackStrength = Math.pow(Math.random(), 5);

        if(gameChild.attr("class")==="ground"){
            console.log("game Ground");
            userAttack = gameFighterAirAttack * gameAttackStrength;
            gameAttack = fighterGroundAttack * userAttackStrength;
            HP[userID] -= gameFighterAirAttack * gameAttackStrength;
            HP[gameID] -= fighterGroundAttack * userAttackStrength;
            Air[userID] += attackIncrease;
            Ground[gameID] += attackIncrease;
            
        }else if(userChild.attr("class")==="ground"){
            console.log("user Ground");
            userAttack = gameFighterGroundAttack * gameAttackStrength;
            gameAttack = fighterAirAttack * userAttackStrength;
            HP[userID] -= gameFighterGroundAttack * gameAttackStrength;
            HP[gameID] -= fighterAirAttack * userAttackStrength;
            Ground[userID] += attackIncrease;
            Air[gameID] += attackIncrease;

        }else{
            console.log("both air");
            userAttack = gameFighterAirAttack * gameAttackStrength;
            gameAttack = fighterAirAttack * userAttackStrength;
            HP[userID] -= gameFighterAirAttack * gameAttackStrength;
            HP[gameID] -= fighterAirAttack * userAttackStrength;
            Air[userID] += attackIncrease;
            Air[gameID] += attackIncrease;

        }

    }

    if(userBench.children().length === 0){
        userHP = parseInt(fighterHP);
        userAirAttack = parseInt(fighterAirAttack)
        userGroundAttack = parseInt(fighterGroundAttack)
        
        gameHP = parseInt(gameFighterHP);
        gameAirAttack = parseInt(gameFighterAirAttack)
        gameGroundAttack = parseInt(gameFighterGroundAttack)
    }else
    if(userBox.children().length === 0){
        userHP = parseInt(userBenchHP);
        userAirAttack = parseInt(userBenchAir);
        userGroundAttack = parseInt(userBenchGround);

        gameHP = parseInt(gameBenchHP);
        gameAirAttack = parseInt(gameBenchAir);
        gameGroundAttack = parseInt(gameBenchGround);
    }else
    if(gameBench.children().length > 0 && gameBench.children().length > 0){
        userHP = parseInt(fighterHP) + parseInt(userBenchHP);
        userAirAttack = parseInt(fighterAirAttack) + parseInt(userBenchAir);
        userGroundAttack = parseInt(fighterGroundAttack) + parseInt(userBenchGround);
        
        gameHP = parseInt(gameFighterHP) + parseInt(gameBenchHP);
        gameAirAttack = parseInt(gameFighterAirAttack) + parseInt(gameBenchAir);
        gameGroundAttack = parseInt(gameFighterGroundAttack) + parseInt(gameBenchGround);
    }
    
    

    
    
    // team stats
    $("#userHP").text(Math.floor(userHP));
    $("#userAirAttack").text(Math.floor(userAirAttack));
    $("#userGroundAttack").text(Math.floor(userGroundAttack));
    
    $("#gameHP").text(Math.floor(gameHP));
    $("#gameAirAttack").text(Math.floor(gameAirAttack));
    $("#gameGroundAttack").text(Math.floor(gameGroundAttack));
    
    // individual stats
    $("#fighterID").text(userID);
    $("#fighterHP").text(Math.floor(HP[userID]));
    $("#fighterAirAttack").text(Math.floor(Air[userID]));
    $("#fighterGroundAttack").text(Math.floor(Ground[userID]));
    
    $("#gameFighterID").text(gameID);
    $("#gameFighterHP").text(Math.floor(HP[gameID]));
    $("#gameFighterAirAttack").text(Math.floor(Air[gameID]));
    $("#gameFighterGroundAttack").text(Math.floor(Ground[gameID]));

    if(airVground==="air"){
        $("#fighterAttack").text(Math.floor(gameFighterAirAttack * userAttackStrength));
        $("#gameAttack").text(Math.floor(fighterAirAttack * gameAttackStrength));
    }else if(airVground==="ground"){
        $("#fighterAttack").text(Math.floor(gameFighterGroundAttack * userAttackStrength));
        $("#gameAttack").text(Math.floor(fighterGroundAttack * gameAttackStrength));
    }


    // dying and losing or winning if you're so lucky
    for(var i=0; i<4; i++){
        if(HP[i] <= 0){
            HP[i] = 1;
            $(".pick").text("someone just died");
            
            userBox.children().appendTo(userBench);
            gameBox.children().appendTo(gameBench);
            document.getElementById(i).remove();

            if(userBench.children().length===0){
                $(".pick").text("You Lose!")
                inGame = false
                losses ++;
            }
            if(gameBench.children().length===0){
                $(".pick").text("You win!")
                inGame = false
                wins ++;
            }
        }
    }
    
    
    $("#wins").text(wins);
    $("#losses").text(losses);



    document.getElementById(20).innerHTML = `HP: ${Math.floor(HP[0])}`;
    document.getElementById(21).innerHTML = `HP: ${Math.floor(HP[1])}`;
    document.getElementById(22).innerHTML = `HP: ${Math.floor(HP[2])}`;
    document.getElementById(23).innerHTML = `HP: ${Math.floor(HP[3])}`;
    document.getElementById(30).innerHTML = `Air: ${Air[0]}`;
    document.getElementById(31).innerHTML = `Air: ${Air[1]}`;
    document.getElementById(32).innerHTML = `Air: ${Air[2]}`;
    document.getElementById(33).innerHTML = `Air: ${Air[3]}`;
    document.getElementById(40).innerHTML = `Ground: ${Ground[0]}`;
    document.getElementById(41).innerHTML = `Ground: ${Ground[1]}`;
    document.getElementById(42).innerHTML = `Ground: ${Ground[2]}`;
    document.getElementById(43).innerHTML = `Ground: ${Ground[3]}`;
}
}


/*
    
    
    -fix the winning and losing conditions and add wins/loss counters
*/

