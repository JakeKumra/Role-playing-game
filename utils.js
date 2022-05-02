
// get a random number between 1 and 3 and return it
const getDiceNum = () => Math.floor((Math.random()*3) +1)

// returns an array of random numbers in length "count" parameter
function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(() => 
        Math.floor((Math.random()*6) +1)
    )
}

// set prefix to "get" and suffix to "Html" for function that return a string of HTML
function getDicePlaceholderHtml(diceCount){
    return new Array(diceCount).fill("").map(() => 
        `<div class="placeholder-dice"></div>`
    ).join('')
}

const getPercentage = (remainingHealth, maximumHealth) => 
    // arrow function means this is returned
    (100 * remainingHealth) / maximumHealth


export {getDiceNum, getDiceRollArray, getDicePlaceholderHtml, getPercentage}