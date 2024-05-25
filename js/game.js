
console.log(playerStats.name)



function exploration() {
    while (dungeonRooms > 0) {
        //Get index of Random room and description
        min = 0;
        max = roomsDescriptions.roomName.length - 1;
        let indexRoom = Math.floor(Math.random() * (max - min + 1)) + min;

        let currentRoom = roomsDescriptions.roomName[indexRoom];
        let currentRoomDesc = roomsDescriptions.roomDesc[indexRoom];

        alert(`${playerStats.name} Te encuentras en ${currentRoom}\n${currentRoomDesc}`);

        dungeonRooms--;

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
