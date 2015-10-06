var vdom = require('virtual-dom');
var mainLoop = require('main-loop');
var url = require('url');

var App = require('../lib/App.js');
// var router = require('../lib/routes')();

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

// bus.on('route', function(state) {
//   state.items = items;
//   console.log(state);
//   loop.update( App(state) );
// });

var app = App({items: items});

var loop = mainLoop(app(), App.render, vdom);
document.getElementById('content').appendChild(loop.target);

app(loop.update);

// emit('route', {});
