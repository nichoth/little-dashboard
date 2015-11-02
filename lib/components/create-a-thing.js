var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var getFormData = require('form-data-set');
var CreateForm = require('vdom-form');

var wrapper = require('./page-wrapper.js');


module.exports = CreatePage;


function CreatePage(opts) {

  opts = opts || {};
  var action = opts.action || function(){};

  var s = state({
    form: CreateForm({
      fields: [
        { field: 'title' },
        { field: 'url' }
      ],
    }),
    itemNamePlural: value(opts.itemNamePlural || ''),
    isValid: value(opts.isValid || false),
    handles: {
      onChange: onChange,
      submit: submitHandler.bind(null, s, action)
    }
  });

  function onChange() {
    var v = CreateForm.isValid(s.form);
    if ( s.isValid() !== v ) { s.isValid.set(v); }
  }

  return s;
}


CreatePage.render = function(state, route) {

  console.log('create', arguments);

  var page = h('form', {
    oninput: function(ev) {
      state.handles.onChange(ev.target.value);
    },
    onsubmit: state.handles.submit
  }, [
    'this is the create page',
    CreateForm.render(state.form),
    h('button', {
      type: 'submit',
      disabled: !state.isValid
    }, ['Create'])
  ]);

  return wrapper(state.itemNamePlural, page);

};

function submitHandler(state, createAction, ev) {
  ev.preventDefault();
  var data = getFormData(ev.target.elements);

  createAction({
    title: data.title
  });
}
