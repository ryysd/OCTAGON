var TipBackground,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TipBackground = (function(_super) {
  __extends(TipBackground, _super);

  function TipBackground(x, y, xnum, ynum) {
    var background, border, height, i, j, map, margin, space, tip, width, _i, _j, _ref, _ref1;
    TipBackground.__super__.constructor.call(this);
    border = Resources.get("mapBorder");
    background = Resources.get("mapTip");
    tip = Resources.get("emptyTip");
    margin = (background.width - 1 - tip.width) / 2;
    space = margin * 2 + tip.width;
    width = background.width;
    height = background.height;
    x += border.height;
    y += border.height;
    for (i = _i = -1, _ref = xnum + 1; -1 <= _ref ? _i < _ref : _i > _ref; i = -1 <= _ref ? ++_i : --_i) {
      for (j = _j = -1, _ref1 = ynum + 1; -1 <= _ref1 ? _j < _ref1 : _j > _ref1; j = -1 <= _ref1 ? ++_j : --_j) {
        map = new Sprite(width, height);
        map.image = background;
        map.moveTo(x + j * space, y + i * space);
        this.addChild(map);
      }
    }
  }

  return TipBackground;

})(Group);
