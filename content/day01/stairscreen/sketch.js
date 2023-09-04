let canvas;
let sliderVisible = true; //CHATGPT VARIABLE

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    //print(-0 == 0)
    //STAIR(windowWidth / 2, windowHeight / 2);


    //CHATGPT 4 CREDITS [
    // Create sliders and labels
    trueScaleSlider = createSlider(0.2, 10, 0.5, 0.1);
    trueScaleSlider.position(10, 10);
    trueScaleLabel = createDiv('True Scale');
    trueScaleLabel.position(200, 10);

    scaleStepSlider = createSlider(0.0001, 0.1, 0.003, 0.001);
    scaleStepSlider.position(10, 50);
    scaleStepLabel = createDiv('Scale Step');
    scaleStepLabel.position(200, 50);

    moveStepSlider = createSlider(0.1, 20, 1, 0.1);
    moveStepSlider.position(10, 90);
    moveStepLabel = createDiv('Move Step');
    moveStepLabel.position(200, 90);

    stepDistanceSlider = createSlider(10, 1000, 100, 1);
    stepDistanceSlider.position(10, 130);
    stepDistanceLabel = createDiv('Step Distance');
    stepDistanceLabel.position(200, 130);

    columnSlider = createSlider(1, 15, 8, 1);
    columnSlider.position(10, 170);
    columnLabel = createDiv('Columns');
    columnLabel.position(200, 170);

    rowSlider = createSlider(1, 10, 4, 1);
    rowSlider.position(10, 210);
    rowLabel = createDiv('Rows');
    rowLabel.position(200, 210);

    

    // Create fullscreen button
    fullscreenButton = createButton('Fullscreen');
    fullscreenButton.position(10, 290);
    fullscreenButton.mousePressed(() => {
        let fs = fullscreen();
        fullscreen(!fs);
    });

    //disclaimer for spacebar
    uiHideInfo = createDiv('Press Spacebar to hide UI');
    uiHideInfo.position(10, 250);

}

function keyPressed() {
    if (keyCode === 32) { // spacebar
        toggleVisibility();
        print("lmao");
    }
}

function toggleVisibility() {
    sliderVisible = !sliderVisible;

    // Toggle visibility of sliders and labels
    trueScaleSlider.elt.style.display = sliderVisible ? "block" : "none";
    scaleStepSlider.elt.style.display = sliderVisible ? "block" : "none";
    moveStepSlider.elt.style.display = sliderVisible ? "block" : "none";
    columnSlider.elt.style.display = sliderVisible ? "block" : "none";
    rowSlider.elt.style.display = sliderVisible ? "block" : "none";
    trueScaleLabel.elt.style.display = sliderVisible ? "block" : "none";
    scaleStepLabel.elt.style.display = sliderVisible ? "block" : "none";
    moveStepLabel.elt.style.display = sliderVisible ? "block" : "none";
    columnLabel.elt.style.display = sliderVisible ? "block" : "none";
    rowLabel.elt.style.display = sliderVisible ? "block" : "none";
    fullscreenButton.elt.style.display = sliderVisible ? "block" : "none";
    uiHideInfo.elt.style.display = sliderVisible ? "block" : "none";
    stepDistanceSlider.elt.style.display = sliderVisible ? "block" : "none";
    stepDistanceLabel.elt.style.display = sliderVisible ? "block" : "none";
}

    //] END CHATGPT

let rows = 4;
let columns = 8;
let step = 100;
let x = 0;
let y = 0;
let trueScale = 0.2; //SLIDER[0.2-10]
let scaleFactor = 0;
let scaleDirection = false; //false is down, true is up (numberwise)
let scaleStep = 0.003;//SLIDER[0.003-0.1]
let moveStep = 1;//SLIDER[0.1-20]
function draw() {
    //CHATGPT 4 CREDITS [
    // Use the slider values
    trueScale = trueScaleSlider.value();
    scaleStep = scaleStepSlider.value();
    moveStep = moveStepSlider.value();
    step = stepDistanceSlider.value();
    columns = columnSlider.value();
    rows = rowSlider.value();
    //] END CHATGPT

    clear();
    for (let c = 0; c < columns / trueScale; c++) {
        for (let r = 0; r < rows / trueScale; r++) {
            let scaledStep = trueScale + step;
            if (c % 2 == r % 2) {//what the fuck --> if (c % 2 == 0 && r % 2 == 0 || c % 2 == 1 && r % 2 == 1 || c % 2 == -1 && r % 2 == -1) {

                stairLOGO(
                    -130 + x + c * scaledStep, //x
                    -130 + y + r * scaledStep, //y
                    trueScale + scaleFactor); //scale
            } else {
                stairLOGO(
                    -130 + x + c * scaledStep, //x
                    -130 + y + r * scaledStep, //y
                    trueScale - scaleFactor); //scale
            }
        }
    }

    x >= step ? x = 0 : x += moveStep;
    y >= step ? y = 0 : y += moveStep;

    //Scalefactor goes up and down to make the logo pulse
    if (scaleDirection) {
        scaleFactor += scaleStep;
        if (scaleFactor > 0.1) {
            scaleDirection = false;
        }
    }
    else {
        scaleFactor -= scaleStep;
        if (scaleFactor < -0.1) {
            scaleDirection = true;
        }
    }

}

function stairLOGO(x, y, scale) {
    // Scale all the dimensions and positions by the 'scale' parameter
    fill(11, 106, 91);
    rect(x, y, 150 * scale, 30 * scale);
    fill(3, 148, 108);
    rect(x + 10 * scale, y - 40 * scale, 130 * scale, 25 * scale);
    fill(33, 179, 120);
    rect(x + 20 * scale, y - 70 * scale, 110 * scale, 20 * scale);
    fill(58, 188, 135);
    rect(x + 30 * scale, y - 95 * scale, 90 * scale, 15 * scale);
}


//draws the STAIR logo in squares
function STAIR(x, y) {
    for (let index = 0; index < 4; index++) {
        square(x, y - 20 * index, 20);
    }
}