let canvas;
let PacMap = [];

//"agents" are pacmans that move around on board and represent time
//3 pacmans --> hour, minute, second
let agents = [];

let columns = 12;
let rows = 12;
let orbDistance = 0;
let orbSize = 0;
let offset = 50;

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
    drawMap();
}

function createMap() {
    for (let c = 0; c < 12; c++) {
        PacMap[c] = [];
        for (let r = 0; r < 12; r++) {
            PacMap[c][r] = true;
            circle(c * orbDistance + offset, r * orbDistance + offset, orbSize);
        }
    }
}

function addPacmans() {
    agents.push({
        name: "hour",
        OuR: 24, //orbs until reset, when 0 pacman gets moved to start
        currX: 0,
        currY: 0,
        startX: 0,
        startY: 0
    });

    agents.push({
        name: "minute",
        OuR: 60, //orbs until reset, when 0 pacman gets moved to start
        currX: 0,
        currY: 0,
        startX: 2,
        startY: 0
    });

    agents.push({
        name: "second",
        OuR: 60, //orbs until reset, when 0 pacman gets moved to start
        currX: 0,
        currY: 0,
        startX: 7,
        startY: 0
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
    for (let i = 0; i < agents.length; i++) {
        let pacMan = agents[i];
    }
}

function drawPacman(centerX, centerY){
    
}

//Pacman eats the orbs
//one segment of 24, two segments of 60 orbs for time
//