// Generated by CoffeeScript 1.6.3
var Background, DefeatMaze, GoalMaze, Maze,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Maze = (function(_super) {
  __extends(Maze, _super);

  function Maze(data) {
    Maze.__super__.constructor.apply(this, arguments);
    this.x = data.x != null ? data.x : 0;
    this.y = data.y != null ? data.y : 0;
    if (data.map == null) {
      data.map = map;
    }
    this.background = new Background;
    this.addChild(this.background);
    this.mazeMap = new MazeMap(data.map);
    this.addChild(this.mazeMap);
  }

  Maze.prototype.createPlayer = function() {
    return new RobotPlayer(this.mazeMap);
  };

  Maze.prototype.setPlayer = function(player) {
    this.player = player;
    this.player.initPosition(this.mazeMap, this.mazeMap.startTile);
    return this.addChild(this.player);
  };

  return Maze;

})(Group);

GoalMaze = (function(_super) {
  __extends(GoalMaze, _super);

  function GoalMaze(data) {
    GoalMaze.__super__.constructor.call(this, data);
  }

  GoalMaze.prototype.setPlayer = function(player) {
    var _this = this;
    GoalMaze.__super__.setPlayer.call(this, player);
    return this.player.addEventListener('goal', function(evt) {
      _this.dispatchEvent(new MazeEvent("complete"));
      return console.log("goal");
    });
  };

  return GoalMaze;

})(Maze);

DefeatMaze = (function(_super) {
  __extends(DefeatMaze, _super);

  function DefeatMaze(data) {
    DefeatMaze.__super__.constructor.call(this, data);
  }

  DefeatMaze.prototype.setPlayer = function(player) {
    var _this = this;
    DefeatMaze.__super__.setPlayer.call(this, player);
    this.count = 0;
    return this.player.addEventListener('kill', function(evt) {
      _this.count += 1;
      if (data.count <= _this.count) {
        _this.dispatchEvent(new MazeEvent("complete"));
        return console.log("all defeat");
      }
    });
  };

  return DefeatMaze;

})(Maze);

Background = (function(_super) {
  var BackgroundColor, BackgroundEffect, BackgroundTransparent;

  __extends(Background, _super);

  BackgroundColor = (function(_super1) {
    __extends(BackgroundColor, _super1);

    BackgroundColor.WIDTH = 640;

    BackgroundColor.HEIGHT = 640;

    function BackgroundColor() {
      BackgroundColor.__super__.constructor.call(this, BackgroundColor.WIDTH, BackgroundColor.HEIGHT);
      this.image = Game.instance.assets[R.MAP.BACKGROUND1];
    }

    return BackgroundColor;

  })(Sprite);

  BackgroundTransparent = (function(_super1) {
    __extends(BackgroundTransparent, _super1);

    BackgroundTransparent.WIDTH = 640;

    BackgroundTransparent.HEIGHT = 640;

    function BackgroundTransparent() {
      BackgroundTransparent.__super__.constructor.call(this, BackgroundTransparent.WIDTH, BackgroundTransparent.HEIGHT);
      this.image = Game.instance.assets[R.MAP.BACKGROUND_TRANSPARENT];
    }

    return BackgroundTransparent;

  })(Sprite);

  BackgroundEffect = (function(_super1) {
    __extends(BackgroundEffect, _super1);

    BackgroundEffect.WIDTH = 1280;

    BackgroundEffect.HEIGHT = 640;

    function BackgroundEffect() {
      BackgroundEffect.__super__.constructor.call(this, BackgroundEffect.WIDTH, BackgroundEffect.HEIGHT);
      this.image = Game.instance.assets[R.MAP.BACKGROUND_EFFECT];
      this.reset();
    }

    BackgroundEffect.prototype.reset = function() {
      return this.x = BackgroundEffect.WIDTH;
    };

    BackgroundEffect.prototype.onenterframe = function() {
      this.x -= 20;
      if (this.age % 120 === 0) {
        return this.reset();
      }
    };

    return BackgroundEffect;

  })(Sprite);

  function Background(data) {
    var backgroundColor, backgroundTransparent;
    if (data == null) {
      data = {};
    }
    Background.__super__.constructor.apply(this, arguments);
    this.x = data.x != null ? data.x : 0;
    this.y = data.y != null ? data.y : 0;
    backgroundColor = new BackgroundColor;
    backgroundTransparent = new BackgroundTransparent;
    this.addChild(backgroundColor);
    this.addChild(backgroundTransparent);
    this.addChild(new BackgroundEffect());
  }

  return Background;

}).call(this, Group);
