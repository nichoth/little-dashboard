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

// route fn needs to return observable state object
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

    // var detailController = function() {
    //   var fetchFn = streams.db.get;
    //   var s = state({
    //     item: require('observ-struct')({}),
    //     handles: {
    //       setItem: setItem
    //     }
    //   });
    //   function setItem(index) {
    //     fetchFn(index, function(err, res) {
    //       s.item.set(res.data);
    //     });
    //   }
    //   return s;
    // };

    // detailController.render = function(state, route) {
    //   if (state.item.index !== route.id) {
    //     state.handles.setItem(route.id);
    //   }
    // };

    // return detailController;




    var p = EditPage.bind(null, {
      action: actions.updateItem,
      itemNamePlural: 'videos',
      fetchFn: streams.db.get
    });
    p.render = EditPage.render;
    return p;




  })(),
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
  return {
    'new': curryPage( CreatePage, {
      action: actionHash['new']
    }),
    'edit': curryPage( EditPage, {
      action: actionHash.edit
    })
  };

  // return reduce( actionHash, function(acc, action, actionType) {

  //   function getPage(actionType) {
  //     if (actionType === 'new') { return CreatePage; }
  //     if (actionType === 'edit') { return EditPage; }
  //     throw new Error('no match for route');
  //   }

  //   acc[actionType] = curryPage( getPage(actionType), {
  //     action: action
  //   });
  //   return acc;
  // }, {} );
}
