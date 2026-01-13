/*  ========================
            Variables
    ======================== */
const text = "<p>hello<p>";
const speed = 120;

let i = 0;
let isTyping = false;

/*  ========================
         Type-Writting
    ======================== */
let button = document.getElementById("GoLive-Button");
button.disabled = false;
let hasHitEnter = false;


const target = document.getElementById("typewriter");

document.addEventListener("keydown", function (event) { /*event is an object that contains information about something the user did. */  //keydown = triggers when the specific key is pressed
    if ((event.ctrlKey || event.metaKey) && event.key === 's' && !isTyping) { //checking if the key is pressed and if the isTyping is wether set to true or false
        event.preventDefault(); //not letting save window open 
        hasHitEnter = true;
        isTyping = true; 
        type(); 
    }
});

function handleGoLive() {
    const messageArea = document.getElementById("status-msg");

    if (hasHitEnter == false) {
        const overlay = document.getElementById("error-overlay");
        overlay.style.display = "flex"; 
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        document.getElementById("message").innerText = "I should press ctrl + first"
    } else {
        // Everything is good, go to the next page
        window.location.href = "idk.html";
    }
}

//typing 
function type() {
    if (i < text.length) { //check if the text is 0 so it will make the if to false
        target.textContent += text.charAt(i);
        i++; //iteration
        setTimeout(type, speed);
    } else {
        button.disabled = false //after stop this button will be set to true/enabled
    }
}





