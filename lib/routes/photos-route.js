var Page = require('../components/PhotosPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      activeItem: 'photos',
      page: Page.render( Page() )
    });

    console.log("photo route");
  };

};
