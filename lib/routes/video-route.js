var VideosPage = require('../components/VideosPage.js');

module.exports = function(store, emit) {

  return function() {

    store.fetch('vidoes', function(err, resp) {
      route(resp);
    });

    function route(videos) {
      emit('route', {
        activeItem: 'videos',
        pageState: VideosPage({videos: videos}),
        renderFn: VideosPage.render
      });
    }

    console.log("video route");
  };

};
