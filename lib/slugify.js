var slug = require('slug');

module.exports = function(str) {
  return slug(str, '_');
};
