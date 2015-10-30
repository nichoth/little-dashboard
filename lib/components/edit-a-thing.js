var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var getFormData = require('form-data-set');
var Form = require('vdom-form');


module.exports = EditPage;



// need item props and values
// show a form pre-filled with stuff
// save button, cancel button
//   save button = call action cb

// validation
// __________
//
// * delegate to individual fields
// * save button is enabled iff data has changed


function EditPage(opts) {

  opts = opts || {};
  var action = opts.action || function(){};

  var s = state({
    form: Form({
      fields: ['title', 'url'],
    }),
    isValid: value(opts.isValid || false),
    handles: {
      onChange: onChange,
      submit: submitHandler.bind(null, s, action)
    }
  });

  function onChange() {
    var v = Form.isValid(s.form);
    if ( s.isValid() !== v ) { s.isValid.set(v); }
  }

  return s;
}


EditPage.render = function(state) {

  return h('div', 'this is the edit page');

  // return h('form', {
  //   oninput: function(ev) {
  //     state.handles.onChange(ev.target.value);
  //   },
  //   onsubmit: state.handles.submit
  // }, [
  //   Form.render(state.form),
  //   h('button', {
  //     type: 'submit',
  //     disabled: !state.isValid
  //   }, ['Create'])
  // ]);

};

function submitHandler(state, saveAction, ev) {
  ev.preventDefault();
  var data = getFormData(ev.target.elements);

  saveAction({
    title: data.title
  });
}
