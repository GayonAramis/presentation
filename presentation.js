const codeInput = document.getElementById("code-input");
const errorHint = document.getElementById("error");
const bugHpDisplay = document.getElementById("bug-hp");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");
const button = document.getElementById("code-runner");

/*======================= 
       GAME SYSTEM
=======================*/
let playerHP = 100;
let bugHP = 100;
let currentTaskIndex = 0;
let hasFailedOnce = false;

/*======================= 
          TASK
=======================*/
const tasks = [
    { text: "function attack()", damage: 20, msg: "FUNCTION COMPILED!", hint: "Error: attack is not defined", hint2: "Hint: Type 'function attack()'" },
    { text: "let damage = 1;", damage: 30, msg: "VARIABLE DECLARED!", hint: "Error: Unexpected identifier", hint2: "Hint: use 'let damage = 1;'" },
    { text: "window.alert();", damage: 100, msg: "SYSTEM ALERT!", hint: "Error: alert is spelled wrong", hint2: "Hint: Type 'window.alert();'" }
];

/*======================= 
          LOGIC
=======================*/

function checkCode() {
    if (playerHP <= 0 || bugHP <= 0) return;

    const userInput = codeInput.value.trim().toLowerCase().replace(/;$/, "");
    const currentTask = tasks[currentTaskIndex];
    const correctTarget = currentTask.text.toLowerCase().replace(/;$/, "");

    if (userInput === correctTarget) {
        handleSuccess(currentTask);
    } else {
        handleFailure();
    }
}

function handleSuccess(task) {
    bugHP -= task.damage;
    showLog(task.msg);
    codeInput.value = "";
    hasFailedOnce = false;
    currentTaskIndex = (currentTaskIndex + 1) % tasks.length;
    
    updateUI();

    if (bugHP <= 0) {
        setTimeout(() => winScreen.style.display = "flex", 1000);
    } else {
        button.disabled = true;
        setTimeout(bugTurn, 1500);
    }
}

function handleFailure() {
    playerHP -= 20;
    showLog("Wrong code! Bug attacked!");
    hasFailedOnce = true;
    button.disabled = true;
    
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

/*======================= 
       UPDATING UI
=======================*/

function updateUI() {
    document.getElementById("display-hp").textContent = `${playerHP}/100`;
    bugHpDisplay.textContent = bugHP > 0 ? `Enemy: ${bugHP} HP` : "DELETED";

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
        stats.style.display = "block";
    }, 1200);
}

updateUI();