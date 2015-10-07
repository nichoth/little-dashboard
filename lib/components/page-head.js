var h = require('virtual-dom/h');

module.exports = function(title) {
  return h('h1.page-head', [title]);
};
