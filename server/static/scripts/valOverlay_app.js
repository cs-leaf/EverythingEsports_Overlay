const socket = io('ws://localhost:5500');
let flipped = false;
let timeoutsLeftA = "2";
let timeoutsLeftB = "2";

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

            document.getElementById("stopPAR").style.stopColor = args[3][0]; // team A Right grad
            document.getElementById("stopSAR").style.stopColor = args[2][0];

            document.getElementById("stopPBR").style.stopColor = args[3][1]; // team B Right Grad
            document.getElementById("stopSBR").style.stopColor = args[2][1];

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
                document.getElementById("teamNameL").textContent = args[0][0];// team A on left, team B on right
                document.getElementById("teamNameR").textContent = args[0][1]; 
                document.getElementById("lBody").style.fill = "url(#LgradA)";
                document.getElementById("rBody").style.fill = "url(#RgradB)";
            }
            else{
                if (flipped == true){
                    document.getElementById("teamNameL").textContent = args[0][1];// team B on left, team A on right
                    document.getElementById("teamNameR").textContent = args[0][0];
                    document.getElementById("lBody").style.fill = "url(#LgradB)";
                    document.getElementById("rBody").style.fill = "url(#RgradA)";
                }
            }    
        });

        socket.on("returnTimeoutsVAL", (args) => {
            timeoutsLeftA = args[0];
            timeoutsLeftB = args[1];

            if (flipped == false){
                if (timeoutsLeftA == 2 && timeoutsLeftB == 2){
                    document.getElementById("lTimeout1").style.fillOpacity = 1;
                    document.getElementById("lTimeout2").style.fillOpacity = 1;
    
                    document.getElementById("rTimeout1").style.fillOpacity = 1;
                    document.getElementById("rTimeout2").style.fillOpacity = 1;
                }
                else{
                    if (timeoutsLeftA == 1 && timeoutsLeftB == 2){
                        document.getElementById("lTimeout1").style.fillOpacity = 0;
                        document.getElementById("lTimeout2").style.fillOpacity = 1;
    
                        document.getElementById("rTimeout1").style.fillOpacity = 1;
                        document.getElementById("rTimeout2").style.fillOpacity = 1;
                    }
                    else{
                        if (timeoutsLeftA == 0 && timeoutsLeftB == 2){
                            document.getElementById("lTimeout1").style.fillOpacity = 0;
                            document.getElementById("lTimeout2").style.fillOpacity = 0;
        
                            document.getElementById("rTimeout1").style.fillOpacity = 1;
                            document.getElementById("rTimeout2").style.fillOpacity = 1;
                        }
                        else{
                            if (timeoutsLeftA == 0 && timeoutsLeftB == 1){
                                document.getElementById("lTimeout1").style.fillOpacity = 0;
                                document.getElementById("lTimeout2").style.fillOpacity = 0;
        
                                document.getElementById("rTimeout1").style.fillOpacity = 0;
                                document.getElementById("rTimeout2").style.fillOpacity = 1;
                            }
                            else{
                                if (timeoutsLeftA == 0 && timeoutsLeftB == 0){
                                    document.getElementById("lTimeout1").style.fillOpacity = 0;
                                    document.getElementById("lTimeout2").style.fillOpacity = 0;
            
                                    document.getElementById("rTimeout1").style.fillOpacity = 0;
                                    document.getElementById("rTimeout2").style.fillOpacity = 0;
                                }
                            }
                        }
                    }
                }
            }
            else{
                if (timeoutsLeftA == 2 && timeoutsLeftB == 2){
                    document.getElementById("lTimeout1").style.fillOpacity = 1;
                    document.getElementById("lTimeout2").style.fillOpacity = 1;
    
                    document.getElementById("rTimeout1").style.fillOpacity = 1;
                    document.getElementById("rTimeout2").style.fillOpacity = 1;
                }
                else{
                    if (timeoutsLeftA == 1 && timeoutsLeftB == 2){
                        document.getElementById("lTimeout1").style.fillOpacity = 1;
                        document.getElementById("lTimeout2").style.fillOpacity = 1;
    
                        document.getElementById("rTimeout1").style.fillOpacity = 0;
                        document.getElementById("rTimeout2").style.fillOpacity = 1;
                    }
                    else{
                        if (timeoutsLeftA == 0 && timeoutsLeftB == 2){
                            document.getElementById("lTimeout1").style.fillOpacity = 1;
                            document.getElementById("lTimeout2").style.fillOpacity = 1;
        
                            document.getElementById("rTimeout1").style.fillOpacity = 0;
                            document.getElementById("rTimeout2").style.fillOpacity = 0;
                        }
                        else{
                            if (timeoutsLeftA == 0 && timeoutsLeftB == 1){
                                document.getElementById("lTimeout1").style.fillOpacity = 0;
                                document.getElementById("lTimeout2").style.fillOpacity = 1;
        
                                document.getElementById("rTimeout1").style.fillOpacity = 0;
                                document.getElementById("rTimeout2").style.fillOpacity = 0;
                            }
                            else{
                                if (timeoutsLeftA == 0 && timeoutsLeftB == 0){
                                    document.getElementById("lTimeout1").style.fillOpacity = 0;
                                    document.getElementById("lTimeout2").style.fillOpacity = 0;
            
                                    document.getElementById("rTimeout1").style.fillOpacity = 0;
                                    document.getElementById("rTimeout2").style.fillOpacity = 0;
                                }
                            }
                        }
                    }
                }
            }
        })
    }
    else{
        console.log("Nothing to update.")
    }
})
