// Enemies our player must avoid
/**
 * In this case, the 'this' value is the self object.
 * That's because it is called from an object.
 * Class 3.3
 */
var Enemy = function(x,y) {
    // Enemy Position
    this.x = x;
    this.y = y;
    //console.log('Enemy position: x=' + this.x + ' -> y=' + this.y);

    // Enemy Speed
    this.speed = Math.floor((Math.random() * 200) + 200);
    //console.log('Speed ' + this.speed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 909) {  // 909 is the canvas width. It correspods to 9 columns (or game blocks)
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -10; // This one start the bugs cycle again
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    // Player Position
    this.x = 402;
    this.y = 400;

    // Player Sprite
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    // Left Key 
    if (this.key === 'left' && this.x > 0) { // does not allow the player get out the game border on the left
        this.x = this.x - 101; // 101 because 101 is the square width
        //console.log('Player position: x=' + this.x + ' -> y=' + this.y);
    }

    // Right Key
    if (this.key === 'right' && this.x < 800) { // does not allow the player get out the game border on the right
        this.x = this.x + 101; // 101 because 101 is the square width
        //console.log('Player position: x=' + this.x + ' -> y=' + this.y);
    }

    // Up Key
    if (this.key === 'up' && this.y > 0) { // does not allow the player get out the game border on the top
        this.y = this.y - 83; // 83 because 83 is the square height
    }

    // Down Key
    if (this.key === 'down' && this.y < 400) { // does not allow the player get out the game border on the bottom
        this.y = this.y + 83; // 83 because 83 is the square height
    }

    // Move square by square
    this.key = null; 

    // Reset the game when the Player touch the water
    if (this.y < -10) {
        this.reset();
    }

    /* This is the function to check the collisions.
    * It is based on a 2D collision detection shared with us as reference
    * on slack group. It is available on MDN web docs:
    * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    */
    allEnemies.forEach(function(enemy) {
        if (
            player.x >= enemy.x - 50 &&  // 50 is a value to simulate the enemy touching the player. If we use the entire width (101)
            player.x <= enemy.x + 50 &&  // the player will be reseted before enemy touch the player
            player.y >= enemy.y - 20 &&  // The Y position cannot be 50 because it may affect the rows above and below. 
            player.y <= enemy.y + 20  // So, I choose 20 for this Y checking.
        ){
            player.reset(); // Return player to initial position
        }
    });

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    this.key = e;
};

Player.prototype.reset = function() {
    // Player backs to the initial position
    this.x = 404; // Same of Player position X
    this.y = 400; // Same of Player position Y
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];

/* Fill the [] with the initial enemy positions
* This is an IIFE Function. It means that it is called 
* immediately after defined. Class 2.6
* The value between () is the initial X and Y position for the enemies
*/
(function pushEnemies() {
    allEnemies.push(new Enemy(-50, 50));
    allEnemies.push(new Enemy(-50, 140));
    allEnemies.push(new Enemy(-50, 230));
    allEnemies.push(new Enemy(-50, 310));
}());

// Place the player object in a variable called player
/* This is a Constructor Function. Note that has the word 'new'
* and capital letter for the first name's function letter.
* Class 3.2
*/
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
