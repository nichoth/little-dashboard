var h = require('virtual-dom/h');
var head = require('./page-head.js');
var extend = require('xtend');
var struct = require('observ-struct');
var map = require('lodash.map');

module.exports = VideosPage;

function VideosPage(opts) {

  var copy = extend({}, opts);

  var state = struct({
    videos: struct({})
  });

  copy.store.fetch(function(data) {
    state.videos.set(data);
  });

  copy.store.on('change', function() {
    store.fetch(function(data) {
      state.videos.set(data);
    });
  });

  return state;

}

VideosPage.render = function(state) {
  console.log(state);
  state.videos = state.videos || [];
  return h('div.main-page.videos-page', [
    head('Videos'),
    'this is videos',
    h('ul', map(state.videos, function(v, i) {
        return h('li', {key: i}, [v.data.title]);
      }))
  ]);
};
