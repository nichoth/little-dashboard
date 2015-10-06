var VideosPage = require('../components/VideosPage.js');
var struct = require('observ-struct');

module.exports = function(emit) {

  return function() {

    emit('route', {
      route: '/videos',
      renderFn: VideosPage.render.bind(null, VideosPage())
    });

  };

};
