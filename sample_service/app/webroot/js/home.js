// Generated by CoffeeScript 1.6.3
var GameLog;

GameLog = (function() {
  function GameLog() {
    var callback, moveToBattlePage, selector;
    selector = new ProgramSelector();
    moveToBattlePage = function(playerId, enemyId) {
      return location.href = getRoot() + "combats/matching/" + playerId + "/" + enemyId;
    };
    callback = function() {
      var name, userId,
        _this = this;
      userId = getUserId();
      if (userId === parseInt($(this).attr('user-id'))) {
        bootbox.alert("自分のプログラムとは対戦できません");
        return;
      }
      name = $(".program-name", this).text();
      return selector.modal({
        title: "" + name + "と対戦するプログラムを選んで下さい",
        buttons: [
          {
            type: "success",
            text: "選択",
            handler: function(id) {
              return moveToBattlePage(id, $(_this).attr('program-id'));
            }
          }
        ]
      });
    };
    $('.battle-log-challenger').click(callback);
    $('.battle-log-defender').click(callback);
  }

  return GameLog;

})();

$(function() {
  return new GameLog;
});