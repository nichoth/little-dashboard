module.exports = function(domain, data) {
  return domain + (data.title || '') + Date.now();
};
