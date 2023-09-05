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

            //CHATGPT
            let innerSquareSide = squareSide;
            let innerOffsetX = 0;
            let innerOffsetY = 0;

            //Draw inner squares
            for (let cRec = 0; cRec < c; cRec++) {
                //recursive inner squares become smaller
                innerSquareSide *= 0.8;  // adjust this factor as you like
                innerOffsetX += (squareSide - innerSquareSide) / 2;
                innerOffsetY += (squareSide - innerSquareSide) / 2;
                
                rotate(PI / 3);
                square(squareX + (squareSide - innerSquareSide) / 2, squareY + (squareSide - innerSquareSide) / 2, innerSquareSide);
            }
            //END CHATPGT --> helped solve technical problem with drawing squares
        }
    }
}


