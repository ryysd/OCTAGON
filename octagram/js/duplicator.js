// Generated by CoffeeScript 1.6.3
var Duplicator;

Duplicator = (function() {
  function Duplicator() {}

  Duplicator.copyOctagramObject = function(local) {
    var key, value, _ref, _results;
    _ref = local.parent.octagram;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      console.log('duplicate : ' + 'octagram.' + key);
      _results.push(local[key] = value);
    }
    return _results;
  };

  return Duplicator;

})();
