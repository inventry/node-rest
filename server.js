'use strict'
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
const chalk = require('chalk');

// Setup Master Cluster
if (cluster.isMaster) {
  console.log(chalk.green.bold('Forking for ' + numCPUs + ' CPUs'));
  
  // Setup Child Clusters
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Ensure to start a new cluster if old one dies
  cluster.on('exit', function(worker, code, signal) {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(chalk.red('worker ${worker.id} has crashed.') + chalk.blue('Starting a new worker...'));
      cluster.fork();
    }
  });

} else {
  console.log(chalk.cyan('Started process ' + process.pid));
  require('./bin/www');
}