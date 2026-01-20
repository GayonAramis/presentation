// SELECTING HTML ELEMENTS (DOM)
const codeInput = document.getElementById("code-input");
const errorHint = document.getElementById("error");
const bugHpDisplay = document.getElementById("bug-hp");
const playerHpDisplay = document.getElementById("display-hp");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");
const helpBtn = document.getElementById("help-btn");
const howTo = document.getElementById("how-to");
const closeHelp = document.getElementById("close-help");

// GAME VARIABLES
let playerHP = 100;
let bugHP = 100;
let currentTaskIndex = 0;
let hasFailedOnce = false;

// THE LIST OF CHALLENGES (The "Errors")
const tasks = [
    { text: "let hp = 100;", damage: 25, hint: "ReferenceError: hp is not defined", hint2: "Hint: Declare the variable using 'let'" },
    { text: "attack();", damage: 25, hint: "TypeError: attack is not a function", hint2: "Hint: Add parentheses () to call the function" },
    { text: "bugHp === 100", damage: 25, hint: "SyntaxError: bugHp = 100", hint2: "Hint: Use triple equals === to compare" },
    { text: "this.hp", damage: 25, hint: "Error: Scope Error", hint2: "Hint: Access the object property with 'this.hp'" },
];

// main function if the user click the button = run code
function checkCode() {
    if (playerHP <= 0 || bugHP <= 0) return;

    const userInput = codeInput.value.trim();
    const currentTask = tasks[currentTaskIndex];

    if (userInput === currentTask.text) {
        // SUCCESS PATH
        bugHP = bugHP - currentTask.damage;
        showLog("CORRECT! Bug damaged!");
        prepareNextTask();
    } else {
        // FAILURE PATH
        playerHP = playerHP - 20;
        hasFailedOnce = true;
        showLog("WRONG! You took damage!");
    }
    
    updateUI(); 
    checkGameOver(); 
}

function prepareNextTask() {
    codeInput.value = ""; 
    hasFailedOnce = false; 
    
    // move to next task
    currentTaskIndex = currentTaskIndex + 1;
    
    // If we go past the last task, restart at 0
    if (currentTaskIndex >= tasks.length) {
        currentTaskIndex = 0;
    }
}

// UI UPDATE: Redraws the screen numbers and hints
function updateUI() {
    playerHpDisplay.textContent = `${playerHP} HP`;
    bugHpDisplay.textContent = bugHP > 0 ? `${bugHP} HP` : "DELETED";

    const currentTask = tasks[currentTaskIndex];
    if (hasFailedOnce) {
        errorHint.textContent = currentTask.hint2;
        errorHint.className = "helper-text";
    } else {
        errorHint.textContent = currentTask.hint;
        errorHint.className = "error-text";
    }
}

// LOG SYSTEM: Shows temporary messages
function showLog(message) {
    const stats = document.getElementById("stats-content");
    const logContainer = document.getElementById("log-content");
    const logText = document.getElementById("log-text");

    stats.style.display = "none";
    logContainer.style.display = "block";
    logText.textContent = message;

    setTimeout(() => {
        logContainer.style.display = "none";
        stats.style.display = "flex";
    }, 1200);
}

// WIN/LOSS CHECK
function checkGameOver() {
    if (bugHP <= 0) {
        winScreen.style.display = "flex";
    } else if (playerHP <= 0) {
        loseScreen.style.display = "flex";
    }
}

// HOW-TO PANEL HANDLERS
helpBtn.onclick = () => { howTo.style.display = "block"; };
closeHelp.onclick = () => { howTo.style.display = "none"; };

// START GAME
updateUI();