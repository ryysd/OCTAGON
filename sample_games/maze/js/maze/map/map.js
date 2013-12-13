// Generated by CoffeeScript 1.6.3
var MazeMap, R,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

MazeMap = (function(_super) {
  __extends(MazeMap, _super);

  MazeMap.TILE_WIDTH = 64;

  MazeMap.TILE_HEIGHT = 64;

  MazeMap.prototype.properties = {
    startTile: {
      get: function() {
        return this._startTile;
      }
    },
    goalTile: {
      get: function() {
        return this._goalTile;
      }
    }
  };

  function MazeMap(matrix) {
    var element, id, tile, tileLine, x, y, _i, _j, _ref, _ref1;
    MazeMap.__super__.constructor.call(this, MazeMap.UNIT_SIZE, MazeMap.UNIT_SIZE);
    this.image = Game.instance.assets[R.MAP.SRC];
    this.tileData = [];
    for (y = _i = 0, _ref = matrix.length; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
      tileLine = [];
      for (x = _j = 0, _ref1 = matrix[y].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        id = matrix[y][x];
        tile = new MapTile(x, y);
        this.addChild(tile);
        tileLine.push(tile);
        if (id !== 0) {
          if (id === StartElement.ID || id === GoalElement.ID) {
            element = ElementFactory.create(RoadElement.ID);
            tile.pushElement(element);
          }
          element = ElementFactory.create(id);
          tile.pushElement(element);
          if (element instanceof StartElement) {
            this._startTile = tile;
          } else if (element instanceof GoalElement) {
            this._goalTile = tile;
          }
        }
      }
      this.tileData.push(tileLine);
    }
    Object.defineProperties(this, this.properties);
  }

  MazeMap.prototype.getTile = function(x, y) {
    if ((0 <= x && x < this.tileData[0].length) && (0 <= y && y < this.tileData.length)) {
      return this.tileData[y][x];
    } else {
      return false;
    }
  };

  MazeMap.prototype.toPoint = function(tile) {
    return new Point(this.x + MazeMap.TILE_WIDTH * tile.index.x, this.y + MazeMap.TILE_HEIGHT * tile.index.y);
  };

  return MazeMap;

})(Group);
