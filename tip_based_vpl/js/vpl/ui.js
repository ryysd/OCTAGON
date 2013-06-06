// Generated by CoffeeScript 1.6.2
/*
# UI$B;n9T:x8m(B
*/

var Frame, HelpPanel, SelectorTip, SideSelectorArrow, SideTipSelector, UICloseButton, UIConfigWindow, UIOkButton, UIPanel, UIPanelFilter, UISpriteComponent, UITextComponent, UITipConfigurator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UISpriteComponent = (function(_super) {
  __extends(UISpriteComponent, _super);

  function UISpriteComponent(image) {
    if (image != null) {
      UISpriteComponent.__super__.constructor.call(this, image.width, image.height);
    }
    this.image = image;
    this.children = [];
    this.hidden = true;
    this.opacity = 0;
    this.fadeTime = 300;
    this.tl.setTimeBased();
  }

  UISpriteComponent.prototype.show = function() {
    var child, _i, _len, _ref, _results;

    if (this.hidden) {
      Game.instance.currentScene.addChild(this);
      this.hidden = false;
      this.tl.fadeIn(this.fadeTime);
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.show());
      }
      return _results;
    }
  };

  UISpriteComponent.prototype.hide = function() {
    var child, _i, _len, _ref, _results;

    if (!this.hidden) {
      this.hidden = true;
      this.tl.fadeOut(this.fadeTime).then(function() {
        return Game.instance.currentScene.removeChild(this);
      });
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.hide());
      }
      return _results;
    }
  };

  UISpriteComponent.prototype.addChild = function(child) {
    child.tl.setTimeBased();
    return this.children.push(child);
  };

  UISpriteComponent.prototype.removeChild = function(child) {
    var idx;

    idx = this.children.indexOf(child);
    if (idx !== -1) {
      return this.children.splice(idx, 1);
    }
  };

  UISpriteComponent.prototype.moveTo = function(x, y) {
    var child, dx, dy, _i, _len, _ref;

    _ref = this.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      dx = child.x - this.x;
      dy = child.y - this.y;
      child.moveTo(x + dx, y + dy);
    }
    return UISpriteComponent.__super__.moveTo.call(this, x, y);
  };

  return UISpriteComponent;

})(Sprite);

UITextComponent = (function(_super) {
  __extends(UITextComponent, _super);

  function UITextComponent(parent, text) {
    this.parent = parent;
    UITextComponent.__super__.constructor.call(this, text);
    this.hidden = true;
    this.opacity = 0;
    this.fadeTime = 300;
    this.tl.setTimeBased();
    this.children = [];
    this.font = "18px 'Meirio', '$B%R%i%.%N3Q%4(B Pro W3', sans-serif";
    this.color = "white";
    LayerUtil.setOrder(this, LayerOrder.dialogText);
  }

  UITextComponent.prototype.show = function() {
    var child, _i, _len, _ref, _results;

    if (this.hidden) {
      Game.instance.currentScene.addChild(this);
      this.hidden = false;
      this.tl.fadeIn(this.fadeTime);
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.show());
      }
      return _results;
    }
  };

  UITextComponent.prototype.hide = function() {
    var child, _i, _len, _ref, _results;

    this.hidden = true;
    this.tl.fadeOut(this.fadeTime).then(function() {
      return Game.instance.currentScene.removeChild(this);
    });
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.hide());
    }
    return _results;
  };

  return UITextComponent;

})(Label);

UITipConfigurator = (function(_super) {
  __extends(UITipConfigurator, _super);

  function UITipConfigurator(parent) {
    this.parent = parent;
    UITipConfigurator.__super__.constructor.call(this, Resources.get("dummy"));
  }

  return UITipConfigurator;

})(UISpriteComponent);

UIPanelFilter = (function(_super) {
  __extends(UIPanelFilter, _super);

  function UIPanelFilter() {
    UIPanelFilter.__super__.constructor.call(this, Resources.get("panel"));
    LayerUtil.setOrder(this, LayerOrder.dialog - 1);
  }

  return UIPanelFilter;

})(UISpriteComponent);

UIPanel = (function(_super) {
  __extends(UIPanel, _super);

  function UIPanel(content) {
    this.content = content;
    UIPanel.__super__.constructor.call(this, Resources.get("miniPanel"));
    this.label = new UITextComponent(this, "");
    this.filter = new UIPanelFilter();
    this.moveTo(Environment.EditorX + Environment.ScreenWidth / 2 - this.width / 2, Environment.EditorY + Environment.EditorHeight / 2 - this.height / 2);
    this.closeButton = new UICloseButton(this);
    this.okButton = new UIOkButton(this);
    this.closedWithOK = false;
    LayerUtil.setOrder(this, LayerOrder.dialog);
    this.okButton.moveTo(this.x + this.image.width / 2 - this.okButton.width / 2, this.y + this.image.height - this.okButton.height - 24);
    this.closeButton.moveTo(this.x + 32, this.y + 24);
    this.label.moveTo(this.x + 80, this.y + 28);
    this.setContent(this.content);
    this.addChild(this.content);
    this.addChild(this.closeButton);
    this.addChild(this.okButton);
    this.addChild(this.label);
    this.addChild(this.filter);
  }

  UIPanel.prototype.setTitle = function(title) {
    return this.label.text = title;
  };

  UIPanel.prototype.setContent = function(content) {
    if (this.content) {
      this.removeChild(this.content);
    }
    this.content = content;
    this.content.moveTo(this.x + 32, this.y + 64);
    return this.addChild(this.content);
  };

  UIPanel.prototype.onClosed = function(closedWithOK) {};

  UIPanel.prototype.show = function(parent) {
    this.parent = parent;
    GlobalUI.help.setText("");
    return UIPanel.__super__.show.call(this);
  };

  UIPanel.prototype.hide = function() {
    var msg;

    msg = CodeTip.selectedEffect.parent.description;
    GlobalUI.help.setText(msg);
    this.onClosed(this.closedWithOK);
    return UIPanel.__super__.hide.call(this);
  };

  return UIPanel;

})(UISpriteComponent);

UICloseButton = (function(_super) {
  __extends(UICloseButton, _super);

  function UICloseButton(parent) {
    var image,
      _this = this;

    this.parent = parent;
    image = Resources.get("closeButton");
    UICloseButton.__super__.constructor.call(this, image);
    this.image = image;
    LayerUtil.setOrder(this, LayerOrder.dialogButton);
    this.addEventListener('touchstart', function() {
      _this.parent.closedWithOK = false;
      return _this.parent.hide();
    });
  }

  return UICloseButton;

})(UISpriteComponent);

UIOkButton = (function(_super) {
  __extends(UIOkButton, _super);

  function UIOkButton(parent) {
    var image,
      _this = this;

    this.parent = parent;
    image = Resources.get("okButton");
    UIOkButton.__super__.constructor.call(this, image);
    this.image = image;
    LayerUtil.setOrder(this, LayerOrder.dialogButton);
    this.addEventListener('touchstart', function() {
      _this.parent.closedWithOK = true;
      return _this.parent.hide();
    });
  }

  return UIOkButton;

})(UISpriteComponent);

SelectorTip = (function(_super) {
  __extends(SelectorTip, _super);

  SelectorTip.selectedEffect = null;

  function SelectorTip(tip) {
    this.tip = tip;
    SelectorTip.__super__.constructor.call(this, this.tip.code);
    if (this.tip.icon != null) {
      this.icon = this.tip.icon;
      this.icon.parent = this;
    }
    this.description = this.tip.description;
    if (SelectorTip.selectedEffect == null) {
      SelectorTip.selectedEffect = new SelectedEffect();
    }
    LayerUtil.setOrder(this, LayerOrder.frameUI);
    LayerUtil.setOrder(SelectorTip.selectedEffect, LayerOrder.frameUIEffect);
    if (this.icon != null) {
      LayerUtil.setOrder(this.icon, LayerOrder.frameUIIcon);
    }
  }

  SelectorTip.prototype.showSelectedEffect = function() {
    return SelectorTip.selectedEffect.show(this);
  };

  SelectorTip.prototype.hideSelectedEffect = function() {
    return SelectorTip.selectedEffect.hide();
  };

  SelectorTip.prototype.doubleClicked = function() {};

  SelectorTip.prototype.createGhost = function() {
    var tip;

    tip = SelectorTip.__super__.createGhost.call(this);
    LayerUtil.setOrder(tip, LayerOrder.frameUI);
    if (tip.icon != null) {
      LayerUtil.setOrder(tip.icon, LayerOrder.frameUIIcon);
    }
    return tip;
  };

  SelectorTip.prototype.clone = function() {
    return this.tip.clone();
  };

  return SelectorTip;

})(CodeTip);

SideSelectorArrow = (function(_super) {
  __extends(SideSelectorArrow, _super);

  function SideSelectorArrow(parent) {
    this.parent = parent;
    SideSelectorArrow.__super__.constructor.call(this, Resources.get("arrow"));
    LayerUtil.setOrder(this, LayerOrder.frameUIArrow);
  }

  return SideSelectorArrow;

})(UISpriteComponent);

SideTipSelector = (function(_super) {
  __extends(SideTipSelector, _super);

  function SideTipSelector(x, y, parent) {
    var dummy,
      _this = this;

    this.parent = parent;
    SideTipSelector.__super__.constructor.call(this, Resources.get("sidebar"));
    this.moveTo(x, y);
    this.padding = 56;
    LayerUtil.setOrder(this, LayerOrder.frameUI);
    this.topArrow = new SideSelectorArrow();
    this.bottomArrow = new SideSelectorArrow();
    this.topArrow.rotate(-90);
    this.bottomArrow.rotate(90);
    this.topArrow.moveTo(this.x + this.width / 2 - this.topArrow.width / 2, this.y);
    this.bottomArrow.moveTo(this.x + this.width / 2 - this.bottomArrow.width / 2, this.y + this.height - this.bottomArrow.height);
    this.addChild(this.topArrow);
    this.addChild(this.bottomArrow);
    this.topArrow.addEventListener('touchstart', function() {
      return _this.scrollDown();
    });
    this.bottomArrow.addEventListener('touchstart', function() {
      return _this.scrollUp();
    });
    dummy = Resources.get("emptyTip");
    this.capacity = 8;
    this.scrollPosition = 0;
  }

  SideTipSelector.prototype.addTip = function(tip) {
    var uiTip;

    uiTip = new SelectorTip(tip);
    uiTip.moveTo(this.x + this.padding, this.y + this.padding + this.getTipNum() * tip.height);
    this.hideOuter(uiTip);
    return this.addChild(uiTip);
  };

  SideTipSelector.prototype.isOut = function(tip) {
    return tip.y < (this.topArrow.y + this.topArrow.height / 2) || tip.y > (this.bottomArrow.y - this.bottomArrow.height / 2);
  };

  SideTipSelector.prototype.hideOuter = function(tip) {
    var opacity;

    opacity = this.isOut(tip) ? 0 : 1;
    tip.opacity = opacity;
    if (tip.icon != null) {
      return tip.icon.opacity = opacity;
    }
  };

  SideTipSelector.prototype.getTipNum = function() {
    return this.children.length - 2;
  };

  SideTipSelector.prototype.isUpScrollable = function() {
    var rest;

    rest = this.getTipNum() - this.scrollPosition;
    return rest > this.capacity;
  };

  SideTipSelector.prototype.isDownScrollable = function() {
    return this.scrollPosition > 0;
  };

  SideTipSelector.prototype.scrollUp = function() {
    var child, _i, _len, _ref, _results;

    if (this.isUpScrollable()) {
      this.scrollPosition += 1;
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child instanceof SelectorTip) {
          child.unselect();
          child.moveBy(0, -child.height);
          _results.push(this.hideOuter(child));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  SideTipSelector.prototype.scrollDown = function() {
    var child, _i, _len, _ref, _results;

    if (this.isDownScrollable()) {
      this.scrollPosition -= 1;
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child instanceof SelectorTip) {
          child.unselect();
          child.moveBy(0, child.height);
          _results.push(this.hideOuter(child));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  return SideTipSelector;

})(UISpriteComponent);

UIConfigWindow = (function(_super) {
  __extends(UIConfigWindow, _super);

  function UIConfigWindow(parent) {
    this.parent = parent;
    UIConfigWindow.__super__.constructor.call(this, Resources.get("dummy"));
  }

  UIConfigWindow.prototype.show = function(target) {
    return UIConfigWindow.__super__.show.call(this);
  };

  return UIConfigWindow;

})(UISpriteComponent);

HelpPanel = (function(_super) {
  __extends(HelpPanel, _super);

  function HelpPanel(x, y, w, h, text) {
    this.text = text;
    HelpPanel.__super__.constructor.call(this, w, h);
    this.image = Resources.get("helpPanel");
    this.label = new Label(this.text);
    this.label._element = document.createElement("div");
    this.label.text = this.text;
    this.x = x;
    this.y = y;
    this.label.width = w;
    this.label.height = h;
    this.label.x = this.x + 16;
    this.label.y = this.y + 16;
    this.label.font = "18px 'Meirio', '$B%R%i%.%N3Q%4(B Pro W3', sans-serif";
    this.label.color = "white";
    LayerUtil.setOrder(this, LayerOrder.messageWindow);
    LayerUtil.setOrder(this.label, LayerOrder.messageText);
  }

  HelpPanel.prototype.mkMsgHtml = function(text) {
    return "<div class='msg'>" + text + "</div>";
  };

  HelpPanel.prototype.show = function() {
    Game.instance.currentScene.addChild(this);
    return Game.instance.currentScene.addChild(this.label);
  };

  HelpPanel.prototype.setText = function(text) {
    return this.label.text = this.mkMsgHtml(text);
  };

  HelpPanel.prototype.getText = function() {
    return this.label.text;
  };

  return HelpPanel;

})(Sprite);

Frame = (function() {
  function Frame(x, y) {
    var borderHeight, borderWidth, contentHeight, contentWidth, frameHeight, frameWidth;

    frameWidth = 640;
    frameHeight = 640;
    contentWidth = 480;
    contentHeight = 480;
    borderWidth = 16;
    borderHeight = 16;
    this.top = new Sprite(frameWidth, borderWidth);
    this.bottom = new Sprite(frameWidth, frameHeight - contentHeight - borderHeight);
    this.left = new Sprite(borderWidth, frameHeight);
    this.right = new Sprite(frameWidth - contentWidth - borderWidth, frameHeight);
    this.top.image = Resources.get("frameTop");
    this.bottom.image = Resources.get("frameBottom");
    this.left.image = Resources.get("frameLeft");
    this.right.image = Resources.get("frameRight");
    this.top.moveTo(x, y);
    this.bottom.moveTo(x, y + borderHeight + contentHeight);
    this.left.moveTo(x, y);
    this.right.moveTo(borderWidth + contentWidth, y);
    LayerUtil.setOrder(this.top, LayerOrder.frame);
    LayerUtil.setOrder(this.left, LayerOrder.frame);
    LayerUtil.setOrder(this.right, LayerOrder.frame);
    LayerUtil.setOrder(this.bottom, LayerOrder.frame);
  }

  Frame.prototype.show = function() {
    Game.instance.currentScene.addChild(this.top);
    Game.instance.currentScene.addChild(this.bottom);
    Game.instance.currentScene.addChild(this.left);
    return Game.instance.currentScene.addChild(this.right);
  };

  return Frame;

})();
