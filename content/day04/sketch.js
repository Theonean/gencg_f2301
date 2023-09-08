let canvas;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    prepareAudioInput();


    lastTime = millis();
}

let painting = false;
let rotation = 0;
let rotationFactor = 2;
let loudnessUntilRotating = 10;
let loudnessUntilRandom = 20;
let r = 0;
let g = 0;
let b = 0;
let bubbleInbetweenMillis = 100;
let bubbleWaitCounter = 0;
let lastTime = 0;
function draw() {
    //milliseconds since last 
    let deltaTime = millis() - lastTime;
    bubbleWaitCounter += deltaTime;

    if (bubbleWaitCounter >= bubbleInbetweenMillis) {
        drawBackgroundBubble();
        bubbleWaitCounter = 0;
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
    r = rollingSpectrumAnalysis[0] + rollingSpectrumAnalysis[1] + rollingSpectrumAnalysis[2];
    g = rollingSpectrumAnalysis[2] + rollingSpectrumAnalysis[3] * 0.5;
    b = rollingSpectrumAnalysis[3] * 0.5 + rollingSpectrumAnalysis[4] + rollingSpectrumAnalysis[5] + rollingSpectrumAnalysis[6];

    //scale to total loudness and 255 (max colour)
    r = r / totalPseudoLoudness;
    r *= 255;
    g = g / totalPseudoLoudness;
    g *= 255;
    b = b / totalPseudoLoudness;
    b *= 255;
}

let stepSize = 40;
let shapeWidth = 20;
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
                circle(c * stepSize, r * stepSize, shapeWidth);
                currBubbleNum++;
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