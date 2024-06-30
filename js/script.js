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

//enemy info (evolucion del juego)
const enemyStats = {
    currentEnemy: "",
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

//imvemtory
let inventario = [];

//get IDs
let attackbutton = document.getElementById("attack");
attackbutton.style.display = "none";
attackbutton.addEventListener("click", function () { combat(); });

let invbutton = document.getElementById("inventory");
invbutton.addEventListener("click", function () { inventoryDisplay(); });

let searchbutton = document.getElementById("search");
searchbutton.style.display = "none";
searchbutton.addEventListener("click", function () { searchInRoom(); });

let nextRoom = document.getElementById("nextRoom");
nextRoom.addEventListener("click", () => { nextR(); });

stbutton = document.getElementById("startGame");
stbutton.addEventListener("click", () => { htmlArrange("none", "menuArea"); htmlArrange("block", "playArea"); gameManager(); });

let iDencounter = document.getElementById("encounter");

let finalScore = document.getElementById("finalScore");

//start game button visibility and start game loop button.
function startButton(vis) {
    stbutton.style.visibility = vis;
}

//MENU
function menuStart() {
    //Hide Start Game Button
    startButton('hidden');
    //Hide Play Area in Menu
    htmlArrange("none", "playArea");

    finalScore.style.display = "none";

    //Get buttons Ids and fire PlayerName and Difficulty Functions.
    let playerNameButton = document.getElementById("playerNamebutton");
    playerNameButton.addEventListener("click", function () { getPlayerName() });

    let difButton = document.getElementById("difButton");
    difButton.addEventListener("click", function () { gameDifficulty() });
}

async function getPlayerName() {
    try{
    playerStats.name = document.getElementById("playerName").value;

    if (playerStats.name === null || playerStats.name === "") {
        document.getElementById("spanName").style.color = "red";
        const res = await fetch("names.json");
        const data = await res.json();
        min = 0;
        max = data.length - 1;
        playerStats.name = data[Math.floor(Math.random() * (max - min + 1)) + min];
    }
    document.getElementById("spanName").style.color = "red";
    document.getElementById("spanName").innerHTML = playerStats.name;
}
catch(error){
    console.log(error)
    Swal.fire({
        title: "Nombre incorrecto!",
        text: "Lo sentimos, este es el error: " + error,
        icon: "question"
      });
}
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

//Game Summary before starting
function startGame() {
    let last = localStorage.getItem("Last Game");

    let lastP = document.getElementById("lastGame");
    const items = { ...localStorage }

    Object.keys(items).forEach((item) => {
        let para = document.createElement("p");
        para.textContent = `Your Games: ${items[item]}`;
        lastP.appendChild(para);

        lastP.style.color = "red";
    });

    let getContent = document.getElementById("contentStart")
    getContent.innerHTML = `Bienvenido ${playerStats.name}, la dificultad elegida es ${gameDif} y el Dungeon incluye ${dungeonRooms} rooms`

}

// Func to hide/display HTML (MenuArea and PlayArea)
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

function playAreaHTMLencounter(xenemy) {
    iDencounter.innerHTML = `You encountered ${xenemy}!`;
    iDencounter.style.color = 'red';
}

//START Rooms
function gameManager() {
    presentRoom();
    encounterinRoom();
}

async function presentRoom() {
    //Get index of Random room and description
    const res = await fetch("rooms.json");
    const data = await res.json();

    min = 0;
    max = data.roomName.length - 1;
    let indexRoom = Math.floor(Math.random() * (max - min + 1)) + min;
    let currentRoom = data.roomName[indexRoom];
    let currentRoomDesc = data.roomDesc[indexRoom];

    playAreaHTMLroom(currentRoom, currentRoomDesc);
    dungeonRooms--;
    dungeonScore.rooms++;
}

async function encounterinRoom() {
    //check for encounter (combat)
    let encounter = Math.random();

    if (encounter <= 0.5) {
        iDencounter.style.display = "block";
        const res = await fetch("assets.json");
        const data = await res.json();

        min = 0;
        max = data.enemies.length - 1;

        let index = Math.floor(Math.random() * (max - min + 1)) + min;
        enemyStats.currentEnemy = data.enemies[index];

        playAreaHTMLencounter(enemyStats.currentEnemy);
        attackbutton.style.display = "flex";
    }
    else {
        iDencounter.style.display = "none";
    }
    searchbutton.style.display = "flex"
}

async function searchInRoom() {
    let checktreasure = Math.random();
    if (checktreasure <= 0.55) {
        const res = await fetch("assets.json");
        const data = await res.json();

        min = 0;
        max = data.itemPool.length - 1;

        GotItem = data.itemPool[Math.floor(Math.random() * (max - min + 1)) + min];
        inventario.push(GotItem);
        dungeonScore.items++;

        let itemInfo = document.getElementById("itemInfo");
        itemInfo.textContent = `You got ${GotItem}`;
        setTimeout(() => { itemInfo.textContent = "" }, 3000);
    } else {
        itemInfo.textContent = 'You found nothing';
        setTimeout(() => { itemInfo.textContent = "" }, 3000);
    }
    searchbutton.style.display = "none";
};

//Next Room
function nextR() {
    if (dungeonRooms > 0) {
        gameManager();
        invbutton.style.display = "flex";
    }

    if (dungeonRooms <= 0) {
        nextRoom.textContent = "Exit Dungeon";
        nextRoom.addEventListener("click", () => {
            htmlArrange("none", "playArea");
            finalScore.style.display = "block";
            let texto = `Recorriste ${dungeonScore.rooms} salas, mataste ${dungeonScore.kills} de los enemigos y encontraste ${dungeonScore.items} de los tesoros <br> Closing in: <b></b>`;

            let timerInterval;

            Swal.fire({
                title: "Game Finished!",
                html: texto,
                timer: 4000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.reload();
                }
            });

            lastGame();
        })
    }
}

function lastGame() {
    let numero = localStorage.length++
    localStorage.setItem('Last Game' + numero, `${playerStats.name} recorriste ${dungeonScore.rooms} salas, encontraste la salida, mataste ${dungeonScore.kills} de los enemigos y encontraste ${dungeonScore.items} de los tesoros`);
}

//Show Inventory with Timer
function inventoryDisplay() {
    invbutton.style.display = "none";
    let id = document.getElementById("inventoryDis");

    if (inventario[0] == "" || inventario[0] == null) {
        let newItem = document.createElement("p");
        newItem.textContent = `Nothing in the inventory`
        id.appendChild(newItem);
        setTimeout(() => { id.removeChild(newItem); }, 3000);
    }

    inventario.forEach(x => {
        let newItem = document.createElement("p");
        newItem.textContent = ` \n${x}`
        id.appendChild(newItem);
        setTimeout(() => { id.removeChild(newItem); }, 3000);
    })
}

function combat() {
    dungeonScore.kills++;
    attackbutton.style.display = "none";
    let enemyInfo = document.getElementById("enemyInfo");
    enemyInfo.textContent = "You killed your enemy";
    setTimeout(() => { enemyInfo.textContent = "" }, 3000);
}

menuStart();