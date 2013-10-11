var Cpu, Executer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Cpu = (function(_super) {
  __extends(Cpu, _super);

  function Cpu(x, y, xnum, ynum, startIdx, vm) {
    this.xnum = xnum;
    this.ynum = ynum;
    this.vm = vm;
    Cpu.__super__.constructor.call(this, Resources.get("dummy"));
    this.tipTable = [];
    this.sx = startIdx;
    this.sy = -1;
    this.storage = new LocalStorage();
    this.createTips(x, y);
  }

  Cpu.prototype.putTip = function(sx, sy, dir, newTip) {
    var dx, dy;
    dx = sx + dir.x;
    dy = sy + dir.y;
    if (this.replaceTip(newTip, sx, sy)) {
      return newTip.setNext(dx, dy, this.getTip(dx, dy));
    }
  };

  Cpu.prototype.putBranchTip = function(sx, sy, conseqDir, alterDir, newTip) {
    var adx, ady, cdx, cdy;
    cdx = sx + conseqDir.x;
    cdy = sy + conseqDir.y;
    adx = sx + alterDir.x;
    ady = sy + alterDir.y;
    if (this.replaceTip(newTip, sx, sy)) {
      newTip.setConseq(cdx, cdy, this.getTip(cdx, cdy));
      return newTip.setAlter(adx, ady, this.getTip(adx, ady));
    }
  };

  Cpu.prototype.putSingleTip = function(sx, sy, newTip) {
    return this.replaceTip(newTip, sx, sy);
  };

  Cpu.prototype.replaceTip = function(newTip, xidx, yidx) {
    var oldTip, selected;
    if (!this.getTip(xidx, yidx).immutable) {
      oldTip = this.getTip(xidx, yidx);
      selected = oldTip.isSelected();
      oldTip.hide(this);
      newTip.moveTo(oldTip.x, oldTip.y);
      newTip.setIndex(xidx, yidx);
      newTip.show(this);
      if (selected) {
        newTip.select();
      }
      this.setTip(xidx, yidx, newTip);
      return true;
    } else {
      return false;
    }
  };

  Cpu.prototype.addTip = function(sx, sy, dir, newTip) {
    return this.replaceTip(newTip, sx + dir.x, sy + dir.y);
  };

  Cpu.prototype.putStartTip = function(x, y) {
    var dir, returnTip, start;
    start = new SingleTransitionCodeTip(new StartTip);
    returnTip = TipFactory.createReturnTip(this.sx, this.sy);
    dir = Direction.down;
    this.putTip(x, y, dir, start);
    return this.replaceTip(returnTip, this.sx + dir.x, this.sy + dir.y);
  };

  Cpu.prototype.createTips = function(x, y) {
    var height, i, j, maptip, margin, space, tip, width, _i, _j, _ref, _ref1;
    tip = Resources.get("emptyTip");
    maptip = Resources.get("mapTip");
    width = tip.width;
    height = tip.height;
    margin = (maptip.width - 1 - tip.width) / 2;
    space = margin * 2 + width;
    for (i = _i = -1, _ref = this.ynum + 1; -1 <= _ref ? _i < _ref : _i > _ref; i = -1 <= _ref ? ++_i : --_i) {
      this.tipTable[i] = [];
      for (j = _j = -1, _ref1 = this.xnum + 1; -1 <= _ref1 ? _j < _ref1 : _j > _ref1; j = -1 <= _ref1 ? ++_j : --_j) {
        tip = this.isWall(j, i) ? TipFactory.createWallTip(this.sx, this.sy) : TipFactory.createEmptyTip();
        tip.moveTo(x + margin + j * space, y + margin + i * space);
        tip.setIndex(j, i);
        tip.show(this);
        this.tipTable[i][j] = tip;
      }
    }
    return this.putStartTip(this.sx, this.sy);
  };

  Cpu.prototype.insertNewTip = function(x, y, tip) {
    var alterDir, conseqDir, dir, newTip;
    newTip = tip.clone();
    if (newTip instanceof JumpTransitionCodeTip) {
      return this.putSingleTip(x, y, newTip);
    } else if (newTip.setNext != null) {
      dir = tip.getNextDir();
      dir = dir != null ? dir : Direction.down;
      return this.putTip(x, y, dir, newTip);
    } else if (newTip.setConseq != null) {
      conseqDir = tip.getConseqDir();
      alterDir = tip.getAlterDir();
      conseqDir = conseqDir != null ? conseqDir : Direction.down;
      alterDir = alterDir != null ? alterDir : Direction.right;
      return this.putBranchTip(x, y, conseqDir, alterDir, newTip);
    } else {
      return this.putSingleTip(x, y, newTip);
    }
  };

  Cpu.prototype.getNearestIndex = function(x, y) {
    var dist, dx, dy, i, j, minDist, minX, minY, tmp, _i, _j, _ref, _ref1;
    minDist = 0xffffffff;
    minX = -1;
    minY = -1;
    for (i = _i = -1, _ref = this.ynum + 1; -1 <= _ref ? _i < _ref : _i > _ref; i = -1 <= _ref ? ++_i : --_i) {
      for (j = _j = -1, _ref1 = this.xnum + 1; -1 <= _ref1 ? _j < _ref1 : _j > _ref1; j = -1 <= _ref1 ? ++_j : --_j) {
        tmp = this.getTip(j, i);
        dx = tmp.x - x;
        dy = tmp.y - y;
        dist = dx * dx + dy * dy;
        if (dist < minDist) {
          minDist = dist;
          minX = j;
          minY = i;
        }
      }
    }
    return {
      x: minX,
      y: minY
    };
  };

  Cpu.prototype.insertTipOnNearestPosition = function(x, y, tip) {
    var nearest;
    nearest = this.getNearestIndex(x, y);
    return this.insertNewTip(nearest.x, nearest.y, tip);
  };

  Cpu.prototype.serialize = function() {
    var i, j, serialized, _i, _j, _ref, _ref1;
    serialized = [];
    for (i = _i = -1, _ref = this.ynum + 1; -1 <= _ref ? _i < _ref : _i > _ref; i = -1 <= _ref ? ++_i : --_i) {
      for (j = _j = -1, _ref1 = this.xnum + 1; -1 <= _ref1 ? _j < _ref1 : _j > _ref1; j = -1 <= _ref1 ? ++_j : --_j) {
        serialized.push({
          x: j,
          y: i,
          tip: this.getTip(j, i).serialize()
        });
      }
    }
    return serialized;
  };

  Cpu.prototype.deserialize = function(serializedVal) {
    var serializedTip, tip, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = serializedVal.length; _i < _len; _i++) {
      serializedTip = serializedVal[_i];
      tip = serializedTip.tip.code.name === "WallTip" ? TipFactory.createWallTip(this.sx, this.sy) : serializedTip.tip.code.name === "StartTip" ? TipFactory.createStartTip() : serializedTip.tip.code.name === "EmptyTip" ? TipFactory.createEmptyTip() : serializedTip.tip.code.instruction == null ? this.vm.tipSet.findByCode(serializedTip.tip.code.name).clone() : this.vm.tipSet.findByInst(serializedTip.tip.code.instruction.name).clone();
      tip.deserialize(serializedTip.tip);
      _results.push(this.insertNewTip(serializedTip.x, serializedTip.y, tip));
    }
    return _results;
  };

  Cpu.prototype.save = function(fileName) {
    return this.storage.save(fileName, this.serialize());
  };

  Cpu.prototype.load = function(fileName) {
    return this.deserialize(this.storage.load(fileName));
  };

  Cpu.prototype.getTip = function(x, y) {
    return this.tipTable[y][x];
  };

  Cpu.prototype.setTip = function(x, y, tip) {
    return this.tipTable[y][x] = tip;
  };

  Cpu.prototype.getStartTip = function() {
    return this.getTip(this.sx, this.sy);
  };

  Cpu.prototype.getStartPosition = function() {
    return {
      x: this.sx,
      y: this.sy
    };
  };

  Cpu.prototype.getYnum = function() {
    return this.ynum;
  };

  Cpu.prototype.getXnum = function() {
    return this.xnum;
  };

  Cpu.prototype.isOuter = function(x, y) {
    return y === -1 || x === -1 || y === this.ynum || x === this.xnum;
  };

  Cpu.prototype.isStart = function(x, y) {
    return x === this.sx && y === this.sy;
  };

  Cpu.prototype.isWall = function(x, y) {
    return this.isOuter(x, y) && !this.isStart(x, y);
  };

  Cpu.prototype.isEmpty = function(x, y) {
    return this.getTip(x, y).code instanceof EmptyTip;
  };

  return Cpu;

})(Group);

Executer = (function(_super) {
  __extends(Executer, _super);

  Executer.latency = 30;

  function Executer(cpu) {
    this.cpu = cpu;
    this.execNext = __bind(this.execNext, this);
    this.next = null;
    this.current = null;
  }

  Executer.prototype.getNext = function() {
    if (this.next != null) {
      return this.cpu.getTip(this.next.x, this.next.y);
    } else {
      return null;
    }
  };

  Executer.prototype._execute = function(tip) {
    if (this.current != null) {
      this.current.hideExecutionEffect();
    }
    this.current = tip;
    this.current.showExecutionEffect();
    if (this.current.isAsynchronous()) {
      this.current.code.instruction.removeEventListener('completeExecution', this.execNext);
      this.current.code.instruction.addEventListener('completeExecution', this.execNext);
    }
    this.next = this.current.execute();
    if (this.next == null) {
      this.current.hideExecutionEffect();
      this.current = null;
    }
    if (!tip.isAsynchronous()) {
      return setTimeout(this.execNext, Executer.latency);
    }
  };

  Executer.prototype.execute = function() {
    var tip;
    tip = this.cpu.getStartTip();
    return this._execute(tip);
  };

  Executer.prototype.execNext = function(e) {
    var nextTip;
    nextTip = this.getNext();
    if ((this.current != null) && this.current.isAsynchronous() && e && (e.params.result != null) && this.current instanceof BranchTransitionCodeTip) {
      this.next = e.params.result ? this.current.code.getConseq() : this.current.code.getAlter();
      nextTip = this.getNext();
    }
    if (nextTip != null) {
      if (nextTip === this.current) {
        console.log("error : invalid execution timing.");
        this.next = this.current.code.getNext();
        nextTip = this.getNext();
      }
      return this._execute(nextTip);
    }
  };

  return Executer;

})(EventTarget);