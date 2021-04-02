const app = {
    round: 1
    ,board: []
    ,boardSize:3
    ,totalPossibleScore:0
    ,score:0
    ,has_won:false
    ,result_message:""
    ,difficulty:1
    ,requiredPercentage:0
    ,d:document
}

loadGame();



function loadGame(){
    loadMainScreenGUI();
}

function loadMainScreenGUI(){

// load title "Lock or Go"
// load 3 button difficulty 1="easy", 2="normal", 3="hard".  Clicking on this will initiate the game.
// load "how to play" button.  This will hide the main screen, and load another div with instructions.  With a close button.
    
}

app.d.getElementById("easyBtn").addEventListener("click", startGame);
app.d.getElementById("normalBtn").addEventListener("click", startGame);
app.d.getElementById("hardBtn").addEventListener("click", startGame);

function startGame(difficultyNbr){
    app.difficulty = difficultyNbr;
    app.d.getElementById("main_menu").style.display = "none";
    app.d.getElementById("game_screen").style.display = "block";
    createBoardOnScreen(app.round,app.difficulty);
}

// createBoardOnScreen();  This will run on a difficulty button button click or Take button.  1,2 or 3 difficulty value will be passed in.
//      Also show buttons: "Main Menu", "Restart"
//      Show Title "Round " and which round you are in.


// boxClicked()  Pass which box this is and the value.  Depending on the value, the selected box and other boxes are removed.
// takeClicked() Pass in the value (if the number of box is less than the value, take the number of boxes).
//      Remove all boxes.  Call CreateBoardOnScreen() with next round numbers.

// Round 4 is done, run checkResults() to see if you won or not depending on difficulty.  Show score out of 22.  Win or Loose results.  Show "Return to Main Menu" button.

function createBoardOnScreen(round,difficulty){
    // Create the array with empty values.
    let _boardSize = app.boardSize;
    let boardLength = _boardSize * _boardSize;
    let _round = round;
    let _difficulty = difficulty;
    let randomNbr = 0;
    let sortedList = [];
    let randomList = [];

    let roundTitleEle = app.d.getElementById("round_title");
    let titleTxt = app.d.createTextNode("Round " + _round);
    roundTitleEle.appendChild(titleTxt);

    roundTitleEle

    for(i=0;i<boardLength;i++){
        if(i < boardLength / _boardSize){
            sortedList.push(_round - 1)
        }
        else if((i >= (boardLength / _boardSize)) && (i < (boardLength / _boardSize) * 2)){
            sortedList.push(_round)
        }
        else if(i >= (boardLength / _boardSize) * 2){
            sortedList.push(_round + 1)
        }
    }

    let nbrDivision = ((100 / app.boardSize) * 0.01).toFixed(2);
    let remainingNbrs = [];

    for(i=0;i<boardLength;i++){
        randomNbr = ((Math.floor(Math.random() * app.boardSize)) + (_round - 1))
        let section = 0;
        let foundNbr = 0;
        remainingNbrs = sortedList.filter(onlyUnique);
        if(!remainingNbrs.includes(randomNbr)){
            i--;
            continue;
        }

        for(e=0;e<app.boardSize;e++){
            foundNbr = getIndex(_round,e);
            if(randomNbr == e && sortedList.includes(foundNbr)){
                transferIndexFromSortedToRandomList(foundNbr,sortedList,randomList);
                break;
            }
        }
    }

    let node;
    let nodeTxt = "";
    let indexNbr = 0;
    let btnClass = "";
    let btnInput;
    
    for(i=0;i<randomList.length;i++){

        node = app.d.createElement("div");
        nodeTxt = app.d.createTextNode(randomList[i]);
        node.appendChild(nodeTxt);
        app.d.getElementById("game_box").appendChild(node);
        indexNbr = i + 1;
        btnIdClass = "g"+(i+1);
        node.classList.add("g"+indexNbr);
        node.id = btnIdClass
        
        btnInput = app.d.getElementById(btnIdClass);
        btnInput.addEventListener("click", function(){clickBox(i)}, false);
        btnInput.p = randomList[i];
    }
}


function clickBox(boxValue){
    console.log("Box " + boxValue + " has been clicked.")
}

function getIndex(_round,section){
    return _round + section - 1;
}

function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
}

function transferIndexFromSortedToRandomList(foundNbr,sortedList,randomList){
    sortedList.splice(sortedList.indexOf(foundNbr),1);
    randomList.push(foundNbr);
}

function checkResults(){ // Pass in score and difficulty.
    // Total possible points is 22.
    // requiredPercentage is based on difficulty.  1 is 50% required to win. 2 is 75 and 3 is 90.

}

function displayInstructionsScreen(){
    // Hide the main menu GUI and display the instructions.
    /*
        You have 4 Rounds.  Each round has 9 buttons.  They have a hidden number.  Select one and decide whether to remove the button or TAKE the number and move the next round.
        Be careful though, removing the button can remove other buttons depending on the value the box contains.
        For example, if you selected a "3", the box will be removed and two random other boxes.  If the number is "0", nothing is removed and the number in the box will be hidden.
    */
}

