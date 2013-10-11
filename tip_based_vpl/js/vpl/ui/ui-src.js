var Frame, HelpPanel, ParameterConfigPanel, ParameterSlider, SideTipSelector, Slider, TextLabel, UICloseButton, UIOkButton, UIPanel, UIPanelBody,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextLabel = (function(_super) {
  __extends(TextLabel, _super);

  function TextLabel(text) {
    TextLabel.__super__.constructor.call(this, text);
    this.font = "18px 'Meirio', 'ヒラギノ角ゴ Pro W3', sans-serif";
    this.color = "white";
  }

  return TextLabel;

})(Label);

UIPanel = (function(_super) {
  __extends(UIPanel, _super);

  function UIPanel(content) {
    UIPanel.__super__.constructor.call(this, Resources.get("panel"));
    this.body = new UIPanelBody(this, content);
    this.addChild(this.sprite);
    this.addChild(this.body);
    this.setContent(content);
  }

  UIPanel.prototype.setTitle = function(title) {
    return this.body.label.text = title;
  };

  UIPanel.prototype.setContent = function(content) {
    return this.body.setContent(content);
  };

  UIPanel.prototype.onClosed = function(closedWithOK) {};

  UIPanel.prototype.show = function(parent) {
    return Game.instance.currentScene.addChild(this);
  };

  UIPanel.prototype.hide = function(closedWithOK) {
    this.onClosed(closedWithOK);
    return Game.instance.currentScene.removeChild(this);
  };

  return UIPanel;

})(SpriteGroup);

UIPanelBody = (function(_super) {
  __extends(UIPanelBody, _super);

  function UIPanelBody(parent, content) {
    this.parent = parent;
    this.content = content;
    UIPanelBody.__super__.constructor.call(this, Resources.get("miniPanel"));
    this.label = new TextLabel("");
    this.moveTo(Environment.EditorX + Environment.ScreenWidth / 2 - this.getWidth() / 2, Environment.EditorY + Environment.EditorHeight / 2 - this.getHeight() / 2);
    this.closeButton = new UICloseButton(this.parent);
    this.okButton = new UIOkButton(this.parent);
    this.closedWithOK = false;
    this.okButton.moveTo(this.getWidth() / 2 - this.okButton.width / 2, this.getHeight() - this.okButton.height - 24);
    this.closeButton.moveTo(32, 24);
    this.label.moveTo(80, 28);
    this.content.moveTo(90, 24);
    this.addChild(this.sprite);
    this.addChild(this.closeButton);
    this.addChild(this.okButton);
    this.addChild(this.label);
  }

  UIPanelBody.prototype.setContent = function(content) {
    if (this.content) {
      this.removeChild(this.content);
    }
    this.content = content;
    this.content.moveTo(32, 64);
    return this.addChild(content);
  };

  return UIPanelBody;

})(SpriteGroup);

UICloseButton = (function(_super) {
  __extends(UICloseButton, _super);

  function UICloseButton(parent) {
    var _this = this;
    this.parent = parent;
    UICloseButton.__super__.constructor.call(this, Resources.get("closeButton"));
    this.addEventListener('touchstart', function() {
      return _this.parent.hide(false);
    });
  }

  return UICloseButton;

})(ImageSprite);

UIOkButton = (function(_super) {
  __extends(UIOkButton, _super);

  function UIOkButton(parent) {
    var _this = this;
    this.parent = parent;
    UIOkButton.__super__.constructor.call(this, Resources.get("okButton"));
    this.addEventListener('touchstart', function() {
      return _this.parent.hide(true);
    });
  }

  return UIOkButton;

})(ImageSprite);

HelpPanel = (function(_super) {
  __extends(HelpPanel, _super);

  function HelpPanel(x, y, w, h, text) {
    this.text = text;
    HelpPanel.__super__.constructor.call(this, Resources.get("helpPanel"));
    this.label = new TextLabel(this.text);
    this.moveTo(x, y);
    this.label.width = w;
    this.label.height = h;
    this.label.x = 16;
    this.label.y = 16;
    this.addChild(this.sprite);
    this.addChild(this.label);
  }

  HelpPanel.prototype.setText = function(text) {
    return this.label.text = text;
  };

  HelpPanel.prototype.getText = function() {
    return this.label.text;
  };

  return HelpPanel;

})(SpriteGroup);

Frame = (function(_super) {
  __extends(Frame, _super);

  function Frame() {
    Frame.__super__.constructor.call(this, Resources.get("frame"));
    this.touchEnabled = false;
  }

  return Frame;

})(ImageSprite);

ParameterSlider = (function(_super) {
  __extends(ParameterSlider, _super);

  function ParameterSlider(parameter) {
    this.parameter = parameter;
    ParameterSlider.__super__.constructor.call(this, this.parameter.min, this.parameter.max, this.parameter.step, this.parameter.value);
  }

  ParameterSlider.prototype.show = function() {
    this.scroll(this.parameter.getValue());
    return ParameterSlider.__super__.show.call(this);
  };

  ParameterSlider.prototype.setText = function() {
    return ParameterSlider.__super__.setText.call(this, this.parameter.mkLabel());
  };

  ParameterSlider.prototype.onValueChanged = function() {
    this.parameter.setValue(this.value);
    return this.setText(this.parameter.mkLabel());
  };

  return ParameterSlider;

})(Slider);

ParameterConfigPanel = (function(_super) {
  __extends(ParameterConfigPanel, _super);

  function ParameterConfigPanel(target) {
    this.target = target;
    ParameterConfigPanel.__super__.constructor.call(this);
  }

  ParameterConfigPanel.prototype.addParameter = function(parameter) {
    var slider;
    slider = new ParameterSlider(parameter);
    slider.moveTo(slider.titleWidth, this.childNodes.length * slider.getHeight());
    slider.setTitle(parameter.valueName);
    return this.addChild(slider);
  };

  ParameterConfigPanel.prototype.show = function(tip) {
    var backup, i, param, _i, _len, _ref,
      _this = this;
    if ((tip.parameters != null) && tip.parameters.length > 0) {
      backup = {};
      _ref = tip.parameters;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        param = _ref[i];
        backup[i] = param.getValue();
        if (param._onValueChanged == null) {
          param._onValueChanged = param.onValueChanged;
          param.onValueChanged = function() {
            this._onValueChanged();
            return tip.setDescription(tip.code.mkDescription());
          };
        }
        this.addParameter(param);
      }
      this.target.ui.configPanel.setContent(this);
      this.target.ui.configPanel.show(tip);
      return this.target.ui.configPanel.onClosed = function(closedWithOK) {
        var _j, _len1, _ref1, _results;
        if (closedWithOK) {
          tip.icon = tip.getIcon();
          return tip.setDescription(tip.code.mkDescription());
        } else {
          _ref1 = tip.parameters;
          _results = [];
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            param = _ref1[i];
            param.setValue(backup[i]);
            _results.push(param.onParameterComplete());
          }
          return _results;
        }
      };
    }
  };

  return ParameterConfigPanel;

})(SpriteGroup);

SideTipSelector = (function(_super) {
  var VISIBLE_TIP_COUNT;

  __extends(SideTipSelector, _super);

  VISIBLE_TIP_COUNT = 8;

  function SideTipSelector(x, y) {
    var background, tipHeight,
      _this = this;
    SideTipSelector.__super__.constructor.call(this, 160, 500);
    this.moveTo(x, y);
    this.scrollPosition = 0;
    background = new ImageSprite(Resources.get('sidebar'));
    this.addChild(background);
    tipHeight = Resources.get("emptyTip").height;
    this.topArrow = new ImageSprite(Resources.get('arrow'));
    this.topArrow.rotate(-90);
    this.topArrow.moveTo((this.width - this.topArrow.width) / 2, 0);
    this.topArrow.on(Event.TOUCH_START, function() {
      if (_this.scrollPosition <= 0) {
        return;
      }
      _this.scrollPosition -= 1;
      _this.tipGroup.moveBy(0, tipHeight);
      return _this._updateVisibility();
    });
    this.addChild(this.topArrow);
    this.bottomArrow = new ImageSprite(Resources.get('arrow'));
    this.bottomArrow.rotate(90);
    this.bottomArrow.moveTo((this.width - this.bottomArrow.width) / 2, this.height - this.bottomArrow.height);
    this.bottomArrow.on(Event.TOUCH_START, function() {
      if (_this.scrollPosition > _this._getTipCount() - VISIBLE_TIP_COUNT - 1) {
        return;
      }
      _this.scrollPosition += 1;
      _this.tipGroup.moveBy(0, -tipHeight);
      return _this._updateVisibility();
    });
    this.addChild(this.bottomArrow);
    this.createTipGroup();
    this.addChild(this.tipGroup);
  }

  SideTipSelector.prototype.createTipGroup = function() {
    this.tipGroup = new EntityGroup(64, 0);
    this.tipGroup.backgroundColor = '#ff0000';
    return this.tipGroup.moveTo(this.topArrow.x, this.topArrow.y + this.topArrow.height);
  };

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

  SideTipSelector.prototype.clearTip = function() {
    this.removeChild(this.tipGroup);
    this.createTipGroup();
    this.addChild(this.tipGroup);
    return this.scrollPosition = 0;
  };

  return SideTipSelector;

})(EntityGroup);

Slider = (function(_super) {
  __extends(Slider, _super);

  function Slider(min, max, step, value) {
    var labelPaddingX, labelPaddingY;
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = value;
    Slider.__super__.constructor.call(this, Resources.get("slider"));
    this.titleWidth = 128;
    labelPaddingY = 4;
    labelPaddingX = 12;
    this.knob = new ImageSprite(Resources.get("sliderKnob"));
    this.knob.touchEnabled = false;
    this.label = new TextLabel("");
    this.title = new TextLabel("");
    this.knob.moveTo(0, this.knob.width / 2);
    this.title.moveTo(-this.titleWidth, labelPaddingY);
    this.label.moveTo(this.getWidth() + labelPaddingX, labelPaddingY);
    this.title.width = this.titleWidth;
    this.scroll(this.value);
    this.addChild(this.sprite);
    this.addChild(this.knob);
    this.addChild(this.label);
    this.addChild(this.title);
  }

  Slider.prototype.ontouchstart = function(e) {
    var value, x;
    x = e.x - this.getAbsolutePosition().x;
    value = this.positionToValue(x);
    return this.scroll(value);
  };

  Slider.prototype.ontouchmove = function(e) {
    var value, x;
    x = e.x - this.getAbsolutePosition().x;
    if (x < 0) {
      x = 0;
    }
    if (x > this.getWidth()) {
      x = this.getWidth();
    }
    value = this.positionToValue(x);
    return this.scroll(value);
  };

  Slider.prototype.onValueChanged = function() {
    return this.setText(this.value);
  };

  Slider.prototype.setTitle = function(title) {
    return this.title.text = title;
  };

  Slider.prototype.setValue = function(value) {
    this.value = value;
    return this.onValueChanged();
  };

  Slider.prototype.setText = function(text) {
    return this.label.text = text;
  };

  Slider.prototype.scroll = function(value) {
    var x;
    this.value = this.adjustValue(value);
    x = this.valueToPosition(this.value);
    this.knob.moveTo(x - this.knob.width / 2, this.knob.height / 2);
    return this.onValueChanged();
  };

  Slider.prototype.adjustValue = function(value) {
    var dist, i, nearestDist, nearestValue, _i, _ref, _ref1, _ref2;
    nearestValue = this.min;
    nearestDist = 0xffffffff;
    for (i = _i = _ref = this.min, _ref1 = this.max, _ref2 = this.step; _ref2 > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += _ref2) {
      dist = Math.abs(value - i);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestValue = i;
      }
    }
    return nearestValue;
  };

  Slider.prototype.valueToPosition = function(value) {
    var range, val, x;
    range = this.max - this.min;
    val = value - this.min;
    return x = this.getWidth() * (val / range);
  };

  Slider.prototype.positionToValue = function(x) {
    var normValue;
    normValue = x / this.getWidth();
    return this.min + normValue * (this.max - this.min);
  };

  return Slider;

})(SpriteGroup);