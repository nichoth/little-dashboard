var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var getFormData = require('form-data-set');

var VideoCreateForm = require('./VideoCreateForm.js');
var head = require('./page-head.js');

var emit = require('../event-bus.js').emitAction;
var createVideo = require('../actions.js')(emit).createVideo;

module.exports = VideoCreatePage;


function VideoCreatePage(opts) {

  opts = opts || {};

  var s = state({
    form: VideoCreateForm({
      fields: ['title', 'url'],
    }),
    isValid: value(opts.isValid || false),
    handles: {
      onChange: onChange
    }
  });

  function onChange() {
    var v = VideoCreateForm.isValid(s.form);
    if ( s.isValid() !== v ) { s.isValid.set(v); }
  }

  return s;
}


VideoCreatePage.render = function(state) {

  var page = h('div.main-page.new-video-page', [
    head('Videos'),
    h('form', {
      oninput: function(ev) {
        state.handles.onChange(ev.target.value);
      },
      onsubmit: submitHandler
    }, [
      VideoCreateForm.render(state.form),
      h('button', {
        type: 'submit',
        disabled: !state.isValid
      }, ['Create'])
    ])
  ]);

  return h('div', [
    require('./sidebar.js')({activeItem: 'videos'}),
    page
  ]);
};

function submitHandler(ev) {
  ev.preventDefault();
  console.log("submit");
  console.log(ev.target.elements);
  console.log(getFormData(ev.target.elements));
  var data = getFormData(ev.target.elements);

  createVideo({
    title: data.title
  });
}
