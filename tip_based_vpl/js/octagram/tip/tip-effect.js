var ExecutionEffect, SelectedEffect,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SelectedEffect = (function(_super) {
  __extends(SelectedEffect, _super);

  function SelectedEffect() {
    SelectedEffect.__super__.constructor.call(this, Resources.get("selectedEffect"));
    this.visible = false;
    this.touchEnabled = false;
  }

  SelectedEffect.prototype.show = function(parent) {
    this.visible = true;
    return parent.addChild(this);
  };

  SelectedEffect.prototype.hide = function() {
    this.visible = false;
    return this.parentNode.removeChild(this);
  };

  return SelectedEffect;

})(ImageSprite);

ExecutionEffect = (function(_super) {
  __extends(ExecutionEffect, _super);

  ExecutionEffect.fadeTime = 400;

  function ExecutionEffect() {
    this._hide = __bind(this._hide, this);
    ExecutionEffect.__super__.constructor.call(this, Resources.get("execEffect"));
    this.visible = false;
    this.busy = false;
    this.tl.setTimeBased();
  }

  ExecutionEffect.prototype.show = function(parent) {
    this.tl.clear();
    this.opacity = 1;
    if (!this.busy && !this.visible) {
      parent.addChild(this);
    }
    return this.visible = true;
  };

  ExecutionEffect.prototype.hide = function() {
    if (this.visible) {
      this.tl.clear();
      this.busy = true;
      return this.tl.fadeOut(ExecutionEffect.fadeTime).then(this._hide);
    }
  };

  ExecutionEffect.prototype._hide = function() {
    this.busy = false;
    this.visible = false;
    return this.parentNode.removeChild(this);
  };

  return ExecutionEffect;

})(ImageSprite);
