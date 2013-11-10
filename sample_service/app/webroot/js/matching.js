// Generated by CoffeeScript 1.6.3
var Mathing,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Mathing = (function() {
  function Mathing(playerId, enemyId) {
    this.playerId = playerId;
    this.enemyId = enemyId;
    this.retry = __bind(this.retry, this);
  }

  Mathing.prototype.start = function() {
    var _this = this;
    this.disableInput();
    this.frontend = new Frontend();
    this.frontend.editPlayerProgram();
    return this.frontend.loadProgramById(this.playerId, function() {
      _this.frontend.editEnemyProgram();
      return _this.frontend.loadProgramById(_this.enemyId, function() {
        _this.frontend.executeProgram();
        return _this.frontend.editPlayerProgram();
      });
    });
  };

  Mathing.prototype.end = function(result) {
    var data, enemy, enemyResult, isPlayerWin, player, playerResult, target,
      _this = this;
    target = getRequestURL('battle_logs', 'save');
    isPlayerWin = result.win instanceof PlayerRobot;
    player = isPlayerWin ? result.win : result.lose;
    enemy = !isPlayerWin ? result.win : result.lose;
    playerResult = {
      opponent_id: enemyId,
      is_winner: +isPlayerWin,
      program_id: this.playerId,
      remaining_hp: player.hp,
      consumed_energy: player.consumptionEnergy
    };
    enemyResult = {
      opponent_id: playerId,
      is_winner: +(!isPlayerWin),
      program_id: this.enemyId,
      remaining_hp: enemy.hp,
      consumed_energy: enemy.consumptionEnergy
    };
    data = {
      challenger: playerResult,
      defender: enemyResult
    };
    playerResult.programName = playerProgram['name'];
    enemyResult.programName = enemyProgram['name'];
    return $.post(target, data, function(response) {
      var rate, scores;
      Flash.showSuccess("結果を送信しました。");
      scores = $.parseJSON(response);
      rate = scores.rate;
      playerResult.score = scores.playerScore;
      enemyResult.score = scores.enemyScore;
      playerResult.beforeRate = rate.before.challengerRate;
      playerResult.afterRate = rate.after.challengerRate;
      enemyResult.beforeRate = rate.before.defenderRate;
      enemyResult.afterRate = rate.after.defenderRate;
      return _this.showResult(playerResult, enemyResult);
    });
  };

  Mathing.prototype.createResultView = function(playerData, enemyData) {
    var $enemyResult, $label, $labelEnergy, $labelHp, $labelProgramName, $labelRate, $labelScore, $playerResult, $result, _createResultView;
    $result = $('<div></div>').attr('id', 'battle-result');
    $playerResult = $('<div></div>').attr('id', 'player-result');
    $enemyResult = $('<div></div>').attr('id', 'enemy-result');
    _createResultView = function($parent, data, left) {
      var $energy, $hp, $icon, $programName, $rate, $score, arrow, textClass;
      arrow = left ? '  →  ' : '  ←  ';
      textClass = data.is_winner ? 'text-success' : 'text-danger';
      $icon = $('<img></img>').attr({
        "class": 'user-icon',
        src: data.iconURL
      });
      $programName = $('<div></div>').attr('class', 'program-name ' + textClass).text(data.programName);
      $hp = $('<div></div>').attr('class', 'result-text remaining-hp ' + textClass).text(data.remaining_hp);
      $energy = $('<div></div>').attr('class', 'result-text comsumed-energy ' + textClass).text(data.consumed_energy);
      $score = $('<div></div>').attr('class', 'result-text score ' + textClass).text(data.score);
      $rate = $('<div></div>').attr('class', 'result-text rate ' + textClass).text(data.beforeRate + arrow + data.afterRate);
      $parent.append($icon);
      $parent.append($programName);
      $parent.append($hp);
      $parent.append($energy);
      $parent.append($score);
      return $parent.append($rate);
    };
    $label = $('<div></div>').attr('class', 'result-label');
    $labelProgramName = $('<div></div>').attr('class', 'result-text result-label-pname').text('');
    $labelHp = $('<div></div>').attr('class', 'result-text result-label-hp').text('残りHP');
    $labelEnergy = $('<div></div>').attr('class', 'result-text result-label-energy').text('消費エネルギー');
    $labelScore = $('<div></div>').attr('class', 'result-text result-label-score').text('スコア');
    $labelRate = $('<div></div>').attr('class', 'result-text result-label-rate').text('レート');
    $label.append($labelProgramName);
    $label.append($labelHp);
    $label.append($labelEnergy);
    $label.append($labelScore);
    $label.append($labelRate);
    playerData.iconURL = playerIconURL;
    enemyData.iconURL = enemyIconURL;
    _createResultView($playerResult, playerData, true);
    _createResultView($enemyResult, enemyData, false);
    $result.append($playerResult);
    $result.append($label);
    $result.append($enemyResult);
    $result.append(this.createResultButton());
    return $result;
  };

  Mathing.prototype.retry = function() {
    var _this = this;
    return $('#battle-result').fadeOut('fast', function() {
      $('#battle-result').remove();
      return $('#enchant-stage').fadeIn('fast', function() {
        return _this.frontend.restartProgram();
      });
    });
  };

  Mathing.prototype.createResultButton = function() {
    var $backButton, $buttons, $retryButton;
    $retryButton = $('<div></div>').attr({
      id: 'retry-btn',
      "class": 'btn btn-lg btn-success result-btn'
    }).text('Retry').click(this.retry);
    $backButton = $('<a></a>').attr({
      id: 'back-btn',
      "class": 'btn btn-lg btn-danger result-btn'
    }).attr('href', getRequestURL('fronts', 'home')).text('Back');
    $buttons = $('<div></div>').attr('class', 'result-btns');
    $buttons.append($retryButton);
    $buttons.append($backButton);
    return $buttons;
  };

  Mathing.prototype.showResult = function(playerResult, enemyResult) {
    var $result,
      _this = this;
    $result = this.createResultView(playerResult, enemyResult);
    return $('#enchant-stage').fadeOut('fast', function() {
      $(_this).remove();
      return $('#program-container').append($result);
    });
  };

  Mathing.prototype.disableInput = function() {
    var $filter;
    $filter = $('<div></div>').attr('id', 'filter');
    return $('#program-container').append($filter);
  };

  return Mathing;

})();

$(function() {
  var mathing, options;
  mathing = new Mathing(playerId, enemyId);
  Config.Frame.setGameSpeed(4);
  options = {
    onload: function() {
      return mathing.start();
    },
    onend: function(result) {
      return mathing.end(result);
    }
  };
  return runGame(options);
});
