var AG = (function () {
  var FPS = (1000/60);

  var Asteroid = function (x, y, size, vel) {
    this.position = [x, y];
    this.size = size;
    this.vel = vel;

    this.draw = function(ctx) {
      randColor1 = 0;//Math.floor(Math.random() * 255);
      randColor2 = 0;//Math.floor(Math.random() * 255);
      randColor3 = 0;//Math.floor(Math.random() * 255);
      ctx.beginPath();
      ctx.arc(this.position[0], this.position[1],(this.size)/2 ,0,Math.PI*2,true);
      ctx.fillStyle = "rgba(" + randColor1 + "," + randColor2 + "," + randColor3 + " ,0.5)";
      ctx.fill();
    };

    this.update = function() {
      this.position[0] = this.position[0] + vel[0];
      this.position[1] = this.position[1] + vel[1];

      if (this.position[0] < 0) {
        this.position[0] = 500;
      } else if (this.position[0] > 500) {
        this.position[0] = 0;
      }

      if (this.position[1] < 0) {
        this.position[1] = 500;
      } else if (this.position[1] > 500) {
        this.position[1] = 0;
      }
    };

    this.asteroidReduce() {

    }

  }


  Asteroid.randomAsteroid = function() {
    randSize = Math.floor(Math.random() * 50) + 50;
    randX = Math.floor(Math.random() * (500));
    randY = Math.floor(Math.random() * (500));
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    velX = plusOrMinus * ((Math.random() * 2));
    velY = plusOrMinus * ((Math.random() * 2));
    return asteroid = new Asteroid(randX, randY, randSize, [velX, velY]);
  }

  var Ship = function(game) {
    this.position = [250, 250];
    this.size = 20;
    var that = this;
    var vel = [0, 0];

    this.draw = function(ctx) {
      ctx.beginPath();
      ctx.arc(this.position[0], this.position[1],(this.size)/2 ,0,Math.PI*2,true);
      ctx.fillStyle = "rgb(0,200,0)";
      ctx.fill();
    };

    this.update = function() {
      this.position[0] = this.position[0] + vel[0];
      this.position[1] = this.position[1] + vel[1];

      if (this.position[0] < 0) {
        this.position[0] = 500;
      } else if (this.position[0] > 500) {
        this.position[0] = 0;
      }

      if (this.position[1] < 0) {
        this.position[1] = 500;
      } else if (this.position[1] > 500) {
        this.position[1] = 0;
      }
    };

    this.power = function(dx, dy, game) {
      vel[0] = vel[0] + dx;
      vel[1] = vel[1] + dy;
    };

    this.fireBullet = function() {
      var speed = Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2))
      var direction =[vel[0]/speed, vel[1]/speed]
      var pos = this.position;
      var bullet = new Bullet(pos, direction, game);
    }

    this.isHit = function() {
      var trueToggle = false;
      _.each(game.asteroids, function(asteroid) {
        var distance =  Math.sqrt(Math.pow((that.position[0] - asteroid.position[0]), 2) +
                        Math.pow((that.position[1] - asteroid.position[1]), 2))
        if (distance < ((asteroid.size)/2) + (that.size)/2) {
          trueToggle = true;
        }
      });
      return trueToggle;
    }
  }

  var Bullet = function(pos, dir, game) {
    this.direction = dir;
    this.position = [pos[0], pos[1]];
    this.speed = 20;
    this.size = 6
    this.vel = [(dir[0] * this.speed), (dir[1] * this.speed)];
    var that = this;
    game.bullets.push(this);

    this.draw = function(ctx) {
      ctx.beginPath();
      ctx.arc(this.position[0], this.position[1],this.size/2 ,0,Math.PI*2,true);
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fill();
    };

    this.update = function() {
      this.position[0] = this.position[0] + this.vel[0];
      this.position[1] = this.position[1] + this.vel[1];
      var bulletThis = this;

       this.checkHitAsteroid();


    }

    this.checkHitAsteroid = function () {
      _.each(game.asteroids, function(asteroid) {

        var distance =  Math.sqrt(Math.pow((that.position[0] - asteroid.position[0]), 2) +
                        Math.pow((that.position[1] - asteroid.position[1]), 2))
        if (distance < ((asteroid.size)/2) + (that.size)/2) {
          console.log("BOOM");
          game.asteroids = _.without(game.asteroids, asteroid);
          game.bullets = _.without(game.bullets, that);
        }
      });
    };
  }

  var Game = function(ctx) {
    var intervalID = undefined;
    var that = this;
    var ship = new Ship(that);
    this.bullets = [];

    this.asteroids = [];
    for(i = 0; i < 5; i ++) {
      this.asteroids.push(Asteroid.randomAsteroid());
    };

    key('up', function(){ ship.power(0, -0.5) });
    key('down', function(){ ship.power(0, 0.5) });
    key('left', function(){ ship.power(-0.5, 0) });
    key('right', function(){ ship.power(0.5, 0) });
    key('space', function(){ ship.fireBullet() });

    this.draw = function() {
      ctx.clearRect(0,0,500,500);
      _.each(this.asteroids, function(asteroid) {
        asteroid.draw(ctx);
      });
      ship.draw(ctx);
      _.each(this.bullets, function(bullet) {
        bullet.draw(ctx);
      });
    }

    this.update = function() {
      _.each(this.asteroids, function(asteroid) {
        asteroid.update();
      });
      ship.update();

      _.each(this.bullets, function(bullet) {
        bullet.update();
      });
    }

    this.updateDraw = function() {

      that.update();
      that.draw();

      // if (ship.isHit()) {
      //   alert("You're dead!");
      //   clearInterval(intervalID);
      // };
    }

    this.start = function(){
      intervalID = setInterval(this.updateDraw, FPS);
    }
  }

  return {
    Asteroid: Asteroid,
    Game: Game
  }
})();




$(function(){
  var canvas = $('canvas');
  var ctx = canvas.get(0).getContext("2d");

  game = new AG.Game(ctx);
  console.log(game.asteroids);
  game.start();
});