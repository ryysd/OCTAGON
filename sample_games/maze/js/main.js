// Generated by CoffeeScript 1.6.3
var MazeGame, MazeScene, MazeWorld, R, Timer, runGame,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

R = Config.R;

MazeWorld = (function(_super) {
  __extends(MazeWorld, _super);

  function MazeWorld() {
    var map,
      _this = this;
    MazeWorld.__super__.constructor.apply(this, arguments);
    map = [[37, 37, 37, 37, 37, 37, 37, 37, 37, 37], [37, 41, 35, 35, 35, 35, 35, 35, 42, 37], [37, 34, 30, 30, 30, 30, 30, 30, 36, 37], [37, 34, 30, 48, 30, 30, 48, 13, 36, 37], [37, 34, 30, 50, 30, 47, 38, 45, 36, 37], [37, 34, 30, 50, 30, 30, 46, 30, 36, 37], [37, 34, 30, 46, 30, 30, 30, 30, 36, 37], [37, 34, 14, 30, 30, 30, 30, 30, 36, 37], [37, 44, 33, 33, 33, 33, 33, 33, 43, 37], [37, 37, 37, 37, 37, 37, 37, 37, 37, 37]];
    this.maze = new GoalMaze({
      x: 0,
      y: 0,
      map: map
    });
    this.addChild(this.maze);
    this.player = this.maze.createPlayer();
    this.maze.setPlayer(this.player);
    this.maze.addEventListener('complete', function() {
      _this.octagram.getInstance(_this.playerProgramId).stop();
      return alert("goal");
    });
  }

  MazeWorld.prototype.reloadNewMap = function() {
    var map,
      _this = this;
    console.log("reload map");
    this.removeChild(this.maze);
    map = [[4, 4, 4, 4, 4, 4, 13, 4], [4, 0, 4, 0, 4, 4, 0, 4], [4, 0, 4, 0, 0, 0, 0, 4], [4, 0, 4, 0, 4, 4, 4, 4], [4, 0, 4, 0, 4, 4, 0, 4], [4, 0, 0, 0, 4, 4, 0, 4], [4, 0, 4, 0, 0, 0, 0, 4], [4, 14, 4, 4, 4, 4, 4, 4]];
    this.maze = new GoalMaze({
      x: 64,
      y: 128,
      map: map
    });
    this.addChild(this.maze);
    this.maze.setPlayer(this.player);
    return this.maze.addEventListener('complete', function() {
      return _this.reloadNewMap();
    });
  };

  MazeWorld.prototype.initInstructions = function(octagram) {
    var enemyProgram, playerProgram,
      _this = this;
    this.octagram = octagram;
    playerProgram = this.octagram.createProgramInstance();
    this.playerProgramId = playerProgram.id;
    playerProgram.addEventListener('onstart', function() {});
    enemyProgram = this.octagram.createProgramInstance();
    this.enemyProgramId = enemyProgram.id;
    playerProgram.addInstruction(new StraightMoveInstruction(this.maze.player));
    playerProgram.addInstruction(new TurnInstruction(this.maze.player));
    playerProgram.addInstruction(new CheckMapInstruction(this.maze.player));
    return this.octagram.showProgram(this.playerProgramId);
  };

  return MazeWorld;

})(Group);

MazeScene = (function(_super) {
  __extends(MazeScene, _super);

  function MazeScene(game) {
    this.game = game;
    this.restart = __bind(this.restart, this);
    MazeScene.__super__.constructor.apply(this, arguments);
    this.world = new MazeWorld;
    this.addChild(this.world);
  }

  MazeScene.prototype.onenterframe = function() {
    return this.update();
  };

  MazeScene.prototype.restart = function() {};

  MazeScene.prototype.update = function() {};

  return MazeScene;

})(Scene);

MazeGame = (function(_super) {
  __extends(MazeGame, _super);

  function MazeGame(width, height, options) {
    this.options = options;
    MazeGame.__super__.constructor.call(this, width, height);
    this._assetPreload();
  }

  MazeGame.prototype._assetPreload = function() {
    var load,
      _this = this;
    load = function(hash) {
      var k, path, _results;
      _results = [];
      for (k in hash) {
        path = hash[k];
        _results.push(_this.preload(path));
      }
      return _results;
    };
    load(R.MAP);
    load(R.CHAR);
    load(R.TIP);
    return load(R.EFFECT);
  };

  MazeGame.prototype.onload = function() {
    var _this = this;
    this.scene = new MazeScene(this);
    this.pushScene(this.scene);
    this.octagram = new Octagram(Config.OCTAGRAM_DIR);
    this.octagram.onload = function() {
      _this.scene.world.initInstructions(_this.octagram);
      if (_this.options && _this.options.onload) {
        _this.options.onload();
      }
      return _this.scene.addEventListener("gameend", function(evt) {
        if (_this.options && _this.options.onend) {
          return _this.options.onend(evt.params);
        }
      });
    };
    this.assets["font0.png"] = this.assets['resources/ui/font0.png'];
    this.assets["apad.png"] = this.assets['resources/ui/apad.png'];
    this.assets["icon0.png"] = this.assets['resources/ui/icon0.png'];
    return this.assets["pad.png"] = this.assets['resources/ui/pad.png'];
  };

  return MazeGame;

})(Core);

runGame = function(options) {
  var game;
  game = new MazeGame(Config.GAME_WIDTH, Config.GAME_HEIGHT, options);
  return game.start();
};

Timer = (function(_super) {
  __extends(Timer, _super);

  function Timer(startFrame, limit) {
    this.startFrame = startFrame != null ? startFrame : 0;
    this.limit = limit != null ? limit : null;
    Timer.__super__.constructor.apply(this, arguments);
  }

  Timer.prototype.getProgress = function(g) {
    var progress;
    progress = parseInt(g.frame / g.fps);
    console.log(progress, g.frame, g.fps);
    return progress;
  };

  Timer.prototype.getTime = function(g) {
    var time;
    return time = this.limit != null ? this.limit - this.getProgress(g) : this.getProgress(g);
  };

  Timer.prototype.onenterframe = function() {
    var time;
    time = this.getTime(Game.instance);
    console.log(this.getTimeLabel(time));
    if (time <= 0) {
      return this.timeUp();
    }
  };

  Timer.prototype.timeUp = function() {};

  Timer.prototype.getTimeLabel = function(time) {
    return "リミット : " + time;
  };

  return Timer;

})(Sprite);
