var Page = require('../components/PhotosPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      route: '/photos',
      page: Page(),
      renderFn: Page.render.bind(null, this.page)
    });

  };

};
