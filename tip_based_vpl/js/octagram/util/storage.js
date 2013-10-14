var LocalStorage, ServerStorage;

LocalStorage = (function() {
  function LocalStorage() {}

  LocalStorage.prototype.save = function(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  LocalStorage.prototype.load = function(key) {
    return JSON.parse(localStorage.getItem(key));
  };

  return LocalStorage;

})();

ServerStorage = (function() {
  function ServerStorage() {}

  ServerStorage.prototype.save = function(key, value) {};

  ServerStorage.prototype.load = function(key) {};

  return ServerStorage;

})();
