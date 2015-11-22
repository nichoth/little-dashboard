var s = require('slug');
var slugify = function(str) {
  return s(str, '_');
};

module.exports = function(domain, data) {
  var str = domain + (data.title || '') + Date.now();
  return slugify(str);
};
