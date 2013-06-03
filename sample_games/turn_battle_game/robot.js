// Generated by CoffeeScript 1.6.2
var EnemyRobot, ItemQueue, PlayerRobot, R, Robot, SpritePool,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

ItemQueue = (function() {
  function ItemQueue(collection, max) {
    this.collection = collection != null ? collection : [];
    this.max = max != null ? max : -1;
  }

  ItemQueue.prototype.enqueue = function(item) {
    if (this.max !== -1 && this.max <= this.collection.length) {
      return false;
    } else {
      this.collection.push(item);
      return true;
    }
  };

  ItemQueue.prototype.dequeue = function(count) {
    var i, ret, _i;

    if (count == null) {
      count = 1;
    }
    ret = [];
    for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
      ret.push(this.collection.shift());
    }
    return ret;
  };

  ItemQueue.prototype.empty = function() {
    return this.collection.length === 0;
  };

  ItemQueue.prototype.size = function() {
    return this.collection.length;
  };

  return ItemQueue;

})();

Robot = (function(_super) {
  var bit;

  __extends(Robot, _super);

  Robot.MAX_HP = 4;

  bit = 1;

  Robot.LEFT = bit << 0;

  Robot.RIGHT = bit << 1;

  Robot.UP = bit << 2;

  Robot.DOWN = bit << 3;

  function Robot(width, height) {
    this.onAnimateComplete = __bind(this.onAnimateComplete, this);    Robot.__super__.constructor.call(this, width, height);
    this.name = "robot";
    this.game = Game.instance;
    this.iter = null;
    this.prevX = -1;
    this.prevY = -1;
    this.animated = false;
    this.hp = Robot.MAX_HP;
    this.cmdQueue = new CommandQueue;
    this.bltQueue = new ItemQueue([], 5);
    this.map = Map.instance;
  }

  Robot.prototype.onViewUpdate = function(views) {};

  Robot.prototype.onHpReduce = function(views) {};

  Robot.prototype.onKeyInput = function(input) {};

  Robot.prototype.createBullet = function() {};

  Robot.prototype.onAnimateComplete = function() {
    return this.animated = false;
  };

  Robot.prototype.onCmdComplete = function(id, ret) {
    var msgbox;

    msgbox = this.game.scene.views.msgbox;
    switch (id) {
      case Instruction.MOVE_UP:
      case Instruction.MOVE_DOWN:
      case Instruction.MOVE_LEFT:
      case Instruction.MOVE_RIGHT:
        if (ret !== false) {
          msgbox.print(R.String.move(this.name, ret.x + 1, ret.y + 1));
          return this.animated = true;
        } else {
          return msgbox.print(R.String.CANNOTMOVE);
        }
        break;
      case Instruction.SHOT:
        if (ret !== false) {
          return msgbox.print(R.String.shot(this.name));
        } else {
          return msgbox.print(R.String.CANNOTSHOT);
        }
        break;
      case Instruction.PICKUP:
        if (ret !== false) {
          return msgbox.print(R.String.pickup(this.name));
        } else {
          return msgbox.print(R.String.CANNOTPICKUP);
        }
    }
  };

  Robot.prototype.setCmdCollection = function(cmdCollection) {
    this.cmdCollection = cmdCollection;
  };

  Robot.prototype.isAnimated = function() {
    return this.tl.queue.length !== 0;
  };

  Robot.prototype.getDirect = function() {
    switch (this.frame) {
      case 0:
        return Robot.RIGHT;
      case 1:
        return Robot.UP;
      case 2:
        return Robot.LEFT;
      case 3:
        return Robot.DOWN;
    }
  };

  Robot.prototype.damege = function() {
    this.hp -= 1;
    return this.onHpReduce();
  };

  Robot.prototype.update = function() {
    var cmd, ret;

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.prevX = this.x;
    this.prevY = this.y;
    this.onKeyInput(this.game.input);
    ret = false;
    while (this.cmdQueue.empty() === false) {
      cmd = this.cmdQueue.dequeue();
      Debug.dump(cmd);
      Debug.log("id : " + cmd.instruction.id);
      ret = cmd["eval"](this);
      Debug.dump(ret);
      this.onCmdComplete(cmd.instruction.id, ret);
      if (cmd.instruction.id === Instruction.END) {
        ret = true;
        break;
      }
    }
    return ret;
  };

  return Robot;

})(Sprite);

PlayerRobot = (function(_super) {
  __extends(PlayerRobot, _super);

  PlayerRobot.SIZE = 64;

  PlayerRobot.UPDATE_FRAME = 10;

  function PlayerRobot() {
    PlayerRobot.__super__.constructor.call(this, PlayerRobot.SIZE, PlayerRobot.SIZE);
    this.name = R.String.PLAYER;
    this.image = this.game.assets[R.CHAR.PLAYER];
    this.cmdPool = new CommandPool;
  }

  PlayerRobot.prototype.createBullet = function() {
    return new DroidBullet(this.x, this.y, DroidBullet.RIGHT);
  };

  PlayerRobot.prototype.onViewUpdate = function(views) {
    var map, prevTile, tile;

    map = views.map;
    prevTile = map.getTile(this.prevX, this.prevY);
    prevTile.setNormal();
    tile = map.getTile(this.x, this.y);
    return tile.setPlayerSelected();
  };

  PlayerRobot.prototype.onHpReduce = function(views) {
    var hpBar, scene;

    scene = Game.instance.scene;
    hpBar = scene.views.playerHpBar;
    return hpBar.reduce();
  };

  PlayerRobot.prototype.onKeyInput = function(input) {
    if (input.w === true) {
      this.cmdQueue.enqueue(this.cmdPool.moveUp);
      return this.cmdQueue.enqueue(this.cmdPool.end);
    } else if (input.a === true) {
      this.cmdQueue.enqueue(this.cmdPool.moveLeft);
      return this.cmdQueue.enqueue(this.cmdPool.end);
    } else if (input.x === true) {
      this.cmdQueue.enqueue(this.cmdPool.moveDown);
      return this.cmdQueue.enqueue(this.cmdPool.end);
    } else if (input.d === true) {
      this.cmdQueue.enqueue(this.cmdPool.moveRight);
      return this.cmdQueue.enqueue(this.cmdPool.end);
    } else if (input.s === true) {
      this.cmdQueue.enqueue(this.cmdPool.search);
      this.cmdQueue.enqueue(this.cmdPool.shot);
      return this.cmdQueue.enqueue(this.cmdPool.end);
    } else if (input.q === true) {
      this.cmdQueue.enqueue(this.cmdPool.pickup);
      return this.cmdQueue.enqueue(this.cmdPool.end);
    }
  };

  return PlayerRobot;

})(Robot);

EnemyRobot = (function(_super) {
  __extends(EnemyRobot, _super);

  EnemyRobot.SIZE = 64;

  EnemyRobot.UPDATE_FRAME = 10;

  function EnemyRobot() {
    EnemyRobot.__super__.constructor.call(this, EnemyRobot.SIZE, EnemyRobot.SIZE);
    this.name = R.String.ENEMY;
    this.image = this.game.assets[R.CHAR.ENEMY];
    this.cmdPool = new CommandPool;
  }

  EnemyRobot.prototype.createBullet = function() {
    return new DroidBullet(this.x, this.y, DroidBullet.RIGHT);
  };

  EnemyRobot.prototype.onViewUpdate = function(views) {
    var map, prevTile, tile;

    map = views.map;
    prevTile = map.getTile(this.prevX, this.prevY);
    prevTile.setNormal();
    tile = map.getTile(this.x, this.y);
    return tile.setEnemySelected();
  };

  EnemyRobot.prototype.onHpReduce = function(views) {
    var hpBar, scene;

    scene = Game.instance.scene;
    hpBar = scene.views.enemyHpBar;
    return hpBar.reduce();
  };

  EnemyRobot.prototype.onKeyInput = function(input) {
    if (input.i === true) {
      return this.cmdQueue.enqueue(this.cmdPool.moveUp);
    } else if (input.j === true) {
      return this.cmdQueue.enqueue(this.cmdPool.moveLeft);
    } else if (input.m === true) {
      return this.cmdQueue.enqueue(this.cmdPool.moveDown);
    } else if (input.l === true) {
      return this.cmdQueue.enqueue(this.cmdPool.moveRight);
    }
  };

  return EnemyRobot;

})(Robot);

SpritePool = (function() {
  function SpritePool(createFunc, maxAllocSize, maxPoolSize) {
    this.createFunc = createFunc;
    this.maxAllocSize = maxAllocSize;
    this.maxPoolSize = maxPoolSize;
    this.sprites = [];
    this.count = 0;
    this.freeCallback = null;
  }

  SpritePool.prototype.setDestructor = function(destructor) {
    this.destructor = destructor;
  };

  SpritePool.prototype.alloc = function() {
    var sprite;

    if (this.count > this.maxAllocSize) {
      return null;
    }
    if (this.sprites.length === 0) {
      sprite = this.createFunc();
    } else {
      sprite = this.sprites.pop();
    }
    this.count++;
    return sprite;
  };

  SpritePool.prototype.free = function(sprite) {
    if (this.sprites.length < this.maxPoolSize) {
      this.sprites[this.sprites.length] = sprite;
    }
    this.count--;
    if (this.destructor != null) {
      return this.destructor(sprite);
    }
  };

  return SpritePool;

})();