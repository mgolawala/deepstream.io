const Benchmark = require('../benchmark')
const jsonPath = require('../../src/record/json-path')

function setup (callback) {
  callback()
}

function run (callback) {
  for (let i = 0; i < 10000000; i++) {
    jsonPath.setValue({}, 'a.b.c[0][2].d', 'bob')
  }
  callback()
}

const benchmark = new Benchmark('json-path', setup, run)
benchmark.start()