var createKey = require('./create-key.js');

module.exports = function(emit) {

  return {

    delVideo: function(index) {
      emit({
        type: 'deleteVideo',
        index: index
      });
    },
    createVideo: function(newData) {
      emit({
        type: 'createVideo',
        key: createKey('video', newData),
        data: {
          title: newData.title
        }
      });
    }

  };
};
