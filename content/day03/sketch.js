let canvas;
let PacMap = [];

let lastMoveTime = 0;

//"agents" are pacmans that move around on board and represent time
//3 pacmans --> hour, minute, second
let agents = [];

let columns = 12;
let rows = 12;
let orbDistance = 0;
let orbSize = 0;
let offset = 30;
let speedup = 10;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    orbSize = windowHeight / (columns * 3);
    orbDistance = orbSize * 2.4;
    offX = windowWidth / 4;
    createMap();
    addPacmans();
    drawPacman();
}

function draw() {
    clear();

    drawMap();
    movePacmans();
    lastMoveTime = millis();
}

function createMap() {
    for (let c = 0; c < 12; c++) {
        PacMap[c] = [];
        for (let r = 0; r < 12; r++) {
            PacMap[c][r] = true;
            circle(c * orbDistance + offset, r * orbDistance + offset, orbSize);
        }
    }
    //disable starting positions 
    for (let i = 0; i < agents.length; i++) {
        PacMap[agents[i].startX][agents[i].startY] = false;
    }
}

function addPacmans() {
    addHourPacMan();
    addMinutePacMan();
    addSecondPacMan();
}

function addHourPacMan() {
    agents.push({
        name: "hour",
        OuR: 24,
        currX: 0,
        currY: 0,
        posX: offset,
        posY: 0 * orbDistance + offset,
        startX: 0,
        startY: 0,
        direction: "down"
    });

}

function addMinutePacMan() {

    agents.push({
        name: "minute",
        OuR: 60,
        currX: 2,
        currY: 0,
        posX: 2 * orbDistance + offset,
        posY: 0 * orbDistance + offset,
        startX: 2,
        startY: 0,
        direction: "down"
    });

}

function addSecondPacMan() {

    agents.push({
        name: "second",
        OuR: 60,
        currX: 7,
        currY: 0,
        posX: 7 * orbDistance + offset,
        posY: 0 * orbDistance + offset,
        startX: 7,
        startY: 0,
        direction: "down"
    });
}
//Draws the map during animation (orbs)
function drawMap() {
    for (let c = 0; c < 12; c++) {
        for (let r = 0; r < 12; r++) {
            //true means a circle can be placed, otherwise it has been eaten --> crumbs(?)
            if (PacMap[c][r]) {
                circle(c * orbDistance + offset, r * orbDistance + offset, orbSize);
            }
        }
    }
}


function movePacmans() {
    let deltaTime = millis() + speedup - lastMoveTime;
    let deltaSecond = deltaTime / 1000;
    let deltaMinute = deltaSecond / 60;
    let deltaHour = deltaMinute / 60;
    let deltaCalc = 0;

    for (let i = 0; i < agents.length; i++) {
        let pacMan = agents[i];
        calculateLogicalPosition(pacMan);

        switch (pacMan.name) {
            case "hour":
                deltaCalc = deltaHour
                break;
            case "minute":
                deltaCalc = deltaMinute;
                break;
            case "second":
                deltaCalc = deltaSecond;
                console.log(pacMan);
                break;
        }

        //move by amount of 1 distance over 1 second
        if (pacMan.direction == "down") {
            pacMan.posY += orbDistance * deltaCalc;
            if (pacMan.posY > 11 * orbDistance + offset) {
                pacMan.direction = "right";
            }

        }
        else if (pacMan.direction == "right") {
            pacMan.posX += orbDistance * deltaCalc;

        }
        //move up or set new direction to right when at top
        else if (pacMan.direction == "up") {
            pacMan.posY -= orbDistance * deltaCalc;

            if (pacMan.posY < 0 * orbDistance + offset) {
                pacMan.direction = "right";
            }
        }

        //console.log(pacMan.currX + " : " + pacMan.currY);
        //move pacmans current variables to next point
        //for now move everything over 1 second to next orb
        drawPacman(pacMan.posX, pacMan.posY);
    }
}

function calculateLogicalPosition(pacman) {
    let newX = Math.ceil((pacman.posX - offset) / orbDistance);
    let newY = Math.floor((pacman.posY - offset) / orbDistance);

    if (newX != pacman.currX || newY != pacman.currY) {
        // If pacman has moved to a new cell, set it to false.
        PacMap[newX][newY] = false;

        //we only go one tile to the right, then up. this guarantees that
        if (newX != pacman.currX ) {
            if (pacman.currY > 6) {
                pacman.direction = "up";
            } else {
                pacman.direction = "down";
            }
        }

        pacman.currX = newX;
        pacman.currY = newY;
        pacman.OuR -= 1;


        if (pacman.direction == "down" && newY == 11) {
            // Special case for when pacman is about to switch direction from down to right.
            PacMap[newX][newY] = false;
        } else if (pacman.direction == "right" && newX == pacman.startX && newY > 0) {
            // Special case for when pacman is about to switch direction from right to up.
            PacMap[newX][newY] = false;
        } else if (pacman.direction == "up" && newY == 0) {
            // Special case for when pacman is about to switch direction from up to right.
            PacMap[newX][newY] = false;
        }
    }

    //If no more orbs left (cycle done) reset to start position
    if (pacman.OuR > 0) {
        pacman.currX = newX;
        pacman.currY = newY;
    }
    //If no more orbs and at the bottom line, reset
    else if (pacman.posY > 11 * orbDistance + offset) {
        pacman.currX = pacman.startX;
        pacman.currY = pacman.startY;
        pacman.posX = pacman.currX * orbDistance + offset;
        pacman.posY = pacman.currY * orbDistance + offset;

        pacman.direction = "down"

        switch (pacman.name) {
            case "hour":
                pacman.OuR = 24;
                setPacTable(0, 0, 2, 12, true);
                break;
            case "minute":
                pacman.OuR = 60;
                setPacTable(2, 0, 7, 12, true);
                break;
            case "second":
                pacman.OuR = 60;
                setPacTable(7, 0, 12, 12, true);
                break;
        }
    }
}

function drawPacman(centerX, centerY) {
    circle(centerX, centerY, orbSize * 2);
}

//Fills a square of the pactable with either true or false
function setPacTable(startX, startY, endX, endY, toggle) {
    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            PacMap[x][y] = toggle;
        }
    }

    //disable starting positions 
    for (let i = 0; i < agents.length; i++) {
        PacMap[agents[i].startX][agents[i].startY] = false;
    }

}

//Pacman eats the orbs
//one segment of 24, two segments of 60 orbs for time
//