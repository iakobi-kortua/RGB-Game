const startBtn = document.querySelector("#start");
const allBoxes = document.querySelectorAll(".box");
const winnerColorBtn = document.querySelector("#winnerColor");
const resultBtn = document.querySelector("#result");
const modeBtn = document.querySelector("#mode");
const disableBoxs = document.querySelectorAll(".disable")
var luckyColor = undefined;
var colorsCollection = [];
var gameLogic = false;
var clicked = false;
var chance = 1;
var trying = 0;

function generateRand(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}

function generateColor() {
    return `rgb(${generateRand(0, 255)},${generateRand(0, 255)},${generateRand(0, 255)})`;
}

function getRandomColorsList(e) {
    var tmpColors = [];
    while (tmpColors.length < e) {
        tmpColors.push(generateColor());
    }

    return tmpColors;
}


function setColorsToBoxes(colorsList) {
    allBoxes.forEach(item => {
        item.style.backgroundColor = colorsList.pop()
    })
}

function getLuckyColor(colorsList) {
    return colorsList[generateRand(0, colorsList.length - 1)];
}

function resetGame(){
    resultBtn.classList.remove("btn-danger");
    resultBtn.classList.remove("btn-success");
    resultBtn.classList.add("btn-warning");
    resultBtn.textContent = "............";
}


startBtn.addEventListener("click", function () {
    if(modeBtn.textContent == "Hard Mode"){
        colorsCollection = getRandomColorsList(6);
    }else{
        colorsCollection = getRandomColorsList(3);
    }
    luckyColor = getLuckyColor(colorsCollection);
    setColorsToBoxes(colorsCollection);
    winnerColorBtn.textContent = luckyColor;
    gameLogic = true;
    resetGame();
    clicked = true;
    chance = 1;
    trying = 0;
});


allBoxes.forEach(boxItem => {
    boxItem.addEventListener("click", function () {
        if (gameLogic) {
            if (luckyColor == this.style.backgroundColor.replaceAll(" ", "")) {
                resultBtn.textContent = "SUCCESS";
                resultBtn.classList.remove("btn-warning");
                resultBtn.classList.remove("btn-danger");
                resultBtn.classList.add("btn-success");
                chance = -1;
                trying++;
            } else {
                resultBtn.textContent = "FAILED";
                resultBtn.classList.remove("btn-warning");
                resultBtn.classList.remove("btn-success");
                resultBtn.classList.add("btn-danger");
                chance--;
                trying++
            }

            if(chance < 0){
                gameLogic = false; 
            }

            if(trying == 1 && chance == -1){
                alert("You Win First Try");
            }
        }
    });
})


modeBtn.addEventListener("click", function(){
    if (!clicked) {
        if(modeBtn.textContent == "Hard Mode"){
            easyMode();
        }else{
            hardMode();
        }
    }
})


function hardMode(){
    disableBoxs.forEach(box => {
        box.classList.remove("disable");
    })
    modeBtn.textContent = "Hard Mode";
}

function easyMode(){
    disableBoxs.forEach(box => {
        box.classList.add("disable");
    })
    modeBtn.textContent = "Easy mode";
}