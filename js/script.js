
//Player Name
let player;
//Used for developer view / consolelog
let devParam = "Testing";
//Game Difficulty defaults
let gameDif = "Easy";
let dungeonRooms = 3;

const playerStats = {
    HP: 5,
    Attack: 2
}

const enemyStats = {
    HP: 2,
    Attack: 1
}

const roomsDescriptions =[ "Dark room", "Bright room", "Red room"];

function DeveloperView(devParam){
    //show variable on console
        console.log(devParam);
    }

function getPlayerName(){
    player = prompt("Ingrese Nombre del Jugador:");

    if (player === null || player === ""){
        alert("Nombre invalido");
        let names = ["Blade", "Lego", "Mah"];
        alert("Tu nombre será elegido aleatoreamente");
        min = 0;
        max = names.length -1;
        player = names[Math.floor(Math.random() * (max - min + 1)) + min];
    }
}

function gameDifficulty(){
    do {
        gameDif = prompt("Ingrese Dificultad:\n - Easy\n - Hard");
    }
    while (gameDif === null || gameDif === "" );

    if (gameDif == "Hard" || gameDif == "hard"){
        dungeonRooms = 5;
        alert("Dificultad elegida Hard");
        gameDif = "Hard";
    }
    else if (gameDif == "Easy" || gameDif == "easy"){
        alert("Dificultad elegida Easy");
        gameDif = "Easy"
    }
    else{
        alert("Dificultad invalida, seleccionaremos dificultad Easy");
        gameDif = "Easy";
    }
}

function startGame(){
    alert(`Bienvenido ${player}, la dificultad elegida es ${gameDif} y el Dungeon incluye ${dungeonRooms} rooms `);
}

function exploration(){
    while(dungeonRooms > 0){
    //Random room description
    min = 0;
    max = roomsDescriptions.length -1;
    currentRoom = roomsDescriptions[Math.floor(Math.random() * (max - min + 1)) + min];

    alert(`Te encuentras en una ${currentRoom}`);
    dungeonRooms--;
    DeveloperView(dungeonRooms);

    //check encounter and treasure
    let encounter = Math.random();
    let checktreasure = Math.random();
    console.log(checktreasure);
    console.log(encounter);
    
    if (encounter <= 0.5){
        combat();      
    } 
    if(checktreasure >= 0.75){
        console.log(checktreasure);
        treasure();    
    }
}
exit();
}

function exit(){
    console.log("salida");
}

function combat(){
console.log("combate");
}

function treasure(){
    console.log("tesoro");
}

getPlayerName();
gameDifficulty();
startGame();
exploration();
