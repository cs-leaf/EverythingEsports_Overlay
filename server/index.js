import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'
import { disconnect } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5500

const app = express()

app.use(express.static(path.join(__dirname, "static")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500", "http://192.168.254.68:5500"]
    }
})

// SET SCORES
let scores = [0,0]; // A = [0] and B = [1]
let names = ["Team A", "Team B"];
let tags = ["TA1", "TB2"];
let logos = ["https://placehold.co/400","https://placehold.co/400"];
let primaryColors = ["#FF0000", "#00FF00"];
let secondaryColors = ["#FFFFFF", "#000000"];
let rWins = [0,0];
let rLosses = [0,0];
let flipped = false;
let gameSelected = "none";
let bestOf = 0; // 0 = none, 1 = BO3, 2 = B05
let timeoutsLeft = [2,2]; // A = [0] and B = [1]
let currentMapNum = 1;
let mapPool = ["abyss", "abyss", "abyss", "abyss", "abyss"];
let mapWinners = ["#222222", "#222222", "#222222", "#222222", "#222222"];
let owMode = "noMode";

function bigBatchEmit() {
    io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors, tags ]); //sends updated to any clients rejoining a session
    io.emit("returnRecords", [rWins, rLosses]);
    io.emit("returnScores", scores);
    io.emit("activeGame", gameSelected);
    io.emit("formatReturn", bestOf);
    io.emit("returnTimeoutsVAL", timeoutsLeft);
    io.emit("mapReturn", currentMapNum);
};

// listen for connects and disconnects
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    bigBatchEmit(); // sends out all packages to those joining the session.

    //listen for team information updates
    socket.on("updateInfoA", (args) => {
        const updatedName = args[0] || names[0]; 
        const updatedTag = args[4] || tags[0]
        const updatedLogo = args[1] || logos[0]; 
        const updatedPrimaryColor = args[2] || primaryColors[0]; 
        const updatedSecondaryColor = args[3] || secondaryColors[0];
        names[0] = updatedName;
        tags[0] = updatedTag;
        logos[0] = updatedLogo;
        primaryColors[0] = updatedPrimaryColor;
        secondaryColors[0] = updatedSecondaryColor;
        io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors, tags]);
    })
    socket.on("updateInfoB", (args) => {
        const updatedName = args[0] || names[1]; 
        const updatedTag = args[4] || tags[1];
        const updatedLogo = args[1] || logos[1]; 
        const updatedPrimaryColor = args[2] || primaryColors[1]; 
        const updatedSecondaryColor = args[3] || secondaryColors[1];
        names[1] = updatedName;
        tags[1] = updatedTag;
        logos[1] = updatedLogo;
        primaryColors[1] = updatedPrimaryColor;
        secondaryColors[1] = updatedSecondaryColor;
        io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors, tags]);
    })
    socket.on("updateRecordA", (args) => {
       const updatedWins = args[0] || rWins[0];
       const updatedLosses = args[1] || rLosses[0];
       rWins[0] = updatedWins;
       rLosses[0] = updatedLosses;
       io.emit("returnRecords", [rWins, rLosses]);
    })
    socket.on("updateRecordB", (args) => {
        const updatedWins = args[0] || rWins[1];
        const updatedLosses = args[1] || rLosses[1];
        rWins[1] = updatedWins;
        rLosses[1] = updatedLosses;
        io.emit("returnRecords", [rWins, rLosses]);
     })

    //listen for score updates from the controller
    socket.on("updateScoreA", (arg) => {
        scores[0] = arg;
        console.log(scores);
        io.emit("returnScores", scores);
    })
    socket.on("updateScoreB", (arg) => {
        scores[1] = arg;
        console.log(scores);
        io.emit("returnScores", scores);
    })

    //listen for flipped status
    socket.on("flipStatus", (arg) => {
        flipped = arg;
        console.log("Flipped status is... " + flipped);
        io.emit("returnFlip", flipped);
        bigBatchEmit();
    })

    //listen for game selection
    socket.on("gameSelection", (arg) => {
        gameSelected = arg;
        console.log("The game currently active is " + gameSelected);
        bigBatchEmit();
    })

    //listen for best of format
    socket.on("bestOfFormat", (arg) => {
        if ((arg) == "none"){
            bestOf = 0;
        }
        else{
            if ((arg) == "bestOf3"){
                bestOf = 1;
            }else{
                if((arg) == "bestOf5"){
                    bestOf = 2;
                }
            }
        }
        mapPool[0] = "no_sel"
        mapPool[1] = "no_sel"
        mapPool[2] = "no_sel"
        mapPool[3] = "no_sel"
        mapPool[4] = "no_sel"
        io.emit("formatReturn", bestOf);
    })

    //listen for map selection (VALORANT)
    socket.on("mapSelection", (args) => {
        mapPool[0] = args[0];
        mapPool[1] = args[1];
        mapPool[2] = args[2];
        mapPool[3] = args[3];
        mapPool[4] = args[4];
        console.log(mapPool);
        io.emit("mapSelReturn", mapPool);
    })

    //
    socket.on("mapProgress", (arg) => {
        currentMapNum = arg;

        if (currentMapNum == 1){
            mapWinners[0] = "#999999"
            mapWinners[1] = "#222222"
            mapWinners[2] = "#222222"
            mapWinners[3] = "#222222"
            mapWinners[4] = "#222222"
        }
        if (currentMapNum == 2){
            mapWinners[0] = "#222222"
            mapWinners[1] = "#999999"
            mapWinners[2] = "#222222"
            mapWinners[3] = "#222222"
            mapWinners[4] = "#222222"
        }
        if (currentMapNum == 3){
            mapWinners[0] = "#222222"
            mapWinners[1] = "#222222"
            mapWinners[2] = "#999999"
            mapWinners[3] = "#222222"
            mapWinners[4] = "#222222"
        }
        if (currentMapNum == 4){
            mapWinners[0] = "#222222"
            mapWinners[1] = "#222222"
            mapWinners[2] = "#222222"
            mapWinners[3] = "#999999"
            mapWinners[4] = "#222222"
        }
        if (currentMapNum == 5){
            mapWinners[0] = "#222222"
            mapWinners[1] = "#222222"
            mapWinners[2] = "#222222"
            mapWinners[3] = "#222222"
            mapWinners[4] = "#999999"
        }

        console.log("Map Number = " + currentMapNum)
        io.emit("mapReturn", currentMapNum);
    })

    //listen for timeouts (VALORANT)
    socket.on("updateTimeoutsVAL", (args) =>{
        timeoutsLeft[0] = args[0];
        timeoutsLeft[1] = args[1];
        console.log(timeoutsLeft);
        io.emit("returnTimeoutsVAL", timeoutsLeft);
    })

    //listen for mode updates Overwatch
    socket.on("modeUpdate", (arg) => {
        owMode = arg;
        io.emit("modeReturn", owMode);
    })

    socket.on("mapWinners", (args) => {
        if (args[0] == "A") {
            mapWinners[0] = primaryColors[0];
        }
        else{
            if (args[0] == "B") {
                mapWinners[0] = primaryColors[1];
            }
        }

        if (args[1] == "A") {
            mapWinners[1] = primaryColors[0];
        }
        else{
            if (args[1] == "B") {
                mapWinners[1] = primaryColors[1];
            }
        }

        if (args[2] == "A") {
            mapWinners[2] = primaryColors[0];
        }
        else{
            if (args[2] == "B") {
                mapWinners[2] = primaryColors[1];
            }
        }

        if (args[3] == "A") {
            mapWinners[3] = primaryColors[0];
        }
        else{
            if (args[3] == "B") {
                mapWinners[3] = primaryColors[1];
            }
        }

        if (args[4] == "A") {
            mapWinners[4] = primaryColors[0];
        }
        else{
            if (args[4] == "B") {
                mapWinners[4] = primaryColors[1];
            }
        }
        console.log(mapWinners);
        io.emit("winnerReturn", mapWinners);
    })
})