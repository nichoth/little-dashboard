var extend = require('xtend');
var struct = require('observ-struct');

module.exports = function(opts) {
  var copy = extend(opts);
  var state = struct(copy);
  return state;
};
