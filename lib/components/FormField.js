var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var Input = require('vdom-input');
var value = require('observ');

module.exports = FormField;

function FormField(opts) {
  var s = state({
    field: value(opts.field || ''),
    input: Input({
      attrs: {
        name: opts.field
      }
    })
  });
  return s;
}

FormField.render = function(state) {
  return h('div.form-field', [
    h('label', [state.field]),
    Input.render(state.input)
  ]);
};
