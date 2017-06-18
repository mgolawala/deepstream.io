const Benchmark = require('./benchmark')

const iterations = 100000000
const aFunction = function (y) { return y++; }

function scopeless (callback) {
  let y = 0
  for (let i = 0; i < iterations; i++) {
  	y = aFunction.call(this, y)
  }
  console.log(y)
  callback()
}

function bound (callback) {
  let y = 0
  for (let i = 0; i < iterations; i++) {
  	const x = aFunction.bind(this)
  	y = x(y)
  }
  console.log(y)
  callback()
}

function scoped (callback) {
  for (let i = 0; i < iterations; i++) {
    var y = 0
	  function scopedFunction() { y++ }
	  scopedFunction()
   }

  callback()
}

const scopeLessBenchmark = new Benchmark('closure-scopeless', null, scopeless)
scopeLessBenchmark.start()

const boundBenchmark = new Benchmark('closure-bound', null, bound)
boundBenchmark.start()

const scopedBenchmark = new Benchmark('closure-scope', null, scoped)
scopedBenchmark.start()