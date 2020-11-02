const BenchmarkSuite = require('benchmark').Suite;
const suite = new BenchmarkSuite(require('../.benchmarkConfig'));

const { toUpperCase } = require('@micro-ux/micro-dash');
const _ = require('lodash');

suite
  .add('Native#toUpperCase', function () {
    'Hello World!'.toUpperCase();
  })
  .add('Lodash#toUpper', function () {
    _.toUpper('Hello World!');
  })
  .add('micro-dash#toUpperCase', function () {
    toUpperCase('Hello World!');
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
// Native#toUpperCase x 845,408,823 ops/sec ±1.97% (82 runs sampled)
// Lodash#toUpper x 861,905,022 ops/sec ±1.57% (87 runs sampled)
// micro-dash#toUpperCase x 857,183,825 ops/sec ±1.83% (88 runs sampled)
// Fastest is Lodash#toUpper,micro-dash#toUpperCase,Native#toUpperCase
