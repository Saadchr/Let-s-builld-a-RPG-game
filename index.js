import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster(){
    const nextMonsterData = characterData[monstersArray.shift()]
    // Is there a difference with const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData): {}
}


function attack()
 
{ if(!isWaiting){
    wizard.getDiceHtml()
    monster.getDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()

   if(wizard.dead){
        endgame()
    }
    else if(monster.dead){
        isWaiting = true
        if(monstersArray.length > 0){
            setTimeout(()=>{
            monster = getNewMonster(),
            render()
            isWaiting = false
            },1000)
        }
        else{
            endgame()
        }
    }
    
    //render() does the displaying job and generating the arrays
    
}  
}



function endgame(){
    const endmessage = wizard.dead == true? `Le monstre a gagné`
    : `Le wizard a gagné`
    const endEmoji = wizard.dead == true? `🤡`: `☠️`
    setTimeout(()=> {
    document.body.innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endmessage} <h3>
    <p class="end-emoji">${endEmoji}</p>
    </div>`
    console.log(endmessage)
},2000)
}

document.getElementById("attack-button").addEventListener("click",attack)


function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}



const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()

// On veut créer une fonction qui affiche des dés vides avant d'appuyer sur attaque et 
// les remplir