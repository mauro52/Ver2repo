//Game Difficulty defaults
let gameDif = "Easy";
let dungeonRooms = 3;

//player info
const playerStats = {
    name: "",
    lvl: 1,
    hp: 5,
    attack: 2
}

//enemy info
const enemyStats = {
    lvl: 1,
    hp: 2,
    attack: 1
}

const dungeonScore = {
    kills: 0,
    rooms: 0,
    items: 0
}

//enemy types
const enemies = ["un Orco", "un Goblin", "un Murcielago", "una Rata"];

//Dungeon Rooms and descriptions
const roomsDescriptions = {
    roomName: ["la Morgue", "la Cripta", "la Sala oscura", "la Bóveda", "la Prisión", "la Sala con una Estatua"],
    roomDesc: ["Antorchas enclavadas en las paredes de piedra proyectan sombras titilantes sobre el suelo polvoriento lleno de tripas. Una pesada puerta de hierro está entreabierta, sus bisagras crujen suavemente en el aire rancio.", "Sarcófagos de piedra descansan en nichos a lo largo de las paredes, sus tapas adornadas con runas descoloridas. El aire está cargado con el olor a descomposición, y telarañas se aferran al techo como velos espectrales.", "Estanterías llenas de frascos y tarros polvorientos alinean las paredes, cada uno conteniendo sustancias misteriosas de varios colores. Un caldero burbujeante se encuentra sobre un fuego crepitante, enviando volutas de humo coloreado al aire.", "Montones de relucientes monedas de oro y gemas preciosas brillan en la luz tenue, amontonadas sobre pedestales de piedra antiguos. Artefactos engastados con joyas y armas ornamentadas se exhiben en estantes forrados de terciopelo, sus superficies pulidas hasta obtener un brillo intenso.", "Barras de hierro dividen las cámaras angostas, cada una con una cama oxidada y un suelo cubierto de paja. Ecos tenues de gemidos distantes y cadenas que golpean llenan el silencio opresivo, otorgando una atmósfera inquietante al aire frío y húmedo.", "Una estatua grandiosa de piedra tallada domina la cámara, flanqueado por otros adornos imponentes de reyes olvidados. Banderas desgarradas cuelgan de las paredes, sus colores descoloridos llevan los sigilos de casas nobles hace mucho extintas."]
}

let playerNameButton = document.getElementById("playerNamebutton");
playerNameButton.addEventListener("click", function () { getPlayerName() });

function getPlayerName() {
    playerStats.name = document.getElementById("playerName").value;

    if (playerStats.name === null || playerStats.name === "") {
        
        document.getElementById("spanName").innerHTML = "invalido. Elegiremos al azar";
        document.getElementById("spanName").style.color = "red";
        let names = ["Blade", "Lego", "Mah", "Lyrion", "Elyndra", "Thalindra", "Kaelithar"];
        min = 0;
        max = names.length - 1;
        playerStats.name = names[Math.floor(Math.random() * (max - min + 1)) + min];
    }
    document.getElementById("spanName").style.color = "red";
    document.getElementById("spanName").innerHTML = playerStats.name;
}

let difButton = document.getElementById("difButton");
difButton.addEventListener("click", function () { gameDifficulty() });

function gameDifficulty() {
    if (playerStats.name === null || playerStats.name === ""){return}

    if (document.getElementById("difEasy").checked) {
        gameDif = "Easy";
    } else if (document.getElementById("difHard").checked) {
        gameDif = "Hard";
        dungeonRooms = 5;
    }
    startGame();
}


function startGame() {
    let getContent = document.getElementById("contentStart")
    getContent.innerHTML = `<p>Bienvenido ${playerStats.name}, la dificultad elegida es ${gameDif} y el Dungeon incluye ${dungeonRooms} rooms</>`

}

function exploration() {
    while (dungeonRooms > 0) {
        //Get index of Random room and description
        min = 0;
        max = roomsDescriptions.roomName.length - 1;
        let indexRoom = Math.floor(Math.random() * (max - min + 1)) + min;

        let currentRoom = roomsDescriptions.roomName[indexRoom];
        let currentRoomDesc = roomsDescriptions.roomDesc[indexRoom];

        alert(`Te encuentras en ${currentRoom}\n${currentRoomDesc}`);

        dungeonRooms--;
        DeveloperView(dungeonRooms);

        //check for encounter (combat) and treasure
        let encounter = Math.random();
        let checktreasure = Math.random();

        if (encounter <= 0.5) {
            //Select random enemy
            min = 0;
            max = enemies.length - 1;
            currentEnemy = enemies[Math.floor(Math.random() * (max - min + 1)) + min];
            alert(`En ${currentRoom}, te encuentras con ${currentEnemy}`);

            let userInput;
            do {
                userInput = prompt(`1. Atacar\n2. Escapar:`);
            }
            while (userInput === null || userInput === "");

            if (userInput == "1") {
                combat(currentEnemy);
            }
            else if (userInput == "2") {
                console.log("escape");
                checktreasure = 0; // Si escapa, no puede buscar tesoros.
            }
            else {
                alert(`Respuesta inválida. ${currentEnemy} te ataca`);
                combat(currentEnemy);
            }
        }
        if (checktreasure >= 0.75) {
            treasure();
        }
    }
    exit();
    score();
}

function exit() {
    alert("Encontraste la salida del Dungeon, felicitaciones.");
}

function score() {
    alert(`Recorriste ${dungeonScore.rooms} salas, mataste ${dungeonScore.kills} de los enemigos y encontraste ${dungeonScore.items} de los tesoros`);
}

function combat(enemy) {
    alert(`Combates con ${enemy} y ganas la batalla. Continuas explorando.`)
    dungeonScore.kills++;
    // en desarrollo para proximas entregas
}

function treasure() {
    alert("Luego de recorrer la sala, encuentras un tesoro al explorar tus alrededores.");
    dungeonScore.items++;
    // en desarrollo para proximas entregas
}

//getPlayerName();
//gameDifficulty();
//startGame();
//exploration();
