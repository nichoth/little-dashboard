var Page = require('../components/VideosPage.js');
var struct = require('observ-struct');

module.exports = function(emit) {

  return function() {

    emit('route', {
      route: '/videos',
      page: Page(),
      renderFn: Page.render.bind(null, this.page)
    });

  };

};
