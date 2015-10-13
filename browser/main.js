var vdom = require('virtual-dom');
var mainLoop = require('main-loop');
var state = require('@nichoth/state');

var router = require('../lib/routes')( document.getElementById('content') );
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


var s = state({
  app: App({
    items: items,
  })
});

router.on('route', function(data) {
  var activeItem = data.activeItem;
  var renderFn = data.renderFn;
  var page = data.page;

  s.set({
    app: App({
      items: items,
      activeItem: activeItem,
      renderFn: renderFn,
      page: page
    })()
  });
});


var loop = mainLoop(s(), render, vdom);
document.getElementById('content').appendChild(loop.target);

s(loop.update);

function render(state) {
  return App.render(state.app);
}
