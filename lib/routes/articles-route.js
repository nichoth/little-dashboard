var Page = require('../components/ArticlesPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      route: '/articles',
      activeItem: 'articles',
      page: Page(),
      renderFn: Page.render.bind( null, this.page )
    });

  };

};
