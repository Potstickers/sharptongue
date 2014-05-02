'use strict';

var display, context, size, speed, answer, interval, quiz, progress;


var tiles = create_array(7, 7, null);

function create_array(w, h, val) {
  var x = new Array(w);
  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(h);
    for(var j = 0; j < x[i].length; j++) {
      x[i][j] = val;
    }
  }
  return x;
}

function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

var keys = [];

function Frog() {
  this.color = '#00FF00';
}
function Vehicle() {
  this.speed = speed.min + Math.ceil(Math.random()*(speed.max-speed.min));
  this.nextMove = this.speed;
  this.color = (this.speed - speed.min) / (speed.max-speed.min);
  if(this.color < 1/3) {
    this.color = '#FF0000';
  } else if(this.color < 2/3) {
    this.color = '#FFA500';
  } else {
    this.color = '#FFFF00';
  }
}
function Food(args) {
  this.color = '#0000FF';
  this.eat = function() {
    return answer === this;
  };
  this.img = new Image();
  this.img.src = args.img;
  this.translation = args.translation;
}


function find(constructor) {
  var r = [];
  for(var i = 0; i < tiles.length; i++) {
    for(var j = 0; j < tiles[i].length; j++) {
      if(tiles[i][j] !== null && tiles[i][j].constructor===constructor) {
        r.push([i,j]);
      }
    }
  }
  return r;
}

function nextFood() {
  var foods = find(Food);
  if(foods.length > 0){
    var idx = Math.floor(Math.random()*foods.length);
    answer = new Food(foods[idx]);
    return true;    
  }
  return false;
  
}

function clamp(val, min, max) {
  if(val < min) return min;
  if(val > max) return max;
  return val;
}

function move(key, x, y) {
  if(keys[key] && keys[key].pressed && !keys[key].handled) {
    keys[key].handled = true;
    var index = find(Frog), frog = tiles[index[0][0]][index[0][1]];
    var i = clamp(index[0][0]+x, 0, tiles.length - 1);
    var j = clamp(index[0][1]+y, 0, tiles[i].length - 1);
    if(tiles[i][j] !== null && tiles[i][j].constructor === Food) {
      if(tiles[i][j].eat()) {
        if(progress < quiz.length) {
          //var f = Math.floor(Math.random()*quiz.length);
          var food = quiz[progress];
          //quiz.splice(f,1);
          progress++;
          tiles[i][j]=new Food(food);
          nextFood();
          //var a = Math.floor(3*Math.random());
          //answer = tiles[1+2*a][0];
        } else {
          tiles[i][j]=null;
          //answer = find(Food);
          if(nextFood()) {
            answer = tiles[answer[0]][answer[1]];
          } else {
            startGame();
            //alert('game over');
          }
        }
      }
      tiles[index[0][0]][index[0][1]] = null;
      tiles[i][6] = frog;
      return;
    }
    if(tiles[i][j] !== null && tiles[i][j].constructor === Vehicle) {
      tiles[index[0][0]][index[0][1]] = null;
      tiles[index[0][0]][6] = frog;
      return;
    }
    tiles[index[0][0]][index[0][1]] = null;
    tiles[i][j] = frog;
  }
}

function generateVehicles() {
  for(var j = 1; j < tiles[0].length-1; j++) {
    if(j ===3) continue;
    var cars = [];
    for(var i = 0; i < tiles.length; i++) {
      if(tiles[i][j] !== null && tiles[i][j].constructor === Vehicle) {
        cars.push((tiles[i][j].speed-speed.min)/(7-i));
      }
    }
    if(cars.length === 0) {
      if(Math.random() < 0.05) {
        tiles[6][j] = new Vehicle();
      }
    } else {
      var sum = 0;
      for(var k = 0; k < cars.length; k++) {
        sum += cars[k];
      }
      if(Math.random()*sum*cars.length < 0.01) {
        tiles[6][j] = new Vehicle();
      }
    }
  }
}

function startGame() {
display = document.getElementById('display');
context = display.getContext('2d');
size = {w:65, h:65};
speed = {min:20, max:35};
answer = null;
//interval = null;
quiz.sort(function() {
    return 0.5-Math.random();
  });
  tiles[3][6] = new Frog();
  tiles[1][0] = new Food(quiz[0]);
  tiles[3][0] = new Food(quiz[1]);
  tiles[5][0] = new Food(quiz[2]);
  
  progress = 3;
  nextFood();
  //quiz.splice(0,3);
  //answer = tiles[1][0];
  clearInterval(interval);
  interval = setInterval(function() {
    move(65, -1, 0);
    move(87, 0, -1);
    move(68, 1, 0);
    move(83, 0, 1);
    generateVehicles();
    for(var i = 0; i < tiles.length; i++) {
      for(var j = 0; j < tiles[i].length; j++) {
        if(tiles[i][j] === null) {
          if(j === 0 || j === tiles[i].length - 1) {
            context.fillStyle="#00E7E7";
          } else {
            context.fillStyle="#000000";
          }
          context.fillRect(i*size.w+1*i,j*size.h+1*j,size.w,size.h);
        } else {
          context.fillStyle=tiles[i][j].color;
          if(tiles[i][j].constructor === Vehicle) {
            tiles[i][j].nextMove--;
            if(tiles[i][j].nextMove <= 0) {
              var vehicle = tiles[i][j];
              tiles[i][j] = null;
              vehicle.nextMove = vehicle.speed;
              if(i-1 >= 0) {
                if(tiles[i-1][j] !== null && tiles[i-1][j].constructor === Frog) {
                  var frog = tiles[i-1][j];
                  tiles[i-1][j] = null;
                  tiles[i-1][6] = frog;
                }
                tiles[i-1][j] = vehicle;
              }
            }
            context.fillRect(i*size.w+1*i,j*size.h+1*j,size.w,size.h);
          } else if(tiles[i][j].constructor === Food) {
            context.drawImage(tiles[i][j].img, i*size.w+1*i,j*size.h+1*j,size.w,size.h);
          } else {
            context.fillRect(i*size.w+1*i,j*size.h+1*j,size.w,size.h);
          }
        }
      }
    }
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle="#FFFFFF";
    context.fillText(answer.translation, display.width/2, display.height/2);
  }, 1000/60);
}

angular.module('sharptung.lessons').directive('frogger', function(){
  //reference: http://jsfiddle.net/eeuSv/
  //reference: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
  console.log('in frogger directive');
  return {
    link: function(scope, elem, attrs) {
      scope.$watch('fc', function(frog) {
        if(frog) {
          scope.handleUp = function(e) {
            if(97 <= e.which && e.which <= 122) e.which -= 32;
            keys[e.which] = { pressed: false, handled: true };
          };
          scope.handleDown = function(e) {
            if(!keys[e.which] || !keys[e.which].pressed)
              keys[e.which] = { pressed: true, handled: false };
          }
          var populateLangOpts = document.querySelector('[populate-lang-opts]');
          angular.element(document.querySelector('canvas#display')).focus();
          //init
          var populateLangOptsChange = function(){
            scope.fc.initFlashcards(angular.element(populateLangOpts).val(), function(lesson) {
              quiz = lesson.entries;
              startGame();
            });
          };
          angular.element(populateLangOpts).change(populateLangOptsChange);
          populateLangOptsChange();
        }
      });
    }
  };
});