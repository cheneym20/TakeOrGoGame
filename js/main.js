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
    ,randomList:[]
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

app.d.getElementById("1").addEventListener("click", startGame);
app.d.getElementById("2").addEventListener("click", startGame);
app.d.getElementById("3").addEventListener("click", startGame);

function startGame(difficultyNbr){

    app.difficulty = difficultyNbr.target.id;
    app.d.getElementById("main_menu").style.display = "none";
    app.d.getElementById("game_screen").style.display = "block";
    createBoardOnScreen(app.round,app.difficulty);
}


// Round 4 is done, run checkResults() to see if you won or not depending on difficulty.  Show score out of 22.  Win or Loose results.  Show "Return to Main Menu" button.

function createBoardOnScreen(round,difficulty){
    let _boardSize = app.boardSize;
    let boardLength = _boardSize * _boardSize;
    let _round = round;
    let _difficulty = difficulty;
    let sortedList = [];
    app.randomList = [];

    createRoundTitle(_round);
    sortedList = createSortedList(sortedList, boardLength, _boardSize, _round);
    app.randomList = createRandomArray(boardLength, sortedList, _round);
    createBoardBoxes();
}


function firstTimeBoxClicked(boxValue){
    let boxStyle = boxValue.target.style;
    let takeButton = document.getElementById("take_btn");
    let boxId = boxValue.target.id;
    let boxElement = document.getElementById(boxId);

    boxStyle.backgroundColor = "white";
    boxStyle.color = "black";
    boxStyle.zIndex = "10";
    takeButton.style.display = "block";

    makeAllOtherBoxesUnclickable(boxValue);

    boxElement.addEventListener("click", secondTimeBoxClicked);
    takeButton.addEventListener("click", takeClicked);
}


function secondTimeBoxClicked(boxValue){
    let _round = app.round;
    let boxValueId = boxValue.target.id;
    let boxElement = document.getElementById(boxValueId);
    let boxNbrValue = boxValue.toElement.p;
    let boxCurrentAmount = 0;
    let randomNumber;
    let randomElementId = 0;
    let incrementNbr = 0;

    console.log(boxElement);
    if(boxNbrValue == 0){
        //Make same box blacked out.
        //Make all other boxes clickable again.
    }
    else if(boxNbrValue > 0){
        boxElement.style.backgroundColor = "#F1B24A";
        boxElement.textContent = "";
        boxElement.id = "d"+boxNbrValue;
        boxNbrValue--;
        
        if(boxNbrValue > 0){
            for(i=0;i<boxNbrValue;i++){
                boxCurrentAmount = document.getElementById("game_box").children.length;
                randomNumber = ((Math.floor(Math.random() * boxCurrentAmount)) + (_round - 1))

                for(e=0;e<boxCurrentAmount;e++){ 
                    randomElementId = document.getElementById("g"+randomNumber);
                    if(randomElementId){
                        makeBoxInvisible(randomElementId);
                        boxNbrValue--;
                        break;
                    }
                    else{
                        for(j=1;j<boxCurrentAmount - randomNumber;j++){
                            randomElementId = document.getElementById("g"+randomNumber - j);
                            if(randomElementId){
                                makeBoxInvisible(randomElementId);
                                boxNbrValue--;
                                break;
                            }
                        }
                        for(o=1;i<randomNumber;o++){
                            randomElementId = document.getElementById("g"+randomNumber + o);
                            if(randomElementId){
                                makeBoxInvisible(randomElementId);
                                boxNbrValue--;
                                break;
                            }
                        }
                        
                    }
                    
                    
                }

                console.log(randomNumber);
                console.log(randomNumber);
                // boxElement.remove();

            }
        }
    }
    // If box value > 0, remove the selected box.  If box value > 1 then loop and randomly select a box to remove.
    // Make all existing boxes clickable again.  Make the take button disappear.

}

function takeClicked(boxValue){
    app.round++;
    // Save the score.
    // Delete all boxes.
    // If round not > 4, Repopulate the boxes with next round.
    // Else, determine if you won or not.

}

function makeBoxInvisible(randomElementId){
    randomElementId.style.backgroundColor = "#F1B24A";
    randomElementId.textContent = "";
    randomElementId.id = "d"+randomNumber;
}

function makeAllOtherBoxesUnclickable(boxValue){
    let clickedBoxId = boxValue.target.id;
    let boxes = [];
    
    for(i=0;i<boxValue.target.parentElement.childNodes.length;i++){
        boxes.push(boxValue.target.parentElement.childNodes[i])
    }

    for(i=0;i<boxes.length;i++){
        if(boxes[i].id != clickedBoxId){
            document.getElementById(boxes[i].id).style.pointerEvents = "none"
        }
    }
}

function createRoundTitle(_round){
    let roundTitleEle = app.d.getElementById("round_title");
    let titleTxt = app.d.createTextNode("Round " + _round);
    roundTitleEle.appendChild(titleTxt);
}

function createSortedList(sortedList, boardLength, _boardSize, _round){
    for(i=0;i<boardLength;i++){
        if(i < boardLength / _boardSize){
            sortedList.push(_round - 1);
        }
        else if((i >= (boardLength / _boardSize)) && (i < (boardLength / _boardSize) * 2)){
            sortedList.push(_round);
        }
        else if(i >= (boardLength / _boardSize) * 2){
            sortedList.push(_round + 1);
        }
    }
    return sortedList;
}

function createRandomArray(boardLength, sortedList, _round){
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
                transferIndexFromSortedToRandomList(foundNbr,sortedList);
                break;
            }
        }
    }
    return app.randomList;
}

function createBoardBoxes(){

    let node;
    let nodeTxt = "";
    let indexNbr = 0;
    let btnInput;

    for(i=0;i<app.randomList.length;i++){

        node = app.d.createElement("div");
        nodeTxt = app.d.createTextNode(app.randomList[i]);
        node.appendChild(nodeTxt);
        app.d.getElementById("game_box").appendChild(node);
        indexNbr = i + 1;
        btnIdClass = "g"+(i+1);
        node.classList.add("g"+indexNbr);
        node.id = btnIdClass
        
        btnInput = app.d.getElementById(btnIdClass);
        btnInput.addEventListener("click", firstTimeBoxClicked);
        btnInput.p = app.randomList[i];
    }
}

function getIndex(_round,section){
    return _round + section - 1;
}

function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
}

function transferIndexFromSortedToRandomList(foundNbr,sortedList){
    sortedList.splice(sortedList.indexOf(foundNbr),1);
    app.randomList.push(foundNbr);
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

