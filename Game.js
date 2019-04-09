class Player{
    constructor(){
        this.shots = 0;
        this.move;
        this.imgMove;
    }
}

class Npc extends Player{
    constructor(){
        super();
    }

    getNpcRandomMove(){
        if(this.shots === 0) {
            return Math.floor(Math.random() * 2) + 1;
        }
        else {
            return Math.floor(Math.random() * 3); 
        }
    }
}

class Game{
    constructor(){
        this.draw = 'DRAW';
        this.finalDraw = 'FINALDRAW';
        this.playerWin = 'PLAYERWIN';
        this.npcWin = 'NPCWIN';
        this.player = new Player();
        this.npc = new Npc();
    }

    setUpGame(playerMove){
        this.player.move = playerMove;
        let result = this.action(this.player.move);

        this.handleResult(result);
        this.updateFrontend();
    }


    action(playerMove){
        let result;

        if(this.npc.shots === 3 || playerMove === 3){
            result = this.handleShotgun(this.npc.shots, playerMove);
        }
        else{
            this.npc.move = this.npc.getNpcRandomMove();
            if(this.npc.move === 3) {
                console.log();
            }

            this.npc.imgMove = this.npc.move;
            switch(playerMove) {
                case 0: this.player.shots--;
                    result = this.attack(this.npc.move);
                    break;
                case 1: result = this.block(this.npc.move);
                    break;
                case 2: this.player.shots++;  
                    result = this.load(this.npc.move);  
                    break;
            }
        }

        return result;
    }

    handleShotgun(npcShots, playerShotgun){
        if(npcShots === 3 && playerShotgun === 3){
            return this.finalDraw;
        }
        else if(playerShotgun === 3) {
            return this.playerWin;
        }
        else {
            return this.npcWin;
        }
    }

    attack(npcMove){
        switch(npcMove) {
            case 0: this.npc.shots--;
                return this.draw;
            case 1: return this.draw;
            case 2: return this.playerWin;
        }
    }

    block(npcMove){
        switch(npcMove) {
            case 0: this.npc.shots--;
                return this.draw;
            case 1: return this.draw;
            case 2: this.npc.shots++;
                return this.draw;
        }
    }

    load(npcMove){
        switch(npcMove) {
            case 0: this.npc.shots--;
                return this.npcWin;
            case 1: return this.draw;
            case 2: this.npc.shots++;
            return this.draw;
        }
    }

    handleResult(result){
        if(result === "PLAYERWIN") { 
            window.location.assign("WinPage.html");
        }
        else if(result === "NPCWIN") { 
            window.location.assign("LosePage.html");
        }
        else if(result === "FINALDRAW") { 
            window.location.assign("DrawPage.html");
        }
    }

    updateFrontend(){
        document.getElementById('playerAmmo').innerHTML = this.player.shots;
        document.getElementById('npcAmmo').innerHTML = this.npc.shots;
        document.getElementById('scratch').className = this.player.shots === 0 ? "buttons disabled" : "buttons";
        document.getElementById('shotgun').className = this.player.shots === 3 ? "buttons" : "buttons hide";
        document.getElementById('npcCat').src = `npc${this.npc.imgMove}.png`;
        //document.getElementById('playerCat').src = `player${this.player.imgMove}.png`;
    }
}

function setButtonValue(){
    document.getElementById('scratch').addEventListener('click', function(){
        document.getElementById('playerCat').src = "PlayerScratch.png";
        game.setUpGame(0);
    })

    document.getElementById('block').addEventListener('click', function(){
        document.getElementById('playerCat').src = "PlayerBlock.png";
        game.setUpGame(1);
    })

    document.getElementById('load').addEventListener('click', function(){
        document.getElementById('playerCat').src = "PlayerLoad.png";
        game.setUpGame(2);
    })

    document.getElementById('shotgun').addEventListener('click', function(){
        game.setUpGame(3);
    })
}


let game = new Game();
setButtonValue();









function startGame(){
    window.location.assign("GamePage.html");
}

function playAgain(){
    window.location.assign("StartPage.html");
}