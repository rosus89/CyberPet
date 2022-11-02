import Animal from "./animal.js";

class Dog extends Animal {
    constructor(name){
        super(name)
    }
    play() {
        this.happiness += 10
        this.hunger -= 10
        this.thirst -= 10
        console.log(`${this.name} is a good dog, a fetches the ball`)
        return this
    }
    activity() {
        this.health += 10
        console.log(`taking ${this.name} for a walk`)
        return this
    }
}
export default Dog