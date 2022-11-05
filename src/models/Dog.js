import Animal from "./animal.js";

class Dog extends Animal {
    constructor(name,health, hunger, thirst, happiness, energy){
        super(name,health, hunger, thirst, happiness, energy)
    }
    tossBall() {
        this.happiness += 10
        this.hunger -= 10
        this.thirst -= 10
        console.log(`${this.name} is a good dog and fetches the ball`)
        return this
    }
    walk() {
        this.health += 10
        console.log(`taking ${this.name} for a walk`)
        return this
    }
}
export default Dog