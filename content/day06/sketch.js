/*
TODO:
Change face drawing to 2 stages, pre stage and drawing stage
Pre stage: draw face outline and get intersecting Information for later
Drawing stage: Clear canvas and do the whole shebang with info from pre stage
Find proper face border with math library DONE

add face variations:



*/


let canvas;

let faceBorders = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    middleX: 0
};

let faceMiddle = 0;
let faceLeftBounds = [];
let faceRightBounds = [];

let TheosDebug = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    collideDebug(true, 5, color(120, 120, 0));

    faceMiddle = windowHeight / 2;

    //Draw outline so data can be gathered from face
    drawFaceOutline();
    getFaceIntersectData();

    drawEyes();
    drawNose();
    drawMouth();

    //Draw visualization of my data variables
    if (TheosDebug) {
        stroke(255, 0, 0);
        line(faceBorders.middleX, eyePosY, faceBorders.middleX, faceBorders.top);
        line(faceBorders.middleX, eyePosY, faceBorders.middleX - faceBorders.left, eyePosY);
        line(faceBorders.middleX, eyePosY, faceBorders.middleX + faceBorders.right, eyePosY);
        line(faceBorders.middleX, eyePosY, faceBorders.middleX, faceBorders.bottom);
        noFill();
    }
}

function draw() {

}


//get face data from face outline with intersect commands
function getFaceIntersectData() {
    
    let leftIntersection = getFaceIntersectionPoint(faceBorders.middleX, windowHeight / 2, faceLeftBounds, -1);

    //RELATIVE TO MIDDLE
    faceBorders.left = faceBorders.middleX - leftIntersection.x;

    //Draw debug circle
    if (TheosDebug) {
        fill(255, 0, 0);
        circle(faceBorders.middleX - faceBorders.left, windowHeight / 2, 10);
        noFill();
    }

    //RIGHTSIDE
    let RightIntersection = getFaceIntersectionPoint(faceBorders.middleX, windowHeight / 2, faceRightBounds, 1);

    //RELATIVE TO MIDDLE
    faceBorders.right = RightIntersection.x - faceBorders.middleX;

    //Draw debug circle
    if (TheosDebug) {
        fill(255, 0, 0);
        circle(faceBorders.middleX + faceBorders.right, windowHeight / 2, 10);
        noFill();
    }
}

function drawFaceOutline() {
    // Face Top Coordinate
    let x1 = windowWidth / 2;
    let y1 = faceMiddle - windowHeight / 3;  // change this to - for top point
    y1 += middleRandom() * windowHeight / 4; // add some randomness to face top

    // Face Bottom Coordinate
    let x3 = x1;
    let y3 = faceMiddle + windowHeight / 3;  // change this to + for bottom point
    y3 += middleRandom() * windowHeight / 4; // add some randomness to face top

    //Max pullforce for bezier curve
    let maxPullForce = Math.random() * 500; //Randomizing this part makes round AND small faces likely

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

    //get bezier points of left face side for later use
    fill(255);
    let step = 10;
    for (let index = 0; index <= step; index++) {
        let t = index / step;
        let x = bezierPoint(x1, x1 - pullLeftTopX, x3 - pullLeftBottomX, x3, t);
        let y = bezierPoint(y1, y1, y3 + pullLeftBottomY, y3, t);

        faceLeftBounds.push(createVector(x, y));
    }
    noFill();

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

    //get bezier points of left face side for later use
    fill(255);
    for (let index = 0; index <= step; index++) {
        let t = index / step;
        let x = bezierPoint(x1, x1 + pullRightTopX, x3 + pullRightBottomX, x3, t);
        let y = bezierPoint(y1, y1, y3 + pullRightBottomY, y3, t);

        faceRightBounds.push(createVector(x, y));
    }
    noFill();

    //Set border variables needed for later drawing positioning
    faceBorders.top = y1;
    faceBorders.bottom = y3;
    faceBorders.middleX = x1;

    console.log(faceBorders);
    console.log("faceLeftBounds: " + faceLeftBounds + " faceRightBounds: " + faceRightBounds);
}

let eyePosY = 0;
let leftEyeX = 0;
let rightEyeX = 0;
function drawEyes() {
    eyePosY = (faceBorders.top + faceBorders.bottom) / 2; //Eyes always in middle of face Y, rule of law
    eyePosY += middleRandom() * 30; //add some randomness to eye position
    let eyeColour = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    let innerEyeDivisor = 4;
    let innerEyeSizeFactor = 0.6;

    let leftEyeSize = Math.random() * 10 + 10;
    let rightEyeSize = Math.random() * 3 + 15;

    //Simple eye as circle: VARIANT 1
    leftEyeX = faceBorders.middleX - Math.random() * faceBorders.left - 10; //random position left of middle

    //Left eye large Circle
    circle(leftEyeX, eyePosY, leftEyeSize);

    //Left eye pupil with random color (plus slight deviation between eyes)
    fill(eyeColour[0] + middleRandom() * 5, eyeColour[1] + middleRandom() * 5, eyeColour[2] + middleRandom() * 5);
    //random inner eye position for funny looks
    circle(leftEyeX + Math.random() * leftEyeSize / innerEyeDivisor, eyePosY + Math.random() * leftEyeSize / innerEyeDivisor, leftEyeSize * innerEyeSizeFactor);
    noFill();

    //Variables right eye
    rightEyeX = faceBorders.middleX + Math.random() * faceBorders.right + 10; //random position right of middle

    //Right eye
    circle(rightEyeX, eyePosY, rightEyeSize);

    //Left eye pupil with random color (plus slight deviation between eyes)
    fill(eyeColour[0] + middleRandom() * 5, eyeColour[1] + middleRandom() * 5, eyeColour[2] + middleRandom() * 5);
    //random inner eye position for funny looks
    circle(rightEyeX + Math.random() * rightEyeSize / innerEyeDivisor, eyePosY + Math.random() * rightEyeSize / innerEyeDivisor, rightEyeSize * innerEyeSizeFactor);
    noFill();

    console.log("leftEyeSize: " + leftEyeSize + " rightEyeSize: " + rightEyeSize);
}

let nosePosY = 0;
let maxNoseVariants = 3
function drawNose() {
    let noseVariantNo = Math.floor(Math.random() * maxNoseVariants) + 1;
    let noseAbsoluteMiddle = (leftEyeX + rightEyeX) / 2; //nose always inbetween eyes

    let faceHeight = faceBorders.bottom - faceBorders.top;
    nosePosY = faceBorders.bottom - faceHeight * 0.4;

    strokeWeight(Math.random() * 4 + 1);

    switch (noseVariantNo) {
        case 1:
            //Nose with 2 Lines: VARIANT 1
            let noseTopY = nosePosY + middleRandom() * 30;
            let noseTopX = noseAbsoluteMiddle + middleRandom() * 30;
            console.log("noseTopX: " + noseTopX + " leftEyeX: " + leftEyeX + " rightEyeX: " + rightEyeX)

            let noseMiddleY = noseTopY + middleRandom() * 15;
            let noseMiddleX = noseTopX - middleRandom() * 30;

            let noseBottomY = noseMiddleY + Math.random() * 24 + 2;
            let noseBottomX = noseTopX + middleRandom() * 6;

            line(noseTopX, noseTopY, noseMiddleX, noseMiddleY);
            line(noseMiddleX, noseMiddleY, noseBottomX, noseBottomY);
            break;
        case 2:
            //Nose with 1 Line: VARIANT 2
            let noseTopY2 = nosePosY + middleRandom() * 10;
            let noseTopX2 = faceBorders.middleX
            let noseBottomY2 = noseTopY2 + Math.random() * 8 + 2;
            let noseBottomX2 = noseTopX2 + middleRandom() * 2;
            line(noseTopX2, noseTopY2, noseBottomX2, noseBottomY2);
            break;
        case 3:
            //Nose with 2 circles: VARIANT 3
            let noseSize = getRandomNumberInRange(3, 7);
            let leftNostrilX = noseAbsoluteMiddle - Math.random() * 6 - noseSize;
            circle(leftNostrilX, nosePosY, noseSize);

            let rightNostrilX = noseAbsoluteMiddle + Math.random() * 6 + noseSize;
            circle(rightNostrilX, nosePosY, noseSize);
    }
    strokeWeight(1);
}

let mouthPosY = 0;
let EmotiveStrength = 50;
let maxMouthVariants = 3;
function drawMouth() {
    let faceHeight = faceBorders.bottom - faceBorders.top;
    let mouthVariant = Math.floor(Math.random() * maxMouthVariants) + 1;
    mouthPosY = faceBorders.bottom - faceHeight * 0.2;

    //Draw mouth here
    let mouthXLeft = getFaceIntersectionPoint(faceBorders.middleX, mouthPosY, faceLeftBounds, -1).x;
    let mouthXRight = getFaceIntersectionPoint(faceBorders.middleX, mouthPosY, faceRightBounds, 1).x;

    let mouthWidth = mouthXRight - mouthXLeft;
    
    //Randomize mouth width by half its width
    mouthXLeft += Math.random() * mouthWidth / 2;
    mouthXRight -= Math.random() * mouthWidth / 2;

    //Draws middle line of mouth
    let mouthPullXLeft = middleRandom() * EmotiveStrength;
    let mouthPullYLeft = middleRandom() * EmotiveStrength;
    let mouthPullXRight = middleRandom() * EmotiveStrength;
    let mouthPullYRight = middleRandom() * EmotiveStrength;

    //Cheaty switchcase, using fallthrough on case 2 for both lines
    switch (mouthVariant) {
        //I found out setting left and right to 0 makes funny mouths, so im keeping it
        case 3:
            faceBorders.left = 0;
            faceBorders.right = 0;
        case 2:
            //Extraline sometimes up sometimes down
            if (Math.random() >= 0.5) {
                //draws top line of mouth
                bezier(mouthXLeft, mouthPosY,
                    //Extra pull to top left
                    mouthXLeft + mouthPullXLeft - Math.random() * 10 - 10, mouthPosY + mouthPullYLeft - Math.random() * 10 - 10,
                    //Extra pull to top right
                    mouthXRight + mouthPullXRight + Math.random() * 10 + 10, mouthPosY + mouthPullYRight - Math.random() * 10 - 10,
                    mouthXRight, mouthPosY)
            } else {

                //draws bottom line of mouth
                bezier(mouthXLeft, mouthPosY,
                    //Extra pull to bottom right
                    mouthXLeft + mouthPullXLeft + Math.random() * 10 + 10, mouthPosY + mouthPullYLeft + Math.random() * 10 + 10,
                    //Extra pull to bottom left
                    mouthXRight + mouthPullXRight - Math.random() * 10 - 10, mouthPosY + mouthPullYRight + Math.random() * 10 + 10,
                    mouthXRight, mouthPosY)
            }
        case 1:
            bezier(mouthXLeft, mouthPosY,
                mouthXLeft + mouthPullXLeft, mouthPosY + mouthPullYLeft,
                mouthXRight + mouthPullXRight, mouthPosY + mouthPullYRight,
                mouthXRight, mouthPosY)
            break;
    }

}

function getFaceIntersectionPoint(startX, startY, borderData, xDirection) {
    let step = 1;
    let hit = true;
    let hitX = 0;
    let hitY = 0;
    do {
        step += 1;
        hit = collidePointPoly(startX + xDirection * step, startY, borderData);
        hitX = startX + xDirection * step;
        hitY = startY;
    } while (hit != false);

    return createVector(hitX, hitY);
}