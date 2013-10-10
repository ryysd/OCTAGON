// Generated by CoffeeScript 1.6.3
var Footer, MsgBox, MsgWindow, R, RemainingBullet, RemainingBullets, RemainingBulletsGroup, StatusBox, StatusWindow,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

MsgWindow = (function(_super) {
  __extends(MsgWindow, _super);

  MsgWindow.WIDTH = 320;

  MsgWindow.HEIGHT = 128;

  function MsgWindow(x, y) {
    MsgWindow.__super__.constructor.call(this, MsgWindow.WIDTH, MsgWindow.HEIGHT);
    this.x = x;
    this.y = y;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.MSGBOX];
  }

  return MsgWindow;

})(ViewSprite);

MsgBox = (function(_super) {
  __extends(MsgBox, _super);

  function MsgBox(x, y) {
    MsgBox.__super__.constructor.call(this, MsgWindow.WIDTH, MsgWindow.HEIGHT);
    this.x = x;
    this.y = y;
    this.window = new MsgWindow(0, 0);
    this.addChild(this.window);
    this.label = new Label;
    this.label.font = "16px 'Meiryo UI'";
    this.label.color = '#FFF';
    this.label.x = 10;
    this.label.y = 30;
    this.addChild(this.label);
    this.label.width = MsgWindow.WIDTH * 0.9;
  }

  MsgBox.prototype.initEvent = function(world) {
    var _this = this;
    world.player.addEventListener('move', function(evt) {
      var player, point;
      player = evt.target;
      point = evt.params;
      if (point !== false) {
        return _this.print(R.String.move(player.name, point.x + 1, point.y + 1));
      } else {
        return _this.print(R.String.CANNOTMOVE);
      }
    });
    world.player.addEventListener('shot', function(evt) {
      var player, ret;
      player = evt.target;
      ret = evt.params;
      if (ret !== false) {
        return _this.print(R.String.shot(player.name));
      } else {
        return _this.print(R.String.CANNOTSHOT);
      }
    });
    return world.player.addEventListener('pickup', function(evt) {
      var player, ret;
      player = evt.target;
      ret = evt.params;
      if (ret !== false) {
        return _this.print(R.String.pickup(player.name));
      } else {
        return _this.print(R.String.CANNOTPICKUP);
      }
    });
  };

  MsgBox.prototype.print = function(msg) {
    return this.label.text = "" + msg;
  };

  return MsgBox;

})(ViewGroup);

StatusWindow = (function(_super) {
  __extends(StatusWindow, _super);

  StatusWindow.WIDTH = 160;

  StatusWindow.HEIGHT = 128;

  function StatusWindow(x, y) {
    StatusWindow.__super__.constructor.call(this, StatusWindow.WIDTH, StatusWindow.HEIGHT);
    this.x = x;
    this.y = y;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.STATUS_BOX];
  }

  return StatusWindow;

})(ViewSprite);

RemainingBullet = (function(_super) {
  __extends(RemainingBullet, _super);

  RemainingBullet.SIZE = 24;

  function RemainingBullet(x, y, frame) {
    RemainingBullet.__super__.constructor.call(this, RemainingBullet.SIZE, RemainingBullet.SIZE);
    this.x = x;
    this.y = y;
    this.frame = frame;
    this.image = Game.instance.assets[R.ITEM.STATUS_BULLET];
  }

  return RemainingBullet;

})(ViewSprite);

RemainingBullets = (function(_super) {
  __extends(RemainingBullets, _super);

  RemainingBullets.HEIGHT = 30;

  RemainingBullets.WIDTH = 120;

  function RemainingBullets(x, y, type) {
    var b, i, _i;
    this.type = type;
    RemainingBullets.__super__.constructor.call(this, RemainingBullets.WIDTH, RemainingBullets.HEIGHT);
    this.x = x;
    this.y = y;
    this.size = 0;
    this.array = [];
    for (i = _i = 0; _i <= 4; i = ++_i) {
      b = new RemainingBullet(i * RemainingBullet.SIZE, 0, this.type);
      this.array.push(b);
      this.addChild(b);
    }
  }

  RemainingBullets.prototype.increment = function() {
    if (this.size < 5) {
      this.array[this.size].frame = this.type - 1;
      return this.size++;
    }
  };

  RemainingBullets.prototype.decrement = function() {
    if (this.size > 0) {
      this.size--;
      return this.array[this.size].frame = this.type;
    }
  };

  return RemainingBullets;

})(ViewGroup);

RemainingBulletsGroup = (function(_super) {
  __extends(RemainingBulletsGroup, _super);

  function RemainingBulletsGroup(x, y) {
    RemainingBulletsGroup.__super__.constructor.apply(this, arguments);
    this.normal = new RemainingBullets(30, 30, 1);
    this.wide = new RemainingBullets(30, 30 + RemainingBullet.SIZE, 3);
    this.dual = new RemainingBullets(30, 30 + RemainingBullet.SIZE * 2, 5);
    this.addChild(this.normal);
    this.addChild(this.wide);
    this.addChild(this.dual);
  }

  RemainingBulletsGroup.prototype.initEvent = function(world) {
    var _this = this;
    world.player.addEventListener('pickup', function(evt) {
      var effect, player;
      player = evt.target;
      effect = new ShotEffect(player.x, player.y);
      _this.addChild(effect);
      switch (evt.params.type) {
        case BulletType.NORMAL:
          return _this.normal.increment();
        case BulletType.WIDE:
          return _this.wide.increment();
        case BulletType.DUAL:
          return _this.dual.increment();
      }
    });
    return world.player.addEventListener('shot', function(evt) {
      switch (evt.params.type) {
        case BulletType.NORMAL:
          return _this.normal.decrement();
        case BulletType.WIDE:
          return _this.wide.decrement();
        case BulletType.DUAL:
          return _this.dual.decrement();
      }
    });
  };

  return RemainingBulletsGroup;

})(ViewGroup);

StatusBox = (function(_super) {
  __extends(StatusBox, _super);

  function StatusBox(x, y) {
    StatusBox.__super__.constructor.call(this, StatusWindow.WIDTH, StatusWindow.HEIGHT);
    this.x = x;
    this.y = y;
    this.addView(new RemainingBulletsGroup());
  }

  return StatusBox;

})(ViewGroup);

Footer = (function(_super) {
  __extends(Footer, _super);

  function Footer(x, y) {
    Footer.__super__.constructor.apply(this, arguments);
    this.x = x;
    this.y = y;
    this.addView(new MsgBox(20, 0));
    this.addView(new StatusBox(x + MsgWindow.WIDTH + 32, 16));
  }

  return Footer;

})(ViewGroup);
