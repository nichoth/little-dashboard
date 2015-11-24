var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var Form = require('vdom-components/Form');
var struct = require('observ-struct');
var value = require('observ');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var frs = require('filereader-stream');
var concat = require('concat-stream');
var extend = require('xtend');
var asyncEach = require('async-each');

var curry = require('../curry-component');
var wrapper = require('./page-wrapper.js');
var nav = require('./nav.js');


module.exports = CreatePage;


function CreatePage(opts) {

  opts = opts || {};
  var action = opts.action || function(){};

  var fields = map(opts.fields, function(f, k) {
    return curry(f.component, f.args);
  });

  var s = state({
    form: Form({
      fields: fields
    }),
    itemNamePlural: value(opts.itemNamePlural || ''),
    handles: {
      submit: function(data, event) {
        submitHandler(action, data, event);
      }
    }
  });

  return s;
}


CreatePage.render = function(state) {

  console.log('create', arguments);


  var form = h('form.create-a-thing.main-form', {
    onsubmit: state.handles.submit.bind(null, state.form)
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


function submitHandler(createAction, formData, ev) {

  ev.preventDefault();
  var d = Form.values(formData);
  console.log(d);

  var obj = {
    data: {
      title: d.title,
      url: d.url
    }
  };

  var files = reduce(d, function(acc, val, key) {
    console.log(arguments);
    if (val instanceof Array && val[0] instanceof File) {
      acc[key] = val[0];
    }
    return acc;
  }, {});

  if (Object.keys(files).length) {
    asyncEach(Object.keys(files), streamFile, function allDone(err, res) {
      if (err) { return console.log('error', arguments); }
      console.log('all done', obj);
      createAction(obj);
    });
    return;
  }

  createAction(obj);

  function streamFile(key, done) {
    var stream = frs(files[key]);
    stream.on('error', done);
    stream.pipe(concat(function(buffer) {
      obj.attachments = obj.attachments || {};
      obj.attachments[key] = buffer;
      done();
    }));
  }

}
