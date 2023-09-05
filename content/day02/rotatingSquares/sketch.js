let canvas;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

}

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

// Time variable
let t = 0;

function draw() {
    clear();
    background(color(0));

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

            //Draw inner squares
            for (let cRec = 1; cRec < Math.random() * 5; cRec++) {
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

                fill(cRec * 10, cRec * 3, cRec * 50);

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