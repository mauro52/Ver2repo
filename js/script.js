//Game Difficulty defaults
let gameDif = "";
let dungeonRooms = 3;

//player info
const playerStats = {
    name: "",
    lvl: 1,
    hp: 5,
    attack: 2,
}

//enemy info
const enemyStats = {
    lvl: 1,
    baseHp: 1,
    baseAttack: 1,

    calculateHP() {
        return this.baseHp + this.lvl;
    },

    calculateAttack() {
        return this.baseAttack + this.lvl;
    },
}

//final Score
const dungeonScore = {
    kills: 0,
    rooms: 0,
    items: 0
}

//enemy types
const enemies = ["an Orc", "a Goblin", "Bats", "Rats"];

//dungeon Rooms and descriptions
const roomsDescriptions = {
    roomName: ["a Chamber", "a Crypt", "an Alchemy Laboratory", "a Treasure Vault", "the Prison Cells", "the Statue Room"],
    roomDesc: ["Torch sconces line the stone walls, casting flickering shadows across the dusty floor. A heavy iron door stands ajar, its hinges creaking softly in the stale air.", "Stone sarcophagi rest in alcoves along the walls, their lids adorned with faded runes. The air is thick with the scent of decay, and cobwebs cling to the ceiling like spectral veils.", "Shelves packed with dusty vials and jars line the walls, each containing mysterious substances of various hues. A bubbling cauldron sits atop a crackling fire, sending tendrils of colored smoke into the air.", "Piles of glittering gold coins and precious gems sparkle in the dim light, heaped upon ancient stone pedestals. Jeweled artifacts and ornate weapons are displayed upon velvet-lined shelves, their surfaces polished to a high sheen.", "Iron bars divide the cramped chambers, each containing a rusted cot and a straw-strewn floor. Faint echoes of distant moans and rattling chains fill the oppressive silence, lending an eerie atmosphere to the cold, damp air.", "A grand throne of ornately carved stone dominates the chamber, flanked by towering statues of forgotten kings. Tattered banners hang from the walls, their faded colors bearing the sigils of long-extinct noble houses."]
}

//start game button visibility and fire event game
function startButton(vis) {
    button = document.getElementById("startGame");
    button.style.visibility = vis;
    button.addEventListener("click", function () { htmlArrange("none", "menuArea"); htmlArrange("block", "playArea"); exploration(); });
}

//Prepare if need two js.
function currentpage() {
    if (location.pathname == `/index.html`) {
        menuStart();
    }
}

function menuStart() {
    //Hide Start Game Button
    startButton('hidden');
    //Hide Play Area in Menu
    htmlArrange("none", "playArea");

    //Get buttons Ids and fire PlayerName and Difficulty Functions.
    let playerNameButton = document.getElementById("playerNamebutton");
    playerNameButton.addEventListener("click", function () { getPlayerName() });

    let difButton = document.getElementById("difButton");
    difButton.addEventListener("click", function () { gameDifficulty() });
}

function getPlayerName() {
    playerStats.name = document.getElementById("playerName").value;

    if (playerStats.name === null || playerStats.name === "") {
        document.getElementById("spanName").style.color = "red";
        let names = ["Blade", "Lego", "Mah", "Lyrion", "Elyndra", "Thalindra", "Kaelithar"];
        min = 0;
        max = names.length - 1;
        playerStats.name = names[Math.floor(Math.random() * (max - min + 1)) + min];
    }
    document.getElementById("spanName").style.color = "red";
    document.getElementById("spanName").innerHTML = playerStats.name;
}

function gameDifficulty() {
    if (playerStats.name === null || playerStats.name === "") { return }

    if (document.getElementById("difEasy").checked) {
        gameDif = "Easy";
    } else if (document.getElementById("difHard").checked) {
        gameDif = "Hard";
        dungeonRooms = 5;
    }

    if (gameDif === null || gameDif === "") { return }

    startGame();
    startButton('visible');
}

//Game Summary and Start.
function startGame() {
    let getContent = document.getElementById("contentStart")
    getContent.innerHTML = `<p>Bienvenido ${playerStats.name}, la dificultad elegida es ${gameDif} y el Dungeon incluye ${dungeonRooms} rooms</>`
}

// Fc to hide or display HTML (MenuArea and PlayArea)
function htmlArrange(blockOrNone, theID) {
    let x = document.getElementById(theID);
    x.style.display = blockOrNone;
}

function playAreaHTMLroom(xroom, ydesc) {
    let getID = document.getElementById("room");
    getID.innerHTML = `You are in ${xroom}`;

    let getID2 = document.getElementById("roomDesc");
    getID2.innerHTML = ydesc;
}

function playAreaHTMLencounter(xenemy){
    let getID = document.getElementById("encounter");
    getID.innerHTML = `You encountered ${xenemy}!`;
    getID.style.color = 'red';
}

function exploration() {
    while (dungeonRooms > 0) {
        //Get index of Random room and description
        min = 0;
        max = roomsDescriptions.roomName.length - 1;
        let indexRoom = Math.floor(Math.random() * (max - min + 1)) + min;

        let currentRoom = roomsDescriptions.roomName[indexRoom];
        let currentRoomDesc = roomsDescriptions.roomDesc[indexRoom];

        playAreaHTMLroom(currentRoom, currentRoomDesc);

        dungeonRooms--;

        //check for encounter (combat) and treasure
        let encounter = Math.random();
        let checktreasure = Math.random();

        if (encounter <= 0.5) {
            //Select random enemy
            min = 0;
            max = enemies.length - 1;
            currentEnemy = enemies[Math.floor(Math.random() * (max - min + 1)) + min];
            playAreaHTMLencounter(currentEnemy);

            //get Action buttons
            let attackbutton = document.getElementById("attack");
            attackbutton.addEventListener("click", function () { combat(currentEnemy) });

            let escapebutton = document.getElementById("escape");
            // Si escapa, no puede buscar tesoros.
            escapebutton.addEventListener("click", function () { checktreasure = 0});

            //Si hace Search pero hay Encounter. - Algo XXXX
            let searchbutton = document.getElementById("search");
            searchbutton.addEventListener("click", function () { combat(currentEnemy) });

        }
        if (checktreasure >= 0.75) {
            treasure();
        }
    }
    exit();
    score();
}

function exit() {
    console.log("Encontraste la salida del Dungeon, felicitaciones.");
}

function score() {
    console.log(`Recorriste ${dungeonScore.rooms} salas, mataste ${dungeonScore.kills} de los enemigos y encontraste ${dungeonScore.items} de los tesoros`);
}

function combat(enemy) {
    console.log(`Combates con ${enemy} y ganas la batalla. Continuas explorando.`);
    dungeonScore.kills++;
}

function treasure() {
    console.log("Luego de recorrer la sala, encuentras un tesoro al explorar tus alrededores.");
    dungeonScore.items++;
}

currentpage();