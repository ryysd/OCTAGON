// Generated by CoffeeScript 1.6.3
var Map, NormalSpot, Plate, R, Spot,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

R = Config.R;

Spot = (function() {
  Spot.TYPE_NORMAL_BULLET = 1;

  Spot.TYPE_WIDE_BULLET = 2;

  Spot.TYPE_DUAL_BULLET = 3;

  Spot.SIZE = 3;

  function Spot(type, point) {
    this.type = type;
    switch (this.type) {
      case Spot.TYPE_NORMAL_BULLET:
        this.effect = new SpotNormalEffect(point.x, point.y + 5);
        this.resultFunc = function(robot, plate) {
          point = plate.getAbsolutePos();
          robot.pickup(BulletType.NORMAL);
          return robot.parentNode.addChild(new NormalEnpowerEffect(point.x, point.y));
        };
        break;
      case Spot.TYPE_WIDE_BULLET:
        this.effect = new SpotWideEffect(point.x, point.y + 5);
        this.resultFunc = function(robot, plate) {
          point = plate.getAbsolutePos();
          robot.pickup(BulletType.WIDE);
          return robot.parentNode.addChild(new WideEnpowerEffect(point.x, point.y));
        };
        break;
      case Spot.TYPE_DUAL_BULLET:
        this.effect = new SpotDualEffect(point.x, point.y + 5);
        this.resultFunc = function(robot, plate) {
          point = plate.getAbsolutePos();
          robot.pickup(BulletType.DUAL);
          return robot.parentNode.addChild(new DualEnpowerEffect(point.x, point.y));
        };
    }
  }

  Spot.createRandom = function(point) {
    var type;
    type = Math.floor(Math.random() * Spot.SIZE) + 1;
    return new Spot(type, poit);
  };

  Spot.getRandomType = function() {
    return Math.floor(Math.random() * Spot.SIZE) + 1;
  };

  return Spot;

})();

NormalSpot = (function(_super) {
  __extends(NormalSpot, _super);

  function NormalSpot(plate) {
    this.plate = plate;
  }

  return NormalSpot;

})(Spot);

Plate = (function(_super) {
  __extends(Plate, _super);

  Plate.HEIGHT = 74;

  Plate.WIDTH = 64;

  Plate.STATE_NORMAL = 0;

  Plate.STATE_PLAYER = 1;

  Plate.STATE_ENEMY = 2;

  Plate.STATE_SELECTED = 3;

  function Plate(x, y, ix, iy) {
    var _this = this;
    this.ix = ix;
    this.iy = iy;
    Plate.__super__.constructor.call(this, Plate.WIDTH, Plate.HEIGHT);
    this.x = x;
    this.y = y;
    this.lock = false;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.PLATE];
    this.spotEnabled = false;
    this.pravState = Plate.STATE_NORMAL;
    this.addEventListener('away', function(evt) {
      return _this.onRobotAway(evt.params.robot);
    });
    this.addEventListener('ride', function(evt) {
      return _this.onRobotRide(evt.params.robot);
    });
  }

  Plate.prototype.setState = function(state) {
    this.pravState = this.frame;
    this.frame = state;
    if (state === Plate.STATE_PLAYER || state === Plate.STATE_ENEMY) {
      return this.lock = true;
    } else {
      return this.lock = false;
    }
  };

  Plate.prototype.setPrevState = function() {
    return this.setState(this.prevState);
  };

  Plate.prototype.getAbsolutePos = function() {
    var i, offsetX, offsetY;
    i = this.parentNode;
    offsetX = offsetY = 0;
    while (i != null) {
      offsetX += i.x;
      offsetY += i.y;
      i = i.parentNode;
    }
    return new Point(this.x + offsetX, this.y + offsetY);
  };

  Plate.prototype.setSpot = function(type) {
    if (this.spotEnabled === false) {
      this.spotEnabled = true;
      this.spot = new Spot(type, this);
      return this.parentNode.addChild(this.spot.effect);
    }
  };

  Plate.prototype.onRobotAway = function(robot) {
    return this.setState(Plate.STATE_NORMAL);
  };

  Plate.prototype.onRobotRide = function(robot) {
    this.setState(robot.plateState);
    if (this.spotEnabled === true) {
      this.parentNode.removeChild(this.spot.effect);
      this.spot.resultFunc(robot, this);
      this.spot = null;
      return this.spotEnabled = false;
    }
  };

  return Plate;

})(ViewSprite);

Map = (function(_super) {
  __extends(Map, _super);

  Map.WIDTH = 9;

  Map.HEIGHT = 7;

  Map.UNIT_HEIGHT = Plate.HEIGHT;

  Map.UNIT_WIDTH = Plate.WIDTH;

  function Map(x, y) {
    this._createRondomSpot = __bind(this._createRondomSpot, this);
    var i, list, offset, plate, tx, ty, _i, _j, _k, _ref, _ref1;
    if (Map.instance != null) {
      return Map.instance;
    }
    Map.__super__.constructor.apply(this, arguments);
    Map.instance = this;
    this.plateMatrix = [];
    offset = 64 / 4;
    for (ty = _i = 0, _ref = Map.HEIGHT; 0 <= _ref ? _i < _ref : _i > _ref; ty = 0 <= _ref ? ++_i : --_i) {
      list = [];
      for (tx = _j = 0, _ref1 = Map.WIDTH; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; tx = 0 <= _ref1 ? ++_j : --_j) {
        if (ty % 2 === 0) {
          plate = new Plate(tx * Map.UNIT_WIDTH, (ty * Map.UNIT_HEIGHT) - ty * offset, tx, ty);
        } else {
          plate = new Plate(tx * Map.UNIT_WIDTH + Map.UNIT_HEIGHT / 2, (ty * Map.UNIT_HEIGHT) - ty * offset, tx, ty);
        }
        list.push(plate);
        this.addChild(plate);
      }
      this.plateMatrix.push(list);
    }
    for (i = _k = 0; _k <= 6; i = ++_k) {
      this._createRondomSpot();
    }
    this.x = x;
    this.y = y;
    this.width = Map.WIDTH * Map.UNIT_WIDTH;
    this.height = (Map.HEIGHT - 1) * (Map.UNIT_HEIGHT - offset) + Map.UNIT_HEIGHT + 16;
  }

  Map.prototype._createRondomSpot = function() {
    var plate, tx, ty;
    while (true) {
      tx = Math.floor(Random.nextInt() % Map.WIDTH);
      ty = Math.floor(Random.nextInt() % Map.HEIGHT);
      plate = this.getPlate(ty, tx);
      if (plate !== null && plate.spotEnabled === false) {
        break;
      }
    }
    if (plate !== null) {
      return plate.setSpot(Spot.TYPE_NORMAL_BULLET);
    }
  };

  Map.prototype.initEvent = function(world) {
    world.player.addEventListener('pickup', this._createRondomSpot);
    return world.enemy.addEventListener('pickup', this._createRondomSpot);
  };

  Map.prototype.getPlate = function(x, y) {
    if ((0 <= x && x < Map.WIDTH) && (0 <= y && y < Map.HEIGHT)) {
      return this.plateMatrix[y][x];
    }
    return null;
  };

  Map.prototype.getPlateRandom = function() {
    return this.plateMatrix[Math.floor(Math.random() * Map.HEIGHT)][Math.floor(Math.random() * Map.WIDTH)];
  };

  Map.prototype.eachPlate = function(plate, direct, func) {
    var i, ret, _results;
    if (direct == null) {
      direct = Direct.RIGHT;
    }
    ret = plate;
    i = 0;
    _results = [];
    while (ret != null) {
      func(ret, i);
      ret = this.getTargetPoision(ret, direct);
      _results.push(i++);
    }
    return _results;
  };

  Map.prototype.eachSurroundingPlate = function(plate, func) {
    var _this = this;
    return Direct.each(function(direct) {
      var target;
      target = _this.getTargetPoision(plate, direct);
      if (target != null) {
        return func(target, direct);
      }
    });
  };

  Map.prototype.isExistObject = function(plate, direct, lenght) {
    var i, ret, _i;
    if (direct == null) {
      direct = Direct.RIGHT;
    }
    ret = plate;
    for (i = _i = 0; 0 <= lenght ? _i < lenght : _i > lenght; i = 0 <= lenght ? ++_i : --_i) {
      ret = this.getTargetPoision(ret, direct);
      if (ret === null) {
        break;
      } else if (ret.lock === true) {
        return true;
      }
    }
    return false;
  };

  Map.prototype.getTargetPoision = function(plate, direct) {
    var offset;
    if (direct == null) {
      direct = Direct.RIGHT;
    }
    if (direct === Direct.RIGHT) {
      if (this.plateMatrix[plate.iy].length > plate.ix + 1) {
        return this.plateMatrix[plate.iy][plate.ix + 1];
      } else {
        return null;
      }
    } else if (direct === Direct.LEFT) {
      if (plate.ix > 0) {
        return this.plateMatrix[plate.iy][plate.ix - 1];
      } else {
        return null;
      }
    }
    if ((direct & Direct.RIGHT) !== 0 && (direct & Direct.UP) !== 0) {
      offset = plate.iy % 2 === 0 ? 0 : 1;
      if (offset + plate.ix < Map.WIDTH && plate.iy > 0) {
        return this.plateMatrix[plate.iy - 1][offset + plate.ix];
      } else {
        return null;
      }
    } else if ((direct & Direct.RIGHT) !== 0 && (direct & Direct.DOWN) !== 0) {
      offset = plate.iy % 2 === 0 ? 0 : 1;
      if (offset + plate.ix < Map.WIDTH && plate.iy + 1 < Map.HEIGHT) {
        return this.plateMatrix[plate.iy + 1][offset + plate.ix];
      } else {
        return null;
      }
    } else if ((direct & Direct.LEFT) !== 0 && (direct & Direct.UP) !== 0) {
      offset = plate.iy % 2 === 0 ? -1 : 0;
      if (offset + plate.ix >= 0 && plate.iy > 0) {
        return this.plateMatrix[plate.iy - 1][offset + plate.ix];
      } else {
        return null;
      }
    } else if ((direct & Direct.LEFT) !== 0 && (direct & Direct.DOWN) !== 0) {
      offset = plate.iy % 2 === 0 ? -1 : 0;
      if (offset + plate.ix >= 0 && plate.iy + 1 < Map.HEIGHT) {
        return this.plateMatrix[plate.iy + 1][offset + plate.ix];
      } else {
        return null;
      }
    }
    return null;
  };

  Map.prototype.update = function() {};

  return Map;

})(ViewGroup);
