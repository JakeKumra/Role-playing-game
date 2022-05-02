import {getDiceNum, getDiceRollArray, getDicePlaceholderHtml, getPercentage} from './utils.js'

// I randomised the dice number everytime a character dies
// I included logic to increase health by 5 when a double is rolled
// logic to max the health if a triple is rolled
// I displayed the damage on the character's card
// Add a modal for rules maybe?
// tidy code? 
// go through and summarise all code

class Character {
    constructor(data){
        Object.assign(this, data)
        // diceHtml is a new property assigned to a called function which takes a 
        // parameter of diceCount, however diceCount hasn't been destructured yet so 
        // we use this.diceCount instead.
        this.damageHtml = ''
        this.diceCount = getDiceNum()
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
        this.maxHealth = this.health
    }

    // creates currentDiceScore array property and maps over array and returns the HTML string which is used in the this.getCharacterHtml() method
    setDiceHtml() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map(num =>
            `<div class="dice">${num}</div>`).join('')
    }

    // totals the currentDiceScore and reduces the health by the opponents .currentDiceScore as a parameter 
    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.health = 0
            this.dead = true 
        }
        this.damageHtml = `<b class="damage">  -${totalAttackScore} </b>`
    }
    
    getHealthBarHtml() {
        const healthPercent = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${healthPercent < 26 ? "danger" : ""} " 
                style="width: ${healthPercent}%;">
                </div>
            </div>`
    }
   
    // returns the character HTML string 
    getCharacterHtml() {
        // object destructuring to generate variables from the initialised object
        const {name, avatar, health, diceHtml, damageHtml} = this
        const healthBar = this.getHealthBarHtml()
        // return HTML string needed to manipulate the DOM
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}">
                <p class="health">health: <b> ${health} </b> ${damageHtml} </p>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml} 
                </div>
            </div>  
            `   
    }
} 

export default Character