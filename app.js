var AG = (function () {
  var FPS = (1000/32);

  var Asteroid = function (x, y, size, vel) {
    this.position = [x, y];
    this.size = size;
    this.vel = vel;

    this.draw = function(ctx) {

      ctx.beginPath();
      ctx.arc(this.position[0], this.position[1],(this.size)/2 ,0,Math.PI*2,true);
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fill();
    };

    this.update = function() {
      this.position[0] = this.position[0] + vel[0];
      if ((this.position[0] < (0 + this.size/2)) || (this.position[0] > (500 - this.size/2))) {
        vel[0] = vel[0] * -1;
      };
      this.position[1] = this.position[1] + vel[1];
      if ((this.position[1] < (0 + this.size/2)) || (this.position[1] > (500 - this.size/2))) {
        vel[1] = vel[1] * -1;
      };
    };
  }

  Asteroid.randomAsteroid = function() {
    randSize = Math.floor(Math.random() * 20) + 20;
    randX = Math.floor(Math.random() * (500 - randSize));
    randY = Math.floor(Math.random() * (500 - randSize));
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    velX = plusOrMinus * (Math.floor(Math.random() * 2) + 1);
    velY = plusOrMinus * (Math.floor(Math.random() * 2) + 1);
    return asteroid = new Asteroid(randX, randY, randSize, [velX, velY]);
  }

  var Ship = function(game) {
    this.position = [250, 250];
    this.size = 20;
    var that = this;

    this.draw = function(ctx) {
      ctx.fillStyle = "rgb(0,200,0)";
      ctx.fillRect (this.position[0], this.position[1], this.size, this.size);
    };

    this.isHit = function() {
      _.each(game.asteroids, function(asteroid) {
        var distance =  Math.sqrt(Math.pow((that.position[0] - asteroid.position[0]), 2) +
                        Math.pow((that.position[1] - asteroid.position[1]), 2))
        if (distance < 20) {
          console.log('YOU ARE DEAD');
        }
      });
    }
  }

  var Game = function(ctx) {
    var that = this;
    var ship = new Ship(that);

    this.asteroids = [];
    for(i = 0; i < 5; i ++) {
      this.asteroids.push(Asteroid.randomAsteroid());
    };

    this.draw = function() {
      ctx.clearRect(0,0,500,500);
      _.each(this.asteroids, function(asteroid) {
        asteroid.draw(ctx);
      });
      ship.draw(ctx);
    }

    this.update = function() {
      _.each(this.asteroids, function(asteroid) {
        asteroid.update();
      });
      ship.isHit();
      // ship.update();
    }

    this.updateDraw = function() {
      that.draw();
      that.update();
    }

    this.start = function(){
      setInterval(this.updateDraw, FPS);
    }
  }




  return {
    Asteroid: Asteroid,
    Game: Game
  }
})();



// function draw(ctx) {

//   ctx.fillStyle = "rgb(200,0,0)";
//   ctx.fillRect (13, 10, 100, 50);
//   ctx.save();
//   ctx.translate(10,15);
// }

$(function(){
  var canvas = $('canvas');
  var ctx = canvas.get(0).getContext("2d");

  game = new AG.Game(ctx);
  game.start();



});