var TipParameter;

TipParameter = (function() {
  function TipParameter(valueName, value, min, max, step, id) {
    this.valueName = valueName;
    this.value = value;
    this.min = min;
    this.max = max;
    this.step = step;
    this.id = id;
    this.text = "";
  }

  TipParameter.prototype.setValue = function(value) {
    this.value = value;
    this.text = toString();
    return this.onValueChanged();
  };

  TipParameter.prototype.getValue = function() {
    return this.value;
  };

  TipParameter.prototype.onValueChanged = function() {};

  TipParameter.prototype.onParameterComplete = function() {};

  TipParameter.prototype.mkLabel = function() {};

  TipParameter.prototype.clone = function() {
    return this.copy(new TipParameter(this.valueName, this.value, this.min, this.max, this.step));
  };

  TipParameter.prototype.copy = function(obj) {
    obj.valueName = this.valueName;
    obj.value = this.value;
    obj.min = this.min;
    obj.max = this.max;
    obj.step = this.step;
    obj.id = this.id;
    return obj;
  };

  TipParameter.prototype.toString = function() {
    return this.value.toString();
  };

  TipParameter.prototype.serialize = function() {
    return {
      valueName: this.valueName,
      value: this.value
    };
  };

  TipParameter.prototype.deserialize = function(serializedVal) {
    return this.setValue(serializedVal.value);
  };

  return TipParameter;

})();
