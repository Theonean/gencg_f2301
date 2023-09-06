let canvas;
let uiVisible = true; // Variable to toggle UI visibility CHATGPT


// Expose with sliders or buttons CHATGPT
let squareSideSlider;
let offsetXSlider, offsetYSlider, squareInbetweenDistanceSlider;
let innerRotationMultiplierSlider, rowsSlider, columnsSlider;
let timeSpeedSlider, framerateSlider, randomFlickeringCheckbox;
let redMultiplierSlider, greenMultiplierSlider, blueMultiplierSlider;

//Expose with sliders or buttons
//FROM HERE
let movingX = 0;
let movingY = 0;
let squareSide = 100;
let offsetX = -squareSide * 4;
let offsetY = -squareSide * 3;
let squareInbetweenDistance = squareSide * 1.1;
let innerRotationMultiplier = 2;
let columns = 20;
let rows = 12;
let timeSpeed = 0.01;
let framerate = 15;
let randomFlickeringEnabled = false;
let redMultiplier = 30;
let greenMultiplier = 40;
let blueMultiplier = 50;

// Time variable
let t = 0;
//UNTIL HERE

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    createUI();
    updateFromUI();
}

function draw() {
    updateFromUI();
    clear();

    // Change innerRotationMultiplier over time
    innerRotationMultiplier = sin(t) * 3.0;

    //r = row
    for (let r = 0; r < rows; r++) {
        //c = column, starts with 2 so everything has atleast 1 inner square
        for (let c = 2; c < columns; c++) {

            //Offset moves the grid around
            let squareX = c * squareInbetweenDistance + offsetX + movingX;
            let squareY = r * squareInbetweenDistance + offsetY + movingY;

            let innerSquareSide = squareSide;

            let innerOffsetX = 0;
            let innerOffsetY = 0;

            let recursiveSquareNumbah = randomFlickeringEnabled ? Math.random() * 5 : c;
            //Draw inner squares
            for (let cRec = 1; cRec < recursiveSquareNumbah; cRec++) {
                //recursive inner squares become smaller
                innerSquareSide *= 0.8;  // adjust this factor as you like
                innerOffsetX = (squareSide - innerSquareSide) / 2;
                innerOffsetY = (squareSide - innerSquareSide) / 2;

                //Change these variables over time


                let squareTopLeftX = squareX + innerOffsetX; //moves line over time
                let squareTopLeftY = squareY + innerOffsetY;
                let squareTopRightX = squareTopLeftX + innerSquareSide;
                let squareTopRightY = squareTopLeftY;
                let squareBottomLeftX = squareTopLeftX;
                let squareBottomLeftY = squareTopLeftY + innerSquareSide;
                let squareBottomRightX = squareTopRightX;
                let squareBottomRightY = squareBottomLeftY;
                let rotation = cRec * innerRotationMultiplier;

                strokeWeight(2);
                stroke(255);

                push();
                translate(squareX + innerOffsetX + innerSquareSide / 2, squareY + innerOffsetY + innerSquareSide / 2);
                if (c % 2 == r % 2) {
                    rotate(rotation);
                }
                else {
                    rotate(-rotation)
                }
                translate(-squareX - innerOffsetX - innerSquareSide / 2, -squareY - innerOffsetY - innerSquareSide / 2);

                fill(cRec * redMultiplier, cRec * blueMultiplier, cRec * greenMultiplier);

                // Draw a filled square
                beginShape();
                vertex(squareTopLeftX, squareTopLeftY);
                vertex(squareTopRightX, squareTopRightY);
                vertex(squareBottomRightX, squareBottomRightY);
                vertex(squareBottomLeftX, squareBottomLeftY);
                endShape(CLOSE);
                pop();
                //square(squareX + innerOffsetX, squareY + innerOffsetY, innerSquareSide);
            }

        }
    }

    //Change variables over time
    //Rotate over time
    //innerRotationMultiplier = innerRotationMultiplier < PI ? innerRotationMultiplier + 0.01 : 0;

    //opens up square

    // Change movingX and movingY over time (or however you'd like to update them)
    movingX += cos(t) * 0.5;
    movingY += sin(t) * 0.5;

    // Increment time variable
    t += timeSpeed;

    let nextX = movingX;
    let nextY = movingY;
    nextX = constrain(nextX, 0, windowWidth);
    nextY = constrain(nextY, 0, windowHeight);

    movingX = nextX;
    movingY = nextY;
}
/*
// you can put it in the mousePressed function,
// or keyPressed for example
function keyPressed() {
    // this will download the first 5 seconds of the animation!
    if (key === 's') {
        saveGif('mySketch', 5);
    }
}*/

//CHATGPT CODE TO CREATE UI
// Create UI elements
function createUI() {

    squareSideSlider = createSlider(50, 200, 100);
    offsetXSlider = createSlider(-500, 500, -400);
    offsetYSlider = createSlider(-500, 500, -300);
    squareInbetweenDistanceSlider = createSlider(50, 200, 110);
    innerRotationMultiplierSlider = createSlider(0, 5, 2, 0.1);
    rowsSlider = createSlider(1, 50, 12);
    columnsSlider = createSlider(1, 50, 20);
    timeSpeedSlider = createSlider(0, 0.1, 0.01, 0.001);
    framerateSlider = createSlider(1, 60, 15);
    redMultiplierSlider = createSlider(0, 255, 30);
    greenMultiplierSlider = createSlider(0, 255, 40);
    blueMultiplierSlider = createSlider(0, 255, 50);
    randomFlickeringCheckbox = createCheckbox('Random Flickering', false);

    // Position UI elements
    let y = 10;
    let step = 30;
    squareSideSlider.position(10, y); y += step;
    offsetXSlider.position(10, y); y += step;
    offsetYSlider.position(10, y); y += step;
    squareInbetweenDistanceSlider.position(10, y); y += step;
    innerRotationMultiplierSlider.position(10, y); y += step;
    rowsSlider.position(10, y); y += step;
    columnsSlider.position(10, y); y += step;
    timeSpeedSlider.position(10, y); y += step;
    framerateSlider.position(10, y); y += step;
    redMultiplierSlider.position(10, y); y += step;
    greenMultiplierSlider.position(10, y); y += step;
    blueMultiplierSlider.position(10, y); y += step;
    randomFlickeringCheckbox.position(10, y); y += step;
}

// Update variables based on UI
function updateFromUI() {
    squareSide = squareSideSlider.value();
    offsetX = offsetXSlider.value();
    offsetY = offsetYSlider.value();
    squareInbetweenDistance = squareInbetweenDistanceSlider.value();
    innerRotationMultiplier = innerRotationMultiplierSlider.value();
    rows = rowsSlider.value();
    columns = columnsSlider.value();
    timeSpeed = timeSpeedSlider.value();
    framerate = framerateSlider.value();
    redMultiplier = redMultiplierSlider.value();
    greenMultiplier = greenMultiplierSlider.value();
    blueMultiplier = blueMultiplierSlider.value();
    randomFlickeringEnabled = randomFlickeringCheckbox.checked();


    frameRate(framerate);
}

// Toggle UI visibility with spacebar
function keyPressed() {
    if (keyCode === 32) {
        uiVisible = !uiVisible;
        toggleUIVisibility();
    }
}

// Hide or show the UI
function toggleUIVisibility() {
    let state = uiVisible ? 'block' : 'none';
    movingXSlider.elt.style.display = state;
    movingYSlider.elt.style.display = state;
    squareSideSlider.elt.style.display = state;
    offsetXSlider.elt.style.display = state;
    offsetYSlider.elt.style.display = state;
    squareInbetweenDistanceSlider.elt.style.display = state;
    innerRotationMultiplierSlider.elt.style.display = state;
    rowsSlider.elt.style.display = state;
    columnsSlider.elt.style.display = state;
    timeSpeedSlider.elt.style.display = state;
    framerateSlider.elt.style.display = state;
    redMultiplierSlider.elt.style.display = state;
    greenMultiplierSlider.elt.style.display = state;
    blueMultiplierSlider.elt.style.display = state;
    randomFlickeringCheckbox.elt.style.display = state;
}
