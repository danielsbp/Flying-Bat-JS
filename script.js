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

class Player extends ComponentOfTheGame {
    constructor(x, y, width, height, spritesrc) {
        super(x,y,width,height,spritesrc);
        this.frame = 0;
        this.gifImage = 0;

        
    }
} 

class Floor extends ComponentOfTheGame {
    constructor(x, y, width, height, spritesrc, speed) {
        super(x,y,width,height,spritesrc);
        this.speed = speed
    }
    animation() {
        this.x-=this.speed;
        if(this.x == -500){
            this.x = 0;
        }
    }
}

let game = {
    canvas: document.querySelector('#game'),
    ctx: document.querySelector("#game").getContext('2d'),
    player: new Player(100, 150, 130, 130, 'Bat/0.png'),
    floor: new Floor(0, 380, 1000, 180, 'ground.png', 5),
    render: () => {
        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.ctx.drawImage(game.floor.sprite, game.floor.x, game.floor.y, game.floor.width, game.floor.height);

        game.floor.animation();
        
        game.player.frame++;
        console.log(game.player.frame);
 
        if(game.player.frame % 6 == 0){
            game.player.gifImage++;
            game.player.sprite.src="Bat/"+game.player.gifImage+".png";
            if(game.player.gifImage >= 4) {
                game.player.gifImage = 0;
            }
        }
        
        game.ctx.drawImage(game.player.sprite, game.player.x, game.player.y, game.player.width, game.player.height);
        requestAnimationFrame(game.render);
    }

}

game.render();
