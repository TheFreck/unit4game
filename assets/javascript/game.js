

//These are the contenders who will duke it out

var interceptor = {
    name: "interceptor",
    HP: 100,
    groundAttack: 1,
    airAttack: 12,
}

var fighter = {
    name: "fighter",
    HP: 125,
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
    HP: 175,
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

// the players enter the arena

// add contenders button
function addContenders(){

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
        ID++;
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
        contender.text(planeType.name + "HP: " + planeType.HP);
        contender.appendTo(".dugout");
        
        var nameBanner = $("<section>");
        var hpBanner = $("<section>");
        var airBanner = $("<section>");
        var groundBanner = $("<section>");
        contender.append(nameBanner);
        contender.append(hpBanner);
        contender.append(airBanner);
        contender.append(groundBanner);
    
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
        $(".pick").text("Move one of your planes into the arena. Then 'Fight!'");
    
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


var userBench = $("#userBench")
var gameBench = $("#gameBench")
var userBox = $("#userBox");
var gameBox = $("#gameBox");

// fight!
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
        
        userAttackStrength = Math.pow(Math.random(), 5);
        gameAttackStrength = Math.pow(Math.random(), 5);

        if(gameChild.attr("class")==="ground"){

            userAttack = gameFighterGroundAttack * gameAttackStrength;
            gameAttack = fighterAirAttack * userAttackStrength;
            HP[userID] -= gameFighterAirAttack * gameAttackStrength;
            HP[gameID] -= fighterGroundAttack * userAttackStrength;
            Air[userID] += attackIncrease;
            Ground[gameID] += attackIncrease;
            
        }else if(userChild.attr("class")==="ground"){
            
            userAttack = gameFighterAirAttack * gameAttackStrength;
            gameAttack = fighterGroundAttack * userAttackStrength;
            HP[userID] -= gameFighterGroundAttack * gameAttackStrength;
            HP[gameID] -= fighterAirAttack * userAttackStrength;
            Ground[userID] += attackIncrease;
            Air[gameID] += attackIncrease;

        }else{

            userAttack = gameFighterAirAttack * gameAttackStrength;
            gameAttack = fighterAirAttack * userAttackStrength;
            HP[userID] -= gameFighterAirAttack * gameAttackStrength;
            HP[gameID] -= fighterAirAttack * userAttackStrength;
            Air[userID] += attackIncrease;
            Air[gameID] += attackIncrease;

        }

    }
    
    userHP = parseInt(fighterHP) + parseInt(userBenchHP);
    userAirAttack = parseInt(fighterAirAttack) + parseInt(userBenchAir);
    userGroundAttack = parseInt(fighterGroundAttack) + parseInt(userBenchGround);
    
    gameHP = parseInt(gameFighterHP) + parseInt(gameBenchHP);
    gameAirAttack = parseInt(gameFighterAirAttack) + parseInt(gameBenchAir);
    gameGroundAttack = parseInt(gameFighterGroundAttack) + parseInt(gameBenchGround);
    
    
    // team stats
    $("#userHP").text(Math.floor(userHP));
    console.log("userHP",userHP);
    $("#userAirAttack").text(Math.floor(userAirAttack));
    console.log("userAirAttack",userAirAttack);
    $("#userGroundAttack").text(Math.floor(userGroundAttack));
    console.log("userGroundAttack",userGroundAttack);
    
    $("#gameHP").text(Math.floor(gameHP));
    console.log("gameHP",gameHP);
    $("#gameAirAttack").text(Math.floor(gameAirAttack));
    console.log("gameAir",gameAirAttack);
    $("#gameGroundAttack").text(Math.floor(gameGroundAttack));
    console.log("gameGroundAttack",gameGroundAttack);
    
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
        if(HP[i]<0){
            $(".pick").text("someone just died");
            document.getElementById(i).remove();
            if(userHP <= 0){
                $(".pick").text("You Lose");
                //user loses
                console.log("user loses");
                inGame = false;
                losses ++;
            }
            if(gameHP <= 0){
                $(".pick").text("You Win!!!");
                //game loses
                console.log("game loses");
                inGame = false;
                wins ++;
            }
        }
    }

console.log("HP",HP);
console.log("Air",Air);
console.log("Ground",Ground);
}
}


/*
    -fix the scoreboard so that the top is balanced and the bottom shows for ground missions
    -attach stats to the banners on each plane and space out the banners so they're all visible
    -clean up the team scoreboard so it doesn't show NaN when only one team mate remains
*/

