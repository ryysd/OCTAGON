// Generated by CoffeeScript 1.6.2
var SideTipSelector,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SideTipSelector = (function(_super) {
  var VISIBLE_TIP_COUNT;

  __extends(SideTipSelector, _super);

  VISIBLE_TIP_COUNT = 8;

  function SideTipSelector(x, y) {
    var background, bottomArrow, tipHeight, topArrow,
      _this = this;

    SideTipSelector.__super__.constructor.call(this, 160, 500);
    this.moveTo(x, y);
    this.scrollPosition = 0;
    background = new ImageSprite(Resources.get('sidebar'));
    this.addChild(background);
    tipHeight = Resources.get("emptyTip").height;
    topArrow = new ImageSprite(Resources.get('arrow'));
    topArrow.rotate(-90);
    topArrow.moveTo((this.width - topArrow.width) / 2, 0);
    topArrow.on(Event.TOUCH_START, function() {
      if (_this.scrollPosition <= 0) {
        return;
      }
      _this.scrollPosition -= 1;
      _this.tipGroup.moveBy(0, tipHeight);
      return _this._updateVisibility();
    });
    this.addChild(topArrow);
    bottomArrow = new ImageSprite(Resources.get('arrow'));
    bottomArrow.rotate(90);
    bottomArrow.moveTo((this.width - bottomArrow.width) / 2, this.height - bottomArrow.height);
    bottomArrow.on(Event.TOUCH_START, function() {
      if (_this.scrollPosition > _this._getTipCount() - VISIBLE_TIP_COUNT - 1) {
        return;
      }
      _this.scrollPosition += 1;
      _this.tipGroup.moveBy(0, -tipHeight);
      return _this._updateVisibility();
    });
    this.addChild(bottomArrow);
    this.tipGroup = new EntityGroup(64, 0);
    this.tipGroup.backgroundColor = '#ff0000';
    this.tipGroup.moveTo(topArrow.x, topArrow.y + topArrow.height);
    this.addChild(this.tipGroup);
  }

  SideTipSelector.prototype.addTip = function(tip) {
    var tipCount, uiTip;

    tipCount = this._getTipCount();
    uiTip = tip.clone();
    if (tipCount >= VISIBLE_TIP_COUNT) {
      uiTip.setVisible(false);
    }
    uiTip.moveTo(8, -6 + tipCount * tip.getHeight());
    return this.tipGroup.addChild(uiTip);
  };

  SideTipSelector.prototype._getTipCount = function() {
    return this.tipGroup.childNodes.length;
  };

  SideTipSelector.prototype._updateVisibility = function() {
    var update,
      _this = this;

    update = function(index, flag) {
      if ((0 <= index && index < _this._getTipCount())) {
        return _this.tipGroup.childNodes[index].setVisible(flag);
      }
    };
    update(this.scrollPosition - 1, false);
    update(this.scrollPosition + VISIBLE_TIP_COUNT, false);
    update(this.scrollPosition, true);
    return update(this.scrollPosition + VISIBLE_TIP_COUNT - 1, true);
  };

  return SideTipSelector;

})(EntityGroup);
