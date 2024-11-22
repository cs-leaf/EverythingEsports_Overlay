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
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

// SET SCORES
let scores = [0,0]; // A = [0] and B = [1]
let names = ["Team A", "Team B"];
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
let mapPool = ["abyss", "abyss", "abyss", "abyss", "abyss",];

// listen for connects and disconnects
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors]); //sends updated to any clients rejoining a session
    io.emit("returnRecords", [rWins, rLosses]);
    io.emit("returnScores", scores);
    io.emit("returnFlip", flipped);
    io.emit("activeGame", gameSelected);
    io.emit("formatReturn", bestOf);
    io.emit("returnTimeoutsVAL", timeoutsLeft);
    io.emit("mapReturn", currentMapNum);

    //listen for team information updates
    socket.on("updateInfoA", (args) => {
        const updatedName = args[0] || names[0]; 
        const updatedLogo = args[1] || logos[0]; 
        const updatedPrimaryColor = args[2] || primaryColors[0]; 
        const updatedSecondaryColor = args[3] || secondaryColors[0];
        names.splice(0, 1, updatedName);
        logos.splice(0, 1, updatedLogo);
        primaryColors.splice(0, 1, updatedPrimaryColor);
        secondaryColors.splice(0, 1, updatedSecondaryColor);
        io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors]);
    })
    socket.on("updateInfoB", (args) => {
        const updatedName = args[0] || names[0]; 
        const updatedLogo = args[1] || logos[0]; 
        const updatedPrimaryColor = args[2] || primaryColors[1]; 
        const updatedSecondaryColor = args[3] || secondaryColors[1];
        names.splice(1, 1, updatedName);
        logos.splice(1, 1, updatedLogo);
        primaryColors.splice(1, 1, updatedPrimaryColor);
        secondaryColors.splice(1, 1, updatedSecondaryColor);
        io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors]);
    })
    socket.on("updateRecordA", (args) => {
       const updatedWins = args[0] || rWins[0];
       const updatedLosses = args[1] || rLosses[0];
       rWins.splice(0, 1, updatedWins);
       rLosses.splice(0, 1, updatedLosses);
       io.emit("returnRecords", [rWins, rLosses]);
    })
    socket.on("updateRecordB", (args) => {
        const updatedWins = args[0] || rWins[1];
        const updatedLosses = args[1] || rLosses[1];
        rWins.splice(1, 1, updatedWins);
        rLosses.splice(1, 1, updatedLosses);
        io.emit("returnRecords", [rWins, rLosses]);
     })

    //listen for score updates from the controller
    socket.on("updateScoreA", (arg) => {
        scores.splice(0, 1, arg);
        console.log(scores);
        io.emit("returnScores", scores);
    })
    socket.on("updateScoreB", (arg) => {
        scores.splice(1, 1, arg);
        console.log(scores);
        io.emit("returnScores", scores);
    })

    //listen for flipped status
    socket.on("flipStatus", (arg) => {
        flipped = arg;
        console.log("Flipped status is... " + flipped);
        io.emit("returnFlip", flipped);
        io.emit("activeGame", gameSelected);
        io.emit("returnScores", scores);
        io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors]);
        io.emit("formatReturn", bestOf);
        io.emit("returnTimeoutsVAL", timeoutsLeft);
    })

    //listen for game selection
    socket.on("gameSelection", (arg) => {
        gameSelected = arg;
        console.log("The game currently active is " + gameSelected);
        io.emit("returnFlip", flipped);
        io.emit("activeGame", gameSelected);
        io.emit("returnScores", scores);
        io.emit("returnInfo", [ names, logos, primaryColors, secondaryColors]);
        io.emit("formatReturn", bestOf);
        io.emit("returnTimeoutsVAL", timeoutsLeft);
        io.emit("mapReturn", currentMapNum);
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
})