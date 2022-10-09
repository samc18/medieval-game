import {getDice, getPercentage} from "./utils.js"

class Character {
    constructor(data) {
        Object.assign(this, data)
        this.diceHtml = this.getDicePlaceholders(this.diceCount)
        this.damage = 0
        this.maxHealthPoints = this.healthPoints
        this.healthBar = this.getHealthPercentage()
    }

    getHealthPercentage() {
        let percent = getPercentage(this.healthPoints, this.maxHealthPoints)
        return `<div class="outside-bar">
                    <div class="inside-bar" style="width:${percent}%; background-color:
                        ${percent <= 20 ? "red" : "blue"}"></div>
                </div>`
    }

    takeDamage(dmg) {
        if (dmg >= this.healthPoints) {
            this.healthPoints = 0
        } else {
            this.healthPoints -= dmg
        }  

        this.healthBar = this.getHealthPercentage()
    }

    setDamage() {
        this.damage = this.diceScores.reduce((currentValue, nextValue) => {
            return currentValue + nextValue
        })
    }

    getCharacterHtml() {
        const { name, img, healthPoints, diceCount, diceScores, diceHtml, healthBar } = this
        return `<div class="card">
                    <h1>${name}</h1>
                    <img src=${img}>
                    <p>Health: ${healthPoints}</p>
                    ${healthBar}
                    <div id="dice-container">
                        ${diceHtml}
                    </div>
                </div>`
    }

    getDicePlaceholders(diceCount) {
        return new Array(diceCount).fill(0).map(() => {
            return `<div class="dice"></div>`
        }).join("")
    }

    setDiceHtml() {
        this.diceScores = getDice(this.diceCount)
        this.diceHtml = this.diceScores.map((dice) => {
            return `<div class="dice">${dice}</div>`
        }).join("")
    }
}

export default Character