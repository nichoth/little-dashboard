var h = require('virtual-dom/h');
var state = require("@nichoth/state");
var oArray = require('observ-array');

var FormField = require('./FormField.js');

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
    formFields: fields
  });
  return s;
}

VideoCreate.render = function(state) {

  var fieldEls = state.formFields.map(function(f) {
    return FormField.render(f);
  });

  return h('div.video-create', fieldEls);

};
