document.addEventListener('DOMContentLoaded', function() {
    const switchDFAButton = document.getElementById('switch_dfa');
    const showCFGButton = document.getElementById('show_cfg');
    const simulateRegexButton = document.getElementById('simulate_regex');
    const currentRegexElement = document.getElementById('current_regex');
    const currentAlphabetElement = document.getElementById('current_alphabet');
    const inputField = document.getElementById('input');
    const validateInputButton = document.getElementById('validate_input');
    const clearButton = document.getElementById('clear_button');
    const pdaButton = document.getElementById('show_pda');
    const cfgButton = document.getElementById('show_cfg');
    const helpButton = document.getElementById('show_help');
    let currentDFA = 1;
    let currentAlphabet = 1;    
    const closePDAContainer = document.getElementById('closePDA');
    const closeCFGContainer = document.getElementById('closeCFG');
    const closeHelpContainer = document.getElementById('closeHelp');
    const closeAlert = document.getElementById('dismiss-alert');
    const closeError = document.getElementById('dismiss-error');

    const regexOptions = {
        1: "(a+b) (a+b)* (aa+bb) (ab+ba) (a+b)* (aba+baa)",
        2: "(11+00) (1+0)* (101+111+01) (00*+11*) (1+0+11)"
    };
    const placeholderOptions = {
        1: "baabaaba",
        2: "00111011"
    };
    const alphabetOptions = {
        1: "a, b",
        2: "0, 1"
    }

    fetch('https://dfa-validator.onrender.com/')
    .then(response => {
        if (response.ok) {
            console.log('Backend is reachable.');
        } else {
            console.error('Error pinging backend:', response.status);
        }
    })
    .catch(error => {
        console.error('Error pinging backend:', error);
    });

    switchDFAButton.addEventListener('click', function() {
        // Switch between DFA choices
        currentDFA = currentDFA === 1 ? 2 : 1;
        currentAlphabet = currentAlphabet === 1 ? 2 : 1;

        // Update the content of the displayed current regex and alphabet
        currentRegexElement.textContent = regexOptions[currentDFA];
    
        currentAlphabetElement.textContent = alphabetOptions[currentAlphabet];

        // Update the placeholder of the input field
        inputField.placeholder = placeholderOptions[currentDFA];

        // Clears the input field
        inputField.value = '';
        console.log('Switched DFA to:', currentDFA);
        if(currentDFA == 1){
            document.getElementById("RegEx_1").style.display = "block";
            document.getElementById("RegEx_2").style.display = "none";
        }
        else{
            document.getElementById("RegEx_1").style.display = "none";
            document.getElementById("RegEx_2").style.display = "block";
        }
        
    });

    showCFGButton.addEventListener('click', function() {
        // TODO CFG not yet implemented
        console.log('Show CFG button clicked');
    });

    simulateRegexButton.addEventListener('click', function() {
        // Fetch request to backend
        fetch(`https://dfa-validator.onrender.com/check-word/${currentDFA}/${encodeURIComponent(inputField.value)}`)

        .then(response => response.json())
        .then(data => {
            let fetchedValues = Object.values(data);
            let isValid = fetchedValues[0]; 
            let transitionPath = fetchedValues[1];

            console.log('Valid?', isValid);
            console.log('Transition Path:', transitionPath);

            // TODO update the UI based on the simulation result

            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }

            async function animateCircles(transitionPath) {
                let circleId;
                let circle;
                let previousCircleId = null;

                for (let index = 0; index < transitionPath.length; index++) {
                    let nextCircleId;
                    let nextCircle;
                    
                    if (currentDFA == 1) {
                        circleId = "circle_" + transitionPath[index];
                        circle = document.getElementById(circleId);
                    }
                    else {
                        circleId = "circle2_" + transitionPath[index];
                        circle = document.getElementById(circleId);
                    }

                    // Change color of current element
                    circle.setAttribute('fill', '#008000');

                    // Wait for the delay
                    await delay(950);
            
                    if (index + 1 < transitionPath.length) {
                        if (currentDFA == 1) {
                            nextCircleId = "circle_" + transitionPath[index + 1];
                            nextCircle = document.getElementById(nextCircleId);
                        }
                        else {
                            nextCircleId = "circle2_" + transitionPath[index + 1];
                            nextCircle = document.getElementById(nextCircleId);
                        }
                    }

                    // Revert color of current element
                    circle.setAttribute('fill', '#413F3F');
                    await delay(450);
                    previousCircleId = circleId;
                }

                if(isValid == true){
                    document.getElementById("is_valid").style.display = "block";
                    document.getElementById("not_valid").style.display = "none";
                }
                else{
                    document.getElementById("is_valid").style.display = "none";
                    document.getElementById("not_valid").style.display = "block";
                }    
            }

            animateCircles(transitionPath);

            // DEBUG
            // let circleId = "1";
            // circleId = "circle_" + circleId;
            // let circle = document.getElementById(circleId);
            // console.log("Does circle svg exist?", circle);
            // circle.setAttribute('fill', '#008000');

        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    validateInputButton.addEventListener('click', function() {
        // Fetch request to backend
        fetch(`https://dfa-validator.onrender.com/check-word/${currentDFA}/${encodeURIComponent(inputField.value)}`)

        .then(response => response.json())
        .then(data => {
            let fetchedValues = Object.values(data);
            let isValid = fetchedValues[0]; 
            let transitionPath = fetchedValues[1];

            console.log('Valid?', isValid);
            console.log('Transition Path:', transitionPath);

            if(isValid == true){
                document.getElementById("is_valid").style.display = "block";
                document.getElementById("not_valid").style.display = "none";
            }
            else{
                document.getElementById("is_valid").style.display = "none";
                document.getElementById("not_valid").style.display = "block";
            }
            // TODO update the UI based on the simulation result
        })
        .catch(error => {
            console.error('Error:', error);
        });


    });

    clearButton.addEventListener('click', function() {

        document.getElementById("is_valid").style.display = "none";
        document.getElementById("not_valid").style.display = "none";

        document.getElementById('input').value = "";
    });

    pdaButton.addEventListener("click", function() {
        document.getElementById("PDA_popup").style.display = "block";

        if(currentDFA == 1){
            
            document.getElementById("pda_1").style.display = "block";
            document.getElementById("pda_2").style.display = "none";
            document.getElementById("pda_instruction_1").style.display = "block";
            document.getElementById("pda_instruction_2").style.display = "none";
            console.log('Switched DFA to:', currentDFA)
        }
        else{
            document.getElementById("pda_1").style.display = "none";
            document.getElementById("pda_2").style.display = "block";
            document.getElementById("pda_instruction_1").style.display = "none";
            document.getElementById("pda_instruction_2").style.display = "block";
            console.log('Switched DFA to:', currentDFA)
        }
    });

    cfgButton.addEventListener("click", function() {
        document.getElementById("CFG_popup").style.display = "block";

        if(currentDFA == 1){
            document.getElementById("cfg_1").style.display = "block";
            document.getElementById("cfg_2").style.display = "none";
            document.getElementById("cfg_instruction_1").style.display = "block";
            document.getElementById("cfg_instruction_2").style.display = "none";
            console.log('Switched DFA to:', currentDFA)
        }
        else{
            document.getElementById("cfg_1").style.display = "none";
            document.getElementById("cfg_2").style.display = "block";
            document.getElementById("cfg_instruction_1").style.display = "none";
            document.getElementById("cfg_instruction_2").style.display = "block";
            console.log('Switched DFA to:', currentDFA)
        }
    });

    helpButton.addEventListener("click", function() {
        document.getElementById("help_popup").style.display = "block";
    });

    closePDAContainer.addEventListener("click", function() {
        console.log('Closed')
        document.getElementById("PDA_popup").style.display = "none";

    });

    closeCFGContainer.addEventListener("click", function() {
        console.log('Closed')
        document.getElementById("CFG_popup").style.display = "none";

    });

    closeHelpContainer.addEventListener("click", function() {
        console.log('Closed')
        document.getElementById("help_popup").style.display = "none";

    });

    closeAlert.addEventListener("click", function() {
        console.log('Closed Alert')
        document.getElementById("is_valid").style.display = "none";
        document.getElementById("not_valid").style.display = "none";
    });

    closeError.addEventListener("click", function() {
        console.log('Closed Alert')
        document.getElementById("is_valid").style.display = "none";
        document.getElementById("not_valid").style.display = "none";
    });
});
