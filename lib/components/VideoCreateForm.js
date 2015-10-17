var h = require('virtual-dom/h');
var state = require("@nichoth/state");
var oArray = require('observ-array');
var value = require('observ');
var FormField = require('vdom-form-field');
var reduce = require('lodash.reduce');


module.exports = VideoCreate;

function VideoCreate(opts) {
  opts = opts || {};
  opts.fields = opts.fields || [];

  var fields = oArray(opts.fields.map(function(f) {
    return FormField({
      field: f
    });
  }));

  var s = state({
    formFields: fields,
  });

  return s;
}

// is valid if all inputs have a value. Need to change this
VideoCreate.isValid = function(state) {
  var fs = state.formFields();
  return fs.reduce(function(acc, f, i) {
    return acc && FormField.hasValue( state.formFields.get(i) );
  }, true);
};

VideoCreate.render = function(state) {

  var fieldEls = state.formFields.map(function(f) {
    return FormField.render(f);
  });

  return h('div.video-create', [
    fieldEls
  ]);

};
