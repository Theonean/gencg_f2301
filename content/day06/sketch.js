let canvas;

let faceBorders = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    middleX: 0
};

let faceMiddle = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    faceMiddle = windowHeight / 2;

    drawFaceOutline();
    drawEyes();
    drawNose();
    drawMouth();

    //Draw visualization of my data variables
    /*
    line(faceBorders.middleX, eyePosY, faceBorders.middleX, faceBorders.top);
    line(faceBorders.middleX, eyePosY, faceBorders.middleX - faceBorders.left, eyePosY);
    line(faceBorders.middleX, eyePosY, faceBorders.middleX + faceBorders.right, eyePosY);
    */
}

function drawFaceOutline() {
    // Face Top Coordinate
    let x1 = windowWidth / 2;
    let y1 = faceMiddle - windowHeight / 3;  // change this to - for top point
    y1 += middleRandom() * 300; // add some randomness to face top

    // Face Bottom Coordinate
    let x3 = x1;
    let y3 = faceMiddle + windowHeight / 3;  // change this to + for bottom point

    //Max pullforce for bezier curve
    let maxPullForce = 120;

    //adds flat "roundness" to face, reduces with windowHeight
    let preventSmallFaceFactor = (windowHeight / 1080) * 30;
    console.log("small face factor: " + preventSmallFaceFactor);

    //Calculate x-pull
    //Face topNode only receives x-pull so lines join together neatly, bottom node reiceives x and y pull for funny chins
    let pullLeftTopX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullLeftBottomX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullLeftBottomY = middleRandom() * maxPullForce + preventSmallFaceFactor;

    // Left face side
    bezier(x1, y1, // start point
        x1 - pullLeftTopX, y1, // Pull vector start point
        x3 - pullLeftBottomX, y3 + pullLeftBottomY, // Pull vector end point
        x3, y3 // End Point
    );

    //Calculate x-pull
    let pullRightTopX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullRightBottomX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullRightBottomY = middleRandom() * maxPullForce + preventSmallFaceFactor;

    // draw Right face side
    bezier(x1, y1, // start point
        x1 + pullRightTopX, y1, // control point for start point
        x3 + pullRightBottomX, y3 + pullRightBottomY, // end point
        x3, y3 // control point for end point
    );


    //Set border variables needed for later drawing positioning
    faceBorders.top = y1;
    faceBorders.bottom = y3;
    faceBorders.middleX = x1;
    faceBorders.left = Math.sqrt(pullLeftTopX + pullLeftBottomX) * 3;
    faceBorders.right = Math.sqrt(pullRightTopX + pullRightBottomX) * 3;

    console.log(faceBorders);
}

let eyePosY = 0;
function drawEyes() {
    eyePosY = (faceBorders.top + faceBorders.bottom) / 2; //Eyes always in middle of face, rule of law

    //Simple eye as circle: VARIANT 1
    //Left eye large Circle
    let leftEyeSize = Math.random() * 10 + 10;
    circle(faceBorders.middleX - Math.random() * faceBorders.left - 10, eyePosY, leftEyeSize);
    //Left eye pupil
    //circle(faceBorders.middleX - Math.random() * faceBorders.left - 10, eyePosY, leftEyeSize * Math.random());

    //Right eye
    circle(faceBorders.middleX + Math.random() * faceBorders.right + 10, eyePosY, Math.random() * 10 + 10);
}

let nosePosY = 0;
function drawNose() {
    let faceHeight = faceBorders.bottom - faceBorders.top;
    nosePosY = faceBorders.bottom - faceHeight * 0.4;

    //Nose with 2 Lines: VARIANT 1
    let noseTopY = nosePosY + middleRandom() * 10;
    let noseTopX = faceBorders.middleX

    let noseMiddleY = noseTopY + middleRandom() * 5;
    let noseMiddleX = noseTopX - middleRandom() * 10;

    let noseBottomY = noseMiddleY + Math.random() * 8 + 2;
    let noseBottomX = noseTopX + middleRandom() * 2;

    line(noseTopX, noseTopY, noseMiddleX, noseMiddleY);
    line(noseMiddleX, noseMiddleY, noseBottomX, noseBottomY);
}

let mouthPosY = 0;
let EmotiveStrength = 50;
function drawMouth() {
    let faceHeight = faceBorders.bottom - faceBorders.top;
    mouthPosY = faceBorders.bottom - faceHeight * 0.2;
    //Draw mouth here
    let mouthXLeft = (windowWidth / 2) - faceBorders.left;
    let mouthXRight = (windowWidth / 2) + faceBorders.right;

    bezier(mouthXLeft, mouthPosY,
        mouthXLeft + middleRandom() * EmotiveStrength, mouthPosY + middleRandom() * EmotiveStrength,
        mouthXRight + middleRandom() * EmotiveStrength, mouthPosY + middleRandom() * EmotiveStrength,
        mouthXRight, mouthPosY)
}