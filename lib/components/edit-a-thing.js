var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var struct = require('observ-struct');
var oArray = require('observ-array');
var Form = require('vdom-components/Form');
var extend = require('xtend');
var map = require('lodash.map');

var wrapper = require('./page-wrapper.js');
var nav = require('./nav.js');


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
  var fetch = opts.fetchFn;

  var form = Form({
    fields: map(opts.fields, function(f, key) {
      return f;
    })
  });

  var s = state({
    form: Form({
      fields: map(opts.fields, function(f, key) {
        return f;
      })
    }),
    item: struct(opts.item || {}),
    itemNamePlural: value(opts.itemNamePlural),
    isValid: value(opts.isValid || false),
    handles: {
      onChange: onChange,
      submit: onSubmit(),
      setItem: setItem
    }
  });

  form(function onChange(data) {
    s.form.set(data);
  });

  function onSubmit() {
    return function(ev) {
      submitHandler(s().item.index, action, ev);
    };
  }

  function setItem(index) {
    fetch(index, function(err, res) {
      console.log(arguments);
      s.item.set(extend(res.data, {index: index}));
      // Form.set(s.form, {
      //   fields: [
      //     { field: 'Title', value: res.data.title },
      //     { field: 'Url', value: res.data.url }
      //   ]
      // });
      console.log(s());
    });
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
    Form.render(state.form),
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
