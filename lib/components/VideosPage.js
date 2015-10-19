var h = require('virtual-dom/h');
var struct = require('observ-struct');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var state = require('@nichoth/state');

var head = require('./page-head.js');
var Video = require('./Video.js');

var store = require('../store.js')();

module.exports = VideosPage;

function VideosPage(opts) {

  var s = state({
    videos: struct({}),
  });

  store.fetch(function(data) {
    setVideos(s, data);
  });

  store.on('change', function() {
    store.fetch(function(data) {
      setVideos(s, data);
    });
  });

  return s;

}

function setVideos(state, data) {
  var vs = reduce(data, function(acc, v, k) {
    acc[k] = Video(v)();
    return acc;
  }, {});
  console.log(data);
  state.videos.set(vs);
}


VideosPage.render = function(state) {

  console.log(state);

  state.videos = state.videos || {};

  var page = h('div.main-page.videos-page', [
    head('Videos'),
    'this is videos',
    h('br'),
    h('a', {href: '/videos/new'}, ['add a new video']),
    h('ul.video-list', map(state.videos, function(v, i) {
      return h('li', {key: i}, [Video.render(v)]);
    }))
  ]);

  return h('div', [
    require('./sidebar.js')({activeItem: 'videos'}),
    page
  ]);
};
