const BenchmarkSuite = require('benchmark').Suite;
const suite = new BenchmarkSuite(require('../.benchmarkConfig'));

const { toUpperCase } = require('@micro-ux/micro-dash');
const _ = require('lodash');

suite
  .add('Native#toLowerCase', function () {
    'Hello World!'.toLowerCase();
  })
  .add('Lodash#toLowerCase', function () {
    _.toLower('Hello World!');
  })
  .add('micro-dash#toLowerCase', function () {
    toLowerCase('Hello World!');
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// logs:
// Native#toLowerCase x 857,034,515 ops/sec ±1.71% (82 runs sampled)
// Lodash#toLowerCase x 862,757,044 ops/sec ±1.62% (85 runs sampled)
// micro-dash#toLowerCase x 862,200,383 ops/sec ±1.60% (83 runs sampled)
// Fastest is Lodash#toLowerCase,micro-dash#toLowerCase,Native#toLowerCase
