// Generated by CoffeeScript 1.6.3
var RandomMoveInstruction,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RandomMoveInstruction = (function(_super) {
  __extends(RandomMoveInstruction, _super);

  /*
    Random Move Instruction
  */


  function RandomMoveInstruction(robot) {
    this.robot = robot;
    RandomMoveInstruction.__super__.constructor.apply(this, arguments);
    this.setAsynchronous(true);
    this.icon = new Icon(Game.instance.assets[R.TIP.ARROW], 32, 32);
  }

  RandomMoveInstruction.prototype.action = function() {
    var direct, plate, rand, ret,
      _this = this;
    ret = false;
    plate = null;
    while (plate === null) {
      rand = Random.nextInt() % InstrCommon.getDirectSize();
      direct = InstrCommon.getRobotDirect(rand);
      plate = Map.instance.getTargetPoision(this.robot.currentPlate, direct.value);
    }
    ret = this.robot.move(direct.value, function() {
      return _this.onComplete();
    });
    return this.setAsynchronous(ret !== false);
  };

  RandomMoveInstruction.prototype.clone = function() {
    var obj;
    obj = this.copy(new RandomMoveInstruction(this.robot));
    return obj;
  };

  RandomMoveInstruction.prototype.mkDescription = function() {
    return "移動可能なマスにランダムに移動します。<br>(消費エネルギー " + Config.Energy.MOVE + " 消費フレーム " + Config.Frame.ROBOT_MOVE + ")";
  };

  RandomMoveInstruction.prototype.getIcon = function() {
    this.icon.frame = 0;
    return this.icon;
  };

  return RandomMoveInstruction;

})(ActionInstruction);
