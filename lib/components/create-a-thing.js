var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var getFormData = require('form-data-set');
var FormField = require('vdom-components/Form/FormField');
var oArray = require('observ-array');
var struct = require('observ-struct');
var map = require('lodash.map');
var titleCase = require('title-case');
var frs = require('filereader-stream');
var concat = require('concat-stream');

var wrapper = require('./page-wrapper.js');
var nav = require('./nav.js');


module.exports = CreatePage;


function CreatePage(opts) {

  opts = opts || {};
  var action = opts.action || function(){};

  var s = state({
    fields: oArray( map(opts.fields, function(component, fName) {
      return (typeof component === 'function') ?
        struct({
          type: 'file',
          state: component(),
          renderFn: value( component.render ),
          component: value(component)
        })
        :
        struct({
          type: 'field',
          state: FormField({ field: titleCase(fName) }),
          renderFn: value( FormField.render ),
          component: value(FormField)
        })
      ;
    }) ),
    itemNamePlural: value(opts.itemNamePlural || ''),
    isValid: value(opts.isValid || false),
    handles: {
      onChange: onChange,
      submit: submitHandler.bind(null, action)
    }
  });

  function onChange(state) {
    var v = s().fields.reduce(function(acc, f, i) {
      return acc && f.component.hasValue( f.state );
    }, true);
    console.log('change', v);
    if ( s.isValid() !== v ) { s.isValid.set(v); }
  }

  return s;
}


CreatePage.isValid = function(state) {
  var v = state.fields.reduce(function(acc, f, i) {
    return acc && f.component.hasValue( f.state );
  }, true);
  return v;
};


CreatePage.render = function(state) {

  console.log('create', arguments);

  var page = h('form.create-a-thing.main-form', {
    onchange: function(ev) {  // for file input
      state.handles.onChange(state);
    },
    oninput: function(ev) {
      state.handles.onChange(state);
    },
    onsubmit: function(ev) {
      state.handles.submit(state, ev);
    }
  }, [
    state.fields.map(function(f) {
      return f.renderFn(f.state);
    }),
    h('button', {
      className: state.isValid ? '' : 'disabled',
      type: 'submit',
      disabled: !state.isValid
    }, ['Create'])
  ]);

  return wrapper({ namePlural: state.itemNamePlural },
    nav.back('/'+state.itemNamePlural),
    page
  );

};


function submitHandler(createAction, state, ev) {
  ev.preventDefault();
  var data = getFormData(ev.target.elements);

  console.log(data);

  var fileField = state.fields.find(function(field) {
    return field.type === 'file';
  });

  var file = fileField.component.value(fileField.state);
  var stream = frs(file);
  stream.pipe(concat(function(buffer) {
    createAction({
      data: {
        title: data.title,
        url: data.url
      },
      attachments: {
        thumbnail: buffer
      }
    });
  }));
}
