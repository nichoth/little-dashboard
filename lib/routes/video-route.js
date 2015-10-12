var Page = require('../components/VideosPage.js');

module.exports = function(emit, store) {

  return function() {

    // store.fetch(update);

    update();

    function update(data) {

      var state = Page({
        store: store
      });

      var d = {
        route: '/videos',
        activeItem: 'videos',
        page: state,
        renderFn: Page.render
      };

      emit('route', d);
    }

  };

};
