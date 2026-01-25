// DOM
const ErrorOverlay = document.getElementById("error-overlay");
const DialogBox = document.getElementById("DialogBox");
const Message = document.getElementById("message");
const SpeakerName = document.getElementById("SpeakerName");
const tutorial = document.querySelector(".tutorial");
const choicesBox = document.getElementById("choices");

// variables
let step = 0;
let Currentscene = "calling 911";
let dialogue = null;
let cluesFound = [];

// dialogue arrays
const callDialogue = [
    {
        action: () => { tutorial.style.display = "none"; },
        speaker: "Dispatcher",
        text: "Broomfield dispatcher speaking"
    },
    { speaker: "911 caller", text: "umm... Hi there" },
    { speaker: "Dan Krug", text: "umm... My Name is Dan Krug" },
    { speaker: "Dan Krug", text: "I don't think that this is an emergency..." },
    { speaker: "Dan Krug", text: "But this feels really weird" },
    { speaker: "Dispatcher", text: "OK" },
    { speaker: "Dan Krug", text: "My wife isn't responding... uhh..." },
    { speaker: "Dan Krug", text: "To my text messages, or phone calls." },
    {
        speaker: "Dan Krug",
        html: "We had <span class='clue-word' onclick='foundClue(\"threats\")'>threats</span> against us"
    },
    { speaker: "Dan Krug", text: "We have both been" },
    {
        speaker: "Dan Krug",
        html: "Targeted by... a <span class='clue-word' onclick='foundClue(\"stalker\")'>stalker</span>"
    },
    { speaker: "Dan Krug", text: "Uhh... Threats have been made against my wife" },
    { speaker: "Dan Krug", text: "Uhh... and - and threatening to like.." },
    { speaker: "Dan Krug", text: "Kidnap her" },
    { speaker: "Dan Krug", text: "Which is why I'm..." },
    { speaker: "Dan Krug", text: "I'm nervous that she's not answering me..." },
    { speaker: null, text: "Call ended." }
];

const doorDialogue = [
    { speaker: null, text: "You arrive at the Krug residence." },
    { speaker: null, text: "You saw a girl standing outside the house when you arrived." },
    { speaker: "Officer", text: "Hello" },
    { speaker: "Misterious girl", text: "oh... (laughs a little)" },
    { speaker: "Misterious girl", text: "I was just their uhm.." },
    { speaker: "Krug's neighbor", text: "I'm their neighbor," },
    { speaker: "Krug's neighbor", text: "and they called me like he's like," },
    { speaker: "Krugs's neighbor", text: `"Can you go and see if she'll answer the door?"` },
    { speaker: "Officer", text: "Oh, yeah, he sent us as well. So..." },
    {
        speaker: null,
        text: "What do you do?",
        choices: [
            {
                text: "Check the window",
                onSelect: () => {
                    dialogue = windowDialogue;
                    Currentscene = "door";
                    step = 0;
                    NextButton();
                }
            },
            {
                text: "Go to the garage entrance",
                onSelect: () => {
                    dialogue = garageDialogue;
                    Currentscene = "door";
                    step = 0;
                    NextButton();
                }
            }
        ]
    }
];

const windowDialogue = [
    { speaker: null, text: "You check the window." },
    { speaker: null, text: "The lights are off. The house is quiet." },
    {
        speaker: null,
        text: "You don't see anything wrong from outside.",
        choices: [
            {
                text: "go to the garage entrance",
                onSelect: () => {
                    dialogue = garageDialogue;
                    Currentscene = "door";
                    step = 0;
                    NextButton();
                }
            }
        ]
    }
];

const garageDialogue = [
    { speaker: null, text: "You go to the garage entrance." },
    {
        speaker: null,
        text: "The garage door has a small window.",
        choices: [
            {
                text: "climb up and look inside",
                onSelect: () => {
                    dialogue = climbingDialogue;
                    Currentscene = "door";
                    step = 0;
                    NextButton();
                }
            },
            {
                text: "use your car as a step to look inside",
                onSelect: () => {
                    dialogue = useCarDialogue;
                    Currentscene = "door";
                    step = 0;
                    NextButton();
                }
            }
        ]
    }
];

let climbingtries = 0;
const climbingDialogue = [
    {
        speaker: null,
        text: "You tried to climb up but couldn't reach the window.",
        choices: [
            {
                text: "use your car as a step to look inside",
                onSelect: () => {
                    dialogue = useCarDialogue;
                    Currentscene = "door";
                    step = 0;
                    NextButton();
                }
            }
        ]
    }
];

const useCarDialogue = [
  { speaker: null, text: "You use your car as a step to look inside." },
  { speaker: null, text: "You see a messy garage." },
  { 
    speaker: null, 
    text: "Nothing seems out of the ordinary.",
    deadperson: [
      {
        name: "garage",
        description: "You found the body of Mrs. Krug lying behind some boxes in the garage.",
      }
    ]
  }
];

dialogue = callDialogue;

// functions
function NextButton() {
    if (!dialogue) return;

    if (step >= dialogue.length) {
        if (Currentscene === "calling 911") {
            Currentscene = "door";
            dialogue = doorDialogue;
            step = 0;
            NextButton();
        }
        return;
    }

    const currentDialogue = dialogue[step];
    step++;

    SpeakerName.innerText = currentDialogue.speaker || "";
    SpeakerName.style.display = currentDialogue.speaker ? "inline-block" : "none";

    if (currentDialogue.html) {
        Message.innerHTML = currentDialogue.html;
    } else {
        Message.innerText = currentDialogue.text || "";
    }

    if (currentDialogue.action) currentDialogue.action();

    // SHOW DEADPERSON IMAGE ONLY WHEN IT EXISTS
    if (currentDialogue.deadperson) {
        document.getElementById("deadperson-img").style.display = "block";
    }

    if (currentDialogue.choices) {
        showChoices(currentDialogue.choices);
        return;
    }
}

function showChoices(options) {
    choicesBox.innerHTML = "";
    choicesBox.style.display = "flex";

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option.text;
        btn.onclick = () => {
            choicesBox.style.display = "none";
            option.onSelect();
        };
        choicesBox.appendChild(btn);
    });
}

function foundClue(name) {
    if (!cluesFound.includes(name)) cluesFound.push(name);
}

function showEvidence() {
    alert("Clues: " + cluesFound.join(", "));
}

// NEW FUNCTION
function showDeadPerson() {
    const current = dialogue[step - 1];
    if (!current.deadperson) return;

    const dead = current.deadperson[0];
    const box = document.getElementById("deadperson-box");

    box.style.display = "block";
    box.innerText = dead.description;
}
