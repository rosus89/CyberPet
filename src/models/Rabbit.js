import Animal from "./animal.js";

class Rabbit extends Animal {
    constructor(name){
        super(name)
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