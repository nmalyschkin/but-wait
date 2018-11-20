const butWait = require('../index')
const assert = require('assert').strict

let flag = 0

// to be resolved
let resolve1
const prom1 = new Promise(resolve => { resolve1 = resolve }).then(() => {
    assert.ok(flag === 0)
    flag = 1
})
butWait.thereIsMore(prom1)

// already resolved
const prom2 = new Promise(resolve => resolve())
butWait.thereIsMore(prom2)

// more is not a promise
assert.throws(() => {
    butWait.thereIsMore(() => {})
})
assert.throws(() => {
    butWait.thereIsMore('test')
})
assert.throws(() => {
    butWait.thereIsMore(true)
})

// finish
butWait.noMore().then(() => {
    assert.ok(flag === 1)
    flag = 2
})

// throw if noMore was called already
assert.throws(() => {
    butWait.thereIsMore(() => {})
})

resolve1()
new Promise(resolve => resolve())
    .then(() => {
        assert.ok(flag === 1)
    })
    .then() // noMore() gets resolved
    .then(() => {
        assert.ok(flag === 2)
    })
