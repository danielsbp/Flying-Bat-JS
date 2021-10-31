// Classe principal do jogo.
// Inclui os atributos que são comuns em todos elementos do jogo. Serve como classe pai.
class ComponentOfTheGame {
    constructor(x, y, width, height, spritesrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = new Image(this.width, this.height);

        this.sprite.src = spritesrc;
    }
}

// Classe do jogador
class Player extends ComponentOfTheGame {
    constructor(x, y, width, height, spritesrc) {
        super(x,y,width,height,spritesrc);
        this.frame = 0;
        this.gifImage = 0;

        this.speed = 9;

        this.status = "none";
        this.score = 0;

        this.hitbox = {
            x: this.x + 32,
            y: this.y + 30,
            width: this.width-60,
            height: this.height-60
        }

        document.addEventListener("keydown", (playerKey) => {
            console.log(playerKey.key + " está sendo apertado");
            if(playerKey.key == "w") {
                this.status = "up";
            }
            else if(playerKey.key == "s") {
                this.status = "down";
            }
                
        });
        document.addEventListener("keyup", (playerKey) => {
            this.status = "none";
        });
    }
}
    
    

        



// Classe do chão
class Floor extends ComponentOfTheGame {
    constructor(x, y, width, height, spritesrc, speed) {
        super(x,y,width,height,spritesrc);
        this.speed = speed
    }
    animation() {
        // Faz com que o chão se repita, trazendo uma sensação de chão infinito.
        this.x-=this.speed;
        if(this.x < -500){
            this.x = 0;
        }
    }
}

class Stars extends ComponentOfTheGame {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.x = 0;
        this.y = 0;
        this.width = 6000;
        this.height = 500;
        this.amountOfStars = 6000;
        this.speed = -0.00007;
        this.starCoords = [];
    }
    // Gera 40 coordenadas x,y e armazena dentro do vetor this.starCoords[]
    starGenerator() {
        for(let x=0; x<= this.amountOfStars; x++) {
            // .push(coord_x, coord_y);
            this.starCoords.push([Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.width)]);    
        } 
    }
    renderStars() {
        // Renderiza as coordenadas geradas pelo starGenerator()
        for(let n in this.starCoords) {
            game.ctx.fillStyle = "#FFFFFF";
            // A soma da coordenada da estrela mais x (que é basicamente o céu todo) faz com que seja possível o movimento
            game.ctx.fillRect(this.starCoords[n][0]+this.x, this.starCoords[n][1]+this.y, 3, 3);
            this.x += this.speed;
        }
    }
}

class Obstacle extends ComponentOfTheGame {
    constructor(x, y, width, height, spritesrc) {
        super(x, y, width, height, spritesrc);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spritesrc = spritesrc;

        this.arrayOfObstacles = []

        this.frame = 0;
        this.gifFrame = 0;
    }

    obstacleGenerator(type) {
        let sprite = [];
        let y;
        let x = 500+Math.floor(Math.random()*100);
        let width;
        let height;
        let hitbox;

        if(type == 0) {
            y = 260;
            sprite = new Image(100, 100);
            sprite.src="tree.png";
            width = 150;
            height = width;
            hitbox = {
                x: x+10,
                y,
                width: width-17,
                height: height-17
            }
        }
        else if(type == 1) {
            y = Math.floor(Math.random()*180);
            for(let x = 0; x<6; x++) {
                let image = new Image();
                image.src="Bird1/"+x+".gif"
                sprite.push(image);
            }
            width = 110;
            height = width;

            hitbox = {
                x: x+20, 
                y: y+34,
                width: width-70,
                height: height-70
            }
        }
        else if(type == 2) {
            y = Math.floor(Math.random()*180);
            for(let x = 0; x<6; x++) {
                let image = new Image();
                image.src="Bird2/"+x+".gif"
                sprite.push(image);
            }
            width = 110;
            height = width;

            hitbox = {
                x: x+25, 
                y: y+30,
                width: width-70,
                height: height-70
            }
        }
        else if(type == 3) {
            y = 260;
            sprite = new Image(100, 100);
            sprite.src="house1.png";
            width = 150;
            height = width;

            hitbox = {
                x: x+23,
                y,
                width: width-55,
                height: height-17
            }
        }
        return {
            type,
            sprite,
            y,
            x,
            width,
            height,
            hitbox
         }
    }
}

let game = {
    canvas: document.querySelector('#game'),
    ctx: document.querySelector("#game").getContext('2d'),
    player: new Player(100, 150, 100, 100, 'Bat/0.png'),
    floor: new Floor(0, 380, 1000, 180, 'ground.png', 10),
    stars: new Stars(),
    obstacles: new Obstacle(0,0,500, 500, ""),
    gameOver: false,
    render: () => {
        if(game.gameOver === false) {
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        
            // Estrelas
            game.stars.renderStars();

            // Chão
            game.ctx.drawImage(game.floor.sprite, game.floor.x, game.floor.y, game.floor.width, game.floor.height);
            game.floor.animation();
            
            // Jogador
            game.player.frame++;
            // console.log(game.player.frame);
            
            // Controle do jogador
            if(game.player.status == "up" && game.player.y>=-10){
                game.player.y += -game.player.speed;
                game.player.hitbox.y += -game.player.speed;
            }

            if(game.player.status == "down" && game.player.y<=287) {
                game.player.y += game.player.speed;
                game.player.hitbox.y += game.player.speed;
            
            }

            if(game.player.status == "none") {
                game.player.y;
            }


            // O número 6 controla a velocidade que os frames são trocados.
            if(game.player.frame % 5 == 0){
                game.player.gifImage++;
                // Troca os frames do gif. Faz com que o morcego fique "voando" na tela.
                // Este método pode causar piscadas em alguns navegadores/pcs.
                game.player.sprite.src="Bat/"+game.player.gifImage+".png";
                if(game.player.gifImage >= 4) {
                    game.player.gifImage = 0;
                }
            }
            

            //game.ctx.fillRect(game.player.hitbox.x, game.player.hitbox.y, game.player.hitbox.width, game.player.hitbox.height);
            game.ctx.drawImage(game.player.sprite, game.player.x, game.player.y, game.player.width, game.player.height);


            // Obstáculos
            game.obstacles.frame++;
            if(game.obstacles.frame%5 == 0) {
                game.obstacles.gifFrame++;
            }
            if(game.obstacles.frame % 29 == 0) {
                game.obstacles.arrayOfObstacles.push(game.obstacles.obstacleGenerator(Math.floor(Math.random()*4)));
            }

            for(let n in game.obstacles.arrayOfObstacles){
                let obstacle = game.obstacles.arrayOfObstacles[n];

                obstacle.x += -game.floor.speed;
                obstacle.hitbox.x += -game.floor.speed;

                if(game.obstacles.gifFrame > 5){
                    game.obstacles.gifFrame = 0;
                }
                if(obstacle.type==1 || obstacle.type==2) {

                    fillStyle = "green";
                    // Debug Hit-box obstáculos voadores: 
                    //game.ctx.fillRect(obstacle.hitbox.x, obstacle.hitbox.y, obstacle.hitbox.width, obstacle.hitbox.height);  
                    game.ctx.drawImage(obstacle.sprite[game.obstacles.gifFrame], obstacle.x, obstacle.y, obstacle.width, obstacle.height);  

                       
                }
                else {
                    //game.ctx.fillRect(obstacle.hitbox.x, obstacle.hitbox.y, obstacle.hitbox.width, obstacle.hitbox.height);
                    game.ctx.drawImage(obstacle.sprite, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

                    
                }

                if (game.player.hitbox.x < obstacle.hitbox.x + obstacle.hitbox.width &&
                game.player.hitbox.x + game.player.hitbox.width > obstacle.hitbox.x &&
                game.player.hitbox.y < obstacle.hitbox.y + obstacle.hitbox.height &&
                game.player.hitbox.y + game.player.hitbox.height > obstacle.hitbox.y) {
                // Sistema de colisão
                    game.gameOver = true;
                }
            }

            
            if(game.player.frame % 6 == 0){
                game.player.score++;   
            }
            game.ctx.fillStyle = "#ffffff"
            game.ctx.font = "30px Arial";

            game.ctx.fillText("Score: "+game.player.score, 50, 50);


            requestAnimationFrame(game.render);   
        } else {
            //game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
            game.ctx.fillStyle = "#ffffff"
            game.ctx.fillRect(150, 205, 200, 70);
            game.ctx.font = "30px Arial";
            game.ctx.fillStyle = "#000000";
            game.ctx.fillText("Você perdeu!", 160, 250);


        }

        
    },
    homePage: () => {
        
        let bat = new Image();
        bat.src="/Bat/0.png";

        game.ctx.drawImage(bat, 150, 255);

        game.ctx.fillStyle = "#ffffff"
        game.ctx.fillRect(150, 255, 200, 70);
        game.ctx.font = "30px Arial";
        game.ctx.fillStyle = "#000000";
        game.ctx.fillText("Iniciar", 210, 300);
        
        game.canvas.onclick = () => {
            game.stars.starGenerator();
            game.render();
            game.canvas.onclick = undefined;
        };
    }

}

game.homePage();



