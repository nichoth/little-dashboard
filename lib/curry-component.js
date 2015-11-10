module.exports = function curryPage(component, args) {
  var page = component.bind(component, args);
  // page.render = component.render;
  Object.keys(component).forEach(function(k) {
    page[k] = component[k];
  });
  return page;
};
