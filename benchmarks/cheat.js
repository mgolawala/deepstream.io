const Benchmark = require('./benchmark')

const iterations = 1000000

const json = '{"value":true}'

function jsonCheat (callback) {
  let result = true
  for (let i = 0; i < iterations; i++) {
    if (json === '{"value":false}') {
      result = false && result
    } else if (json === '{"value":true}') {
      result = true && result
    }
  }
  console.log(result)
  callback()
}

function jsonEthics (callback) {
  let result = true
  for (let i = 0; i < iterations; i++) {
    const json = JSON.parse('{"value":true}')
    result = json.value && result
  }
  console.log(result)
  callback()
}

const jsonCheatBenchmark = new Benchmark('json-cheat', null, jsonCheat)
jsonCheatBenchmark.start()

const jsonEthicsBenchmark = new Benchmark('json-ethics', null, jsonEthics)
jsonEthicsBenchmark.start()
