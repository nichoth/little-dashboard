var Page = require('../components/PhotosPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      route: '/photos',
      renderFn: Page.render.bind(null, Page())
    });

  };

};
