var h = require('virtual-dom/h');

module.exports = function(pageName) {
  return h('h1.page-head', [pageName]);
};
