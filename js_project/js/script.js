            let life = 200;
            let isDead = false;

            let screamAudio = new Audio("scream.mp3");
            let deathAudio = new Audio("death.mp3");
            
            let playerFace = document.getElementById("imagePlayerFace");
            let lifeBar = document.getElementById("divLifeBar");
            let attackButton = document.getElementById("buttonAttackEnemy")
             
            function defaultFace(){
                playerFace.src = "happy.png"
            }

            function ressurrect(){
                life = 200;
                lifeBar.style.width = life + "px";
                playerFace.src = "happy.png";
                isDead = false;


            }

            function attackPlayer(){
                life -= 40;
                lifeBar.style.width = life + "px";
                if(life <= 0) {
                    playerFace.src = "dead.png";
                    if(!isDead) {
                        deathAudio.play();
                        isDead = true;
                        setTimeout(ressurrect, 1000);                     
                    }
                }
                else {
                    playerFace.src = "aw.png";                    
                    setTimeout(defaultFace,500);
                    screamAudio.play();
                }
            }
         
            attackButton.onclick = attackPlayer;
         