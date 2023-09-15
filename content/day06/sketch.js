/*
TODO:
Change face drawing to 2 stages, pre stage and drawing stage
Pre stage: draw face outline and get intersecting Information for later
Drawing stage: Clear canvas and do the whole shebang with info from pre stage
Find proper face border with math library DONE

add face variations:
move eye position before placement (move both eyes together, move one eye, move both eyes in opposite direction, move one eye in opposite direction)

TODO save variables in objects for persistence in animation


*/


let canvas;


//Add new datastructure which contains all global variables needed to draw a face
let faceEmptyData = {
    //FACE BOUNDARIES
    left: 0, //relative x to middle, positive number, left from the middle (y)
    top: 0, //global y
    right: 0, //relative x to middle, positive number
    bottom: 0, //global y
    middleX: 0, //middle of face, global x
    middleY: 0, //middle of face, global y
    faceLeftBounds: [], //vector points array of face left side bezier curve
    faceRightBounds: [], //vector points array of face left side bezier curve
    //EYES
    eyePosY: 0,
    leftEyeX: 0,
    rightEyeX: 0,
    //NOSE
    nosePosY: 0,
    maxNoseVariants: 3,
    //MOUTH
    mouthPosY: 0,
    EmotiveStrength: 50,
    maxMouthVariants: 3,
    //FRAME
    frameDistance: 0,
    frameInnerDistance: 0,
    //FRAME CORNER POSITIONS
    frameOuterTopLeft: [0, 0],
    frameOuterBottomRight: [0, 0],
};

//Faces are added to array at start of drawFace function
let faces = [];

let TheosDebug = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    collideDebug(true, 5, color(120, 120, 0));

    middleY = windowHeight / 2;

    drawFacesInGrid();
}

//Duplicates emptyFaceData Object and adds it to faces array, then returns it
function createEmptyFaceData() {
    let newFaceData = Object.assign({}, faceEmptyData);
    faces.push(newFaceData);
    return newFaceData;
}

function drawFacesInGrid() {
    let gridWidth = 10;
    let gridHeight = 6;
    let gridSpacing = 150;

    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            drawFace(x * gridSpacing, y * gridSpacing, Math.random() * 0.5 + 0.15, Math.random() * 0.5 + 0.15);
        }
    }
}

//Redraws canvas on "r" keypress
function keyPressed() {
    if (keyCode === 82) {
        clear();
        faces.length = 0;
        drawFacesInGrid();
    }
}

//Top level function to call a face to be drawn
//Automatically adds data to array
function drawFace(xPos, yPos, heightScale = 1, widthScale = 1) {
    //On next rework face data will be passed to functions so they can be drawn and managed seperately
    let faceData = createEmptyFaceData();
    faceData.middleY = yPos;
    faceData.middleX = xPos;

    //Draw outline so data can be gathered from face
    drawFaceOutline(faceData, xPos, yPos, heightScale, widthScale);
    getFaceIntersectData(faceData);

    drawEyes(faceData);
    drawNose(faceData);
    drawMouth(faceData);
    //drawFrame(faceData);

    console.log(faceData);
}

//get face data from face outline with intersect commands
function getFaceIntersectData(faceData) {
    let leftIntersection = getFaceIntersectionPoint(faceData.middleX, windowHeight / 2, faceData.faceLeftBounds, -1);
    let RightIntersection = getFaceIntersectionPoint(faceData.middleX, windowHeight / 2, faceData.faceRightBounds, 1);

    //RELATIVE TO MIDDLE
    faceData.left = faceData.middleX - leftIntersection.x;
    faceData.right = RightIntersection.x - faceData.middleX;

    //Draw debug circle
    if (TheosDebug) {
        fill(255, 0, 0);
        circle(faceData.middleX + faceData.right, faceData.middleY, 10);
        circle(faceData.middleX - faceData.left, windowHeight / 2, 10);
        noFill();
    }
}

function drawFaceOutline(faceData, xPos, yPos, heightScale = 1, widthScale = 1) {
    // Face Top Coordinate
    let x1 = xPos;
    let y1 = yPos - (windowHeight / 5) * heightScale;  // change this to - for top point
    y1 += middleRandom() * windowHeight / 5; // add some randomness to face top
    if (y1 < faceData.frameInnerDistance + faceData.frameDistance) {
        y1 = faceData.frameInnerDistance + faceData.frameDistance;
    }

    // Face Bottom Coordinate
    let x3 = x1;
    let y3 = yPos + (windowHeight / 5) * heightScale;  // change this to + for bottom point
    y3 += middleRandom() * windowHeight / 5; // add some randomness to face top
    if (y3 > windowHeight - faceData.frameInnerDistance - faceData.frameDistance) {
        y3 = windowHeight - faceData.frameInnerDistance - faceData.frameDistance * 3;
    }

    let maxPullForce = 0;

    //Max pullforce for bezier curve
    let faceType = Math.floor(Math.random() * 3) + 1;
    switch (faceType) {
        case 1:
            //force between 50 and 100
            maxPullForce = Math.random() * 50 + 50;
            break;
        case 2:
            //force between 200 and 400
            maxPullForce = Math.random() * 200 + 200;
            break;
        case 3:
            //force between 400 and 500
            maxPullForce = Math.random() * 100 + 400;
            break;
    }
    maxPullForce *= widthScale;

    //adds flat "roundness" to face, reduces with windowHeight
    let preventSmallFaceFactor = (windowHeight / 1080) * 30;
    if (TheosDebug) {
        console.log("small face factor: " + preventSmallFaceFactor);
    }

    //Calculate pull left
    //Face topNode only receives x-pull so lines join together neatly, bottom node reiceives x and y pull for funny chins
    let pullLeftTopX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullLeftBottomX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullLeftBottomY = middleRandom() * maxPullForce + preventSmallFaceFactor;

    //Calculate pull right
    let pullRightTopX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullRightBottomX = Math.random() * maxPullForce + preventSmallFaceFactor;
    let pullRightBottomY = middleRandom() * maxPullForce + preventSmallFaceFactor;

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

        faceData.faceLeftBounds.push(createVector(x, y));
    }
    noFill();

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

        faceData.faceRightBounds.push(createVector(x, y));
    }
    noFill();

    //Set border variables needed for later drawing positioning
    faceData.top = y1;
    faceData.bottom = y3;
    faceData.middleX = x1;

    if (TheosDebug) {
        console.log(faceData);
    }
}

function drawEyes(faceData) {
    faceData.eyePosY = (faceData.top + faceData.bottom) / 2; //Eyes always in middle of face Y, rule of law
    faceData.eyePosY += middleRandom() * 30; //add some randomness to eye position
    let eyeColour = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    let innerEyeDivisor = 4;
    let innerEyeSizeFactor = 0.6;

    let leftEyeSize = Math.random() * 10 + 10;
    let rightEyeSize = Math.random() * 3 + 15;

    //Simple eye as circle: VARIANT 1
    faceData.leftEyeX = faceData.middleX - Math.random() * faceData.left - 10; //random position left of middle

    //Left eye large Circle
    circle(faceData.leftEyeX, faceData.eyePosY, leftEyeSize);

    //Left eye pupil with random color (plus slight deviation between eyes)
    fill(eyeColour[0] + middleRandom() * 5, eyeColour[1] + middleRandom() * 5, eyeColour[2] + middleRandom() * 5);
    //random inner eye position for funny looks
    circle(faceData.leftEyeX + Math.random() * leftEyeSize / innerEyeDivisor, faceData.eyePosY + Math.random() * leftEyeSize / innerEyeDivisor, leftEyeSize * innerEyeSizeFactor);
    noFill();

    //Variables right eye
    faceData.rightEyeX = faceData.middleX + Math.random() * faceData.right + 10; //random position right of middle

    //Right eye
    circle(faceData.rightEyeX, faceData.eyePosY, rightEyeSize);

    //Left eye pupil with random color (plus slight deviation between eyes)
    fill(eyeColour[0] + middleRandom() * 5, eyeColour[1] + middleRandom() * 5, eyeColour[2] + middleRandom() * 5);
    //random inner eye position for funny looks
    circle(faceData.rightEyeX + Math.random() * rightEyeSize / innerEyeDivisor, faceData.eyePosY + Math.random() * rightEyeSize / innerEyeDivisor, rightEyeSize * innerEyeSizeFactor);
    noFill();

    console.log("leftEyeSize: " + leftEyeSize + " rightEyeSize: " + rightEyeSize);
}

function drawNose(faceData) {
    let noseVariantNo = Math.floor(Math.random() * faceData.maxNoseVariants) + 1;
    let noseAbsoluteMiddle = (faceData.leftEyeX + faceData.rightEyeX) / 2; //nose always inbetween eyes

    let faceHeight = faceData.bottom - faceData.top;
    faceData.nosePosY = faceData.bottom - faceHeight * 0.4;

    strokeWeight(Math.random() * 4 + 1);

    switch (noseVariantNo) {
        case 1:
            //Nose with 2 Lines: VARIANT 1
            let noseTopY = faceData.nosePosY + middleRandom() * 30;
            let noseTopX = noseAbsoluteMiddle + middleRandom() * 30;

            let noseMiddleY = noseTopY + middleRandom() * 15;
            let noseMiddleX = noseTopX - middleRandom() * 30;

            let noseBottomY = noseMiddleY + Math.random() * 24 + 2;
            let noseBottomX = noseTopX + middleRandom() * 6;

            line(noseTopX, noseTopY, noseMiddleX, noseMiddleY);
            line(noseMiddleX, noseMiddleY, noseBottomX, noseBottomY);
            break;
        case 2:
            //Nose with 1 Line: VARIANT 2
            let noseTopY2 = faceData.nosePosY + middleRandom() * 10;
            let noseTopX2 = faceData.middleX
            let noseBottomY2 = noseTopY2 + Math.random() * 8 + 2;
            let noseBottomX2 = noseTopX2 + middleRandom() * 2;
            line(noseTopX2, noseTopY2, noseBottomX2, noseBottomY2);
            break;
        case 3:
            //Nose with 2 circles: VARIANT 3
            let noseSize = getRandomNumberInRange(3, 7);
            let leftNostrilX = noseAbsoluteMiddle - Math.random() * 6 - noseSize;
            circle(leftNostrilX, faceData.nosePosY, noseSize);

            let rightNostrilX = noseAbsoluteMiddle + Math.random() * 6 + noseSize;
            circle(rightNostrilX, faceData.nosePosY, noseSize);
    }
    strokeWeight(1);
}

function drawMouth(faceData) {
    let faceHeight = faceData.bottom - faceData.top;
    let mouthVariant = Math.floor(Math.random() * faceData.maxMouthVariants) + 1;
    faceData.mouthPosY = faceData.bottom - faceHeight * 0.2;

    //Draw mouth here
    let mouthXLeft = getFaceIntersectionPoint(faceData.middleX, faceData.mouthPosY, faceData.faceLeftBounds, -1).x;
    let mouthXRight = getFaceIntersectionPoint(faceData.middleX, faceData.mouthPosY, faceData.faceRightBounds, 1).x;

    let mouthWidth = mouthXRight - mouthXLeft;

    //Randomize mouth width by half its width
    mouthXLeft += Math.random() * mouthWidth / 2;
    mouthXRight -= Math.random() * mouthWidth / 2;

    //Draws middle line of mouth
    let mouthPullXLeft = middleRandom() * faceData.EmotiveStrength;
    let mouthPullYLeft = middleRandom() * faceData.EmotiveStrength;
    let mouthPullXRight = middleRandom() * faceData.EmotiveStrength;
    let mouthPullYRight = middleRandom() * faceData.EmotiveStrength;

    let tempLeft = faceData.left;
    let tempRight = faceData.right;
    //Cheaty switchcase, using fallthrough on case 2 for both lines
    switch (mouthVariant) {
        //I found out setting left and right to 0 makes funny mouths, so im keeping it
        case 3:
            faceData.left = 0;
            faceData.right = 0;
        case 2:
            //Extraline sometimes up sometimes down
            if (Math.random() >= 0.5) {
                //draws top line of mouth
                bezier(mouthXLeft, faceData.mouthPosY,
                    //Extra pull to top left
                    mouthXLeft + mouthPullXLeft - Math.random() * 10 - 10, faceData.mouthPosY + mouthPullYLeft - Math.random() * 10 - 10,
                    //Extra pull to top right
                    mouthXRight + mouthPullXRight + Math.random() * 10 + 10, faceData.mouthPosY + mouthPullYRight - Math.random() * 10 - 10,
                    mouthXRight, faceData.mouthPosY)
            } else {

                //draws bottom line of mouth
                bezier(mouthXLeft, faceData.mouthPosY,
                    //Extra pull to bottom right
                    mouthXLeft + mouthPullXLeft + Math.random() * 10 + 10, faceData.mouthPosY + mouthPullYLeft + Math.random() * 10 + 10,
                    //Extra pull to bottom left
                    mouthXRight + mouthPullXRight - Math.random() * 10 - 10, faceData.mouthPosY + mouthPullYRight + Math.random() * 10 + 10,
                    mouthXRight, faceData.mouthPosY)
            }
        case 1:
            bezier(mouthXLeft, faceData.mouthPosY,
                mouthXLeft + mouthPullXLeft, faceData.mouthPosY + mouthPullYLeft,
                mouthXRight + mouthPullXRight, faceData.mouthPosY + mouthPullYRight,
                mouthXRight, faceData.mouthPosY)
            break;
    }
    faceData.left = tempLeft;
    faceData.right = tempRight;
}

//draws a frame around the face
function drawFrame(faceData) {
    faceData.frameDistance = windowHeight / 32;
    faceData.frameInnerDistance = windowHeight / 8;

    let faceLeftMinimum = getVectorArrayExtrema(faceData.faceLeftBounds, true, true);
    let faceRightMaximum = getVectorArrayExtrema(faceData.faceRightBounds, false, true);
    let faceTopMinimum = getVectorArrayExtrema(faceData.faceLeftBounds, true, false);

    //Draw frame with a small distance around face
    let frameTop = faceTopMinimum - faceData.frameDistance;
    let frameBottom = faceData.bottom + faceData.frameDistance * 3;
    let frameLeft = faceLeftMinimum - faceData.frameDistance;
    let frameRight = faceRightMaximum + faceData.frameDistance;

    //Draw frame
    strokeWeight(4);
    line(frameLeft, frameTop, frameRight, frameTop);
    line(frameRight, frameTop, frameRight, frameBottom);
    line(frameRight, frameBottom, frameLeft, frameBottom);
    line(frameLeft, frameBottom, frameLeft, frameTop);

    //draw larger frame around first frame
    let frameTop2 = frameTop - faceData.frameInnerDistance;
    let frameBottom2 = frameBottom + faceData.frameInnerDistance;
    let frameLeft2 = frameLeft - faceData.frameInnerDistance;
    let frameRight2 = frameRight + faceData.frameInnerDistance;

    line(frameLeft2, frameTop2, frameRight2, frameTop2);
    line(frameRight2, frameTop2, frameRight2, frameBottom2);
    line(frameRight2, frameBottom2, frameLeft2, frameBottom2);
    line(frameLeft2, frameBottom2, frameLeft2, frameTop2);
    strokeWeight(1);

    //Draw lines from outer to inner corners of frame
    line(frameLeft, frameTop, frameLeft2, frameTop2);
    line(frameRight, frameTop, frameRight2, frameTop2);
    line(frameRight, frameBottom, frameRight2, frameBottom2);
    line(frameLeft, frameBottom, frameLeft2, frameBottom2);

}

//returns largest y (or x when specified) component, can also get smallest
function getVectorArrayExtrema(vectorArray, getSmallest = false, getX = true) {
    let largestComponent = vectorArray[0].x;
    for (let index = 0; index < vectorArray.length; index++) {
        const element = vectorArray[index];
        if (getSmallest) {
            if (getX) {
                if (element.x < largestComponent) {
                    largestComponent = element.x;
                }
            } else {
                if (element.y < largestComponent) {
                    largestComponent = element.y;
                }
            }
        } else {
            if (getX) {
                if (element.x > largestComponent) {
                    largestComponent = element.x;
                }
            } else {
                if (element.y > largestComponent) {
                    largestComponent = element.y;
                }
            }
        }
    }
    return largestComponent;
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