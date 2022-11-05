import Animal from "./animal.js";

class Cat extends Animal {
    constructor(name,health, hunger, thirst, happiness, energy) {
        super(name,health, hunger, thirst, happiness, energy)
    }
    play() {
        this.happiness += 10
        this.hunger -= 10
        this.thirst -= 10
        console.log(`${this.name} is happy`)
        return this
    }
    groom() {
        console.log(`${this.name} is very chill right now`)
        this.health += 10
        this.happiness += 10
        return this
    }
}

export default Cat