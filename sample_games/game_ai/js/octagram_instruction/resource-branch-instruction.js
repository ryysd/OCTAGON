// Generated by CoffeeScript 1.6.3
var ResourceBranchInstruction,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ResourceBranchInstruction = (function(_super) {
  __extends(ResourceBranchInstruction, _super);

  function ResourceBranchInstruction(robot) {
    var column, i, labels, _i, _ref;
    this.robot = robot;
    ResourceBranchInstruction.__super__.constructor.apply(this, arguments);
    this.tipInfo = new TipInfo(function(labels) {
      return "現在いるマスにエネルギーが" + labels[0] + "以上ある時青矢印に進みます。<br>" + labels[0] + "未満の時は赤矢印に進みます。";
    });
    column = "エネルギー";
    labels = {};
    for (i = _i = 0, _ref = Robot.MAX_ENERGY; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      labels[String(i)] = i;
    }
    this.energyParam = new TipParameter(column, 0, 0, Robot.MAX_ENERGY, 1);
    this.energyParam.id = "size";
    this.addParameter(this.energyParam);
    this.tipInfo.addParameter(this.energyParam.id, column, labels, 1);
    this.icon = new Icon(Game.instance.assets[R.TIP.LIFE], 32, 32);
  }

  ResourceBranchInstruction.prototype.action = function() {
    return this.energyParam.value <= this.robot.currentPlateEnergy;
  };

  ResourceBranchInstruction.prototype.clone = function() {
    var obj;
    obj = this.copy(new ResourceBranchInstruction(this.robot));
    obj.energyParam.value = this.energyParam.value;
    return obj;
  };

  ResourceBranchInstruction.prototype.onParameterChanged = function(parameter) {
    if (parameter.id === this.energyParam.id) {
      this.energyParam = parameter;
    }
    return this.tipInfo.changeLabel(parameter.id, parameter.value);
  };

  ResourceBranchInstruction.prototype.mkDescription = function() {
    return this.tipInfo.getDescription();
  };

  ResourceBranchInstruction.prototype.mkLabel = function(parameter) {
    return this.tipInfo.getLabel(parameter.id);
  };

  ResourceBranchInstruction.prototype.getIcon = function() {
    return this.icon;
  };

  return ResourceBranchInstruction;

})(BranchInstruction);
