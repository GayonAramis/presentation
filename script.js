const codeInput = document.getElementById("code-input");
const errorHint = document.getElementById("error");
const bugHpDisplay = document.getElementById("bug-hp");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");
const button = document.getElementById("code-runner");
const helpBtn = document.getElementById("help-btn");
const howTo = document.getElementById("how-to");
const closeHelp = document.getElementById("close-help");

let playerHP = 100;
let bugHP = 100;
let currentTaskIndex = 0;
let hasFailedOnce = false;

const tasks = [
    { 
        text: "let hp = 100;", 
        damage: 25,
        hint: "ReferenceError: hp is not defined", 
        hint2: "Hint: You need to initialize the variable: 'let hp = 100;'" 
    },
    { 
        text: "attack();", 
        damage: 25,
        hint: "TypeError: attack is not a function", 
        hint2: "Hint: Call the function correctly: 'attack();'" 
    },
    { 
        text: "bugHp === 100", 
        damage: 25,
        hint: "SyntaxError: Unexpected token 'bugHp = 100'", 
        hint2: "Hint: use strict comparison:" 
    },
    { 
        text: "this.hp", 
        damage: 25,
        hint: "ReferenceError: hp is not defined", 
        hint2: "Hint: Access the property via the current object using 'this.hp'" 
    }
];

function checkCode() {
    if (playerHP <= 0 || bugHP <= 0) return;

    const userInput = codeInput.value.trim().toLowerCase().replace(/;$/, "");
    const currentTask = tasks[currentTaskIndex];
    const correctTarget = currentTask.text;

    if (userInput === correctTarget) {
        handleSuccess(currentTask);
    } else {
        handleFailure();
    }
}

function handleSuccess(task) {
    bugHP -= task.damage;
    showLog("SUCCESS: HIT CONFIRMED!");
    codeInput.value = "";
    hasFailedOnce = false;
    currentTaskIndex++; 

    // 2. Check if we've gone past the last task
    if (currentTaskIndex >= tasks.length) {
        currentTaskIndex = 0; 
    }

    updateUI();

    if (bugHP <= 0) {
        setTimeout(() => winScreen.style.display = "flex", 1000);
    } else {
        setTimeout(() => button.disabled = false, 1200);
    }
}


function handleFailure() {
    playerHP -= 25;
    showLog("Wrong code! Bug attacked!");
    hasFailedOnce = true;
    updateUI();

    if (playerHP <= 0) {
        setTimeout(() => loseScreen.style.display = "flex", 1000);
    } else {
        setTimeout(bugTurn, 1500);
    }
}

function bugTurn() {
    if (bugHP <= 0 || playerHP <= 0) return;
    
    playerHP -= 10;
    updateUI();
    showLog("Bug sent an error attack!");
    setTimeout(() => {
        if (playerHP > 0) button.disabled = false;
    }, 1500);
}
function updateUI() {
    document.getElementById("display-hp").textContent = `${playerHP} HP`;
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
        updateUI();
    }, 1200);
}

if (helpBtn && howTo && closeHelp) {
    helpBtn.addEventListener("click", () => { howTo.style.display = "block"; });
    closeHelp.addEventListener("click", () => { howTo.style.display = "none"; });
}

updateUI();