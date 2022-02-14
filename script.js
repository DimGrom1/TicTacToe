let cells = ""
let firstPlayer = []
let form = document.getElementsByClassName("form")[0]
let secondPlayer = []
let mapLength = 3
let sila = document.getElementsByClassName("sila")[0]
let draw = document.getElementsByClassName("draw")[0]
let gekkon = document.getElementsByClassName("gekkon")[0]
let silaScore = 0
let drawScore = 0
let pole = document.getElementsByClassName("pole")[0]
let decrease = document.getElementsByClassName("decrease")[0]
let gekkonScore = 0
let steps = 0
let photo = document.getElementsByClassName("photo")[0]

let restart = document.getElementsByClassName("restart")[0]
let wins = {
    3: ["012", "345", "678", "048", "246", "036", "147", "258"],
    4: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [0, 5, 10, 15], [3, 6, 9, 12]]
}
wins = wins["" + mapLength]
console.log(wins);
// let winsG = ["012", "345", "678", "048", "246", "036", "147", "258"]
let symbol = "Силя"
let allowPlay = true
let win = document.getElementsByClassName("win")[0]

resizeMap(mapLength)

function resizeMap(size) {
    let formwidth = size * 100
    // console.log(size);
    size = size ** 2
    for (let i = 0; i < size; i = i + 1) {
        cells = cells + '<button id="' + i + '" type="button" onclick="play(this)"></button>'
    }
    // console.log(cells); 
    form.innerHTML = cells
    form.style.width = formwidth + "px"
}

function action(player, message, image) {
    // console.log(player);
    for (let winningCombo of wins) {
        let counter = 0
        for (let step of player) {
            if (winningCombo.includes(parseInt(step))) {
                counter = counter + 1;
                console.log(counter);
                if (counter == mapLength) {
                    steps = 0
                    win.innerHTML = ""+message
                    allowPlay = false
                    console.log(firstPlayer)
                    photo.src = ""+image
                    photo.style.opacity = 1
                    if(symbol=="Силя"){
                        silaScore = silaScore + 1
                        sila.innerHTML = "Силя:" + silaScore  
                    }
                    else{
                        gekkonScore = gekkonScore + 1
                        gekkon.innerHTML = "Геккон:" + gekkonScore
                    }
                }
            }
        }

    }
}
function play(button) {
    steps = steps + 1
    if (allowPlay == true) {
        // console.log(button);
        button.innerHTML = symbol
        if (symbol == "Силя") {
            firstPlayer.push(button.id)
            win.innerHTML = "Ход за Гекконом"
            action(firstPlayer, "победа за Силей", "Силя.jpeg")
            symbol = "Геккон"
        }
        else {
            secondPlayer.push(button.id)
            win.innerHTML = "Ход за Силей"
            action(secondPlayer, "победа за Гекконом", "Tangerine-3.jpg")
            symbol = "Силя"
        }
    }
    button.disabled = true
    // if(firstPlayer.length==5 && secondPlayer.length==4){
    if (steps == mapLength ** 2) {
        drawScore = drawScore + 1
        draw.innerHTML = "Ничья:" + drawScore
        win.innerHTML = "Ничья"
        allowPlay = false
    }
}
restart.onclick = function () {
    restartGame()
}
pole.onclick = function () {
    mapLength = 4
    restartGame()

}
decrease.onclick = function () {
    mapLength=3
    restartGame()
}

function restartGame(){
    win.innerHTML = "Ход за Силей"
    secondPlayer = []
    firstPlayer = []
    cells = ""
    steps = 0
    resizeMap(mapLength)
    allowPlay = true
    symbol = "Силя"
    photo.style.opacity = 0

}