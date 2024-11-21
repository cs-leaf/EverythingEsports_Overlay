const socket = io('ws://localhost:5500');

//define score starting values
let scoreA = 0;
let scoreB = 0;
let activeGame = 0; // 0 is none, 1 is VALORANT, 2 is Overwatch2

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
    //logos
    //colors
});

//team info stuff
let nameA_inp = document.getElementById("nameA"); //define the A inputs
let logoA_inp = document.getElementById("logoA");
let pColA_inp = document.getElementById("pcolA");
let sColA_inp = document.getElementById("scolA");
let winsA_inp = document.getElementById("winsA");
let lossesA_inp = document.getElementById("lossesA");
let nameA_out = "";
let logoA_out = "";
let pcolA_out = "";
let scolA_out = "";
let winsA_out = "";
let lossesA_out = "";

    //listen for input updates on the html
nameA.addEventListener("change", () => {
    nameA_out = nameA_inp.value;
    console.log("Team A's name has been updated to " + nameA_out);
    socket.emit("updateInfoA", [ nameA_out, logoA_out, pcolA_out, scolA_out ]); //send info updates to the server
})
logoA.addEventListener("change", () => {
    logoA_out = logoA_inp.value;
    console.log("Team A's logo link has been updated to " + logoA_out);
    socket.emit("updateInfoA", [ nameA_out, logoA_out, pcolA_out, scolA_out ]);
})
pcolA.addEventListener("change", () => {
    pcolA_out = pColA_inp.value;
    console.log("Team A's primary color has been updated to " + pcolA_out);
    socket.emit("updateInfoA", [ nameA_out, logoA_out, pcolA_out, scolA_out ]); 
})
scolA.addEventListener("change", () => {
    scolA_out = sColA_inp.value;
    console.log("Team A's secondary color has been updated to " + scolA_out);
    socket.emit("updateInfoA", [ nameA_out, logoA_out, pcolA_out, scolA_out ]);
})
winsA.addEventListener("change", () => { //update record
    winsA_out = winsA_inp.value;
    console.log("Team A's total wins has been updated to " + winsA_out);
    socket.emit("updateRecordA", [ winsA_out, lossesA_out ]);
})
lossesA.addEventListener("change", () => { //update record
    lossesA_out = lossesA_inp.value;
    console.log("Team A's total losses has been updated to " + winsA_out);
    socket.emit("updateRecordA", [ winsA_out, lossesA_out ]);
})

let nameB_inp = document.getElementById("nameB"); //define the B inputs
let logoB_inp = document.getElementById("logoB");
let pColB_inp = document.getElementById("pcolB");
let sColB_inp = document.getElementById("scolB");
let winsB_inp = document.getElementById("winsB");
let lossesB_inp = document.getElementById("lossesB");
let nameB_out = "";
let logoB_out = "";
let pcolB_out = "";
let scolB_out = "";
let winsB_out = "";
let lossesB_out = "";

    //listen for input updates on the html
nameB.addEventListener("change", () => {
    nameB_out = nameB_inp.value;
    console.log("Team B's name has been updated to " + nameB_out);
    socket.emit("updateInfoB", [ nameB_out, logoB_out, pcolB_out, scolB_out ]); //send info updates to the server
})
logoB.addEventListener("change", () => {
    logoB_out = logoB_inp.value;
    console.log("Team B's logo link has been updated to " + logoB_out);
    socket.emit("updateInfoB", [ nameB_out, logoB_out, pcolB_out, scolB_out ])
})
pcolB.addEventListener("change", () => {
    pcolB_out = pColB_inp.value;
    console.log("Team B's primary color has been updated to " + pcolB_out);
    socket.emit("updateInfoB", [ nameB_out, logoB_out, pcolB_out, scolB_out ]) 
})
scolB.addEventListener("change", () => {
    scolB_out = sColB_inp.value;
    console.log("Team B's secondary color has been updated to " + scolB_out);
    socket.emit("updateInfoB", [ nameB_out, logoB_out, pcolB_out, scolB_out ])
})
winsB.addEventListener("change", () => { //update record
    winsB_out = winsB_inp.value;
    console.log("Team B's total wins has been updated to " + winsB_out);
    socket.emit("updateRecordB", [ winsB_out, lossesB_out ]);
})
lossesB.addEventListener("change", () => { //update record
    lossesB_out = lossesB_inp.value;
    console.log("Team A's total losses has been updated to " + winsB_out);
    socket.emit("updateRecordB", [ winsB_out, lossesB_out ]);
})

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
        const selectedValue = document.querySelector('input[name="valBestOf"]:checked').value;
        console.log('Selected format:', selectedValue);
        socket.emit("bestOfFormat", selectedValue)
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

const mapNum = document.querySelectorAll('input[name="val_mapPlayed"]'); // send which map is being played
                                                                             // would like to update at some point to have it show that the map has *been* played, its score, and who picked the map

mapNum.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        const mapValue = document.querySelector('input[name="val_mapPlayed"]:checked').value;
        socket.emit("mapProgress", mapValue);
    })
})

