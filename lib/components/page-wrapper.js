var h = require('virtual-dom/h');
var head = require('./page-head.js');

module.exports = function(namePlural, pageContent) {

  var page = h('div.main-page.'+namePlural+'-page', [
    head(namePlural),
    'this is the ' +namePlural+ ' page',
    h('br'),
    pageContent
  ]);

  return h('div', [
    require('./sidebar.js')({ activeItem: namePlural }),
    page
  ]);

};
