var extend = require('xtend');


module.exports = store;


// take levelup stream
function store(stream) {

  var cache = {};
  var changeHandler = function(){};

  stream.on('data', function(data) {
    if (data.type === 'del') {
      delete cache[data.key];
      changeHandler( getData() );
      return;
    }

    // new ones
    var d = {
      data: data.value.data
    };
    d.data.index = data.key;
    cache[data.key] = d;
    changeHandler( getData() );
  });

  function getData() {
    return extend(cache);
  }

  function onChange(cb) {
    changeHandler = cb;
  }

  return onChange;
}
