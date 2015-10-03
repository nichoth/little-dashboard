var Page = require('../components/ArticlesPage.js');

module.exports = function(emit) {

  return function() {

    emit('route', {
      activeItem: 'articles',
      page: Page.render( Page() )
    });

    console.log("article route");
  };

};
