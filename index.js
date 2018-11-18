var _stackOfMore = [];
var _noMore = false;

/**
 * add a Promise or function that returns a Promise
 * 
 * @param {function/Promise} more if function called without any parameters, expected to return Promise
 */
var thereIsMore = function(more) {
    if (_noMore) throw new Error("but-wait: you must not add more after noMore was called");
    let toPush = more;
    if (more instanceof Function) toPush = more();
    if (!(toPush instanceof Promise))
        throw new Error("but-wait: expected Promise as return, got " + prom.constructor.name);

    _stackOfMore.push(more);
};

/**
 * call when no more should be added
 * 
 * @returns {Promise} Promise that is resolved when all asynchronous initializations finished
 */
var noMore = function() {
    _noMore = true;
    return Promise.all(_stackOfMore);
};

module.exports = {
    thereIsMore: thereIsMore,
    noMore: noMore
};
