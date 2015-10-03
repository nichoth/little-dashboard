var VideosPage = require('../components/VideosPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      activeItem: 'videos',
      page: VideosPage.render( VideosPage() )
    });

    console.log("video route");
  };

};
