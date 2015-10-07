var h = require('virtual-dom/h');
var struct = require('observ-struct');

module.exports = PhotosPage;

function PhotosPage(opts) {

  return struct({});

}

PhotosPage.render = function(state) {
  return h('div.main-page.photos-page', ['this is photos ']);
};
