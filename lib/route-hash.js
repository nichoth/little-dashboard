var h = require('virtual-dom/h');
var reduce = require('lodash.reduce');

var curryPage = require('./curry-component.js');
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


module.exports = createRoutes;


function createRoutes(schema) {

  var routes = schema.reduce(function(acc, item) {
    // list page
    acc['/'+item.itemNamePlural] = curryPage(DomainPage, {
      stream: streams[item.itemNamePlural],
      itemName: item.itemName,
      itemNamePlural: item.itemNamePlural
    });

    // create page
    acc['/'+item.itemNamePlural+'/new'] = curryPage(CreatePage, {
      fields: item.fields,
      itemNamePlural: item.itemNamePlural,
      action: actions.create.bind(actions, item.itemName)
    });

    // edit page
    acc['/'+item.itemNamePlural+'/:id'] = curryPage(EditPage, {
      fields: item.fields,
      action: actions.updateItem,
      itemNamePlural: item.itemNamePlural,
      fetchFn: streams.db.get
    });

    return acc;
  }, {});

  routes['/'] = Root;
  return routes;
}
