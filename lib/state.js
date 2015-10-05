var extend = require('xtend');
var value = require('observ');
var struct = require('observ-struct');

module.exports = state;

function state(obj) {
    var copy = extend(obj);
    // var $channels = copy.channels;
    // var $handles = copy.handles;

    // if ($channels) {
    //     copy.channels = value(null);
    // } else if ($handles) {
    //     copy.handles = value(null);
    // }

    var observ = struct(copy);
    // if ($channels) {
    //     observ.channels.set(mercury.channels($channels, observ));
    // } else if ($handles) {
    //     observ.handles.set(mercury.channels($handles, observ));
    // }
    return observ;
}
