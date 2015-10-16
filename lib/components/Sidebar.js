var sb = require('vdom-sidebar');

module.exports = function(opts) {

  opts = opts || {};

  var items = {
    videos: {
      href: '/videos',
      itemName: 'videos'
    },
    articles: {
      href: '/articles',
      itemName: 'articles'
    },
    photos: {
      href: '/photos',
      itemName: 'photos'
    }
  };

  return sb.render( sb({
    items: items,
    activeItem: opts.activeItem
  })() );
};
