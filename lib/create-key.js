var slugify = require('./slugify.js');

module.exports = function(domain, data) {
  var str = domain + (data.title || '') + Date.now();
  return slugify(str);
};
