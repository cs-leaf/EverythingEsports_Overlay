const socket = io('ws://localhost:5500');
let flipped = false;
let timeoutsLeftA = "2";
let timeoutsLeftB = "2";
let currentMapNum = "1";
let currentFormat = "0";

socket.on("activeGame", (arg) => {
    if (arg == "valorant"){
        //page/text updates
        socket.on("returnScores", (arg) => {

            if (flipped == false){
                document.getElementById("mapScoreL").textContent = arg[0];
                document.getElementById("mapScoreR").textContent = arg[1];
        }
        else{
            if (flipped == true){
                document.getElementById("mapScoreL").textContent = arg[1];
                document.getElementById("mapScoreR").textContent = arg[0];
            }
        }
        });
        //flip check
        socket.on("returnFlip", (arg) => {
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

            document.getElementById("stopPAR").style.stopColor = args[2][0]; // team A Right grad
            document.getElementById("stopSAR").style.stopColor = args[3][0];

            document.getElementById("stopPBR").style.stopColor = args[2][1]; // team B Right Grad
            document.getElementById("stopSBR").style.stopColor = args[3][1];

            if (flipped == false){
                document.getElementById("lTimeout1").style.fill = args[3][0];
                document.getElementById("lTimeout2").style.fill = args[3][0];
                document.getElementById("rTimeout1").style.fill = args[3][1];
                document.getElementById("rTimeout2").style.fill = args[3][1];
            }
            else{
                document.getElementById("lTimeout1").style.fill = args[3][1];
                document.getElementById("lTimeout2").style.fill = args[3][1];
                document.getElementById("rTimeout1").style.fill = args[3][0];
                document.getElementById("rTimeout2").style.fill = args[3][0];
            }


            // change names
            if (flipped == false){
                document.getElementById("teamNameL").textContent = args[4][0];// team A on left, team B on right
                document.getElementById("teamNameR").textContent = args[4][1]; 
                document.getElementById("lBody").style.fill = "url(#LgradA)";
                document.getElementById("rBody").style.fill = "url(#RgradB)";
            }
            else{
                if (flipped == true){
                    document.getElementById("teamNameL").textContent = args[4][1];// team B on left, team A on right
                    document.getElementById("teamNameR").textContent = args[4][0];
                    document.getElementById("lBody").style.fill = "url(#LgradB)";
                    document.getElementById("rBody").style.fill = "url(#RgradA)";
                }
            }    
        });

        socket.on("returnTimeoutsVAL", (args) => {

            timeoutsLeftA = args[0];
            timeoutsLeftB = args[1];

            console.log("Timeouts A: " + timeoutsLeftA + " Timeouts B: " +timeoutsLeftB);

            if (flipped == false){
                if (timeoutsLeftA == 2){
                    document.getElementById("lTimeout1").style.fillOpacity = 1;
                    document.getElementById("lTimeout2").style.fillOpacity = 1;
                }
                else{
                    if (timeoutsLeftA == 1){
                        document.getElementById("lTimeout1").style.fillOpacity = 0;
                        document.getElementById("lTimeout2").style.fillOpacity = 1;
                    }
                    else{
                        if (timeoutsLeftA == 0){
                            document.getElementById("lTimeout1").style.fillOpacity = 0;
                            document.getElementById("lTimeout2").style.fillOpacity = 0;
                        }
                    }
                }
            }
            else{
                if (timeoutsLeftB == 2){
                    document.getElementById("lTimeout1").style.fillOpacity = 1;
                    document.getElementById("lTimeout2").style.fillOpacity = 1;
                }
                else{
                    if (timeoutsLeftB == 1){
                        document.getElementById("lTimeout1").style.fillOpacity = 0;
                        document.getElementById("lTimeout2").style.fillOpacity = 1;
                    }
                    else{
                        if (timeoutsLeftB == 0){
                            document.getElementById("lTimeout1").style.fillOpacity = 0;
                            document.getElementById("lTimeout2").style.fillOpacity = 0;
                        }
                    }
                }
            }
            if (flipped == false){
                if (timeoutsLeftB == 2){
                    document.getElementById("rTimeout1").style.fillOpacity = 1;
                    document.getElementById("rTimeout2").style.fillOpacity = 1;
                }
                else{
                    if (timeoutsLeftB == 1){
                        document.getElementById("rTimeout1").style.fillOpacity = 0;
                        document.getElementById("rTimeout2").style.fillOpacity = 1;
                    }
                    else{
                        if (timeoutsLeftB == 0){
                            document.getElementById("rTimeout1").style.fillOpacity = 0;
                            document.getElementById("rTimeout2").style.fillOpacity = 0;
                        }
                    }
                }
            }
            else{
                if (timeoutsLeftA == 2){
                    document.getElementById("rTimeout1").style.fillOpacity = 1;
                    document.getElementById("lTimeout2").style.fillOpacity = 1;
                }
                else{
                    if (timeoutsLeftA == 1){
                        document.getElementById("rTimeout1").style.fillOpacity = 0;
                        document.getElementById("rTimeout2").style.fillOpacity = 1;
                    }
                    else{
                        if (timeoutsLeftA == 0){
                            document.getElementById("rTimeout1").style.fillOpacity = 0;
                            document.getElementById("rTimeout2").style.fillOpacity = 0;
                        }
                    }
                }
            }
        })

        socket.on("formatReturn", (arg) => { //listen for formats to show/hide the map display
            console.log(currentFormat)
            if (arg == 0){
                currentFormat = 0;
                document.getElementById("BO3mapDisplay").style.fillOpacity = 0;
                document.getElementById("BO5mapDisplay").style.fillOpacity = 0;

                document.getElementById("mapNames").style.display = "none";
            }
            else{
                if (arg == 1){
                    currentFormat = 1;
                    document.getElementById("map1of3").style.fill = "#222222";
                    document.getElementById("BO3mapDisplay").style.fillOpacity = 1;
                    document.getElementById("BO5mapDisplay").style.fillOpacity = 0;

                    document.getElementById("mapNames").style.display = "inline-flex";
                    document.getElementById("map4").style.display = "none";
                    document.getElementById("map5").style.display = "none";
                }
                else{
                    if (arg == 2){
                        currentFormat = 2;
                        document.getElementById("map1of5").style.fill = "#222222";
                        document.getElementById("BO3mapDisplay").style.fillOpacity = 0;
                        document.getElementById("BO5mapDisplay").style.fillOpacity = 1;

                        document.getElementById("mapNames").style.display = "inline-flex";
                        document.getElementById("map4").style.display = "block";
                        document.getElementById("map5").style.display = "block";
                    }
                }
            }
        })

        socket.on("winnerReturn", (args) => {
            if (currentFormat == 1){
                document.getElementById("map1of3").style.fill = args[0];
                document.getElementById("map2of3").style.fill = args[1];
                document.getElementById("map3of3").style.fill = args[2];
            }
            else{
                if (currentFormat == 2){
                    document.getElementById("map1of5").style.fill = args[0];
                    document.getElementById("map2of5").style.fill = args[1];
                    document.getElementById("map3of5").style.fill = args[2];
                    document.getElementById("map4of5").style.fill = args[3];
                    document.getElementById("map5of5").style.fill = args[4];
                }
            }
        })

        socket.on("mapReturn", (arg) => {
            if (currentFormat == 0){
                document.getElementById("BO3mapDisplay").style.fillOpacity = 0;
                document.getElementById("BO5mapDisplay").style.fillOpacity = 0;
            }
            else {
                if (currentFormat == 1){
                    document.getElementById("BO3mapDisplay").style.fillOpacity = 1;
                    document.getElementById("BO5mapDisplay").style.fillOpacity = 0;
                    if (arg == 1){
                        document.getElementById("map1of3").style.fill = "#222222";
                    }
                    else{
                        if (arg == 2){
                            document.getElementById("map2of3").style.fill = "#222222";
                        }
                        else{
                            if (arg == 3){
                                    document.getElementById("map3of3").style.fill = "#222222";
                            }
                        }
                    }
                }
                else {
                    if (currentFormat == 2){
                        document.getElementById("BO3mapDisplay").style.fillOpacity = 0;
                        document.getElementById("BO5mapDisplay").style.fillOpacity = 1;
                    if (arg == 1){
                        document.getElementById("map1of5").style.fill = "#222222";
                    }
                    else{
                        if (arg == 2){
                            document.getElementById("map2of5").style.fill = "#222222";
                        }
                        else{
                            if (arg == 3){
                                    document.getElementById("map3of5").style.fill = "#222222";
                                }
                                else {
                                    if (arg == 4){
                                    document.getElementById("map4of5").style.fill = "#222222"; 
                                    }
                                    else {
                                        if (arg == 5){
                                            document.getElementById("map5of5").style.fill = "#222222";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        socket.on("mapSelReturn", (args) => {
            if (currentFormat == 0){
                document.getElementById("mapNames").style.display = "none";
            }
            else{
                if (currentFormat == 1){
                    document.getElementById("mapNames").style.display = "inline-flex";
                    document.getElementById("map4").style.display = "none";
                    document.getElementById("map5").style.display = "none";

                    document.getElementById("map1").textContent = args[0];
                    document.getElementById("map2").textContent = args[1];
                    document.getElementById("map3").textContent = args[2];
                }
                else {
                    if (currentFormat == 2){
                        document.getElementById("mapNames").style.display = "inline-flex";
                        document.getElementById("map4").style.display = "block";
                        document.getElementById("map5").style.display = "block";
    
                        document.getElementById("map1").textContent = args[0];
                        document.getElementById("map2").textContent = args[1];
                        document.getElementById("map3").textContent = args[2];
                        document.getElementById("map4").textContent = args[3];
                        document.getElementById("map5").textContent = args[4];
                    }
                }
            }
        })
    }
    else{
        console.log("Nothing to update.")
    }
})
