var Page = require('../components/VideosPage.js');

module.exports = function(emit, store) {

  return function() {

    var state = Page({
      store: store
    });

    var d = {
      route: '/videos',
      activeItem: 'videos',
      // page: state,
      // renderFn: Page.render
    };

    emit('route', d);

  };

};
