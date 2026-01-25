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
const subjectWrapper = document.getElementById("subjectSelector-wrapper");
const PlayerChoice = document.getElementById("subjectSelector");
const changeSubjectText = document.getElementById("changeSubjectText");

// GAME VARIABLES
let playerHP = 100;
let bugHP = 100;
let currentTaskIndex = 0;
let hasFailedOnce = false;

/*
The CORE: ARRAYS
This array serve as the core for the game logic
The player must input the correct code to deal damage to the enemy
*/
const Programming = [ //code
    { text: "let hp = 100", damage: 20, hint: "ReferenceError: declare an variable using let and equal to 100", hint2: "Hint: Declare the variable using 'let' named hp and equal to 100" },
    { text: "attack()", damage: 20, hint: "TypeError: attack is not a function", hint2: "Hint: Add parentheses () to call the function" },
    { text: "bugHp === 100", damage: 20, hint: "SyntaxError: bugHp = 100", hint2: "Hint: Use triple equals === to compare" },
    { text: "console.log(hp)", damage: 20, hint: "Error: No output", hint2: "Hint: Use console.log() to print values" },
    { text: "let name = 'Bug'", damage: 20, hint: "Error: String missing", hint2: "Hint: Wrap text in single or double quotes" }
];

const ReadingAndWriting= [  //RAW 4, 5, 7
    { text: "Claim of Fact", damage: 20, hint: "A claim that affirms or asserts whether a statement is true or untrue.", hint2: "Answer: C_ _ _m of F_ _t" },
    { text: "Claim of Policy", damage: 20, hint: "A claim that poses a solution to a problem and usually uses 'should'.", hint2: "Answer: C_ _ _m of P_ _ _ _y" },
    { text: "Context", damage: 20, hint: "The circumstances that give an idea about an event or text so it can be fully understood.", hint2: "Answer: C_ _ _ _xt" },
    { text: "Intertextuality", damage: 20, hint: "The relationship or connection formed between two or more different texts.", hint2: "Answer: I_ _ _ _ _ _ _ _ _ _ _ _ty" },
    { text: "Counterclaim", damage: 20, hint: "A statement that goes against or disagrees with a previously stated claim.", hint2: "Answer: C_ _ _ _ _ _ _ _ _im" }
];

const PagbasaAtPagsusuri = [ //Ai
    { text: "Tekstong Impormatibo", damage: 20, hint: "Anong tekstong nagbibigay ng datos?", hint2: "Sagot: T_ _ _ _ _ng I_ _ _ _ _ _ _ _ _o" },
    { text: "Reperensyal", damage: 20, hint: "Uri ng pagsulat para sa mga references?", hint2: "Sagot: R_p_r_ns_y_l" },
    { text: "Paraphrase", damage: 20, hint: "Muling pagpapahayag gamit ang sariling salita?", hint2: "Sagot: P_r_p_r_se" },
    { text: "Metodolohiya", damage: 20, hint: "Bahagi ng pananaliksik na may disenyo at pamamaraan?", hint2: "Sagot: M_t_d_l_h_y_" },
    { text: "Abstrak", damage: 20, hint: "Maikling buod ng isang akademikong sulatin?", hint2: "Sagot: A_s_r_k" }
];

const Philosophy = [ //Ai
    { text: "Socrates", damage: 20, hint: "Who said the famous line 'Know Thyself'?", hint2: "Answer: S_c_r_a_t_e_s" },
    { text: "Logic", damage: 20, hint: "What branch of philosophy deals with correct reasoning?", hint2: "Answer: L_o_g_i_c" },
    { text: "Ethics", damage: 20, hint: "What branch of philosophy studies morality and right conduct?", hint2: "Answer: E_t_h_i_c_s" },
    { text: "Holistic", damage: 20, hint: "What perspective looks at the 'big picture' or the whole system?", hint2: "Answer: H_o_l_i_s_t_i_c" },
    { text: "Plato", damage: 20, hint: "Who is the philosopher that wrote 'The Republic'?", hint2: "Answer: P_l_a_t_o" }
];

const Eap =  [ //1 2 3 4 8
    { text: "Exposition", damage: 20, hint: "Which type of discourse explains or gives information?", hint2: "It is commonly used in textbooks and reports." },
    { text: "Topic and Controlling Idea", damage: 20, hint: "What are the two main parts of a topic sentence?", hint2: "One part tells what the paragraph is about, the other limits the idea." },
    { text: "Cause and Effect", damage: 20, hint: "What pattern of paragraph development explains reasons and results?", hint2: "It answers 'Why did this happen?' and 'What happened because of it?'" },
    { text: "Plagiarism and Copyright Infringement", damage: 20, hint: "What two problems can be avoided by properly citing sources?", hint2: "One is stealing ideas, the other is breaking ownership laws." },
    { text: "Central Claim", damage: 20, hint: "What is a thesis statement mainly used to present?", hint2: "It shows the writer’s stand in the whole paper." },
];

const Statistics = [ //Ai
    { text: "Population", damage: 20, hint: "What do you call the entire group being studied?", hint2: "Answer: P_o_p_u_l_a_t_i_o_n" },
    { text: "Sample", damage: 20, hint: "What is the term for a small part or subset of a population?", hint2: "Answer: S_a_m_p_l_e" },
    { text: "Mean", damage: 20, hint: "What is the average of a set of numbers?", hint2: "Answer: M_e_a_n" },
    { text: "Median", damage: 20, hint: "What is the middle value in a data set when arranged in order?", hint2: "Answer: M_e_d_i_a_n" },
    { text: "Probability", damage: 20, hint: "What is the measure of the likelihood that an event will occur?", hint2: "Answer: P_r_o_b_a_b_i_l_i_t_y" }
];

const PR = [ //Notebook
    { text: "Quantitative", damage: 20, hint: "Research that focuses on numbers and statistical analysis?", hint2: "Hint: It answers 'How many?' or 'How much?'" },
    { text: "Qualitative", damage: 20, hint: "Research that focuses on experiences, meanings, and words?", hint2: "Hint: It answers 'Why?' or 'How?'" },
    { text: "Variable", damage: 20, hint: "What do you call a characteristic or attribute that can be measured?", hint2: "Hint: It can be Independent or Dependent." },
    { text: "Hypothesis", damage: 20, hint: "What is the term for an educated guess or a testable prediction?", hint2: "Hint: It is often an 'If-Then' statement." },
    { text: "Ethics", damage: 20, hint: "The moral principles that guide researchers to protect participants?", hint2: "Hint: This includes 'Informed Consent' and 'Confidentiality'." }
];

/* 
    This Data module change the variable currentSubject to what the User/player 
    prepared subject, this data module handle the collection of data which will change
    using currentSubject = subject.
*/
let currentSubject = Programming;
const SubjectSelector = document.getElementById("subjectSelector");


//used null guard
if (SubjectSelector) {
    SubjectSelector.addEventListener("change", () => {  //() => still a function but in modern way
        if (SubjectSelector.value === "ReadingAndWriting") {
            currentSubject = ReadingAndWriting;
        } else if (SubjectSelector.value === "PagbasaAtPagsusuri")  {
            currentSubject = PagbasaAtPagsusuri;
        } else if (SubjectSelector.value === "Philosophy")  {
            currentSubject = Philosophy;
        } else if (SubjectSelector.value === "Eap")  {
            currentSubject = Eap;
        } else if (SubjectSelector.value === "PR")  {
            currentSubject = PR;
        } else if (SubjectSelector.value === "Statistics") {
            currentSubject = Statistics;
        } else {
            currentSubject = Programming;
        }

        currentTaskIndex = 0;
        updateUI();
    });
}


    let isGamestarted = false;
/*
This function is from a button named "Check Code" 
This code will check if the player and bug has 0 hp before procedding
This also check if the user input matches the current tast text property
*/
function GameStart() {
    if (playerHP <= 0 || bugHP <= 0) return;
    isGamestarted = true;
    if (isGamestarted == true) {
        PlayerChoice.style.display = "none"
        changeSubjectText.style.display = "none"
        
    }


    if (subjectWrapper) {
        subjectWrapper.style.display = "none";
    }

    const userInput = codeInput.value.trim();   
    const currentTask = currentSubject[currentTaskIndex];
    /*
        *This condition compare  the user input the the task text property
            and will only proceed if both are equal to each other
    */
    if (userInput === currentTask.text) {
        bugHP -= currentTask.damage;
        /*
            *Success logic: Updates the game UI
                and advance to the next task this will also
                activate the damage property so that the bug hp reduce
        */
        showLog("CORRECT! Bug damaged!");
        prepareNextTask();
    } else {
        /*
            *Fail logic: Player takes damage
                and won't advance to the next task they will also
                get a hint from hint 2 that has the answer so that they can
                advance to the next tag
        */
        playerHP -= 20;
        hasFailedOnce = true;
        showLog("WRONG! You took damage!");
    }
        /*
            *The "UpdateUi()" syncronize the game state 
                to the screen numbers and hints
            *The "checkGameOver()" will check if the player or bug has 0 hp
                and will show the win or lose screen accordingly    
        */
    updateUI(); 
    checkGameOver(); 
}

/*
    *This function Executes only when the user got the correct answer
*/
function prepareNextTask() {
    codeInput.value = ""; 
    hasFailedOnce = false; 
    
    /*
        *Used increment operator to update the current task index if the game
        *advance to the next task
    */
    currentTaskIndex++;
    
    // Used circular logic after completing all tasks
    if (currentTaskIndex >= currentSubject.length) {
        currentTaskIndex = 0; 
    }
}

// UI UPDATE: 
function updateUI() {
    playerHpDisplay.textContent = `${playerHP} HP`;
    /*
        Used ternary operator to simplify the if else statement
        this will check if the bug has more than 0 hp to display hp and text will change to delete 
        the health is less than 0 or equal
    */
    bugHpDisplay.textContent = bugHP > 0 ? `${bugHP} HP` : "DELETED";

    // INAYOS KO ITO: Kinukuha dapat ang task mula sa currentSubject
    const currentTask = currentSubject[currentTaskIndex];
    
    /*
        ERROR HINT LOGIC: Shows different hints based on hasFailedOnce variable
        if it was sent to true it will show hint2 ele it will show hint1
    */
    if (hasFailedOnce) {
        errorHint.textContent = currentTask.hint2;
        errorHint.className = "helper-text";
    } else {
        errorHint.textContent = currentTask.hint;
        errorHint.className = "error-text";
    }
}

/* LOG SYSTEM:
    This function Overides the stats ui to show a log message for 1.2 seconds
*/
function showLog(message) {
    const stats = document.getElementById("stats-content");
    const logContainer = document.getElementById("log-content");
    const logText = document.getElementById("log-text");

    //This will hide and show the stats and log messages
    stats.style.display = "none";
    logContainer.style.display = "block";
    logText.textContent = message;

    //Added set time out to delay the log message 
    setTimeout(() => {
        logContainer.style.display = "none";
        stats.style.display = "flex";
    }, 1200);
}

/*
this function check if the game is over
when the bug or the player has 0 hp 
*/
function checkGameOver() {
    if (bugHP <= 0) {
        winScreen.style.display = "flex"; 
    } else if (playerHP <= 0) {        //flex = Shows the UI or the win screen
        loseScreen.style.display = "flex"; 
    }
}

/* This section handle the help button logic
    the section has twwo button one is to open and the other is to close the help screen
*/
helpBtn.onclick = () => { howTo.style.display = "block"; };
closeHelp.onclick = () => { howTo.style.display = "none"; };

// The original Ui Will appear when the game start
updateUI();