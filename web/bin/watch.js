#! /usr/bin/env node

var glob = require('glob');
var filewatcher = require('filewatcher');
var shell = require('shelljs');

var opts = {
  forcePolling: false,  // try event-based watching first
  debounce: 10,         // debounce events in non-polling mode by 10ms
  interval: 1000,       // if we need to poll, do it every 1000ms
  persistent: true      // don't end the process while files are watched
};

var watcher = filewatcher(opts);
var files = glob.sync('web/src/**/*');
files = files.concat(glob.sync('web/*'));
files = files.concat(glob.sync('web/tests/*'));
for (var i = 0; i < files.length; i++) {
  if (/\..+$/.test(files[i]))
    watcher.add(files[i]);
}

watcher.on('change', function(file, stat) {
  console.log('File modified: %s', file);
  if (!stat) console.log('deleted');
  shell.exec('npm run make ' + file);
});
