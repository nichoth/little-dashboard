var Page = require('../components/VideoCreatePage.js');

module.exports = function(routeEmit, videoEmit) {

  return function() {

    update();

    function update(data) {

      var state = Page({
        emit: videoEmit
      });

      var d = {
        route: '/videos/new',
        activeItem: 'videos',
        page: state,
        renderFn: Page.render
      };

      routeEmit('route', d);
    }

  };

};
