let canvas;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    prepareAudioInput();

}

let painting = false;
let rotation = 0;
let rotationFactor = 2;
let loudnessUntilRotating = 10;
let loudnessUntilRandom = 20;
function draw() {
    getSoundInput();

    console.log(totalPseudoLoudness);
    rotateWithLoudness();

    let noiseColourAmplification = 5;
    let r = rollingSpectrumAnalysis[0] + rollingSpectrumAnalysis[1];
    let g = rollingSpectrumAnalysis[2] + rollingSpectrumAnalysis[3];
    let b = rollingSpectrumAnalysis[4] + rollingSpectrumAnalysis[5] + rollingSpectrumAnalysis[6];
    r *= noiseColourAmplification;
    g *= noiseColourAmplification;
    b *= noiseColourAmplification;
    fill(r, g, b);
    if (painting) {
        if (totalPseudoLoudness > loudnessUntilRotating) {
            circle(mouseX, mouseY, 5 * totalPseudoLoudness / loudnessUntilRotating);
        } else {
            circle(mouseX, mouseY, 5);
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