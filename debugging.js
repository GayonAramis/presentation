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

const tasks = [
    { text: "1", damage: 25, hint: "ReferenceError: hp is not defined", hint2: "Hint: Declare the variable using 'let'" },
    { text: "1", damage: 25, hint: "TypeError: attack is not a function", hint2: "Hint: Add parentheses () to call the function" },
    { text: "1", damage: 25, hint: "SyntaxError: bugHp = 100", hint2: "Hint: Use triple equals === to compare" },
    { text: "1", damage: 25, hint: "Error: Scope Error", hint2: "Hint: Access the object property with 'this.hp'" },
];

function checkCode() {
    if (playerHP <= 0 || bugHP <= 0) return;

    const userInput = codeInput.value.trim();
    const currentTask = tasks[currentTaskIndex];

    if (userInput === currentTask.text) {
        bugHP = bugHP - currentTask.damage;
        showLog("CORRECT! Bug damaged!");
        prepareNextTask();
    } else {
        playerHP -= 20;
        hasFailedOnce = true;
        showLog("WRONG! You took damage!");
    }

    updateUI(); 
    checkGameOver(); 
}

function prepareNextTask() {
    codeInput.value = ""; 
    hasFailedOnce = false; 
    
    // Increment moves us to the next index
    currentTaskIndex++;
    
    if (currentTaskIndex >= tasks.length) {
        currentTaskIndex = 0;
    }
}

function updateUI() {
    playerHpDisplay.textContent = `${playerHP} HP`;
    bugHpDisplay.textContent = bugHP > 0 ? `${bugHP} HP` : "DELETED";
    
    // DITO MAG-E-ERROR: "Cannot read property 'hint' of undefined"
    const currentTask = tasks[currentTaskIndex]; 

    if (hasFailedOnce) {
        errorHint.textContent = currentTask.hint2;
        errorHint.className = "helper-text";
    } else {
        errorHint.textContent = currentTask.hint;
        errorHint.className = "error-text";
    }
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
        stats.style.display = "flex";
    }, 1200);
}

function checkGameOver() {
    if (bugHP <= 0) {
        winScreen.style.display = "flex"; 
    } else if (playerHP <= 0) {
        loseScreen.style.display = "flex"; 
    }
}

helpBtn.onclick = () => { howTo.style.display = "block"; };
closeHelp.onclick = () => { howTo.style.display = "none"; };

updateUI();