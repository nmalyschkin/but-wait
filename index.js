var _stackOfMore = [];
var _noMore = false;
/**
 * add function
 * 
 * @param {function} more called without any parameters, expected to return Promise
 */
var thereIsMore = function(more) {
    if (_noMore) throw new Error("but-wait: you must not add more after noMore was called");
    if (!(more instanceof Function))
        throw new Error("but-wait: 'thereIsMore' must be called with a function that return a Promise");
    stackOfMore.push(more);
};

var noMore = function() {
    _noMore = true;
    return Promise.all([
        stackOfMore.map(function(more) {
            var prom = more();
            if (prom instanceof Promise) return prom;
            else throw new Error("but-wait: expected Promise as return, got " + prom.constructor.name);
        })
    ]);
};

module.exports = {
    thereIsMore: thereIsMore,
    noMore: noMore
};
