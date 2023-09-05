let canvas;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    //drawTree(windowWidth / 2, windowHeight / 2, 20, 60, 0.2);
    drawIsland();
    //ellipse(middleRandom() * 100 + windowWidth / 2, windowHeight / 2, 50, 30);
}

function keyPressed() {
    if (keyCode === 82) { // spacebar
        clear();
        drawIsland();
    }
}

function drawIsland() {

    //draws water
    fill(47, 101, 189);
    rect(0, 0, windowWidth, windowWidth);

    //draws Beach
    fill(167, 171, 65);
    ellipse(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 3);

    //draws Island
    fill(150, 179, 84);
    ellipse(windowWidth / 2, windowHeight / 2, windowWidth / 3, windowHeight / 4);

    //draws forest 
    drawWoods(windowWidth / 2, -30 + windowHeight / 2, 25, 100, 10, 60);

    //draws lake
    fill(47, 101, 189);
}

function drawWoods(x, y, num, radius, maxWidth, maxHeight) {
    for (let index = 0; index < num; index++) {
        drawTree(x + middleRandom() * radius, y + middleRandom() * radius, Math.random() * maxWidth, Math.random() * maxHeight, Math.random());
    }
}


//Draws a tree at position x and y with a width and height
function drawTree(x, y, w, h, trunkPercent = 0.5) {
    w < 5 ? w = 5 : w = w;

    let halfWidth = w / 2;
    let trunkHeight = h * trunkPercent;

    fill(getRandomNumberInRange(82, 130),
        getRandomNumberInRange(65, 68),
        getRandomNumberInRange(8, 51));
    rect(x - halfWidth, y, w, trunkHeight, 0, 0, w * 0.5, w * 0.5);

    fill(getRandomNumberInRange(100, 120),
        getRandomNumberInRange(120, 200),
        getRandomNumberInRange(12, 50));
    triangle(x - w, y, x + w, y, x, y - (h * 1 - trunkPercent));
}

//Returns a random number between -0.5 and 0.5, used to simplify formulas
function middleRandom() {
    return Math.random() - 0.5;
}


/** Created with ChatGPT
 * Generates a random number between min and max (inclusive)
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - The generated random number
 */
function getRandomNumberInRange(min, max) {
    if (max < min) {
        throw new Error('Max must be greater than min');
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}

