
//Returns a random number between -0.5 and 0.5, used to simplify formulas
function middleRandom() {
    return Math.random() - 0.5;
}


/** Created with ChatGPT
 * Generates a random number between min and max (inclusive)
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - The generated random number
 */
function getRandomNumberInRange(min, max) {
    if (max < min) {
        throw new Error('Max must be greater than min');
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}

