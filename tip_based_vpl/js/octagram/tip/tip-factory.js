var TipFactory;

TipFactory = (function() {
  function TipFactory() {}

  TipFactory.createReturnTip = function(sx, sy) {
    var tip;
    tip = new JumpTransitionCodeTip(new ReturnTip());
    tip.setNext(sx, sy);
    return tip;
  };

  TipFactory.createWallTip = function(sx, sy) {
    var tip;
    tip = new JumpTransitionCodeTip(new WallTip());
    tip.setNext(sx, sy);
    return tip;
  };

  TipFactory.createStartTip = function() {
    return new SingleTransitionCodeTip(new StartTip());
  };

  TipFactory.createStopTip = function(sx, sy) {
    return new CodeTip(new StopTip());
  };

  TipFactory.createEmptyTip = function(sx, sy) {
    return new CodeTip(new EmptyTip());
  };

  TipFactory.createActionTip = function(code) {
    return new SingleTransitionCodeTip(code);
  };

  TipFactory.createBranchTip = function(code) {
    return new BranchTransitionCodeTip(code);
  };

  TipFactory.createThinkTip = function(code) {
    return new SingleTransitionCodeTip(code);
  };

  TipFactory.createNopTip = function() {
    return TipFactory.createThinkTip(new NopTip());
  };

  TipFactory.createInstructionTip = function(inst) {
    if (inst instanceof ActionInstruction) {
      return TipFactory.createActionTip(new CustomInstructionActionTip(inst));
    } else if (inst instanceof BranchInstruction) {
      return TipFactory.createBranchTip(new CustomInstructionBranchTip(inst));
    } else {
      return console.log("error : invalid instruction type.");
    }
  };

  return TipFactory;

})();
