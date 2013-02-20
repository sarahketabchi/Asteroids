var AG = (function () {
  var Asteroid = function (x, y, size, vel) {
    this.position = [x, y];
    this.size = size;
    this.vel = vel;

    this.draw = function(ctx) {
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (this.position[0], this.position[1], this.size, this.size);
    };

    this.update = function() {
      this.position[0] = this.position[0] + vel[0];
      if ((this.position[0] < 0) || (this.position[0] > 500)) {
        vel[0] = vel[0] * -1;
      };
      this.position[1] = this.position[1] + vel[1];
      if ((this.position[1] < 0) || (this.position[1] > 500)) {
        vel[1] = vel[1] * -1;
      };
    };
  }

  Asteroid.randomAsteroid = function() {
    randX = Math.floor(Math.random() * 500);
    randY = Math.floor(Math.random() * 500);
    randSize = Math.floor(Math.random() * 20) + 20;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    velX = plusOrMinus * (Math.floor(Math.random() * 5) + 1);
    velY = plusOrMinus * (Math.floor(Math.random() * 5) + 1);
    return asteroid = new Asteroid(randX, randY, randSize, [velX, velY]);
  }

  var Game = function(ctx) {
    var that = this;

    this.asteroids = [];
    for(i = 0; i < 10; i ++) {
      this.asteroids.push(Asteroid.randomAsteroid());
    }

    this.draw = function() {
      ctx.clearRect(0,0,500,500);
      _.each(this.asteroids, function(asteroid) {
        asteroid.draw(ctx);
      });
    }

    this.update = function() {
      _.each(this.asteroids, function(asteroid) {
        asteroid.update();
      });
    }

    this.updateDraw = function() {
      that.draw();
      that.update();
    }

    this.start = function(){
      setInterval(this.updateDraw, 20);
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