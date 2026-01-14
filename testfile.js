class Character {
    constructor(name, health, strength) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    //method for taking damage
    takeDamage(amount) {
        this.health -= amount;
        console.log(`${this.name} now has ${this.health} HP left.`);
    }
}

const player = new Character("Hero", 100, 20);
const enemy = new Character("Enemy", 80, 15);

console.log(player);
console.log(enemy);

function attack() {
    enemy.takeDamage(player.strength);
    player.takeDamage(enemy.strength);
}

function defense() {
    console.log("enemy used Attack")
    console.log("player used defense, No damage taken this turn.");
}

