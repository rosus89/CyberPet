import Animal from "./animal.js";

class Rabbit extends Animal {
    constructor(name,health, hunger, thirst, happiness, energy){
        super(name,health, hunger, thirst, happiness, energy)
    }
    play() {
        this.happiness += 10
        this.hunger -= 10
        this.thirst -= 10
        console.log(`${this.name} plays in his maze`)
        return this
    }
    hop() {
        this.happiness += 10
        this.thirst -= 10
        console.log(`${this.name} hops around`)
        return this
    }
}
export default Rabbit