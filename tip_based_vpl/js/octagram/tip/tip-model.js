var ActionTip, BranchTip, EmptyTip, NopTip, Point, ReturnTip, SingleTransitionTip, StartTip, StopTip, ThinkTip, Tip, WallTip,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Point = (function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  return Point;

})();

Tip = (function() {
  function Tip() {
    this.transitions = {};
    this.index = {
      x: 0,
      y: 0
    };
  }

  Tip.prototype.addTransition = function(name, dst) {
    return this.transitions[name] = dst;
  };

  Tip.prototype.getTransition = function(name) {
    return this.transitions[name];
  };

  Tip.prototype.clone = function() {
    return new Tip();
  };

  Tip.prototype.copy = function(obj) {
    var t;
    obj.index.x = this.index.x;
    obj.index.y = this.index.y;
    for (t in this.transitions) {
      obj.transitions[t] = this.transitions[t];
    }
    return obj;
  };

  Tip.prototype.execute = function() {
    return null;
  };

  Tip.prototype.mkDescription = function() {
    return TipUtil.tipToMessage(this);
  };

  Tip.prototype.serialize = function() {
    return {
      name: this.constructor.name,
      index: this.index,
      transitions: this.transitions
    };
  };

  Tip.prototype.deserialize = function(serializedVal) {
    this.transitions = serializedVal.transitions;
    return this.index = serializedVal.index;
  };

  return Tip;

})();

EmptyTip = (function(_super) {
  __extends(EmptyTip, _super);

  function EmptyTip() {
    EmptyTip.__super__.constructor.call(this);
  }

  EmptyTip.prototype.clone = function() {
    return new EmptyTip();
  };

  return EmptyTip;

})(Tip);

StopTip = (function(_super) {
  __extends(StopTip, _super);

  function StopTip() {
    StopTip.__super__.constructor.call(this);
  }

  StopTip.prototype.clone = function() {
    return new StopTip();
  };

  return StopTip;

})(Tip);

SingleTransitionTip = (function(_super) {
  __extends(SingleTransitionTip, _super);

  function SingleTransitionTip(next) {
    SingleTransitionTip.__super__.constructor.call(this);
    this.setNext(next);
  }

  SingleTransitionTip.prototype.setNext = function(next) {
    this.next = next;
    return this.addTransition("next", this.next);
  };

  SingleTransitionTip.prototype.getNext = function() {
    return this.getTransition("next");
  };

  SingleTransitionTip.prototype.execute = function() {
    return this.getTransition("next");
  };

  SingleTransitionTip.prototype.clone = function() {
    return this.copy(new SingleTransitionTip(this.getNext()));
  };

  return SingleTransitionTip;

})(Tip);

ThinkTip = (function(_super) {
  __extends(ThinkTip, _super);

  function ThinkTip(next) {
    ThinkTip.__super__.constructor.call(this, next);
  }

  ThinkTip.prototype.clone = function() {
    return this.copy(new ThinkTip(this.getNext()));
  };

  return ThinkTip;

})(SingleTransitionTip);

NopTip = (function(_super) {
  __extends(NopTip, _super);

  function NopTip(next) {
    NopTip.__super__.constructor.call(this, next);
  }

  NopTip.prototype.clone = function() {
    return this.copy(new NopTip(this.getNext()));
  };

  return NopTip;

})(ThinkTip);

StartTip = (function(_super) {
  __extends(StartTip, _super);

  function StartTip(next) {
    StartTip.__super__.constructor.call(this, next);
  }

  StartTip.prototype.clone = function() {
    return this.copy(new StartTip(this.getNext()));
  };

  return StartTip;

})(SingleTransitionTip);

ReturnTip = (function(_super) {
  __extends(ReturnTip, _super);

  function ReturnTip(next) {
    ReturnTip.__super__.constructor.call(this, next);
  }

  ReturnTip.prototype.clone = function() {
    return this.copy(new ReturnTip(this.getNext()));
  };

  return ReturnTip;

})(SingleTransitionTip);

WallTip = (function(_super) {
  __extends(WallTip, _super);

  function WallTip(next) {
    WallTip.__super__.constructor.call(this, next);
  }

  WallTip.prototype.clone = function() {
    return this.copy(new WallTip(this.getNext()));
  };

  return WallTip;

})(SingleTransitionTip);

BranchTip = (function(_super) {
  __extends(BranchTip, _super);

  function BranchTip(conseq, alter) {
    BranchTip.__super__.constructor.call(this);
    this.addTransition("conseq", conseq);
    this.addTransition("alter", alter);
  }

  BranchTip.prototype.condition = function() {
    return true;
  };

  BranchTip.prototype.execute = function() {
    BranchTip.__super__.execute.apply(this, arguments);
    if (this.condition()) {
      return this.getTransition("conseq");
    } else {
      return this.getTransition("alter");
    }
  };

  BranchTip.prototype.setConseq = function(conseq) {
    return this.addTransition("conseq", conseq);
  };

  BranchTip.prototype.setAlter = function(alter) {
    return this.addTransition("alter", alter);
  };

  BranchTip.prototype.getConseq = function() {
    return this.getTransition("conseq");
  };

  BranchTip.prototype.getAlter = function() {
    return this.getTransition("alter");
  };

  BranchTip.prototype.clone = function() {
    return this.copy(new BranchTip(this.getConseq(), this.getAlter()));
  };

  return BranchTip;

})(Tip);

ActionTip = (function(_super) {
  __extends(ActionTip, _super);

  function ActionTip(next) {
    ActionTip.__super__.constructor.call(this, next);
  }

  ActionTip.prototype.action = function() {};

  ActionTip.prototype.execute = function() {
    this.action();
    return this.getTransition("next");
  };

  ActionTip.prototype.clone = function() {
    var tip;
    return tip = this.copy(new ActionTip(this.getNext()));
  };

  return ActionTip;

})(SingleTransitionTip);
