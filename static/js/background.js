window.backgroundGet = function() {
    return $.get.apply(this, Array.prototype.slice.call(arguments));
};