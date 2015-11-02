var h = require('virtual-dom/h');

module.exports = function(title, link) {
  return h('h1.page-head', [title, link]);
};
