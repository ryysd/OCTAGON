// Generated by CoffeeScript 1.6.3
var executeEnemyProgram, executePlayerProgram, getContentWindow, getEnemyProgram, getPlayerProgram, loadEnemyProgram, loadPlayerProgram, saveEnemyProgram, savePlayerProgram, savePlayerProgramOnServer, showEnemyProgram, showPlayerProgram;

getPlayerProgram = function() {
  return Game.instance.octagram.getInstance(Game.instance.currentScene.world.playerProgramId);
};

getEnemyProgram = function() {
  return Game.instance.octagram.getInstance(Game.instance.currentScene.world.enemyProgramId);
};

executePlayerProgram = function() {
  return getPlayerProgram().execute();
};

executeEnemyProgram = function() {
  return getEnemyProgram().execute();
};

savePlayerProgram = function() {
  return getPlayerProgram().save("player");
};

saveEnemyProgram = function() {
  return getEnemyProgram().save("enemy");
};

loadPlayerProgram = function() {
  return getPlayerProgram().load("player");
};

loadEnemyProgram = function() {
  return getEnemyProgram().load("enemy");
};

showPlayerProgram = function() {
  return Game.instance.octagram.showProgram(Game.instance.currentScene.world.playerProgramId);
};

showEnemyProgram = function() {
  return Game.instance.octagram.showProgram(Game.instance.currentScene.world.enemyProgramId);
};

getContentWindow = function() {
  return $('iframe')[0].contentWindow;
};

savePlayerProgramOnServer = function() {
  var _this = this;
  return bootbox.prompt("Enter Program Name.", function(result) {
    var playerProgram, program, serializedVal;
    if (result == null) {
      return console.log("error");
    } else {
      playerProgram = getPlayerProgram();
      serializedVal = playerProgram.serialize();
      program = {
        name: result,
        comment: "",
        serialized_data: serializedVal,
        user_id: getUserId()
      };
      console.log(program);
      return $.post("add", program, function(data) {
        return bootbox.alert(data);
      });
    }
  });
};
