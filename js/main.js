const app = {
    round: 1
    ,board: []
    ,boardSize:3
    ,totalPossibleScore:0
    ,score:0
    ,scoreLastMaximum:0
    ,scoreMaximum:1
    ,has_won:false
    ,result_message:""
    ,difficulty:1
    ,requiredPercentage:0
    ,d:document
    ,randomList:[]
}


app.d.getElementById("1").addEventListener("click", startGame);
app.d.getElementById("2").addEventListener("click", startGame);
app.d.getElementById("3").addEventListener("click", startGame);
app.d.getElementById("btn_instruction").addEventListener("click", showInstructions);

function showInstructions(){
    let mainMenu = document.getElementById("menu_details");
    let instructionsBox = document.getElementById("instructions");
    let backMainMenu = document.getElementById("back_main_menu");

    mainMenu.style.display = "none";
    instructionsBox.style.display = "block";
    backMainMenu.addEventListener("click", returnToMainMenu);




}

function returnToMainMenu(){
    let mainDetails = document.getElementById("menu_details");
    let instructionsBox = document.getElementById("instructions");

    instructionsBox.style.display = "none";
    mainDetails.style.display = "grid";
    
}

function startGame(difficultyNbr){

    app.difficulty = difficultyNbr.target.id;
    app.d.getElementById("main_menu").style.display = "none";
    app.d.getElementById("game_screen").style.display = "block";
    app.round = 1;
    app.score = 0;
    app.totalPossibleScore = 0;
    app.scoreLastMaximum = 0;
    createBoardOnScreen(app.round);
}

function navToMenu(){
    document.getElementById("current_score").style.display = "none";
    document.getElementById("end_result").style.display = "none";
    document.getElementById("round_title").style.display = "none";
    document.getElementById("high_number_title").style.display = "none";
    document.getElementById("game_box").style.display = "none";
    document.getElementById("end_result").style.display = "none";
    document.getElementById("take_btn").style.display = "none";
    document.getElementById("return_btn").style.display = "none";

    document.getElementById("main_menu").style.display = "block";
}

function createBoardOnScreen(round){
    
    let gameBox = document.getElementById("game_box");
    gameBox.style.display = "grid";

    removeAllChildNodes();

    let _boardSize = app.boardSize;
    let boardLength = _boardSize * _boardSize;
    let _round = round;
    let scoreTitle = document.getElementById("current_score");
    let highestNbr = 0;
    let takeButton = document.getElementById("take_btn");
    takeButton.style.display = "block";
    scoreTitle.style.display = "block";
    takeButton.innerText = "Take 0";
    takeButton.addEventListener("click", takeClicked);

    scoreTitle.innerHTML = "Score " + app.score;
    let sortedList = [];
    app.randomList = [];

    createRoundTitle(_round);
    sortedList = createSortedList(sortedList, boardLength, _boardSize, _round);
    highestNbr = Math.max.apply(null,sortedList);
    app.randomList = createRandomArray(boardLength, sortedList, _round);
    createHighestNumberTitle(highestNbr);
    createBoardBoxes();

    let menuBtn = document.getElementById("return_btn");
    menuBtn.style.display = "block";
    menuBtn.addEventListener("click", navToMenu);

}

function createHighestNumberTitle(highestNbr){
    let _highestNbr = highestNbr;
    let highTitle = document.getElementById("high_number_title");
    highTitle.style.display = "block";
    highTitle.innerText = `Highest Number: ${_highestNbr}`;

}


function firstTimeBoxClicked(boxValue){
    let boxStyle = boxValue.target.style;
    let takeButton = document.getElementById("take_btn");
    let boxId = boxValue.target.id;
    let boxElement = document.getElementById(boxId);
    boxElement.classList.add("clicked");

    boxStyle.backgroundColor = "white";
    boxStyle.color = "black";
    boxStyle.zIndex = "10";
    takeButton.style.display = "block";

    takeButton.innerText = "Take " + boxElement.p;

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
    let boxList = [];
    let takeButton = document.getElementById("take_btn");

    takeButton.innerText = "Take 0";

    boxElement.classList.remove("clicked");

    if(boxNbrValue == 0){
        boxElement.style.backgroundColor = "#4D774E";
        boxElement.style.color = "#4D774E";
        boxElement.removeEventListener("click", secondTimeBoxClicked);
        boxElement.addEventListener("click", firstTimeBoxClicked);
    }
    else
    {
        makeBoxInvisible(boxElement,boxNbrValue);
        boxNbrValue--;
        
        if(boxNbrValue > 0){
            
                for(e=0;e<boxNbrValue;e++){ 
                    boxList = getListOfRemainingBoxes();
                    if(boxList.length == 0) break;
                    randomNumber = getRandomNbrFromList(boxList,_round);
                    randomElementId = document.getElementById("g"+randomNumber);
                    if(randomElementId){
                        makeBoxInvisible(randomElementId,randomNumber);
                    }
                    else{
                        for(j=1;j<boxList.length - randomNumber;j++){
                            randomElementId = document.getElementById("g"+randomNumber - j);
                            if(randomElementId){
                                makeBoxInvisible(randomElementId,randomNumber);
                                boxList.length = 0;
                                break;
                            }
                        }
                        for(o=1;o<randomNumber+1;o++){
                            randomElementId = document.getElementById("g"+randomNumber + o);
                            if(randomElementId){
                                makeBoxInvisible(randomElementId,randomNumber);
                                randomNumber = 0;
                                break;
                            }
                        }
                    }
                }
            
        }
    }

    

    let boxesLeft = getListOfRemainingBoxes();

    makeAllRemainingBoxesClickable(boxesLeft);
}

function getRandomNbrFromList(boxList,_round){
    randomNbr = ((Math.floor(Math.random() * boxList.length)));
    if(randomNbr > 0) randomNbr--;

    console.log("Random Number: " +randomNbr);

    randomNbr = parseInt(boxList[randomNbr].substring(1));
    
    return randomNbr;
}

function takeClicked(boxValue){
    app.scoreMaximum = app.round + 1;
    app.scoreMaximum = app.scoreMaximum + app.scoreLastMaximum + 1;
    app.scoreLastMaximum = app.scoreMaximum
    app.round++;

    if(app.round > 7){
        clearBoard();
        showMenuBtns(boxValue);
    }
    else{
        
        let boxTitle = document.getElementById("round_title");
        let scoreTitle = document.getElementById("current_score");
        let takeButton = document.getElementById("take_btn");
        app.score = app.score + parseInt(document.getElementById("take_btn").innerHTML.substring(5));
        if(scoreTitle.style.display == "none") scoreTitle.style.display = "block";
        scoreTitle.innerHTML = "Score " + app.score;
        boxTitle.innerHTML = "";
    
        removeAllChildNodes();
    
        createBoardOnScreen(app.round);
        takeButton.innerText = "Take 0";
    }
}

function clearBoard(){
    let roundTitle = document.getElementById("round_title");
    let takeBtn = document.getElementById("take_btn");
    let gameBox = document.getElementById("game_box");
    let highTitle = document.getElementById("high_number_title");
    takeBtn.style.display = "none";
    highTitle.style.display = "none";
    roundTitle.style.display = "none";
    gameBox.style.display = "none";

}

function showMenuBtns(boxValue){
    let menuBtn = document.getElementById("return_btn");
    let scoreclass = document.getElementsByClassName("clicked");
    let scoreTitle = document.getElementById("current_score");
    let gameResults = document.getElementById("game_results");
    let winLoseTitle = document.getElementById("win_lose_title");
    let winLoseTitleTxt = "";
    let scoreMinimum = 0;
    
    if(scoreclass.length > 0) app.score = app.score + parseInt(scoreclass[0].innerHTML.replace("Score", ""));
    
    scoreTitle.innerHTML = "Score " + app.score;

    gameResults.style.display = "block";
    gameResults.innerHTML = app.score + "/" + app.scoreMaximum;
    
    switch(app.difficulty){
        case "1":
            scoreMinimum = 27;
            break;
        case "2":
            scoreMinimum = 35;
            break;
        case "3":
            scoreMinimum = 40;
            break;
    }

    if(app.score >= scoreMinimum){
        winLoseTitleTxt = "WIN"
    }
    else{
        winLoseTitleTxt = "LOSE"
    }

    let endResultBox = document.getElementById("end_result");
    endResultBox.style.display = "block";

    winLoseTitle.style.display = "block";
    winLoseTitle.innerHTML = "YOU " + winLoseTitleTxt;

    menuBtn.style.display = "block";
    menuBtn.addEventListener("click", navToMenu);

}

function getListOfRemainingBoxes(){
    let remainingBoxes = [];
    let childrenBoxes = document.getElementById("game_box");
    let nodeId = "";
    for(m=0;m<childrenBoxes.childNodes.length;m++){
        nodeId = childrenBoxes.childNodes[m].id;
        if(nodeId.includes("g")){
            remainingBoxes.push(nodeId);
        }
    }
    return remainingBoxes;
}

function makeBoxInvisible(randomElementId,randomNumber){
    randomElementId.style.pointerEvents = "none";
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

function makeAllRemainingBoxesClickable(boxesLeft){
    let _boxesLeft = boxesLeft;
    let boxId = "";

    for(i=0;i<_boxesLeft.length;i++){
        boxId = document.getElementById(_boxesLeft[i]);
        boxId.style.pointerEvents = "auto";
    }
}

function createRoundTitle(_round){
    let roundTitleEle = app.d.getElementById("round_title");
    if(roundTitleEle.style.display == "none") roundTitleEle.style.display = "block";
    let titleTxt = "Round " + _round
    roundTitleEle.textContent = titleTxt;
}

function createSortedList(sortedList, boardLength, _boardSize, _round){

    let _roundAmount = _round + 1;

    for(i=0;i<boardLength;i++){
        if(i < boardLength / _boardSize){
            sortedList.push(_roundAmount - 1);
        }
        else if((i >= (boardLength / _boardSize)) && (i < (boardLength / _boardSize) * 2)){
            sortedList.push(_roundAmount);
        }
        else if(i >= (boardLength / _boardSize) * 2){
            sortedList.push(_roundAmount + 1);
        }
    }
    return sortedList;
}

function createRandomArray(boardLength, sortedList, _round){
    let remainingNbrs = [];

    for(i=0;i<boardLength;i++){
        randomNbr = ((Math.floor(Math.random() * app.boardSize)) + (_round))
        
        let indexNbr = 0;
        remainingNbrs = sortedList.filter(onlyUnique);
        if(remainingNbrs.length == 1){
            randomNbr = remainingNbrs[0];
        } else
        if(!remainingNbrs.includes(randomNbr)){
            i--;
            continue;
        }
            indexNbr = 0;
            indexNbr = sortedList.indexOf(randomNbr);
            
            transferIndexFromSortedToRandomList(indexNbr,randomNbr,sortedList);
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

function removeAllChildNodes(){
    let mainContainer = document.getElementById("game_box");
    while(mainContainer.firstChild){
        mainContainer.removeChild(mainContainer.firstChild);
    }

}

function getIndex(_round,section){
    return _round + section - 1;
}

function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
}

function transferIndexFromSortedToRandomList(indexNbr,randomNbr,sortedList){
    sortedList.splice(indexNbr,1);
    app.randomList.push(randomNbr);
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

