var h = require('virtual-dom/h');
var reduce = require('lodash.reduce');

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
  '/videos/:action?': curryPage(DomainPage, {
    stream: streams.videos,
    itemName: 'video',
    itemNamePlural: 'videos',
    subRoutes: subRoutes({
      'new': actions.createVideo,
      'edit': actions.updateItem
    })
  }),
  '/photos/:action?': curryPage(DomainPage, {
    stream: streams.photos,
    itemName: 'photo',
    itemNamePlural: 'photos',
    subRoutes: subRoutes({
      'new': actions.createPhoto
    })
  }),
  '/articles/:action?': curryPage(DomainPage, {
    stream: streams.articles,
    itemName: 'article',
    itemNamePlural: 'articles',
    subRoutes: subRoutes({
      'new': actions.createArticle
    })
  })
};


function subRoutes(actionHash) {
  return reduce( actionHash, function(acc, action, actionType) {

    function getPage(actionType) {
      if (actionType === 'new') { return CreatePage; }
      if (actionType === 'edit') { return EditPage; }
      throw new Error('no match for route');
    }

    acc[actionType] = curryPage( getPage(actionType), {
      action: action
    });
    return acc;
  }, {} );
}
