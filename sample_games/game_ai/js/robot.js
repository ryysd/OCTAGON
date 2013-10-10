// Generated by CoffeeScript 1.6.3
var EnemyRobot, ItemQueue, PlayerRobot, R, Robot,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

R = Config.R;

/*
  store bullet objects
*/


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

  ItemQueue.prototype.index = function(i) {
    return this.collection[i];
  };

  ItemQueue.prototype.size = function() {
    return this.collection.length;
  };

  return ItemQueue;

})();

Robot = (function(_super) {
  var DIRECT_FRAME, FRAME_DIRECT;

  __extends(Robot, _super);

  Robot.MAX_HP = 3;

  DIRECT_FRAME = {};

  DIRECT_FRAME[Direct.NONE] = 0;

  DIRECT_FRAME[Direct.RIGHT] = 0;

  DIRECT_FRAME[Direct.RIGHT | Direct.DOWN] = 5;

  DIRECT_FRAME[Direct.LEFT | Direct.DOWN] = 7;

  DIRECT_FRAME[Direct.LEFT] = 2;

  DIRECT_FRAME[Direct.LEFT | Direct.UP] = 6;

  DIRECT_FRAME[Direct.RIGHT | Direct.UP] = 4;

  FRAME_DIRECT = {};

  FRAME_DIRECT[0] = Direct.RIGHT;

  FRAME_DIRECT[5] = Direct.RIGHT | Direct.DOWN;

  FRAME_DIRECT[7] = Direct.LEFT | Direct.DOWN;

  FRAME_DIRECT[2] = Direct.LEFT;

  FRAME_DIRECT[6] = Direct.LEFT | Direct.UP;

  FRAME_DIRECT[4] = Direct.RIGHT | Direct.UP;

  function Robot(width, height) {
    var plate, pos;
    Robot.__super__.constructor.call(this, width, height);
    this.name = "robot";
    this.setup("hp", Robot.MAX_HP);
    this.bulletQueue = {
      normal: new ItemQueue([], 5),
      wide: new ItemQueue([], 5),
      dual: new ItemQueue([], 5)
    };
    this.plateState = 0;
    RobotWorld.instance.addChild(this);
    plate = Map.instance.getPlate(0, 0);
    this.prevPlate = this.currentPlate = plate;
    pos = plate.getAbsolutePos();
    this.moveTo(pos.x, pos.y);
    this._animated = false;
  }

  Robot.prototype.properties = {
    direct: {
      get: function() {
        if (FRAME_DIRECT[this.frame] != null) {
          return FRAME_DIRECT[this.frame];
        } else {
          return FRAME_DIRECT[Direct.RIGHT];
        }
      },
      set: function(direct) {
        if (DIRECT_FRAME[direct] != null) {
          return this.frame = DIRECT_FRAME[direct];
        }
      }
    },
    animated: {
      get: function() {
        return this._animated;
      },
      set: function(value) {
        return this._animated = value;
      }
    },
    pos: {
      get: function() {
        return this.currentPlate.pos;
      }
    }
  };

  Robot.prototype.directFrame = function(direct) {
    return DIRECT_FRAME[direct];
  };

  Robot.prototype.move = function(direct, onComplete) {
    var plate, ret,
      _this = this;
    if (onComplete == null) {
      onComplete = function() {};
    }
    plate = Map.instance.getTargetPoision(this.currentPlate, direct);
    this.direct = direct;
    ret = this._move(plate, function() {
      var pos;
      pos = plate.getAbsolutePos();
      _this.prevPlate.dispatchEvent(new RobotEvent('away', {
        robot: _this
      }));
      _this.currentPlate.dispatchEvent(new RobotEvent('ride', {
        robot: _this
      }));
      return _this.tl.moveTo(pos.x, pos.y, PlayerRobot.UPDATE_FRAME).then(function() {
        _this.dispatchEvent(new RobotEvent('move', ret));
        return onComplete();
      });
    });
    return ret;
  };

  Robot.prototype.moveDirect = function(plate) {
    var ret,
      _this = this;
    ret = this._move(plate, function() {
      var pos;
      pos = plate.getAbsolutePos();
      _this.moveTo(pos.x, pos.y);
      _this.prevPlate.dispatchEvent(new RobotEvent('away', {
        robot: _this
      }));
      return _this.currentPlate.dispatchEvent(new RobotEvent('ride', {
        robot: _this
      }));
    });
    return ret;
  };

  Robot.prototype._move = function(plate, closure) {
    var pos, ret;
    ret = false;
    this.prevPlate = this.currentPlate;
    if ((plate != null) && plate.lock === false) {
      pos = plate.getAbsolutePos();
      this.currentPlate = plate;
      closure();
      ret = new Point(plate.ix, plate.iy);
    } else {
      ret = false;
    }
    return ret;
  };

  Robot.prototype.shot = function(bulletType, onComplete) {
    var b, bltQueue, ret, _i, _len, _ref;
    if (onComplete == null) {
      onComplete = function() {};
    }
    switch (bulletType) {
      case BulletType.NORMAL:
        bltQueue = this.bulletQueue.normal;
        break;
      case BulletType.WIDE:
        bltQueue = this.bulletQueue.wide;
        break;
      case BulletType.DUAL:
        bltQueue = this.bulletQueue.dual;
    }
    ret = false;
    if (!bltQueue.empty()) {
      _ref = bltQueue.dequeue();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        b.shot(this.x, this.y, this.direct);
        setTimeout(onComplete, Util.toMillisec(b.maxFrame));
        ret = {
          type: bulletType
        };
      }
    }
    this.dispatchEvent(new RobotEvent('shot', ret));
    return ret;
  };

  Robot.prototype.pickup = function(bulletType, onComplete) {
    var blt, bltQueue, item, itemClass, ret;
    if (onComplete == null) {
      onComplete = function() {};
    }
    ret = false;
    blt = BulletFactory.create(bulletType, this);
    switch (bulletType) {
      case BulletType.NORMAL:
        bltQueue = this.bulletQueue.normal;
        itemClass = NormalBulletItem;
        break;
      case BulletType.WIDE:
        bltQueue = this.bulletQueue.wide;
        itemClass = WideBulletItem;
        break;
      case BulletType.DUAL:
        bltQueue = this.bulletQueue.dual;
        itemClass = DualBulletItem;
    }
    if (bltQueue != null) {
      ret = bltQueue.enqueue(blt);
    }
    if (ret !== false) {
      item = new itemClass(this.x, this.y);
      item.setOnCompleteEvent(onComplete);
      ret = {
        type: bulletType
      };
    }
    this.dispatchEvent(new RobotEvent('pickup', ret));
    return ret;
  };

  Robot.prototype.turn = function(onComplete) {
    var _this = this;
    if (onComplete == null) {
      onComplete = function() {};
    }
    return setTimeout((function() {
      _this.direct = Direct.next(_this.direct);
      onComplete(_this);
      return _this.dispatchEvent(new RobotEvent('turn', {}));
    }), Util.toMillisec(15));
  };

  Robot.prototype.damege = function() {
    return this.hp -= 1;
  };

  Robot.prototype.update = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.onKeyInput(Game.instance.input);
    return true;
  };

  Robot.prototype.onKeyInput = function(input) {};

  return Robot;

})(SpriteModel);

PlayerRobot = (function(_super) {
  __extends(PlayerRobot, _super);

  PlayerRobot.WIDTH = 64;

  PlayerRobot.HEIGHT = 74;

  PlayerRobot.UPDATE_FRAME = 10;

  function PlayerRobot(parentNode) {
    this.onDebugComplete = __bind(this.onDebugComplete, this);
    PlayerRobot.__super__.constructor.call(this, PlayerRobot.WIDTH, PlayerRobot.HEIGHT, parentNode);
    this.name = R.String.PLAYER;
    this.image = Game.instance.assets[R.CHAR.PLAYER];
    this.plateState = Plate.STATE_PLAYER;
    this.debugCmd = new DebugCommand(this);
  }

  PlayerRobot.prototype.onKeyInput = function(input) {
    var ret;
    if (this.animated === true) {
      return;
    }
    ret = true;
    if (input.w === true && input.p === true) {
      this.animated = true;
      ret = this.move(Direct.LEFT | Direct.UP, this.onDebugComplete);
    } else if (input.a === true && input.p === true) {
      this.animated = true;
      ret = this.move(Direct.LEFT, this.onDebugComplete);
    } else if (input.x === true && input.p === true) {
      this.animated = true;
      ret = this.move(Direct.LEFT | Direct.DOWN, this.onDebugComplete);
    } else if (input.d === true && input.p === true) {
      this.animated = true;
      ret = this.move(Direct.RIGHT, this.onDebugComplete);
    } else if (input.e === true && input.p === true) {
      this.animated = true;
      ret = this.move(Direct.RIGHT | Direct.UP, this.onDebugComplete);
    } else if (input.c === true && input.p === true) {
      this.animated = true;
      ret = this.move(Direct.RIGHT | Direct.DOWN, this.onDebugComplete);
    } else if (input.q === true && input.m === true) {
      this.animated = true;
      ret = this.pickup(BulletType.NORMAL, this.onDebugComplete);
    } else if (input.q === true && input.n === true) {
      this.animated = true;
      ret = this.pickup(BulletType.WIDE, this.onDebugComplete);
    } else if (input.q === true && input.l === true) {
      this.animated = true;
      ret = this.pickup(BulletType.DUAL, this.onDebugComplete);
    } else if (input.s === true && input.m === true) {
      this.animated = true;
      ret = this.shot(BulletType.NORMAL, this.onDebugComplete);
    } else if (input.s === true && input.n === true) {
      this.animated = true;
      ret = this.shot(BulletType.WIDE, this.onDebugComplete);
    } else if (input.s === true && input.l === true) {
      this.animated = true;
      ret = this.shot(BulletType.DUAL, this.onDebugComplete);
    }
    if (ret === false) {
      return this.onDebugComplete();
    }
  };

  PlayerRobot.prototype.onDebugComplete = function() {
    return this.animated = false;
  };

  return PlayerRobot;

})(Robot);

EnemyRobot = (function(_super) {
  __extends(EnemyRobot, _super);

  EnemyRobot.WIDTH = 64;

  EnemyRobot.HEIGHT = 74;

  EnemyRobot.UPDATE_FRAME = 10;

  function EnemyRobot(parentNode) {
    EnemyRobot.__super__.constructor.call(this, EnemyRobot.WIDTH, EnemyRobot.HEIGHT, parentNode);
    this.name = R.String.ENEMY;
    this.image = Game.instance.assets[R.CHAR.ENEMY];
    this.plateState = Plate.STATE_ENEMY;
    this.debugCmd = new DebugCommand(this);
  }

  EnemyRobot.prototype.onKeyInput = function(input) {
    if (this.animated === true) {
      return;
    }
    if (input.w === true && input.o === true) {
      return this.debugCmd.move(4);
    } else if (input.a === true && input.o === true) {
      return this.debugCmd.move(3);
    } else if (input.x === true && input.o === true) {
      return this.debugCmd.move(5);
    } else if (input.d === true && input.o === true) {
      return this.debugCmd.move(0);
    } else if (input.e === true && input.o === true) {
      return this.debugCmd.move(1);
    } else if (input.c === true && input.o === true) {
      return this.debugCmd.move(2);
    }
  };

  return EnemyRobot;

})(Robot);
