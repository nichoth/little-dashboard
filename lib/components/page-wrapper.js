var h = require('virtual-dom/h');
var head = require('./page-head.js');
var titleCase = require('title-case');

module.exports = function(name, pageContent) {

  var link = name.name ? h('a.create-domain-item', {
    href: '/'+name.namePlural+'/new'
  }, [
    'add a new ' + name.name
  ]) : '';

  var page = h('div.main-page.'+name.namePlural+'-page', [
    head(titleCase( name.namePlural ), link),
    h('hr'),
    pageContent
  ]);

  return h('div', [
    require('./sidebar.js')({ activeItem: name.namePlural }),
    page
  ]);

};
