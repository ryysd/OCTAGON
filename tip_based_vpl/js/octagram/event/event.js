var InstructionEvent,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

InstructionEvent = (function(_super) {
  __extends(InstructionEvent, _super);

  function InstructionEvent(type, params) {
    this.params = params;
    InstructionEvent.__super__.constructor.call(this, type);
  }

  return InstructionEvent;

})(enchant.Event);
