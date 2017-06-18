const profiler = require('v8-profiler-node8')
const fs = require('fs')

module.exports = class Benchmark {
    constructor (name, init, run) {
        this.name = name
        this.init = init ? init : done => done() 
        this.run = run
        this.complete = 0
        this._run = this._run.bind(this)
        this._complete = this._complete.bind(this)
    }

    start (iterations) {
      this.iterations = iterations ? iterations : 1
      this.init(err => {
        console.time(this.name)
        profiler.startProfiling()
        this.run(this._run)
      })
    }

    _complete () {
      console.timeEnd(this.name)

      // const id = __dirname + `/${this.name}-${Date.now()}`

      // console.log(`Generating head profile: '${id}.heapprofile'`)
      // const snapshot = profiler.takeSnapshot(id)
      // snapshot.export((error, result) => {
      //   fs.writeFileSync(`${id}.heapprofile`, result) 
      // })      

      // const memory = process.memoryUsage()
      // console.log(`HeapUsed: ${Math.round(memory.heapUsed / (1e+6))}mb`)
      // console.log(`HeapTotal: ${Math.round(memory.heapTotal / (1e+6))}mb`)
      // console.log(`External: ${Math.round(memory.external / (1e+6))}mb`)

      // console.log(`Generating cpu profile: '${id}.cpuprofile'`)
      // fs.writeFileSync(
      //   `${id}.cpuprofile`, 
      //   JSON.stringify(profiler.stopProfiling())
      // )      
    }

    _run () {
        this.complete++
        if (this.complete === this.iterations) {
          this._complete()
        } else {
          this.run(this._run)
        } 
    }
}