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
let offset = 50;
let speedup = 10;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    orbSize = windowHeight / (columns * 3);
    orbDistance = orbSize * 2.4;
    offX = windowWidth / 4;
    createMap();
    addPacmans();

    angleMode(DEGREES);
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
        direction: "down",
        mouthStart: 120,
        mouthEnd: 60,
        mouthDirection: "closing"
    });

}

function addMinutePacMan() {

    agents.push({
        name: "minute",
        OuR: 60,
        currX: 2,
        currY: 0,
        posX: 2.05 * orbDistance + offset,
        posY: 0 * orbDistance + offset,
        startX: 2,
        startY: 0,
        direction: "down",
        mouthStart: 120,
        mouthEnd: 60,
        mouthDirection: "closing"
    });

}

function addSecondPacMan() {

    agents.push({
        name: "second",
        OuR: 60,
        currX: 7,
        currY: 0,
        posX: 7.05 * orbDistance + offset, //I am baffled, when i add the 005 its moved enough so Math.floor somehow doesnt magically just floor 7 to a 6
        posY: 0 * orbDistance + offset,
        startX: 7,
        startY: 0,
        direction: "down",
        mouthStart: 120,
        mouthEnd: 60,
        mouthDirection: "closing"
    });
}
//Draws the map during animation (orbs)
function drawMap() {
    for (let c = 0; c < 12; c++) {
        for (let r = 0; r < 12; r++) {
            //true means a circle can be placed, otherwise it has been eaten --> crumbs(?)
            if (PacMap[c][r]) {
                fill(123, 123, 123);
                circle(c * orbDistance + offset, r * orbDistance + offset, orbSize);
            }
        }
    }
}

function movePacmans() {
    let deltaTime = millis() + speedup - lastMoveTime;
    deltaSecond = deltaTime / 1000;
    deltaMinute = deltaSecond / 60;
    deltaHour = deltaMinute / 60;
    let deltaCalc = 0;

    for (let i = 0; i < agents.length; i++) {
        let pacMan = agents[i];

        switch (pacMan.name) {
            case "hour":
                deltaCalc = deltaHour;
                break;
            case "minute":
                deltaCalc = deltaMinute;
                break;
            case "second":
                deltaCalc = deltaSecond;
                break;
        }

        //move by amount of 1 distance over 1 second
        if (pacMan.direction == "down") {
            pacMan.posY += orbDistance * deltaCalc;
            if (pacMan.posY > 11 * orbDistance + offset) {
                pacMan.direction = "right";
                pacMan.mouthStart = 30;
                pacMan.mouthEnd = 330;
            }
        }
        else if (pacMan.direction == "right") {
            pacMan.posX += orbDistance * deltaCalc;

            //If moved to the right by one field go up or down again
            if (pacMan.posX > (pacMan.currX + 1) * orbDistance + offset) {
                if (pacMan.currY > 10) {
                    pacMan.direction = "up";
                    pacMan.mouthStart = 300;
                    pacMan.mouthEnd = 240;
                }
                else {
                    pacMan.direction = "down"
                }
            }
        }
        //move up or set new direction to right when at top
        else if (pacMan.direction == "up") {
            pacMan.posY -= orbDistance * deltaCalc;

            if (pacMan.posY < 0 * orbDistance + offset) {
                pacMan.direction = "right";
                pacMan.mouthStart = 30;
                pacMan.mouthEnd = 330;
            }
        }


        //console.log(pacMan.currX + " : " + pacMan.currY);
        //move pacmans current variables to next point
        //for now move everything over 1 second to next orb
        drawPacman(pacMan.posX, pacMan.posY, pacMan, deltaCalc);

        calculateLogicalPosition(pacMan);
    }
}

function calculateLogicalPosition(pacman) {
    let newX = Math.floor((pacman.posX - offset) / orbDistance);
    let newY = 0;

    if (pacman.direction == "up") {
        newY = Math.floor((pacman.posY - offset) / orbDistance);
    } else {
        newY = Math.ceil((pacman.posY - offset) / orbDistance);
    }

    if (newX != pacman.currX || newY != pacman.currY) {
        // If pacman has moved to a new cell, set its last cell to false.
        PacMap[pacman.currX][pacman.currY] = false;

        pacman.currX = newX;
        pacman.currY = newY;
        pacman.OuR -= 1;

        if (pacman.direction == "right") {
            // Special case for when pacman is about to switch direction from right to up.
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
        pacman.posX = (pacman.currX + 0.005) * orbDistance + offset;
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


function drawPacman(centerX, centerY, pacman, delta) {
    fill(255, 255, 102);

    if (pacman.mouthDirection == "closing") {
        if (pacman.direction == "up") {
            pacman.mouthStart -= 10 * delta;
            pacman.mouthEnd += 10 * delta;

            if (pacman.mouthStart < 275) {
                pacman.mouthDirection = "opening";
            }

        }
        else if (pacman.direction == "down") {
            pacman.mouthStart -= 10 * delta;
            pacman.mouthEnd += 10 * delta;

            if (pacman.mouthStart < 95) {
                pacman.mouthDirection = "opening";
                console.log("opening");
            }

        }
    }
    else if (pacman.mouthDirection == "opening") {

        if (pacman.direction == "up") {
            pacman.mouthStart += 10 * delta;
            pacman.mouthEnd -= 10 * delta;

            if (pacman.mouthStart > 300) {
                pacman.mouthDirection = "closing";
            }

        }
        else if (pacman.direction == "down") {
            pacman.mouthStart += 10 * delta;
            pacman.mouthEnd -= 10 * delta;

            if (pacman.mouthStart > 120) {
                pacman.mouthDirection = "closing";
                console.log("closing");
            }

        }
    }


    arc(centerX, centerY, orbSize * 2, orbSize * 2, pacman.mouthStart, pacman.mouthEnd);
}

function getPacManMouthMiddle(pacmanDirection) {
    switch (pacmanDirection) {
        case "down":
            return 90;
            break;
        case "right":
            return 0
            break;
        case "up":
            return -90;
            break;

    }
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