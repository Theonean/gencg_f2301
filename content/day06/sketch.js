let canvas;

let faceBorders = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
};

let faceMiddle = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    faceMiddle = windowHeight / 2;

    drawFaceOutline();
}

function drawFaceOutline() {
    // Face Top Coordinate
    let x1 = windowWidth / 2;
    let y1 = faceMiddle - windowHeight / 3;  // change this to - for top point

    // Face Bottom Coordinate
    let x3 = x1;
    let y3 = faceMiddle + windowHeight / 3;  // change this to + for bottom point

    faceBorders.top = y1;
    faceBorders.bottom = y3;

    // Left face side
    bezier(x1, y1, // start point
        x1 - Math.random() * 100 - 30, y1, // Pull vector start point
        x3 - Math.random() * 100 - 30, y3, // Pull vector end point
        x3, y3 // End Point
    );

    // Right face side
    bezier(x1, y1, // start point
        x1 + Math.random() * 100 + 30, y1, // control point for start point
        x3 + Math.random() * 100 + 30, y3, // end point
        x3, y3 // control point for end point
    );
}

function drawEyes() {

}