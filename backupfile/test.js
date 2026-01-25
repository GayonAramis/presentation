//Dom - document object model
        const StartGame = document.getElementById("Start");
        const Interrogate = document.getElementById("Interrogate");
        const SuspectData = document.getElementById("SuspectData");
        const ChoiceCalm = document.getElementById("Choice-calm");
        const ChoiceAggresive = document.getElementById("Choice-aggresive");
        const Dialog = document.getElementById("DialogDisplay");
        const DisplayName = document.getElementById("DisplayName");
        const NextButton = document.getElementById("NextButton");

        //variable
        let currentSuspectIndex = 0;
        let isDataPressed = false;

        //suspect array
        const Suspect = [
            {SuspectNum: "#1", SuspectDialog: "what do you want", SuspectName: "Brian"},
            {SuspectNum: "#2", SuspectDialog: "I'm innocent please let me go", SuspectName: "loyd"}
        ];

        function Start() {
            //shows the hidden buttons
            StartGame.style.display = "none";
            Interrogate.style.display = "none";
            SuspectData.style.display = "inline-block";
            DisplayName.style.display = "inline-block";
            //dialog
            Dialog.innerText = `suspect ${Suspect[0].SuspectNum}, sits infront of you, looking at you like he wants to kill you`
        }

        //
        const currentSuspect = Suspect[currentSuspectIndex];
        function Suspect_Data() {
            DisplayName.innerHTML = Suspect[0].SuspectName;
        }
        
        function Display_Name() {
            DisplayName.style.textDecorationLine = "line-through"
            Dialog.innerText = `You: So your name is ${Suspect[0].SuspectName}?`
            SuspectData.style.display = "none"
            NextButton.style.display = "inline-block";
        }


        let DialogStep = 0;
        function Next_Button() {
            DialogStep++;
            if (DialogStep === 1) {
                Dialog.innerText = "Why does it matter? Names don't prove anything, Detective"
            } else if (DialogStep === 2) {
                Dialog.innerText = "I was at home all night. Ask anyone. Or better yet, check your logs."
            } else if (DialogStep === 3) {
                Dialog.innerText = ""
            } 
        }