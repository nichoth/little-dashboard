var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');

var VideoCreateForm = require('./VideoCreateForm.js');
var head = require('./page-head.js');

module.exports = VideoCreatePage;

function VideoCreatePage(opts) {

  var emit = opts.emit;

  var s = state({
    form: VideoCreateForm({
      fields: ['title', 'url'],
    }),
    isValid: value(opts.isValid || false),
    handles: {
      onChange: onChange()
    }
  });

  function onChange() {
    return function(data) {
      console.log(data);
      console.log(s.isValid());

      var v = VideoCreateForm.isValid(s.form);
      if ( s.isValid() !== v ) { s.isValid.set(v); }

      console.log(v);
      // s.isValid.set( v );
      console.log( s.isValid() );
    };
  }

  return s;
}

VideoCreatePage.render = function(state) {

  console.log(state);

  return h('div.main-page.new-video-page', [
    head('Videos'),
    h('form', {
      oninput: function(ev) {
        state.handles.onChange(ev.target.value);
      },
      onsubmit: submitHandler
    }, [
      VideoCreateForm.render(state.form),
      (state.isValid ? h('div', ['hams']): ''),
      h('button', {
        type: 'submit',
        // disabled: !VideoCreateForm.isValid(state.form)
        disabled: !state.isValid
      }, ['Create'])
    ])
  ]);
};

function submitHandler(ev) {
  ev.preventDefault();
  console.log('test');
  console.log(ev.target.elements);
}
