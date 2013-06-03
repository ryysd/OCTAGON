// Generated by CoffeeScript 1.6.2
var Bullet, BulletItem, DroidBullet, EnemyBullet, Item, Point,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Point = (function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  return Point;

})();

Bullet = (function(_super) {
  var bit;

  __extends(Bullet, _super);

  bit = 1;

  Bullet.LEFT = bit << 0;

  Bullet.RIGHT = bit << 1;

  Bullet.UP = bit << 2;

  Bullet.DOWN = bit << 3;

  Bullet.MAX_FRAME = 16;

  function Bullet(x, y, w, h, direct) {
    if (direct == null) {
      direct = Bullet.RIGHT;
    }
    Bullet.__super__.constructor.call(this, w, h);
    this.rotate(90);
    this.set(x, y, direct);
  }

  Bullet.prototype.set = function(x, y, direct) {
    var rotate;

    this.x = x;
    this.y = y;
    this.direct = direct != null ? direct : Bullet.RIGHT;
    this.offsetX = this.x;
    this.offsetY = this.y;
    this.dstPoint = new Point(0, 0);
    this.animated = true;
    if (this._rorateDeg != null) {
      this.rotate(-this._rorateDeg);
    }
    if ((this.direct & Bullet.UP) !== 0) {
      this.dstPoint.y = -Map.UNIT_SIZE * 2;
    } else if ((this.direct & Bullet.DOWN) !== 0) {
      this.dstPoint.y = Map.UNIT_SIZE * 2;
    }
    if ((this.direct & Bullet.LEFT) !== 0) {
      this.dstPoint.x = -Map.UNIT_SIZE * 2;
    } else if ((this.direct & Bullet.RIGHT) !== 0) {
      this.dstPoint.x = Map.UNIT_SIZE * 2;
    }
    rotate = Util.toDeg(Util.includedAngle(this.dstPoint, new Point(this.dstPoint.length(), 0)));
    this.rotate(rotate);
    return this.count = 0;
  };

  Bullet.prototype.hit = function(robot) {
    var explosion;

    explosion = new Explosion(robot.x, robot.y);
    this.parentNode.addChild(explosion);
    this.onDestroy();
    return robot.damege();
  };

  Bullet.prototype.update = function() {
    if (this.animated) {
      this.x += parseInt(this.dstPoint.x / Bullet.MAX_FRAME);
      this.y += parseInt(this.dstPoint.y / Bullet.MAX_FRAME);
      this.count++;
      if (this.count >= Bullet.MAX_FRAME) {
        return this.onDestroy();
      }
    }
  };

  Bullet.prototype.onDestroy = function() {
    if (this.animated) {
      this.animated = false;
      return this.parentNode.removeChild(this);
    }
  };

  return Bullet;

})(Sprite);

DroidBullet = (function(_super) {
  __extends(DroidBullet, _super);

  DroidBullet.WIDTH = 64;

  DroidBullet.HEIGHT = 64;

  function DroidBullet(x, y, direct) {
    if (direct == null) {
      direct = DroidBullet.RIGHT;
    }
    DroidBullet.__super__.constructor.call(this, x, y, DroidBullet.WIDTH, DroidBullet.HEIGHT, direct);
    this.image = Game.instance.assets[R.BULLET.DROID];
  }

  return DroidBullet;

})(Bullet);

EnemyBullet = (function(_super) {
  __extends(EnemyBullet, _super);

  EnemyBullet.WIDTH = 64;

  EnemyBullet.HEIGHT = 64;

  function EnemyBullet(x, y, direct) {
    if (direct == null) {
      direct = DroidBullet.RIGHT;
    }
    EnemyBullet.__super__.constructor.call(this, x, y, EnemyBullet.WIDTH, EnemyBullet.HEIGHT, direct);
    this.image = Game.instance.assets[R.BULLET.ENEMY];
  }

  return EnemyBullet;

})(Bullet);

Item = (function(_super) {
  __extends(Item, _super);

  function Item(w, h) {
    this.onComplete = __bind(this.onComplete, this);    Item.__super__.constructor.call(this, w, h);
    this.animated = true;
  }

  Item.prototype.onComplete = function() {
    this.animated = false;
    return this.parentNode.removeChild(this);
  };

  return Item;

})(Sprite);

BulletItem = (function(_super) {
  __extends(BulletItem, _super);

  BulletItem.SIZE = 64;

  BulletItem.FRAME = 20;

  function BulletItem(x, y) {
    BulletItem.__super__.constructor.call(this, BulletItem.SIZE, BulletItem.SIZE);
    this.x = x;
    this.y = y - 8;
    this.image = Game.instance.assets[R.ITEM.BULLET];
    this.tl.fadeOut(BulletItem.FRAME).and().moveBy(0, -48, BulletItem.FRAME).then(function() {
      return this.onComplete();
    });
  }

  return BulletItem;

})(Item);