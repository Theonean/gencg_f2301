let canvas;

let painting = false;
let rotation = 0;
let rotationFactor = 2;
let loudnessUntilRotating = 10;
let loudnessUntilRandom = 20;
let r = 0;
let g = 0;
let b = 0;
let bubbleInbetweenMillis = 250;
let bubbleWaitCounter = 0;
let lastTime = 0;

// Default P5 setup function
let offset = 0;
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(RGB);
    prepareAudioInput();


    lastTime = millis();
    offset = stepSize;
}

function draw() {
    //milliseconds since last 
    let deltaTime = millis() - lastTime;
    bubbleWaitCounter += deltaTime;

    if (bubbleWaitCounter >= bubbleInbetweenMillis) {
        drawBackgroundBubble();
        bubbleWaitCounter = bubbleWaitCounter - bubbleInbetweenMillis;//makes sure milliseconds dont get lost
    }

    getSoundInput();

    //console.log(totalPseudoLoudness);
    //rotateWithLoudness();

    setRGBToLoudnes();
    /*
        fill(r, g, b);
        if (painting) {
            if (totalPseudoLoudness > loudnessUntilRotating) {
                circle(mouseX, mouseY, 5 * totalPseudoLoudness / loudnessUntilRotating);
            } else {
                circle(mouseX, mouseY, 5);
            }
        }*/
    lastTime = millis();
}

function setRGBToLoudnes() {
    r = rollingSpectrumAnalysis[1] + rollingSpectrumAnalysis[2];
    g = rollingSpectrumAnalysis[3];
    b = rollingSpectrumAnalysis[4] + rollingSpectrumAnalysis[5] + rollingSpectrumAnalysis[6];
    console.log("r: " + r + " g: " + g + " b: " + b);
    console.log(totalPseudoLoudness);
    //scale to total loudness and 255 (max colour)
    r = r / totalPseudoLoudness;
    r *= 255;
    g = g / totalPseudoLoudness;
    g *= 255;
    b = b / totalPseudoLoudness;
    b *= 255;
}

let stepSize = 20;
let shapeWidth = 27;
let columns = 25;
let rows = 12;
let currBubbleNum = 0;
function drawBackgroundBubble() {

    bubblePlaced = false;
    let counter = 0;
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (counter == currBubbleNum) {
                fill(r, g, b);
                console.log(c + " " + r);
                circle(c * stepSize + stepSize, r * stepSize + stepSize, shapeWidth);
                currBubbleNum++; //increases  num
                //caps value to maximum amount of bubbles 
                currBubbleNum = currBubbleNum % (columns * rows);
                bubblePlaced = true;
                break;
            }
            counter++;
        }
        if (bubblePlaced) {
            break;
        }
    }
}

let notTooManyPointsPlease = 3;
let pointCounter = 0;
function rotateWithLoudness() {

    //If its really loud, draw randomly
    if (totalPseudoLoudness > loudnessUntilRandom) {
        pointCounter++;
        if (pointCounter == notTooManyPointsPlease) {
            pointCounter = 0;
            circle(mouseX + middleRandom() * 10, mouseY + middleRandom() * 10, totalPseudoLoudness / loudnessUntilRotating);
            console.log("random circle");
        }
    }
    //if loudness over threshold, start rotating babyy

    if (totalPseudoLoudness > loudnessUntilRotating) {
        console.log("Brrr we rotating");
        translate(windowWidth / 2, windowHeight / 2);
        rotate(totalPseudoLoudness * rotationFactor / loudnessUntilRandom);
        translate(-windowWidth / 2, -windowHeight / 2);

        //Increase rotation adder on loudness
        rotation += 0.001 * totalPseudoLoudness / loudnessUntilRandom;

    }
}

// Start it up
function mousePressed() {
    painting = true;
}

// Stop
function mouseReleased() {
    painting = false;
}
