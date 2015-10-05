var h = require('virtual-dom/h');
var extend = require('xtend');
var observ = require('observ');
var observStruct = require('observ-struct');

module.exports = Video;

function Video(opts) {

  var copy = extend(opts);

  uiState = {
    expanded: observ(copy.expanded || false)
  };

  var state = extend({
    _name: 'test name',
    metadata: [{
      field: 'test',
      value: 'test value'
    }]
  }, copy);

  state.uiState = uiState;

  return observStruct(state);
}

Video.render = function(state) {
  var el = h('ul', {
    style: {
      listStyle: 'none',
      paddingLeft: 0
    }
  }, [
    h('span.video-title', [ h('a', {
      onclick: function(ev) {

      },
      href: '#'
    }, state._name) ]),
    state.metadata.map(function(m, i) {
      return h('li', [
        h('span.metadata-field', [m.field, ': ']),
        h('span.metadata-value', [m.value])
      ]);
    })
  ]);

  return el;
};
