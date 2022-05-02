import characterData from './data.js'
import Character from './Character.js'
import {getDiceNum, getDicePlaceholderHtml} from './utils.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false
let noTripleRolled = true

// initialise the objects using the class constructor
const wizard = new Character(characterData.hero)
let monster = getNewMonster()

// render the character cards with the dice placeholder on load
render()

function getNewMonster(){
        // removes the first item of the monstersArray, finds corresponding object in characterData, and stores in const
        const nextMonsterData = characterData[monstersArray.shift()]
        // pass object through the constructor if nextMonsterData is truthy
        return nextMonsterData ? new Character(nextMonsterData) : {}
}

const attack = () => {
    // execute code if isWaiting set to false (i.e not during waiting period)
    if(!isWaiting){
        
        // .setDiceHtml method updates diceArray for rendering dice and creates currentDiceScore property
        wizard.setDiceHtml()
        monster.setDiceHtml()

        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)

        // render new dice on character cards
        render()
        
        // condition to endGame() or render new character
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            if(monstersArray.length > 0){
                isWaiting = true
                    setTimeout(()=>{
                    resetCharacters()
                    isWaiting = false
            }, 1500) 
            }
            else{
                endGame()
            }
        }
        checkForDiceCombos()
    } 
}

function checkForDiceCombos() {
    checkForTriple()
    checkForDouble()
    wizard.health > wizard.maxHealth ? wizard.health = wizard.maxHealth :
    wizard.getHealthBarHtml()
    render()
}

function checkForTriple(){
    noTripleRolled = true
    for (let i = 0; i < wizard.currentDiceScore.length; i++) {
        for (let k = i + 1; k < wizard.currentDiceScore.length; k++) {
            for (let j = k + 1; j < wizard.currentDiceScore.length; j++) {
                if ( wizard.currentDiceScore[i] === wizard.currentDiceScore[k] && wizard.currentDiceScore[i] === wizard.currentDiceScore[j]) {
                    wizard.health = wizard.maxHealth
                    noTripleRolled = false
                    setTimeout(()=> {
                        alert("You rolled a triple, full health!")}, 500)
                }
            }
        }    
    }        
}

function checkForDouble() {
    if (noTripleRolled) {
        for (let i = 0; i < wizard.currentDiceScore.length; i++) {
            for (let k = i + 1; k < wizard.currentDiceScore.length; k++) {
                if ( wizard.currentDiceScore[i] ===  wizard.currentDiceScore[k]) {
                    wizard.health += 5
                    setTimeout(()=> {
                        alert("You rolled a double, +5 health!")}, 500)
                }
            }
        }
    }
}

function resetCharacters(){
    monster = getNewMonster()           
    wizard.diceCount = getDiceNum()
    wizard.diceHtml = getDicePlaceholderHtml(wizard.diceCount)
    render()
}

const endGame = () => {
    // to disable attack button
    isWaiting = true

    const endMessage = wizard.health === 0 && monster.health === 0 ? 
        "No victors - all creatures are dead" 
        : wizard.health > 0 ? "The Wizard Wins!" 
        : `The ${monster.name} is Victorious!`
    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    
    setTimeout(()=> {
        document.body.innerHTML = 
        `<div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>` 
    }, 1500)

}

function render(){
    // update the DOM and creates the characters
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

document.getElementById('attack-button').addEventListener("click", attack)




// 1. Object destructuring 
// 2. .map() .join() and .fill() methods
// 3. new Array() constructor to create new arrays
// 4. returning a function inside a function and mapping over it 
// 5. Using parameters and arguments (outside)
// 6. Constructor function
// 7. Creating methods (function attached to properties inside objects)
// 8. Object.assign
// 9. this. keyword - object 
// 10. export and import chunks of code to keep codebase tidy
// 11. .reduce() method
// 12. ternary operator
// 13. arrow functions and function declerations 
// 14. setTimeout() method

