function replacer(str, key, value, st, et) {
  var re = new RegExp(st + key + et, "g");
  return str.replace(re, value);
}

exports.create = function (options) {
  var st = options && options.startToken || "{{";
  var et = options && options.endToken || "}}";

  return {
    render: function(str, values) {
      if (Array.isArray(values)) {
        values.forEach(function (val, index) {
          str = replacer(str, "[" + index + "]", val, st, et);
        });
      } else {
        Object.keys(values).forEach(function (key) {
          str = replacer(str, key, values[key], st, et);
        });
      }
      return str;
    }
  };
};