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

    // --- TRIGGER THE SHOCK ---


    // Logic for messages
    clickCount++;
    i = 0;
    message.textContent = ""; 

    if (clickCount === 1) {
        currentMessage = "Wait... WHAT IS THAT?!"; 
        container.classList.remove("shock-effect"); 
        void container.offsetWidth; 
        container.classList.add("shock-effect"); 
    } else if (clickCount === 2) {
        currentMessage = "why did the code become error??";
    } else {
        document.getElementById("error-overlay").style.display = "none";
        clickCount = 0;
        return;
    }

    type();
}


document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        changeText();
    }
});