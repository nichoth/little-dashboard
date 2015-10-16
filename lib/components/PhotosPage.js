var h = require('virtual-dom/h');
var struct = require('observ-struct');

module.exports = PhotosPage;

function PhotosPage(opts) {

  return struct({});

}

PhotosPage.render = function(state) {
  var page = h('div.main-page.photos-page', ['this is photos ']);
  return h('div', [
    require('./sidebar.js')({activeItem: 'photos'}),
    page
  ]);
};
