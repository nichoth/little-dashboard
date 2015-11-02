var h = require('virtual-dom/h');
var reduce = require('lodash.reduce');
var state = require('@nichoth/state');

var streams = require('./db-streams.js');
var DomainPage = require('./components/domain-page.js');
var CreatePage = require('./components/create-a-thing.js');
var EditPage = require('./components/edit-a-thing.js');
var actions = require('./actions.js')(streams.db);


function Root() {}
Root.render = function(){
  return h('div', [
    require('./components/sidebar.js')(),
    h('div.main-page', ['root route'])
  ]);
};

function curryPage(component, args) {
  var page = component.bind(component, args);
  page.render = component.render;
  return page;
}


module.exports = {
  '/': Root,
  '/videos': curryPage(DomainPage, {
    stream: streams.videos,
    itemName: 'video',
    itemNamePlural: 'videos',
  }),
  '/videos/new': curryPage(CreatePage, {
    itemNamePlural: 'videos',
    action: actions.createVideo
  }),
  '/videos/:id': (function() {
    var p = EditPage.bind(null, {
      action: actions.updateItem,
      itemNamePlural: 'videos',
      fetchFn: streams.db.get
    });
    p.render = EditPage.render;
    return p;
  })(),
  '/photos': curryPage(DomainPage, {
    stream: streams.photos,
    itemName: 'photo',
    itemNamePlural: 'photos',
  }),
  '/photos/new': curryPage(CreatePage, {
    itemNamePlural: 'photos',
    action: actions.createPhoto
  }),
  '/photos/:id': curryPage(EditPage, {
    action: actions.updateItem,
    itemNamePlural: 'photos',
    fetchFn: streams.db.get
  }),
  '/articles': curryPage(DomainPage, {
    stream: streams.articles,
    itemName: 'article',
    itemNamePlural: 'articles',
  }),
  '/articles/new': curryPage(CreatePage, {
    itemNamePlural: 'photos',
    action: actions.createArticle
  }),
  '/articles/:id': curryPage(EditPage, {
    action: actions.updateItem,
    itemNamePlural: 'articles',
    fetchFn: streams.db.get
  })
};

