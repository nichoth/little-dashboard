var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var Router = require('@nichoth/router');


module.exports = App;

function App(opts) {

  opts = opts || {};
  var schema = opts.schema;

  var s = state({
    router: Router({
      routeHash: require('./route-hash.js')(schema)
    }),
  });

  return s;
}


App.render = function(state) {

  var view = Router.route(state.router);

  return h('div.app', [
    view ? view.render(view.state) : ''
  ]);

};
