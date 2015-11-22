var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var struct = require('observ-struct');
var Form = require('vdom-components/Form');
var map = require('lodash.map');
var extend = require('xtend');

var wrapper = require('./page-wrapper.js');
var nav = require('./nav.js');
var curry = require('../curry-component.js');


module.exports = EditPage;

// bind a form to events and actions
function EditPage(opts) {

  opts = opts || {};
  var action = opts.action || function(){};
  var event = opts.event || function(){};

  var s = state({
    form: value(''),
    item: struct(opts.item || {}),
    itemNamePlural: value(opts.itemNamePlural),
    isValid: value(opts.isValid || false),
    handles: {
      submit: onSubmit(),
    }
  });

  var formEmitter = value('');
  formEmitter(function onChange(emitter) {
    s.form.set(emitter());
    emitter(function onChange(formData) {
      s.form.set(formData);
    });
  });

  event(function onItemChange(item) {
    s.item.set(item);

    var fields = map(opts.fields, function(f, k) {
      var args = extend(f.args, {
        value: item.data[k] || ''
      });
      return curry(f.component, args);
    });

    formEmitter.set(Form({
      fields: fields
    }));
  });

  function onSubmit() {
    return function(ev) {
      submitHandler(s().item.index, action, ev);
    };
  }

  return s;
}


EditPage.render = function(state) {

  console.log('edit', arguments);

  var form = h('form.edit-a-thing.main-form', {
    onsubmit: state.handles.submit
  }, [
    state.form ? Form.render(state.form) : '',
    h('button', {
      type: 'submit',
      disabled: !Form.isValid(state.form)
    }, ['Save'])
  ]);

  return wrapper({ namePlural: state.itemNamePlural },
    nav.back('/'+state.itemNamePlural),
    form
  );

};

function submitHandler(index, saveAction, ev) {
  ev.preventDefault();
  console.log(arguments);
  var data = getFormData(ev.target.elements);

  saveAction(index, {
    title: data.title
  });
}
