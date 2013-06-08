// Generated by CoffeeScript 1.6.2
var ActionInstruction, BranchInstruction, CustomInstructionActionTip, CustomInstructionBranchTip, Instruction,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Instruction = (function() {
  function Instruction() {
    this.isAsynchronous = false;
    this.parameters = [];
  }

  Instruction.prototype.onComplete = function() {
    var evt;

    evt = document.createEvent('UIEvent', false);
    evt.initUIEvent('completeExecution', true, true);
    evt.tip = this;
    return document.dispatchEvent(evt);
  };

  Instruction.prototype.action = function() {};

  Instruction.prototype.execute = function() {
    return this.action();
  };

  Instruction.prototype.setAsynchronous = function(async) {
    if (async == null) {
      async = true;
    }
    return this.isAsynchronous = async;
  };

  Instruction.prototype.addParameter = function(param) {
    var _this = this;

    param.onValueChanged = function() {
      return _this.onParameterChanged(param);
    };
    param.onParameterComplete = function() {
      return _this.onParameterComplete(param);
    };
    param.mkLabel = function() {
      return _this.mkLabel(param);
    };
    return this.parameters.push(param);
  };

  Instruction.prototype.mkDescription = function() {};

  Instruction.prototype.mkLabel = function(value) {
    return value;
  };

  Instruction.prototype.getIcon = function() {};

  Instruction.prototype.onParameterChanged = function(parameter) {};

  Instruction.prototype.onParameterComplete = function(parameter) {};

  Instruction.prototype.copy = function(obj) {
    var param, _i, _len, _ref;

    obj.isAsynchronous = this.isAsynchronous;
    obj.parameters = [];
    _ref = this.parameters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      param = _ref[_i];
      obj.addParameter(param.clone());
    }
    return obj;
  };

  Instruction.prototype.clone = function() {
    return this.copy(new Instruction());
  };

  return Instruction;

})();

ActionInstruction = (function(_super) {
  __extends(ActionInstruction, _super);

  function ActionInstruction() {
    ActionInstruction.__super__.constructor.call(this);
  }

  ActionInstruction.prototype.clone = function() {
    return this.copy(new ActionInstruction());
  };

  return ActionInstruction;

})(Instruction);

BranchInstruction = (function(_super) {
  __extends(BranchInstruction, _super);

  function BranchInstruction() {
    BranchInstruction.__super__.constructor.call(this);
  }

  BranchInstruction.prototype.action = function() {
    return false;
  };

  BranchInstruction.prototype.clone = function() {
    return this.copy(new BranchInstruction());
  };

  return BranchInstruction;

})(Instruction);

CustomInstructionActionTip = (function(_super) {
  __extends(CustomInstructionActionTip, _super);

  function CustomInstructionActionTip(instruction, next) {
    this.instruction = instruction;
    CustomInstructionActionTip.__super__.constructor.call(this, next);
  }

  CustomInstructionActionTip.prototype.action = function() {
    return this.instruction.execute();
  };

  CustomInstructionActionTip.prototype.isAsynchronous = function() {
    return this.instruction.isAsynchronous;
  };

  CustomInstructionActionTip.prototype.mkDescription = function() {
    return this.instruction.mkDescription();
  };

  CustomInstructionActionTip.prototype.getIcon = function() {
    return this.instruction.getIcon();
  };

  CustomInstructionActionTip.prototype.clone = function() {
    return this.copy(new CustomInstructionActionTip(this.instruction.clone(), this.getNext()));
  };

  return CustomInstructionActionTip;

})(ActionTip);

CustomInstructionBranchTip = (function(_super) {
  __extends(CustomInstructionBranchTip, _super);

  function CustomInstructionBranchTip(instruction, conseq, alter) {
    this.instruction = instruction;
    CustomInstructionBranchTip.__super__.constructor.call(this, conseq, alter);
  }

  CustomInstructionBranchTip.prototype.condition = function() {
    return this.instruction.execute();
  };

  CustomInstructionBranchTip.prototype.mkDescription = function() {
    return this.instruction.mkDescription();
  };

  CustomInstructionBranchTip.prototype.isAsynchronous = function() {
    return this.instruction.isAsynchronous;
  };

  CustomInstructionBranchTip.prototype.getIcon = function() {
    return this.instruction.getIcon();
  };

  CustomInstructionBranchTip.prototype.clone = function() {
    return this.copy(new CustomInstructionBranchTip(this.instruction.clone(), this.getConseq, this.getAlter()));
  };

  return CustomInstructionBranchTip;

})(BranchTip);