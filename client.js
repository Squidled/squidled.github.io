
console.log('Client-side code running');
const fileInput = document.getElementById('actual-btn');
const fakeBtn = document.getElementById("upload")
const submitBtn = document.getElementById("submit")

const resetButton = document.getElementById("resetButton")

const nameCol = document.getElementById("nameCol")
const numCol = document.getElementById("numCol")
const dataRow = document.getElementById("dataRow")

var format = 1
var theFile

const textInputButton = document.getElementById("textInput")

const textArea = document.getElementById("hidden")
const fileSettings = document.getElementById("fileSettings")

const ticket1 = document.getElementsByClassName("tick1")[0]
const ticket2 = document.getElementsByClassName("tick2")[0]
const ticket3 = document.getElementsByClassName("tick3")[0]

const cabContain = document.getElementById("cabContain")

const lid = document.getElementById("square2")
const box = document.getElementById("square")

const bigTick = document.getElementById("BigTick")

const winnerName = document.getElementById("winner")
const winnerChances = document.getElementById("chances")

function csvToArray(csv, testColumn = 0, dataStartRow = 0){
    var linesArray = csv.split("\n")
    var final = []
    for (var i = dataStartRow; i<linesArray.length; i++){
        splitRow = linesArray[i].split(",")
        if (splitRow[testColumn] != ""){
            final.push(splitRow)
        }
    }
    return final
}

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

fileInput.addEventListener('change', function(){
    if (fileInput.files[0]){
        theFile = fileInput.files[0]
        fakeBtn.innerHTML = theFile.name
    }
})

fileInput.addEventListener('click', function(){
    format = 1
    fileSettings.id = "fileSettings"
    textArea.id = "hidden"
})

submitBtn.addEventListener('click', async function(){
    console.log(format)
    if (format==1){
        const reader = new FileReader();
        console.log(theFile)
        reader.readAsText(theFile)
        reader.onload = function() {
            var fileData = reader.result;
            var raffleList = []
            var fileArray = csvToArray(fileData,1,dataRow.value-1)
            for (let i = 0; i < fileArray.length; i++) {
                amount = fileArray[i][numCol.value-1].match(/\d+/g)
                for (j = 0; j < amount; j++) {
                    raffleList.push(fileArray[i][nameCol.value-1])
                }
            }
            winner = raffleList[getRndInteger(0,raffleList.length)]
            winnerName.innerHTML = winner
            winnerChances.innerHTML = `had a ${Math.floor(getOccurrence(raffleList,winner)/raffleList.length*100)}% chance of winning`
        };
    } else {
        var fileData = textArea.value
        var raffleList = []
        var fileArray = csvToArray(fileData)
        for (let i = 0; i < fileArray.length; i++) {
            amount = fileArray[i][1].match(/\d+/g)
            for (j = 0; j < amount; j++) {
                raffleList.push(fileArray[i][0])
            }
        }
        winner = raffleList[getRndInteger(0,raffleList.length)]
        console.log(raffleList)
        winnerName.innerHTML = winner
        winnerChances.innerHTML = `had a ${Math.floor(getOccurrence(raffleList,winner)/raffleList.length*100)}% chance of winning`

    }
    submitBtn.id = "done"
    lid.id = "square2open"
    await new Promise(r => setTimeout(r, 500));
    ticket1.id = "tickContain"
    ticket2.id = "tickContain2"
    ticket3.id = "tickContain3"
    await new Promise(r => setTimeout(r, 1000));
    lid.id = "square2close"
    await new Promise(r => setTimeout(r, 500));
    cabContain.id = "cabContainShake"
    await new Promise(r => setTimeout(r, 1000));
    lid.id = "square2reveal"
    box.id = "squarereveal"
    bigTick.id = "BigTickreveal"
    await new Promise(r => setTimeout(r, 2000));
    cabContain.id = "hidden"
    console.log("done")
})  

textInputButton.addEventListener('click',function(){
    console.log("hello")
    format = 2
    fileSettings.id = "hidden"
    textArea.id = "textarea"

})

resetButton.addEventListener('click', async function(){
    resetButton.id = "resetButtonDone"
    cabContain.id = "cabContain"
    lid.id = "square2unreveal"
    box.id = "squareunreveal"
    bigTick.id = "BigTickunreveal"
    await new Promise(r => setTimeout(r, 2000));
    ticket1.id = "ticketContainIdle"
    ticket2.id = "ticketContainIdle"
    ticket3.id = "ticketContainIdle"
    lid.id = "square2"
    box.id = "square"
    resetButton.id = "resetButton"
    submitBtn.id = "submit"
    bigTick.id = "BigTick"

})