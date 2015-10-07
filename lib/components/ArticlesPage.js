var h = require('virtual-dom/h');
var struct = require('observ-struct');

module.exports = ArticlesPage;

function ArticlesPage(opts) {

  return struct({});

}

ArticlesPage.render = function(state) {
  return h('div.main-page.articles-page', ['this is articles ']);
};
