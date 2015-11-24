var h = require('virtual-dom/h');

module.exports = function(opts) {
  opts.onclick = opts.onclick || function(){};

  return h('button.crud-button.delete-button', {
    title: 'delete',
    onclick: opts.onclick
  }, []);
};
