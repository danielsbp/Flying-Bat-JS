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
        if(this.x == -500){
            this.x = 0;
        }
    }
}

class Stars extends ComponentOfTheGame {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.x = 0;
        this.y = 0;
        this.width = 3000;
        this.height = 500;
        this.amountOfStars = 3000;
        this.speed = -0.00007;
        this.starCoords = [];
    }
    // Gera 40 coordenadas x,y e armazena dentro do vetor this.starCoords[]
    starGenerator() {
        for(let x=0; x<= this.amountOfStars; x++) {
            // .push(coord_x, coord_y);
            this.starCoords.push([Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.width)]);    
            console.log("teste");
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

let game = {
    canvas: document.querySelector('#game'),
    ctx: document.querySelector("#game").getContext('2d'),
    player: new Player(100, 150, 130, 130, 'Bat/0.png'),
    floor: new Floor(0, 380, 1000, 180, 'ground.png', 5),
    stars: new Stars(),
    render: () => {

        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        // Estrelas
        game.stars.renderStars();

        // Chão
        game.ctx.drawImage(game.floor.sprite, game.floor.x, game.floor.y, game.floor.width, game.floor.height);
        game.floor.animation();
        
        // Jogador
        game.player.frame++;
        // console.log(game.player.frame);
        

        // O número 6 controla a velocidade que os frames são trocados.
        if(game.player.frame % 6 == 0){
            game.player.gifImage++;
            // Troca os frames do gif. Faz com que o morcego fique "voando" na tela.
            // Este método pode causar piscadas.
            game.player.sprite.src="Bat/"+game.player.gifImage+".png";
            if(game.player.gifImage >= 4) {
                game.player.gifImage = 0;
            }
        }

        game.ctx.drawImage(game.player.sprite, game.player.x, game.player.y, game.player.width, game.player.height);

        
        requestAnimationFrame(game.render);
    }

}

game.stars.starGenerator();
game.render();
