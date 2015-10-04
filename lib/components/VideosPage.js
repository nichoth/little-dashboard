var h = require('virtual-dom/h');
var extend = require('xtend');
var head = require('./page-head.js')('videos');

module.exports = VideosPage;

function VideosPage(opts) {

  opts = opts || {};

  var state = extend({
    videos: [],
  }, opts);

  return state;

}


VideosPage.render = function(state) {
  return h('div.videos-page.main-page', [
    head,
    'this is videos '
  ]);
};
