/* ========================
        Variables
======================== */
let currentMessage = "What..."; 
const speed = 40; 
let i = 0; 
let clickCount = 0; 

window.onload = function() {
    const overlay = document.getElementById("error-overlay");
    overlay.style.display = "none"; 
    setTimeout(() => {
        overlay.style.display = "flex"; 
        type(); 
    }, 2000); 
};

/* ===================
       TYPEWRITER
===================== */
function type() {
    const target = document.getElementById("dialog-message");
    if (!target) return;

    if (i < currentMessage.length) {
        target.textContent += currentMessage.charAt(i);
        i++;
        setTimeout(type, speed);
    }
}

/* ======================
        DIALOG CHANGE
====================== */
function changeText() {
    const message = document.getElementById("dialog-message");
    const container = document.querySelector(".vn-container");

    if (!message) return;

    
    // Logic for messages
    clickCount++;
    i = 0;
    message.textContent = ""; 

    if (clickCount === 1) {
        currentMessage = "Wait... WHAT IS THAT?!"; 
        if (container) {
            container.classList.remove("shock-effect"); 
            void container.offsetWidth; 
            container.classList.add("shock-effect");
        } 
    } else if (clickCount === 2) {
        currentMessage = "why did the code become error??";
    } else {
        document.getElementById("error-overlay").style.display = "none";
        clickCount = 0;
        return;
    }

    type();
}

// Keyboard shortcut for Ctrl+S
document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        changeText();

        player.takeDamage(enemy.strength); 
        enemy.takeDamage(player.strength);
    }
});

/*=======================
        objects
========================*/

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

const player = new Character("You", 100, 20);
const enemy = new Character("error", 50, 10);

console.log(player);
