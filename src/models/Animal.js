class Animal {
    constructor(name,health, hunger, thirst, happiness, energy){
        this.name = name
        this.health = health === undefined ? 50 : health
        this.hunger = hunger === undefined ? 50 : hunger
        this.thirst = thirst === undefined ? 50 : thirst
        this.happiness = happiness === undefined ? 50 : happiness
        this.energy = energy === undefined ? 100 :energy
    }
    drink() {
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