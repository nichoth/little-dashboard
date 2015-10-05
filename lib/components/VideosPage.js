var h = require('virtual-dom/h');
var extend = require('xtend');
var map = require('lodash.map');

var head = require('./page-head.js')('videos');
var Video = require('./Video.js');

module.exports = VideosPage;

function VideosPage(opts) {

  var state = extend({
    videos: []
  }, opts);

  state.videos = state.videos.map(function(v, i) {
    return Video(v);
  });

  console.log(state);
  return state;

}


VideosPage.render = function(state) {
  console.log(state);
  // var videos = state.videos;

  return h('div.videos-page.main-page', [
    head,
    'this is videos ',
    // videos.map(function(v, i) {
    //   return Video.render(v);
    // })
  ]);
};
