var RandomBranchInstruction,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RandomBranchInstruction = (function(_super) {
  __extends(RandomBranchInstruction, _super);

  function RandomBranchInstruction() {
    var parameter;
    RandomBranchInstruction.__super__.constructor.call(this);
    this.threthold = 50;
    parameter = new TipParameter("確率", 50, 0, 100, 1);
    this.addParameter(parameter);
  }

  RandomBranchInstruction.prototype.action = function() {
    var r;
    r = Math.random();
    return r * 100 < this.threthold;
  };

  RandomBranchInstruction.prototype.clone = function() {
    var obj;
    obj = this.copy(new RandomBranchInstruction());
    obj.threthold = this.threthold;
    return obj;
  };

  RandomBranchInstruction.prototype.onParameterChanged = function(parameter) {
    return this.threthold = parameter.value;
  };

  RandomBranchInstruction.prototype.getIcon = function() {
    return new Icon(Resources.get("iconRandom"));
  };

  RandomBranchInstruction.prototype.mkDescription = function() {
    return this.threthold + "%の確率で青矢印に進みます。<br>" + (100 - this.threthold) + "%の確率で赤矢印に進みます。";
  };

  return RandomBranchInstruction;

})(BranchInstruction);
