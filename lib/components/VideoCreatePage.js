var h = require('virtual-dom/h');
var state = require('@nichoth/state');

var VideoCreate = require('./VideoCreate.js');
var head = require('./page-head.js');

module.exports = VideoCreatePage;

function VideoCreatePage(opts) {

  var emit = opts.emit;

  var s = state({
    form: VideoCreate({
      fields: ['title', 'author', 'date']
    })
  });
  return s;
}

VideoCreatePage.render = function(state) {
  console.log(state);
  return h('div.main-page.new-video-page', [
    head('Videos'),
    VideoCreate.render(state.form),
    h('button', {type: 'submit'}, ['Create'])
  ]);
};
