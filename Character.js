import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from './utils.js'



function Character(data) {
    Object.assign(this, data) // On copie l'objet de data dans this
    
    this.diceArray = getDicePlaceholderHtml(this.diceCount)
    
    this.maxHealth = this.health // Store le max health
    
    this.getDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(num =>
            `<div class="dice">${num}</div> `
        ).join('')
    }
    
    this.takeDamage = function(attackScoreArray){
        console.log(`${this.name} : ${attackScoreArray}`); 
        const totalAttackScore = attackScoreArray.reduce((total, currentElement)=>
            total + currentElement
        )
        console.log(this.name, getPercentage(this.health,this.maxHealth))
       
        this.health -= totalAttackScore
        if (this.health <= 0){
            this.health = 0
            this.dead = true
            console.log(`Le personnage ${this.name} est mort : ${this.dead}`)
        } 
    } 

    this.getHealthBarHtml = function(){ //Création d'une methode qui log un %
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 25? "danger": ""}"
                    style="width: ${percent}%;">
                    </div>
                </div>`
    }


    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount, diceArray } = this;   //Sucre syntaxique pour éviter d'écrire this à tout bout de champ   
        
        const healthBar = getPercentage(this.health, this.maxHealth)
       
           return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${this.getHealthBarHtml(health,this.maxHealth)}
                <div class="dice-container">
                    ${diceArray}
                </div>
            </div>`;
    }  
}



export default Character