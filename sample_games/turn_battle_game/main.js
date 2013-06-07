// Generated by CoffeeScript 1.6.2
var R, RobotGame, RobotScene, RobotWorld, TurnSwitcher, ViewGroup, putTestCode,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

putTestCode = function(player) {
  /*
  Game.instance.addInstruction(new MoveInstruction(@player))
  Game.instance.addInstruction(new ShotInstruction(@player))
  Game.instance.addInstruction(new PickupInstruction(@player))
  Game.instance.addInstruction(new HpBranchInstruction(@player))
  Game.instance.addInstruction(new HoldBulletBranchInstruction(@player))
  Game.instance.addInstruction(new SearchDirectRobotBranchInstruction(@player))
  Game.instance.addInstruction(new SearchDirectItemBranchInstruction(@player))
  */

  var currentDirectBranchInstruction, currentDirectLeftBranchInstruction, currentLeftTip, holdBullet1BranchInstruction, holdBulletBranchInstruction, holdTip, left1Tip, left2Tip, leftUpTip, moveInstruction, moveLeftDownInstruction, moveLeftInstruction, moveLeftUpInstruction, moveRightDownInstruction, moveRightInstruction, moveRightUpInstruction, pickupDualInstruction, pickupInstruction, pickupNormalInstruction, pickupNormalTip, pickupWideInstruction, random1Tip, random2Tip, random3Tip, random4Tip, randomBranchInstruction, returnTip1, returnTip2, returnTip3, returnTip4, returnTip5, rightDownTip, rightUpTip, searchDirectLeftRobotBranchInstruction, searchDirectRobotBranchInstruction, searchLeftTip, shotInstruction, shotNormalInstruction, shotNormalTip;

  moveInstruction = new MoveInstruction(player);
  moveRightInstruction = moveInstruction.clone();
  moveRightInstruction._id = 0;
  moveRightUpInstruction = moveInstruction.clone();
  moveRightUpInstruction._id = 1;
  moveRightDownInstruction = moveInstruction.clone();
  moveRightDownInstruction._id = 2;
  moveLeftInstruction = moveInstruction.clone();
  moveLeftInstruction._id = 3;
  moveLeftUpInstruction = moveInstruction.clone();
  moveLeftUpInstruction._id = 4;
  moveLeftDownInstruction = moveInstruction.clone();
  moveLeftDownInstruction._id = 5;
  pickupInstruction = new PickupInstruction(player);
  pickupNormalInstruction = pickupInstruction.clone();
  pickupNormalInstruction._id = 0;
  pickupWideInstruction = pickupInstruction.clone();
  pickupWideInstruction._id = 1;
  pickupDualInstruction = pickupInstruction.clone();
  pickupDualInstruction._id = 2;
  shotInstruction = new ShotInstruction(player);
  shotNormalInstruction = shotInstruction.clone();
  shotNormalInstruction._id = 0;
  searchDirectRobotBranchInstruction = new SearchDirectRobotBranchInstruction(player);
  searchDirectLeftRobotBranchInstruction = searchDirectRobotBranchInstruction.clone();
  searchDirectLeftRobotBranchInstruction._id = 3;
  searchDirectLeftRobotBranchInstruction.lenght = 4;
  currentDirectBranchInstruction = new CurrentDirectBranchInstruction(player);
  currentDirectLeftBranchInstruction = currentDirectBranchInstruction.clone();
  currentDirectLeftBranchInstruction._id = 3;
  holdBulletBranchInstruction = new HoldBulletBranchInstruction(player);
  holdBullet1BranchInstruction = holdBulletBranchInstruction.clone();
  holdBullet1BranchInstruction._id = 0;
  holdBullet1BranchInstruction.bulletSize = 1;
  left1Tip = TipFactory.createInstructionTip(moveLeftInstruction.clone());
  left2Tip = TipFactory.createInstructionTip(moveLeftInstruction.clone());
  leftUpTip = TipFactory.createInstructionTip(moveLeftUpInstruction.clone());
  rightUpTip = TipFactory.createInstructionTip(moveRightUpInstruction.clone());
  rightDownTip = TipFactory.createInstructionTip(moveRightDownInstruction.clone());
  randomBranchInstruction = new RandomBranchInstruction();
  randomBranchInstruction.threthold = 15;
  random1Tip = TipFactory.createInstructionTip(randomBranchInstruction);
  randomBranchInstruction = randomBranchInstruction.clone();
  randomBranchInstruction.threthold = 30;
  random2Tip = TipFactory.createInstructionTip(randomBranchInstruction);
  randomBranchInstruction = randomBranchInstruction.clone();
  randomBranchInstruction.threthold = 75;
  random3Tip = TipFactory.createInstructionTip(randomBranchInstruction);
  randomBranchInstruction = randomBranchInstruction.clone();
  randomBranchInstruction.threthold = 90;
  random4Tip = TipFactory.createInstructionTip(randomBranchInstruction);
  pickupNormalTip = TipFactory.createInstructionTip(pickupNormalInstruction.clone());
  shotNormalTip = TipFactory.createInstructionTip(shotNormalInstruction.clone());
  returnTip1 = TipFactory.createReturnTip(Environment.startX, Environment.startY);
  returnTip2 = TipFactory.createReturnTip(Environment.startX, Environment.startY);
  returnTip3 = TipFactory.createReturnTip(Environment.startX, Environment.startY);
  returnTip4 = TipFactory.createReturnTip(Environment.startX, Environment.startY);
  returnTip5 = TipFactory.createReturnTip(Environment.startX, Environment.startY);
  searchLeftTip = TipFactory.createInstructionTip(searchDirectLeftRobotBranchInstruction.clone());
  currentLeftTip = TipFactory.createInstructionTip(currentDirectLeftBranchInstruction.clone());
  holdTip = TipFactory.createInstructionTip(holdBullet1BranchInstruction.clone());
  Game.instance.vpl.cpu.putBranchTip(4, 0, Direction.leftDown, Direction.rightDown, searchLeftTip);
  Game.instance.vpl.cpu.putBranchTip(3, 1, Direction.leftDown, Direction.rightDown, currentLeftTip);
  Game.instance.vpl.cpu.putBranchTip(2, 2, Direction.leftDown, Direction.rightDown, holdTip);
  Game.instance.vpl.cpu.putTip(4, 2, Direction.down, left1Tip);
  Game.instance.vpl.cpu.putTip(3, 3, Direction.right, pickupNormalTip);
  Game.instance.vpl.cpu.putSingleTip(4, 3, returnTip4);
  Game.instance.vpl.cpu.putTip(1, 3, Direction.down, shotNormalTip);
  Game.instance.vpl.cpu.putSingleTip(1, 4, returnTip5);
  Game.instance.vpl.cpu.putBranchTip(5, 1, Direction.right, Direction.down, random1Tip);
  Game.instance.vpl.cpu.putBranchTip(5, 2, Direction.right, Direction.down, random2Tip);
  Game.instance.vpl.cpu.putBranchTip(5, 3, Direction.right, Direction.down, random3Tip);
  Game.instance.vpl.cpu.putBranchTip(5, 4, Direction.right, Direction.down, random4Tip);
  Game.instance.vpl.cpu.putTip(6, 1, Direction.rightDown, left2Tip);
  Game.instance.vpl.cpu.putSingleTip(7, 2, returnTip1);
  Game.instance.vpl.cpu.putTip(6, 2, Direction.right, leftUpTip);
  Game.instance.vpl.cpu.putTip(6, 3, Direction.rightUp, rightUpTip);
  Game.instance.vpl.cpu.putTip(6, 4, Direction.right, rightDownTip);
  Game.instance.vpl.cpu.putSingleTip(7, 4, returnTip2);
  return Game.instance.vpl.cpu.putSingleTip(5, 5, returnTip3);
};

ViewGroup = (function(_super) {
  __extends(ViewGroup, _super);

  function ViewGroup(x, y, scene) {
    this.scene = scene;
    ViewGroup.__super__.constructor.apply(this, arguments);
    this.x = x;
    this.y = y;
    this.background = new Background(0, 0);
    this.addChild(this.background);
    this.header = new Header(16, 16);
    this.playerHpBar = this.header.playerHpBar;
    this.enemyHpBar = this.header.enemyHpBar;
    this.addChild(this.header);
    this.map = new Map(16, 48);
    this.addChild(this.map);
    this.footer = new Footer(25, this.map.y + this.map.height);
    this.msgbox = this.footer.msgbox;
    this.addChild(this.footer);
  }

  ViewGroup.prototype.update = function(world) {
    var i, _i, _len, _ref;

    _ref = world.robots;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      i.onViewUpdate(this);
    }
    return this.map.update();
  };

  return ViewGroup;

})(Group);

TurnSwitcher = (function() {
  function TurnSwitcher(world) {
    this.world = world;
    this.i = 0;
  }

  TurnSwitcher.prototype.update = function() {
    var animated, bullet, i, _i, _j, _len, _len1, _ref, _ref1;

    animated = bullet = false;
    _ref = this.world.bullets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      bullet = i.animated;
      if (bullet === true) {
        break;
      }
    }
    _ref1 = this.world.robots;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      i = _ref1[_j];
      animated = i.isAnimated();
      if (animated === true) {
        break;
      }
    }
    if (bullet === false && animated === false) {
      if (this.world.robots[this.i].update()) {
        this.i++;
        if (this.i === this.world.robots.length) {
          return this.i = 0;
        }
      }
    }
  };

  return TurnSwitcher;

})();

RobotWorld = (function(_super) {
  __extends(RobotWorld, _super);

  function RobotWorld(x, y, scene) {
    var plate;

    this.scene = scene;
    RobotWorld.__super__.constructor.apply(this, arguments);
    this.game = Game.instance;
    this.map = Map.instance;
    this.robots = [];
    this.bullets = [];
    this.items = [];
    this.player = new PlayerRobot(this);
    this.addChild(this.player);
    this.robots.push(this.player);
    plate = this.map.getPlate(6, 4);
    this.player.moveToPlate(plate);
    this.enemy = new EnemyRobot(this);
    this.addChild(this.enemy);
    this.robots.push(this.enemy);
    plate = this.map.getPlate(1, 1);
    this.enemy.moveToPlate(plate);
    Game.instance.addInstruction(new MoveInstruction(this.player));
    Game.instance.addInstruction(new ShotInstruction(this.player));
    Game.instance.addInstruction(new PickupInstruction(this.player));
    Game.instance.addInstruction(new HpBranchInstruction(this.player));
    Game.instance.addInstruction(new HoldBulletBranchInstruction(this.player));
    Game.instance.addInstruction(new SearchDirectRobotBranchInstruction(this.player));
    Game.instance.addInstruction(new SearchDirectItemBranchInstruction(this.player));
    Game.instance.addInstruction(new CurrentDirectBranchInstruction(this.player));
  }

  RobotWorld.prototype.initialize = function(views) {};

  RobotWorld.prototype.collisionBullet = function(bullet, robot) {
    return bullet.holder !== robot && bullet.within(robot, 32);
  };

  RobotWorld.prototype.updateItems = function() {
    var del, i, v, _i, _len, _ref;

    del = -1;
    _ref = this.items;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      v = _ref[i];
      if (v.animated === false) {
        del = i;
        this.items[i] = false;
      }
    }
    if (del !== -1) {
      return this.items = _.compact(this.items);
    }
  };

  RobotWorld.prototype.updateBullets = function() {
    var del, i, robot, v, _i, _j, _len, _len1, _ref, _ref1;

    del = -1;
    _ref = this.robots;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      robot = _ref[_i];
      _ref1 = this.bullets;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        v = _ref1[i];
        if (v !== false) {
          if (this.collisionBullet(v, robot)) {
            del = i;
            v.hit(robot);
            this.bullets[i] = false;
          } else if (v.animated === false) {
            del = i;
            this.bullets[i] = false;
          }
        }
      }
    }
    if (del !== -1) {
      return this.bullets = _.compact(this.bullets);
    }
  };

  RobotWorld.prototype._isAnimated = function(array, func) {
    var animated, i, _i, _len;

    animated = false;
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      i = array[_i];
      animated = func(i);
      if (animated === true) {
        break;
      }
    }
    return animated;
  };

  RobotWorld.prototype.updateRobots = function() {
    var animated, i, _i, _j, _len, _len1, _ref, _ref1, _results;

    animated = false;
    _ref = [this.bullets, this.robots, this.items];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      animated = this._isAnimated(i, function(x) {
        return x.animated;
      });
      if (animated === true) {
        break;
      }
    }
    if (animated === false) {
      _ref1 = this.robots;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        i = _ref1[_j];
        _results.push(i.update());
      }
      return _results;
    }
  };

  RobotWorld.prototype.update = function(views) {
    this.updateItems();
    this.updateRobots();
    return this.updateBullets();
  };

  return RobotWorld;

})(Group);

RobotScene = (function(_super) {
  __extends(RobotScene, _super);

  function RobotScene(game) {
    this.game = game;
    RobotScene.__super__.constructor.call(this, this);
    this.views = new ViewGroup(Config.GAME_OFFSET_X, Config.GAME_OFFSET_Y, this);
    this.world = new RobotWorld(Config.GAME_OFFSET_X, Config.GAME_OFFSET_Y, this);
    this.addChild(this.views);
    this.addChild(this.world);
    this.world.initialize(this.views);
  }

  RobotScene.prototype.onenterframe = function() {
    return this.update();
  };

  RobotScene.prototype.update = function() {
    this.world.update(this.views);
    return this.views.update(this.world);
  };

  return RobotScene;

})(Scene);

RobotGame = (function(_super) {
  __extends(RobotGame, _super);

  function RobotGame(width, height) {
    RobotGame.__super__.constructor.call(this, width, height, "./tip_based_vpl/resource/");
    this._assetPreload();
    this.keybind(87, 'w');
    this.keybind(65, 'a');
    this.keybind(88, 'x');
    this.keybind(68, 'd');
    this.keybind(83, 's');
    this.keybind(81, 'q');
    this.keybind(69, 'e');
    this.keybind(67, 'c');
    this.keybind(76, 'l');
    this.keybind(77, 'm');
    this.keybind(74, 'j');
    this.keybind(73, 'i');
    this.keybind(75, 'k');
  }

  RobotGame.prototype._assetPreload = function() {
    var load,
      _this = this;

    load = function(hash) {
      var k, path, _results;

      _results = [];
      for (k in hash) {
        path = hash[k];
        Debug.log("load image " + path);
        _results.push(_this.preload(path));
      }
      return _results;
    };
    load(R.CHAR);
    load(R.BACKGROUND_IMAGE);
    load(R.UI);
    load(R.EFFECT);
    load(R.BULLET);
    load(R.ITEM);
    return load(R.TIP);
  };

  RobotGame.prototype.onload = function() {
    this.scene = new RobotScene(this);
    this.pushScene(this.scene);
    RobotGame.__super__.onload.apply(this, arguments);
    this.assets["font0.png"] = this.assets['resources/ui/font0.png'];
    this.assets["apad.png"] = this.assets['resources/ui/apad.png'];
    this.assets["icon0.png"] = this.assets['resources/ui/icon0.png'];
    this.assets["pad.png"] = this.assets['resources/ui/pad.png'];
    Game.instance.loadInstruction();
    return putTestCode(Game.instance.scene.world.player);
  };

  return RobotGame;

})(TipBasedVPL);

window.onload = function() {
  var game;

  game = new RobotGame(Config.GAME_WIDTH, Config.GAME_HEIGHT);
  return game.start();
};
