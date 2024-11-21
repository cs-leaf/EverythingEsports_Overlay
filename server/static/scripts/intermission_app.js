const socket = io('ws://localhost:5500');

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
    document.getElementById("intNameA").textContent = args[0][0];
    document.getElementById("intNameB").textContent = args[0][1];
    //logos
    document.getElementById("logoA").src=args[1][0];
    document.getElementById("logoB").src=args[1][1];
    //colors
});
socket.on("returnRecords", (args) => {
    console.log(args);
    document.getElementById("winsA").textContent = args[0][0];
    document.getElementById("lossesA").textContent = args[1][0];
    document.getElementById("winsB").textContent = args[0][1];
    document.getElementById("lossesB").textContent = args[1][1];
})