const socket = io('ws://localhost:5500');
let flipped = false;
let currentMapNum = "1";
let currentMode = "0"; // 0)control 1)escort 2)flashpoint 3)hybrid 4)Push 5)clash
let currentFormat = "0";

socket.on("activeGame", (arg) => {
    if ((arg) == "overwatch2"){ // scoring
        socket.on("returnScores", (arg) => {

            if (flipped == false){
                document.getElementById("lScore").textContent = arg[0];
                document.getElementById("rScore").textContent = arg[1];
        }
        else{
            if (flipped == true){
                document.getElementById("lScore").textContent = arg[1];
                document.getElementById("rScore").textContent = arg[0];
            }
        }
        });

        socket.on("returnFlip", (arg) => { // flipping
            flipped = arg;
            console.log("Flip Status is... " + flipped);
        }); 

        socket.on("returnInfo", (args) => {
            console.log(args); //lists the array in html page's console
            // [ Names [A, B], Logos [A, B], pCols [A, B], sCols [A,B]]
            //      0[0,1]         1[0,1]       2[0,1]       3[0,1]
            document.getElementById("stopPAL").style.stopColor = args[2][0]; // team A Left grad
            document.getElementById("stopSAL").style.stopColor = args[3][0];

            document.getElementById("stopPBL").style.stopColor = args[2][1]; // team B Left Grad
            document.getElementById("stopSBL").style.stopColor = args[3][1];

            document.getElementById("stopPAR").style.stopColor = args[3][0]; // team A Right grad
            document.getElementById("stopSAR").style.stopColor = args[2][0];

            document.getElementById("stopPBR").style.stopColor = args[3][1]; // team B Right Grad
            document.getElementById("stopSBR").style.stopColor = args[2][1];

            if (flipped == false){
                document.getElementById("lName").textContent = args[0][0];// team A on left, team B on right
                document.getElementById("rName").textContent = args[0][1]; 
                document.getElementById("lBody").style.fill = "url(#LgradA)";
                document.getElementById("rBody").style.fill = "url(#RgradB)";
            }
            else{
                if (flipped == true){
                    document.getElementById("lName").textContent = args[0][1];// team B on left, team A on right
                    document.getElementById("rName").textContent = args[0][0];
                    document.getElementById("lBody").style.fill = "url(#LgradB)";
                    document.getElementById("rBody").style.fill = "url(#RgradA)";
                }
            }  
        });

        socket.on("returnRecords", (args) => {
            console.log(args);

            if(flipped == false){
                document.getElementById("lRecord").textContent = args[0][0] + " - " + args[0][1];
                document.getElementById("rRecord").textContent = args[1][0] + " - " + args[1][1];
            }
            else{
                if (flipped == true){
                    document.getElementById("lRecord").textContent = args[1][0] + " - " + args[1][1];
                    document.getElementById("rRecord").textContent = args[0][0] + " - " + args[0][1];
                }
            }
        })
    }
    else{
        console.log("There are no changes to be made.")
    }
})