const socket = io('ws://localhost:5500');

//define score starting values
let scoreA = 0;
let scoreB = 0;
let activeGame = 0; // 0 is none, 1 is VALORANT, 2 is Overwatch2
let format = 0;

//define base functions
//SUBMIT CHANGES INSTEAD OF LIVE UPDATES
function submitChanges() {
    ctrlBatchOut();
    console.log("Sent out a Batch Update");
}

function ctrlBatchOut() { //emits all information changed in the Team Specific Panels
    socket.emit("updateInfoA", [ nameA_out, logoA_out, pcolA_out, scolA_out, tagA_out ]);
    socket.emit("updateRecordA", [ winsA_out, lossesA_out ]);
    socket.emit("updateInfoB", [ nameB_out, logoB_out, pcolB_out, scolB_out, tagB_out ]);
    socket.emit("updateRecordB", [ winsB_out, lossesB_out ]);
};

//page/text updates
socket.on("returnScores", (arg) => {
    document.getElementById("mapScoreA").textContent = arg[0];
    document.getElementById("mapScoreB").textContent = arg[1];
});
socket.on("returnInfo", (args) => {
    console.log(args); //lists the array in html page's console
    // [ Names [A, B], Logos [A, B], pCols [A, B], sCols [A,B]]
    //      0[0,1]         1[0,1]       2[0,1]       3[0,1]
    
    //change names
    document.getElementById("scoreLabelA").textContent = args[0][0] + " Score Controls";
    document.getElementById("scoreLabelB").textContent = args[0][1] + " Score Controls";

    //placeholders
    document.getElementById("nameA").placeholder = args[0][0];
    document.getElementById("nameB").placeholder = args[0][1];
    document.getElementById("logoA").placeholder = args[1][0];
    document.getElementById("logoB").placeholder = args[1][1];
    document.getElementById("pcolA").placeholder = args[2][0];
    document.getElementById("pcolB").placeholder = args[2][1];
    document.getElementById("scolA").placeholder = args[3][0];
    document.getElementById("scolB").placeholder = args[3][1];
});

//team info stuff (REWORK FOR SUBMIT BUTTON)
let nameA_inp = document.getElementById("nameA"); //define the A inputs
let tagA_inp = document.getElementById("tagA");
let logoA_inp = document.getElementById("logoA");
let pColA_inp = document.getElementById("pcolA");
let sColA_inp = document.getElementById("scolA");
let winsA_inp = document.getElementById("winsA");
let lossesA_inp = document.getElementById("lossesA");
let nameA_out = "";
let tagA_out = "";
let logoA_out = "";
let pcolA_out = "";
let scolA_out = "";
let winsA_out = "";
let lossesA_out = "";

    //listen for input updates on the html (REWORK FOR SUMBIT BUTTON)
nameA.addEventListener("change", () => {
    nameA_out = nameA_inp.value;
    console.log("Team A's name has been updated to " + nameA_out);
})
tagB.addEventListener("change", () => {
    tagA_out = tagA_inp.value;
    console.log("Team A's tag has been updated to " + tagA_out);
})
logoA.addEventListener("change", () => {
    logoA_out = logoA_inp.value;
    console.log("Team A's logo link has been updated to " + logoA_out);
})
pcolA.addEventListener("change", () => {
    pcolA_out = pColA_inp.value;
    console.log("Team A's primary color has been updated to " + pcolA_out);
})
scolA.addEventListener("change", () => {
    scolA_out = sColA_inp.value;
    console.log("Team A's secondary color has been updated to " + scolA_out);
})
winsA.addEventListener("change", () => { //update record
    winsA_out = winsA_inp.value;
    console.log("Team A's total wins has been updated to " + winsA_out);
})
lossesA.addEventListener("change", () => { //update record
    lossesA_out = lossesA_inp.value;
    console.log("Team A's total losses has been updated to " + winsA_out);
})

let nameB_inp = document.getElementById("nameB"); //define the B inputs
let tagB_inp = document.getElementById("tagB");
let logoB_inp = document.getElementById("logoB");
let pColB_inp = document.getElementById("pcolB");
let sColB_inp = document.getElementById("scolB");
let winsB_inp = document.getElementById("winsB");
let lossesB_inp = document.getElementById("lossesB");
let nameB_out = "";
let tagB_out = "";
let logoB_out = "";
let pcolB_out = "";
let scolB_out = "";
let winsB_out = "";
let lossesB_out = "";

    //listen for input updates on the html (REWORK FOR SUMBIT BUTTON)
nameB.addEventListener("change", () => {
    nameB_out = nameB_inp.value;
    console.log("Team B's name has been updated to " + nameB_out);
})
tagB.addEventListener("change", () => {
    tagB_out = tagB_inp.value;
    console.log("Team B's tag has been updated to " + tagB_out);
})
logoB.addEventListener("change", () => {
    logoB_out = logoB_inp.value;
    console.log("Team B's logo link has been updated to " + logoB_out);
})
pcolB.addEventListener("change", () => {
    pcolB_out = pColB_inp.value;
    console.log("Team B's primary color has been updated to " + pcolB_out);
})
scolB.addEventListener("change", () => {
    scolB_out = sColB_inp.value;
    console.log("Team B's secondary color has been updated to " + scolB_out);
})
winsB.addEventListener("change", () => { //update record
    winsB_out = winsB_inp.value;
    console.log("Team B's total wins has been updated to " + winsB_out);
})
lossesB.addEventListener("change", () => { //update record
    lossesB_out = lossesB_inp.value;
    console.log("Team A's total losses has been updated to " + winsB_out);
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//score functions
function incScoreA() { //inc A
    if (scoreA < 5) {
        scoreA++;
        socket.emit("updateScoreA", scoreA);
        console.log("Score A is now " + scoreA);
    }
    else{
        console.log("Score A cannot be increased further.");
    }
}
function incScoreB() { //inc B
    if (scoreB < 5) {
        scoreB++;
        socket.emit("updateScoreB", scoreB);
        console.log("Score B is now " + scoreB);
    }
    else {
        console.log("Score B cannot be increased further.");
    }
}
function decScoreA() { //dec A
    if (scoreA > 0) {
        scoreA--;
        socket.emit("updateScoreA", scoreA);
        console.log("Score A is now " + scoreA);
    }
    else {
        console.log("Score A cannot be decreased anymore.");
    }
}
function decScoreB() { //dec B
    if (scoreB > 0) {
        scoreB--;
        socket.emit("updateScoreB", scoreB);
        console.log("Score B is now " + scoreB);
    }
    else {
        console.log("Score B cannot be decreased anymore.");
    }
}
function resetA() { //reset A
    scoreA = 0;
    socket.emit("updateScoreA", scoreA);
    console.log("Reset Score A to " + scoreA);
}
function resetB() { //reset B
    scoreB = 0;
    socket.emit("updateScoreB", scoreB);
    console.log("Reset Score B to " + scoreB);
}
function resetScores() {
    scoreA = 0
    scoreB = 0
    socket.emit("updateScoreA", scoreA);
    socket.emit("updateScoreB", scoreB);
    console.log("Reset all Scores.")
}

//flip score
let flipped = false;

function flipScores(){
    if (flipped == false){
        flipped = true;
    }
    else{
        if (flipped == true){
            flipped = false;
        }
    }
    socket.emit("flipStatus", flipped);
}

// what game is selected?
const gameSelBtns = document.querySelectorAll('input[name="gameChoice"]');

gameSelBtns.forEach(radioButton => {
  radioButton.addEventListener('change', () => {
    const selectedValue = document.querySelector('input[name="gameChoice"]:checked').value;
    console.log('Selected game:', selectedValue);
    socket.emit("gameSelection", selectedValue);
  });
});

socket.on("activeGame", (arg) => {
    if (arg == "none"){
        activeGame = 0;
        document.getElementById("valorantControl").style.display = "none";
        document.getElementById("overwatchControl").style.display = "none";
    }
    if (arg == "valorant"){
        activeGame = 1;
        document.getElementById("valorantControl").style.display = "block";
        document.getElementById("overwatchControl").style.display = "none";
    }
    if (arg == "overwatch2"){
        activeGame = 2;
        document.getElementById("overwatchControl").style.display = "block";
        document.getElementById("valorantControl").style.display = "none";
    }
})

// what best of is selected?
const bestOfBtns = document.querySelectorAll('input[name="valBestOf"]');

bestOfBtns.forEach(radioButton => { //VALORANT
    radioButton.addEventListener('change', () => {
        format = document.querySelector('input[name="valBestOf"]:checked').value;
        console.log('Selected format:', format);
        socket.emit("bestOfFormat", format);
    })
})

socket.on("formatReturn", (arg) => {  //ALL BEST OF RETURN PACKET
    if (activeGame == 0){
        document.getElementById("mapsValBO3").style.display = "none";
        document.getElementById("mapsValBO5").style.display = "none";
    }else{
        if (activeGame == 1){
            if ((arg) == 0){
                document.getElementById("mapsValBO3").style.display = "none";
                document.getElementById("mapsValBO5").style.display = "none";
            } else{
                if ((arg) == 1){
                    document.getElementById("mapsValBO3").style.display = "block";
                    document.getElementById("mapsValBO5").style.display = "none";
                }else{
                    if((arg) == 2){
                        document.getElementById("mapsValBO3").style.display = "none";
                        document.getElementById("mapsValBO5").style.display = "block";
                    }
                }
            }
        } else{
        if (activeGame == 2){
            document.getElementById("mapsValBO3").style.display = "none";
            document.getElementById("mapsValBO5").style.display = "none";
        }
    }
    }
})

//VALORANT SPECIFIC STUFF
let timeoutA = document.getElementById("timeoutsLeftA");
let timeoutB = document.getElementById("timeoutsLeftB");
let newTimeoutA = "2";
let newTimeoutB = "2";

timeoutA.addEventListener("change", () => {
    newTimeoutA = timeoutA.value;
    console.log("Team A now only has " + newTimeoutA +" timeouts left.");
    socket.emit("updateTimeoutsVAL", [ newTimeoutA, newTimeoutB ]);
})
timeoutB.addEventListener("change", () => {
    newTimeoutB = timeoutB.value;
    console.log("Team B now only has " + newTimeoutB +" timeouts left.");
    socket.emit("updateTimeoutsVAL", [ newTimeoutA, newTimeoutB ]);
})

const VALmapNum = document.querySelectorAll('input[name="val_mapPlayed"]'); // send which map is being played
// would like to update at some point to have it show that the map has *been* played, its score, and who picked the map

VALmapNum.forEach(radioButton => { //update map value 1 thru 5
    radioButton.addEventListener('change', () => {
        const mapValue = document.querySelector('input[name="val_mapPlayed"]:checked').value;
        socket.emit("mapProgress", mapValue);
    })
})

// map names
let BO3map1_inp = document.querySelector("#valBO3_map1");//bo3
let BO3map2_inp = document.querySelector("#valBO3_map2");
let BO3map3_inp = document.querySelector("#valBO3_map3");
let BO5map1_inp = document.querySelector("#valBO5_map1");//bo5
let BO5map2_inp = document.querySelector("#valBO5_map2");
let BO5map3_inp = document.querySelector("#valBO5_map3");
let BO5map4_inp = document.querySelector("#valBO5_map4");
let BO5map5_inp = document.querySelector("#valBO5_map5");
let map1_out = "no_sel";
let map2_out = "no_sel";
let map3_out = "no_sel";
let map4_out = "no_sel";
let map5_out = "no_sel";

valBO3_map1.addEventListener("change", () => {
    map1_out = BO3map1_inp.value;
})
valBO3_map2.addEventListener("change", () => {
    map2_out = BO3map2_inp.value;
})
valBO3_map3.addEventListener("change", () => {
    map3_out = BO3map3_inp.value;
})
valBO5_map1.addEventListener("change", () => {
    map1_out = BO5map1_inp.value;
})
valBO5_map2.addEventListener("change", () => {
    map2_out = BO5map2_inp.value;
})
valBO5_map3.addEventListener("change", () => {
    map3_out = BO5map3_inp.value;
})
valBO5_map4.addEventListener("change", () => {
    map4_out = BO5map4_inp.value;
})
valBO5_map5.addEventListener("change", () => {
    map5_out = BO5map5_inp.value;
})

let val1WinnerBO3_inp = document.querySelector("#val_map1WinnerBO3");
let val2WinnerBO3_inp = document.querySelector("#val_map2WinnerBO3");
let val3WinnerBO3_inp = document.querySelector("#val_map3WinnerBO3");
let val1WinnerBO5_inp = document.querySelector("#val_map1WinnerBO5");
let val2WinnerBO5_inp = document.querySelector("#val_map2WinnerBO5");
let val3WinnerBO5_inp = document.querySelector("#val_map3WinnerBO5");
let val4Winner_inp = document.querySelector("#val_map4Winner");
let val5Winner_inp = document.querySelector("#val_map5Winner");
let valWinner1_out = "";
let valWinner2_out = "";
let valWinner3_out = "";
let valWinner4_out = "";
let valWinner5_out = "";

val_map1WinnerBO3.addEventListener("change", () => {
    valWinner1_out = val1WinnerBO3_inp.value;
})
val_map2WinnerBO3.addEventListener("change", () => {
    valWinner2_out = val2WinnerBO3_inp.value;
})
val_map3WinnerBO3.addEventListener("change", () => {
    valWinner3_out = val3WinnerBO3_inp.value;
})
val_map1WinnerBO5.addEventListener("change", () => {
    valWinner1_out = val1WinnerBO5_inp.value;
})
val_map2WinnerBO5.addEventListener("change", () => {
    valWinner2_out = val2WinnerBO5_inp.value;
})
val_map3WinnerBO5.addEventListener("change", () => {
    valWinner3_out = val3WinnerBO5_inp.value;
})
val_map4Winner.addEventListener("change", () => {
    valWinner4_out = val4Winner_inp.value;
})
val_map5Winner.addEventListener("change", () => {
    valWinner5_out = val5Winner_inp.value;
})

function submitValChanges() {
    socket.emit("mapSelection", [ map1_out, map2_out, map3_out, map4_out, map5_out ]);
    socket.emit("mapWinners", [ valWinner1_out, valWinner2_out, valWinner3_out, valWinner4_out, valWinner5_out ])
}

// OVERWATCH SPECIFIC STUFF

//Mode Select
const modeID = document.querySelectorAll('input[name="mode"]')
let modeValue = "noMode"

    modeID.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            modeValue = document.querySelector('input[name="mode"]:checked').value;
            console.log(modeValue);
        })
    })

//Map Select
let OWmap1_inp = document.querySelector("#OWmap1");
let OWmap2_inp = document.querySelector("#OWmap2");
let OWmap3_inp = document.querySelector("#OWmap3");
let OWmap4_inp = document.querySelector("#OWmap4");
let OWmap5_inp = document.querySelector("#OWmap5");

let OWmap1winner_inp = document.querySelector("#OWmap1Winner");
let OWmap2winner_inp = document.querySelector("#OWmap2Winner");
let OWmap3winner_inp = document.querySelector("#OWmap3Winner");
let OWmap4winner_inp = document.querySelector("#OWmap4Winner");
let OWmap5winner_inp = document.querySelector("#OWmap5Winner");
let OWwinner1_out = "";
let OWwinner2_out = "";
let OWwinner3_out = "";
let OWwinner4_out = "";
let OWwinner5_out = "";

OWmap1.addEventListener("change", () => {
    map1_out = OWmap1_inp.value;
})
OWmap2.addEventListener("change", () => {
    map2_out = OWmap2_inp.value;
})
OWmap3.addEventListener("change", () => {
    map3_out = OWmap3_inp.value;
})
OWmap4.addEventListener("change", () => {
    map4_out = OWmap4_inp.value;
})
OWmap5.addEventListener("change", () => {
    map5_out = OWmap5_inp.value;
})

OWmap1Winner.addEventListener("change", () => {
    OWwinner1_out = OWmap1winner_inp.value;
})
OWmap2Winner.addEventListener("change", () => {
    OWwinner2_out = OWmap2winner_inp.value;
})
OWmap3Winner.addEventListener("change", () => {
    OWwinner3_out = OWmap3winner_inp.value;
})
OWmap4Winner.addEventListener("change", () => {
    OWwinner4_out = OWmap4winner_inp.value;
})
OWmap5Winner.addEventListener("change", () => {
    OWwinner5_out = OWmap5winner_inp.value;
})

function submitOWChanges(){
    console.log(OWwinner1_out, OWwinner2_out, OWwinner3_out, OWwinner4_out, OWwinner5_out);
    socket.emit("modeUpdate", modeValue);
    socket.emit("mapSelection", [ map1_out, map2_out, map3_out, map4_out, map5_out ]);
    socket.emit("mapWinners", [ OWwinner1_out, OWwinner2_out, OWwinner3_out, OWwinner4_out, OWwinner5_out ]);
}

const OWmapNum = document.querySelectorAll('input[name="OW_mapPlayed"]');

OWmapNum.forEach(radioButton => { //update map value 1 thru 5
    radioButton.addEventListener('change', () => {
        const mapValue = document.querySelector('input[name="OW_mapPlayed"]:checked').value;
        console.log(mapValue);
        socket.emit("mapProgress", mapValue);
    })
})