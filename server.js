'use strict'
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
const chalk = require('chalk');

// Setup Master Cluster
if (cluster.isMaster) {
  console.log(chalk.green('Forking for numCPUs: ' + numCPUs));
  
  // Setup Child Clusters
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Ensure to start a new cluster if old one dies
  cluster.on('exit', function(worker, code, signal) {
    console.log(chalk.red('worker ' + worker.process.pid + ' is dead'));
    cluster.fork();
  });

} else {
  console.log("Worker " + process.pid);
  require('./bin/www');
}