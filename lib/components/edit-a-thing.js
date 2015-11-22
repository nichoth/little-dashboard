var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var struct = require('observ-struct');
// var oArray = require('observ-array');
var Form = require('vdom-components/Form');
var extend = require('xtend');
var map = require('lodash.map');

var wrapper = require('./page-wrapper.js');
var nav = require('./nav.js');
var curry = require('../curry-component.js');


module.exports = EditPage;



// need item props and values
// show a form pre-filled with stuff
// save button, cancel button
//   save button = call action cb

// validation
// __________
//
// * delegate to individual fields
// * save button is enabled iff data has changed and is valid


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
      onChange: onChange,
      submit: onSubmit(),
    }
  });

  // var form = Form({
  //   fields: map(opts.fields, function(f, key) {
  //     return f;
  //   })
  // });

  // form(function onChange(data) {
  //   s.form.set(data);
  // });

  var formEmitter = struct({
    emitter: value(''),
  });

  formEmitter(function onChange(data) {
    console.log('ham');
    s.form.set(data.emitter());
    data.emitter(function onChange(formData) {
      console.log('ham 2');
      s.form.set(formData);
    });
  });

  event(function onChange(item) {
    console.log('event thing', arguments);
    s.item.set(item);

    var fields = map(opts.fields, function(f, k) {
      var args = extend(f.args, {
        value: item.data[k] || ''
      });
      return curry(f.component, args);
    });

    console.log(fields);

    formEmitter.emitter.set(Form({
      fields: fields
    }));
  });

  function onSubmit() {
    return function(ev) {
      submitHandler(s().item.index, action, ev);
    };
  }

  function onChange() {
    var v = Form.isValid(s.form);
    if ( s.isValid() !== v ) { s.isValid.set(v); }
  }

  return s;
}


EditPage.render = function(state) {

  console.log('edit', arguments);

  var form = h('form.edit-a-thing.main-form', {
    oninput: function(ev) {
      state.handles.onChange(ev.target.value);
    },
    onsubmit: state.handles.submit
  }, [
    state.form ? Form.render(state.form) : '',
    h('button', {
      type: 'submit',
      disabled: !state.isValid
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
