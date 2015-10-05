var vdom = require('virtual-dom');
var mainLoop = require('main-loop');
var url = require('url');
var catchLinks = require('catch-links');
var singlePage = require('single-page');

var EventEmitter = require('events').EventEmitter;
var bus = new EventEmitter();
var emit = bus.emit.bind(bus);

var App = require('../lib/App.js');
var router = require('../lib/routes')(emit);

var show = singlePage(function(href) {
  var path = url.parse(href).pathname;
  var m = router.match(path);
  if (m) {
    m.fn();
  }
});

catchLinks( document.getElementById('content'), show.bind(null) );

var items = {
  videos: {
    href: '/videos',
    name: 'videos'
  },
  articles: {
    href: '/articles',
    name: 'articles'
  },
  photos: {
    href: '/photos',
    name: 'photos'
  }
};

bus.on('route', function(state) {
  state.items = items;
  console.log(state);
  loop.update( App(state) );
});

var loop = mainLoop(App(), App.render, vdom);
document.getElementById('content').appendChild(loop.target);

emit('route', {});
