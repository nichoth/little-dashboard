var h = require('virtual-dom/h');
var state = require('@nichoth/state');


module.exports = Video;


function Video(opts) {
  opts = opts || {};
  var s = state({
    title: opts.data.title || '',
    metadata: opts.metadata || []
  });

  return s;
}

Video.render = function(state) {
  return h('div.video-item', [
    'this is a video',
    h('br'),
    h('span.title', ['title: ' + state.title])
  ]);
};
