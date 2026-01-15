const nameInput = document.getElementById("input-name");
const displayName = document.getElementById("display-name");

// Update preview name as you type
nameInput.addEventListener('input', function() {
    displayName.textContent = nameInput.value === "" ? "" : nameInput.value;
});

class Character {
    constructor(name, hp, mp) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.mp = mp;
        this.maxMp = mp;
        this.isdefending = false
    }

    attack(target) {
        target.takeDamage(10);
        console.log(`${this.name} attacks ${target.name}!`);
    }

    acidSpit(target) {
        target.takeDamage(20);
        this.mp -= 10;
        console.log(`${this.name} used ACID SPIT!`);
    }

    lifeDrain(target) {
        target.takeDamage(8);
        this.hp = Math.min(this.maxHp, this.hp + 10);
        console.log(`${this.name} used LIFE DRAIN!`);
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }
}

// 1. Initialize characters
let player = new Character("Hero", 100, 50);
let bug = new Character("Bug", 50, 20);

function start() {
    if (nameInput.value.trim() === "") {
        nameInput.focus();
        return;
    }

    // Update the player object with the chosen name
    player.name = nameInput.value;
    displayName.textContent = player.name;

    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("main-ui-wrapper").style.display = "flex";
    
    updateUI(); 
    console.log("Game Started!");
}

function showLog(message) {
    const stats = document.getElementById("stats-content");
    const logContainer = document.getElementById("log-content");
    const logText = document.getElementById("log-text");

    // 1. Hide stats, show log
    stats.style.display = "none";
    logContainer.style.display = "block";
    logText.textContent = message;

    // 2. Wait 1.5 seconds, then switch back
    setTimeout(() => {
        logContainer.style.display = "none";
        stats.style.display = "block";
    }, 1500);
}

function Attack() {
    player.attack(bug);
    updateUI();
    
    showLog(`${player.name} attacked!`);

    if (bug.hp <= 0) {
        setTimeout(() => {
            showLog("Bug Defeated!");
            const bugHpElement = document.getElementById("bug-hp");
            if(bugHpElement) bugHpElement.textContent = "DEAD";
        }, 1600);
        return; 
    }

    setTimeout(bugTurn, 2000);
}

function Defend() {
    player.isdefending = true;
    showLog(`${player.name} is Defending`);

    setTimeout(bugTurn, 1500);
}

function bugTurn() {
    let choice = Math.floor(Math.random() * 3);
    let message = "";

    if (choice === 2) { 
        bug.lifeDrain(player);
        message = "Drain bypassed defense!";
    } 
    else if (player.isdefending) {
        message = "Blocked! No damage.";
    } 
    else {
        if (choice === 0) {
            bug.attack(player);
            message = "Bug bit you!";
        } else {
            bug.acidSpit(player);
            message = "Acid Spit!";
        }
    }

    player.isdefending = false;

    updateUI();
    showLog(message);
}

function updateUI() {
    document.getElementById("display-hp").textContent = `${player.hp}/${player.maxHp}`;
    document.getElementById("display-mp").textContent = `${player.mp}/${player.maxMp}`;
    
    // Add this to your HTML if you want to see Bug's health
    const you = document.getElementById("you");
    if(you) you.textContent = `You`;

    const bugHpElement = document.getElementById("bug-hp");
    if(bugHpElement) bugHpElement.textContent = `Bug HP: ${bug.hp}`;
}