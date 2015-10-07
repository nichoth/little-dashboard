var vdom = require('virtual-dom');
var mainLoop = require('main-loop');

var App = require('../lib/App.js');

var items = {
  videos: {
    href: '/videos',
    itemName: 'videos'
  },
  articles: {
    href: '/articles',
    itemName: 'articles'
  },
  photos: {
    href: '/photos',
    itemName: 'photos'
  }
};

var app = App({items: items});

var loop = mainLoop(app(), App.render, vdom);
document.getElementById('content').appendChild(loop.target);

app(loop.update);
