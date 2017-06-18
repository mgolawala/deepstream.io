const Benchmark = require('./benchmark')

const iterations = 1000000

function jsonEverytimeFn (callback) {
  for (let i = 0; i < iterations; i++) {
    const json = JSON.parse('{"iteration":0}')
    json.iteration = i
  }
  callback()
}

// Hot Path!
function jsonOnceFn (callback) {
  const json = JSON.parse('{"iteration":0}')
  for (let i = 0; i < iterations; i++) {
    json.iteration = i
  }
  callback()
}

function number (callback) {
  const number = "a"
  let isItANumber = true
  for (let i = 0; i < iterations; i++) {
    isItANumber = !isNaN(number) && isItANumber
  }
  callback()
}

function typeofNumber (callback) {
  const number = Number("a")
  let isItANumber = true
  for (let i = 0; i < iterations; i++) {
    isItANumber = typeof number === 'number' && isItANumber
  }
  callback()
}

const jsonEverytime = new Benchmark('json-everytime', null, jsonEverytimeFn)
jsonEverytime.start()

const jsonOnce = new Benchmark('json-once', null, jsonOnceFn)
jsonOnce.start()

const numberBenchmark = new Benchmark('nan', null, number)
numberBenchmark.start()

const typeofNumberBenchmark = new Benchmark('typeof-number', null, typeofNumber)
typeofNumberBenchmark.start()