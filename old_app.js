const socket = io('ws://localhost:5500')

//define score starting values
let scoreA = 0
let scoreB = 0

function checkPress() { // this is just to test buttons on the page
    console.log("A button was pressed.");
};

// INCREASE SCORES
function incScoreA(){ // Score A
    if (scoreA != 5){
        scoreA++;
        document.getElementById("mapScoreA").textContent = scoreA;
        console.log("Increased Score A by 1, it's value is now " + scoreA);
        socket.emit('updateScore', { team: 'A', score: scoreA });
    }
    else{
        console.log("The score cannot be increased further. It's value is " + scoreA);
    }
}
function incScoreB(){ // Score B
    if (scoreB !=5){
        scoreB++;
        document.getElementById("mapScoreB").textContent = scoreB;
        console.log("Increased Score B by 1, it's value is now " + scoreB);
    }
    else{
        console.log("The score cannot be decreased further. It's value is " + scoreB);
    }
}

// DECREASE SCORES
function decScoreA(){ // Score A
    if (scoreA > 0){
        scoreA--;
        document.getElementById("mapScoreA").textContent = scoreA;
        console.log("Decreased Score A by 1, it's value is now " + scoreA);
        
    }
    else{
        console.log("The score cannot be decreased further. It's value is " + scoreA);
    }
}
function decScoreB(){ // Score B
    if (scoreB > 0){
        scoreB--;
        document.getElementById("mapScoreB").textContent = scoreB;
        console.log("Decreased Score B by 1, it's value is now " + scoreB);
        
    }
    else{
        console.log("The score cannot be decreased further. It's value is " + scoreB);
    }
}

// RESET INDIVIDUAL SCORES
function resetA(){
    scoreA = 0;
    document.getElementById("mapScoreA").textContent = scoreA;
    console.log("Reset Score A to " + scoreA);
}
function resetB(){
    scoreB = 0;
    document.getElementById("mapScoreB").textContent = scoreB;
    console.log("Reset Score B to " + scoreB);
}

// RESET ALL SCORES
function resetScores(){
    scoreA = 0
    scoreB = 0
    document.getElementById("mapScoreA").textContent = scoreA;
    document.getElementById("mapScoreB").textContent = scoreB;
    console.log("All scores have been reset.")
}