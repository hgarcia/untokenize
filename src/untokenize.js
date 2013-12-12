function replacer(str, key, value, st, et) {
  var re = new RegExp(st + key + et, "g");
  return str.replace(re, value);
}

function getValue(values, key) {
  var val = values;
  key.split(".").forEach(function (p) {
    val = val[p]
  });
  return val;
}

exports.create = function (options) {
  var st = options && options.startToken || "{{";
  var et = options && options.endToken || "}}";
  var re = new RegExp(st + "(.[a-zA-Z0-9\.]*)" + et, "g");
  return {
    render: function(str, values) {
      if (Array.isArray(values)) {
        values.forEach(function (val, index) {
          str = replacer(str, "[" + index + "]", val, st, et);
        });
      } else {
        while(match = re.exec(str)) {
          var key = match[1];
          str = replacer(str, key, getValue(values, key), st, et);
        }
      }
      return str;
    }
  };
};