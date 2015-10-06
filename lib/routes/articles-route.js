var Page = require('../components/ArticlesPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      route: '/articles',
      renderFn: Page.render.bind( null, Page() )
    });

  };

};
