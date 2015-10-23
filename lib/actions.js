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
        key: 'video' + newData.title + Date.now(),
        data: {
          title: newData.title
        }
      });
    }
  };

};
