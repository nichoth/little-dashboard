var h = require('virtual-dom/h');
var head = require('./page-head.js');

module.exports = function(state, pageContent) {

  var page = h('div.main-page.'+state.itemNamePlural+'-page', [
    head(state.itemNamePlural),
    'this is the ' +state.itemNamePlural+ ' page',
    h('br'),
    pageContent
  ]);

  return h('div', [
    require('./sidebar.js')({ activeItem: state.itemNamePlural }),
    page
  ]);

};
