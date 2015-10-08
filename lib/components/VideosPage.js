var h = require('virtual-dom/h');
var head = require('./page-head.js');
var extend = require('xtend');
var struct = require('observ-struct');
var map = require('lodash.map');
var reduce = require('lodash.reduce');

var Video = require('./Video.js');

module.exports = VideosPage;

function VideosPage(opts) {

  var copy = extend({}, opts);

  var state = struct({
    videos: struct({})
  });

  copy.store.fetch(function(data) {
    setVideos(state, data);
  });

  copy.store.on('change', function() {
    console.log('test');
    copy.store.fetch(function(data) {
      setVideos(state, data);
    });
  });

  return state;

}

function setVideos(state, data) {
  var vs = reduce(data, function(acc, v, k) {
    acc[k] = Video(v)();
    return acc;
  }, {});
  state.videos.set(vs);
}

VideosPage.render = function(state) {
  state.videos = state.videos || [];
  return h('div.main-page.videos-page', [
    head('Videos'),
    'this is videos',
    h('ul', map(state.videos, function(v, i) {
      return h('li', {key: i}, [Video.render(v)]);
    }))
  ]);
};
