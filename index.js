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
    _stackOfMore.push(more);
};

var noMore = function() {
    _noMore = true;
    return Promise.all(
        _stackOfMore.map(function(more) {
            var prom = more();
            if (!prom) throw new Error("but-wait: expected Promise as return, got undefined");
            if (prom instanceof Promise) return prom;
            else throw new Error("but-wait: expected Promise as return, got " + prom.constructor.name);
        })
    ).then(() => console.log("noMore is done"));
};

module.exports = {
    thereIsMore: thereIsMore,
    noMore: noMore
};
