function replacer(str, key, value) {
  var re = new RegExp("{{" + key + "}}", "g");
  return str.replace(re, value);
}

exports.render = function(str, values) {
  if (Array.isArray(values)) {
    values.forEach(function (val, index) {
      str = replacer(str, "[" + index + "]", val);
    });
  } else {
    Object.keys(values).forEach(function (key) {
      str = replacer(str, key, values[key]);
    });
  }
  return str;
};