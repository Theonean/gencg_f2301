let canvas;

// Default P5 setup function
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    background(color(0));

    let offsetX = -200;
    let offsetY = 0;
    //r = row
    for (let r = 0; r < 12; r++) {
        //c = column, starts with 2 so everything has atleast 1 inner square
        for (let c = 2; c < 18; c++) {

            //Offset moves the grid around
            let squareX = c * 100 + offsetX;
            let squareY = r * 100 + offsetY;
            let squareSide = 70;

            let innerSquareSide = squareSide;

            let innerOffsetX = 0;
            let innerOffsetY = 0;

            //Draw inner squares
            for (let cRec = 1; cRec < c; cRec++) {
                //recursive inner squares become smaller
                innerSquareSide *= 0.8;  // adjust this factor as you like
                innerOffsetX = (squareSide - innerSquareSide) / 2;
                innerOffsetY = (squareSide - innerSquareSide) / 2;

                let squareTopLeftX = squareX + innerOffsetX;
                let squareTopLeftY = squareY + innerOffsetY;
                let squareTopRightX = squareTopLeftX + innerSquareSide;
                let squareTopRightY = squareTopLeftY;
                let squareBottomLeftX = squareTopLeftX;
                let squareBottomLeftY = squareTopLeftY + innerSquareSide;
                let squareBottomRightX = squareTopRightX;
                let squareBottomRightY = squareBottomLeftY;
                let rotation = cRec * 1.3;
        
                strokeWeight(2);
                stroke(255);
        
                push();
                translate(squareX + innerOffsetX + innerSquareSide / 2, squareY + innerOffsetY + innerSquareSide / 2);
                rotate(rotation);
                translate(-squareX - innerOffsetX - innerSquareSide / 2, -squareY - innerOffsetY - innerSquareSide / 2);
                line(squareTopLeftX, squareTopLeftY, squareTopRightX, squareTopRightY);
                line(squareTopLeftX, squareTopLeftY, squareBottomLeftX, squareBottomLeftY);
                line(squareBottomRightX, squareBottomRightY, squareBottomLeftX, squareBottomLeftY);
                line(squareBottomRightX, squareBottomRightY, squareTopRightX, squareTopRightY);
                pop();
                //square(squareX + innerOffsetX, squareY + innerOffsetY, innerSquareSide);
            }

        }
    }
}


