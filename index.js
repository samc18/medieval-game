import characterData from "./data.js"
import Character from "./Character.js"

const monstersArray = ["orc", "goblin", "demon"]

const wizard = new Character(characterData.wizard)
let monster = getNextMonster()

const button = document.getElementById("btn")
button.addEventListener("click", attack)


function getNextMonster() {
    let nextMonster = characterData[monstersArray.shift()]
    return nextMonster ? new Character(nextMonster) : {}
}

function render() {
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

function attack() {
    wizard.setDiceHtml()
    monster.setDiceHtml()

    wizard.setDamage()
    monster.setDamage()

    wizard.takeDamage(monster.damage)
    monster.takeDamage(wizard.damage)

    if (wizard.healthPoints === 0) {
        document.getElementById("btn").style.display = "none"
        setTimeout(setWinnerDisplay, 2000)
    } else if (monster.healthPoints === 0) {
        if (monstersArray.length > 0) {
            document.getElementById("btn").style.display = "none"
            setTimeout(() => { 
                monster = getNextMonster()
                render()
                document.getElementById("btn").style.display = "inline-block"
            }, 1500)
        } else {
            document.getElementById("btn").style.display = "none"
            setTimeout(setWinnerDisplay, 2000)
        }
    }
    
    render()
}

function setWinnerDisplay() {
    const endMessage = wizard.healthPoints === 0 && monster.healthPoints === 0 ?
        "No one has won!" : wizard.healthPoints > 0 ? 
            "The wizard has won!" : "The monsters have won!"

    const endEmoji = wizard.healthPoints > 0 ? "🔮" : "☠️"

    document.body.innerHTML = `<h2>Game Over</h2>
                                <h3>${endMessage}</h3>
                                <h3>${endEmoji}</h3>`
}

render()



