// --- DOM ELEMENTS ---
const codeInput = document.getElementById("code-input");
const errorHint = document.getElementById("error");
const bugHpDisplay = document.getElementById("bug-hp");
const winScreen = document.getElementById("win-screen");

// --- GAME STATE ---
let currentTaskIndex = 0;
let hasFailedOnce = false;

// --- TASK SYSTEM ---
const tasks = [
    { 
        text: "function attack()", 
        damage: 20, 
        msg: "FUNCTION COMPILED!", 
        hint: "Uncaught ReferenceError: attack is not defined", 
        hint2: "Hint: make a function named attack"
    },
    { 
        text: "let damage = 1;", 
        damage: 30, 
        msg: "VARIABLE DECLARED!", 
        hint: "Uncaught SyntaxError: Unexpected identifier 'damage'",
        hint2: "Hint: Variables use 'let' followed by '=' and number 1."
    },
    { 
        text: "window.alert();", 
        damage: 1000, 
        msg: "SYSTEM ALERT!", 
        hint: "Uncaught TypeError: window.alrt is not a function",
        hint2: "Hint: alert is spelled a-l-e-r-t."
    }
];

// --- CHARACTER CLASS ---
class Character {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
    }
    attack(target, damage) {
        target.takeDamage(damage);
    }
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }
}

let player = new Character("Hero", 100);
let bug = new Character("Bug", 100);

// --- GAME FUNCTIONS ---
function checkCode() {
    const userInput = codeInput.value.trim().toLowerCase().replace(/;$/, "");
    const currentTask = tasks[currentTaskIndex];
    const correctTarget = currentTask.text.toLowerCase().replace(/;$/, "");

    if (userInput === correctTarget) {
        player.attack(bug, currentTask.damage);
        showLog(currentTask.msg);
        codeInput.value = ""; 
        hasFailedOnce = false; // Reset hint state
        currentTaskIndex = (currentTaskIndex + 1) % tasks.length;
        updateUI();
        if (bug.hp <= 0) {
            setTimeout(() => {
                winScreen.style.display = "flex";
            }, 1500);
        } else {
            setTimeout(bugTurn, 2000);
        }
    } else {
        player.takeDamage(20);
        showLog("SYNTAX ERROR!");
        hasFailedOnce = true; // Trigger helper hint
        updateUI();
        codeInput.classList.add("error-shake");
        setTimeout(() => codeInput.classList.remove("error-shake"), 500);
    }
}

function bugTurn() {
    if (bug.hp <= 0) return;
    bug.attack(player, 10);
    updateUI();
    showLog("Bug sent a Virus!");
}

function showLog(message) {
    const stats = document.getElementById("stats-content");
    const logContainer = document.getElementById("log-content");
    const logText = document.getElementById("log-text");
    stats.style.display = "none";
    logContainer.style.display = "block";
    logText.textContent = message;
    setTimeout(() => {
        logContainer.style.display = "none";
        stats.style.display = "block";
    }, 1500);
}

function updateUI() {
    document.getElementById("display-hp").textContent = `${player.hp}/${player.maxHp}`;
    bugHpDisplay.textContent = bug.hp > 0 ? `Enemy: ${bug.hp} HP` : "DELETED";

    const currentTask = tasks[currentTaskIndex];
    if (hasFailedOnce) {
        errorHint.textContent = currentTask.hint2;
        errorHint.className = "helper-text";
    } else {
        errorHint.textContent = currentTask.hint;
        errorHint.className = "error-text";
    }
}

// Initialize game on page load
updateUI();