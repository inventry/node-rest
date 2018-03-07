'use strict'
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

// Setup Master Cluster
if (cluster.isMaster) {
  console.log("numCPUs " + numCPUs);

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + 'died');
    cluster.fork();
  });

// Setup Child Clusters
} else {
  console.log("Worker " + process.pid);
  require('./bin/www');
}