var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');


module.exports = Video;


function Video(opts) {
  opts = opts || {};
  var s = state({
    title: value( opts.data.title || '' ),
    index: opts.data.index,
    metadata: opts.metadata || [],
    handles: {
      onDelete: opts.onDelete
    }
  });

  return s;
}

Video.render = function(state) {
  return h('div.video-item', [
    'this is a video',
    h('br'),
    h('span.title', ['title: ' + state.title]),
    h('br'),
    h('button', {
      onclick: function(ev) {
        ev.preventDefault();
        console.log(ev);
        console.log(state.index);
        state.handles.onDelete();
      }
    }, 'delete')
  ]);
};
