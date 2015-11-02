var h = require('virtual-dom/h');

module.exports = {
  create: function(text, url) {
    return h('a.create-domain-item.nav-button', {
      href: url
    }, [
      text
    ]);
  },
  back: function(url) {
    return h('a.domain-back-button.nav-button', {
      href: url
    }, [
      '<'
    ]);
  }
};
