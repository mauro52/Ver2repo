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

function menuHideStartGame(vis) {
    button = document.getElementById("startGame");
    button.style.visibility = vis;
    button.addEventListener("click", function () { document.location.href = '../pages/game.html' });

}

function currentpage() {
    if (location.pathname == `/index.html`) {
        menuStart();
    } else {
        console.log(playerStats.name);
    }
}

function menuStart() {

    menuHideStartGame('hidden');

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
        if (playerStats.name === null || playerStats.name === "") { return }

        if (document.getElementById("difEasy").checked) {
            gameDif = "Easy";
        } else if (document.getElementById("difHard").checked) {
            gameDif = "Hard";
            dungeonRooms = 5;
        }

        startGame();

        menuHideStartGame('visible');

    }
    function startGame() {
        let getContent = document.getElementById("contentStart")
        getContent.innerHTML = `<p>Bienvenido ${playerStats.name}, la dificultad elegida es ${gameDif} y el Dungeon incluye ${dungeonRooms} rooms</>`
    }
}


currentpage();
