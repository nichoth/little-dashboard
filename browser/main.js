var vdom = require('virtual-dom');
var mainLoop = require('main-loop');
var url = require('url');
var catchLinks = require('catch-links');
var singlePage = require('single-page');
var observStruct = require('observ-struct');
var observVarhash = require('observ-varhash');

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

var state = observVarhash({
  app: App()
});

var loop = mainLoop(state(), render, vdom);
state(loop.update);
document.getElementById('content').appendChild(loop.target);

bus.on('route', function(newState) {
  newState.items = items;
  console.log('route event', newState);
  state.put('app', App(newState));
});

function render(state) {
  return App.render(state.app);
}
