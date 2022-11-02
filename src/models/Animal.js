class Animal {
    constructor(name){
        this.name = name
        this.health = 50
        this.hunger = 50
        this.thirst = 50
        this.happiness = 50
        this.energy = 100
    }
    drinks() {
        this.health += 5
        this.thirst += 10
        this.energy -= 10
        console.log(`${this.name} is no longer thirsty`)
        return this
    }
    eat() {
        this.health += 5
        this.hunger += 10
        this.happiness -= 10
        this.energy -=10
        console.log(`${this.name} is feeling full`)
        return this
    }
    sleep() {
        this.health += 30
        this.hunger -= 30
        this.happiness -= 30
        this.energy = 100
        console.log(`${this.name} is rested`)
        return this
    }
    stats() {
        return console.table({
            name: this.name,
            health: this.health,
            hunger: this.hunger,
            thirst: this.thirst,
            happiness: this.happiness
        })
    }
}

export default Animal