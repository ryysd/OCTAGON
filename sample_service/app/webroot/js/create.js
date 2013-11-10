// Generated by CoffeeScript 1.6.3
var Frontend, getCurrentProgram;

getCurrentProgram = function() {
  return Game.instance.octagram.getCurrentInstance();
};

Frontend = (function() {
  function Frontend() {
    this.programStorage = new ProgramStorage();
    this.playerRunning = false;
    this.enemyRunning = false;
    this.currentProgramName = "";
  }

  Frontend.prototype.getPlayerProgram = function() {
    return Game.instance.octagram.getInstance(Game.instance.currentScene.world.playerProgramId);
  };

  Frontend.prototype.getEnemyProgram = function() {
    return Game.instance.octagram.getInstance(Game.instance.currentScene.world.enemyProgramId);
  };

  Frontend.prototype.showPlayerProgram = function() {
    return Game.instance.octagram.showProgram(Game.instance.currentScene.world.playerProgramId);
  };

  Frontend.prototype.showEnemyProgram = function() {
    return Game.instance.octagram.showProgram(Game.instance.currentScene.world.enemyProgramId);
  };

  Frontend.prototype.resetProgram = function(onReset) {
    var restart;
    this.stopProgram();
    restart = function() {
      if (!this.playerRunning && !this.enemyRunning) {
        Game.instance.currentScene.restart();
        if (onReset) {
          return onReset();
        }
      } else {
        return setTimeout(restart, 100);
      }
    };
    return setTimeout(restart, 100);
  };

  Frontend.prototype.restartProgram = function() {
    var _this = this;
    return this.resetProgram(function() {
      return _this.executeProgram();
    });
  };

  Frontend.prototype.editPlayerProgram = function() {
    $('#edit-player-program').hide();
    $('#edit-enemy-program').show();
    $('#program-container').css('border-color', '#5cb85c');
    return this.showPlayerProgram();
  };

  Frontend.prototype.editEnemyProgram = function() {
    $('#edit-player-program').show();
    $('#edit-enemy-program').hide();
    $('#program-container').css('border-color', '#d9534f');
    return this.showEnemyProgram();
  };

  Frontend.prototype.saveProgram = function(override) {
    var _this = this;
    if (override == null) {
      override = false;
    }
    return this.programStorage.saveProgram(override, this.currentProgramName, function(data) {
      return _this.currentProgramName = data.name;
    });
  };

  Frontend.prototype.loadProgram = function() {
    var _this = this;
    return this.programStorage.loadProgram(function(data) {
      return _this.currentProgramName = data.name;
    });
  };

  Frontend.prototype.loadProgramById = function(id, callback) {
    return this.programStorage.loadProgramById(id, callback);
  };

  Frontend.prototype.getContentWindow = function() {
    return $('iframe')[0].contentWindow;
  };

  Frontend.prototype.executeProgram = function() {
    this.playerRunning = true;
    this.enemyRunning = true;
    this.getPlayerProgram().execute({
      onStop: function() {
        return this.playerRunning = false;
      }
    });
    return this.getEnemyProgram().execute({
      onStop: function() {
        return this.enemyRunning = false;
      }
    });
  };

  Frontend.prototype.stopProgram = function() {
    this.getPlayerProgram().stop();
    return this.getEnemyProgram().stop();
  };

  return Frontend;

})();

$(function() {
  var frontend,
    _this = this;
  frontend = new Frontend();
  $('#edit-player-program').click(function() {
    $('#target-label-enemy').hide();
    $('#target-label-player').show();
    $('#save').removeAttr('disabled');
    return frontend.editPlayerProgram();
  });
  $('#edit-enemy-program').click(function() {
    $('#target-label-enemy').show();
    $('#target-label-player').hide();
    $('#save').attr('disabled', 'disabled');
    return frontend.editEnemyProgram();
  });
  $('#save').click(function() {
    return frontend.saveProgram();
  });
  $('#load').click(function() {
    return frontend.loadProgram();
  });
  $('#run').click(function() {
    frontend.executeProgram();
    $('#run').attr('disabled', 'disabled');
    $('#stop').removeAttr('disabled');
    return $('#restart').removeAttr('disabled');
  });
  $('#stop').click(function() {
    frontend.resetProgram();
    $('#run').removeAttr('disabled');
    $('#stop').attr('disabled', 'disabled');
    return $('#restart').attr('disabled', 'disabled');
  });
  return $('#restart').click(function() {
    return frontend.restartProgram();
  });
});
