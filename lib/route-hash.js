var h = require('virtual-dom/h');
var reduce = require('lodash.reduce');
var value = require('observ');

var streams = require('./db-streams.js');
var actions = require('./actions.js')(streams.db);
var DomainPage = require('./components/domain-page.js');
var CreatePage = require('./components/create-a-thing.js');
var EditPage = require('./components/edit-a-thing.js');


module.exports = createRoutes;


function createRoutes(schema) {

  var routes = schema.reduce(function(acc, item) {

    var itemEvent = value({});

    // list page
    acc['/'+item.itemNamePlural] = {
      component: {
        state: DomainPage({
          stream: streams[item.itemNamePlural],
          itemName: item.itemName,
          itemNamePlural: item.itemNamePlural
        }),
        render: DomainPage.render
      }
    };

    // create page
    acc['/'+item.itemNamePlural+'/new'] = {
      component: {
        state: CreatePage({
          fields: item.fields,
          itemNamePlural: item.itemNamePlural,
          action: actions.create.bind(actions, item.itemName)
        }),
        render: CreatePage.render
      }
    };

    // edit page
    acc['/'+item.itemNamePlural+'/:id'] = {
      component: {
        state: EditPage({
          fields: item.fields,
          action: actions.updateItem,
          itemNamePlural: item.itemNamePlural,
          event: itemEvent
        }),
        render: EditPage.render
      },
      routeFn: function(params, done) {
        actions.fetch(params.id, function(err, item) {
          itemEvent.set(item);
          done();
        });
      }
    };

    return acc;
  }, {});

  routes['/'] = {
    component: {
      state: {},
      render: function(){
        return h('div', [
          require('./components/sidebar.js')(),
          h('div.main-page', ['root route'])
        ]);
      }
    }
  };

  return routes;
}
