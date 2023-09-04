let canvas;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    print(-0 == 0)
    //STAIR(windowWidth / 2, windowHeight / 2);

}

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
    clear();
    for (let c = 0; c < columns/trueScale; c++) {
        for (let r = 0; r < rows/trueScale; r++) {
            if (c % 2 == r % 2) {//what the fuck --> if (c % 2 == 0 && r % 2 == 0 || c % 2 == 1 && r % 2 == 1 || c % 2 == -1 && r % 2 == -1) {

                stairLOGO(
                    -130 + x + c * step, //x
                    -130 + y + r * step, //y
                    trueScale + scaleFactor); //scale
            } else {
                stairLOGO(
                    -130 + x + c * step, //x
                    -130 + y + r * step, //y
                    trueScale - scaleFactor); //scale
            }
        }
    }

    x >= step ? x = 0 : x += 1;
    y >= step ? y = 0 : y += 1;

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