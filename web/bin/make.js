#! /usr/bin/env node

/* CONSTANTS */
var EXECPATH = 'node_modules/.bin';
var BASEPATH = 'public/web/lib';

/* LIBRARIES */
var shell = require('shelljs');
var colors = require('colors');
var fs = require('fs');
var glob = require('glob');

// 0 = node, 1 = script
var arg1 = process.argv[2]
var arg2 = process.argv[3]
var cmd = (typeof arg1 === 'undefined') ? 'all' : arg1;
var group = (typeof arg2 === 'undefined') ? 'all' : arg2;

/*
 * Driver
 */
if (cmd == 'prod') {
  var sources = find_and_aggregate();
  log('Cleaning public/web'.underline);
  clean();
  log('Making production'.underline);
  make(sources, true);
  log('Vulcanizing'.underline);
  var rules = fs.readFileSync('web/'+ group +'.rule', 'utf8').split('\n');
  vulcanize(rules, group);
} else if (cmd == 'clean') {
  log('Cleaning public/web'.underline);
  clean();
} else {
  log('Making all'.underline);
  make();
}

/*
 * make release
 */
function vulcanize( rules, group ) {
  log('>> Compiling rules file')
  htmls = filter(rules, /^ez-/).map(function(html) {
    return '<link rel=\'import\' href=\'lib/'+ html +'.html\'>';
  })
  scripts = filter(rules, /(<script|<link)/);
  fs.writeFileSync('public/web/temp', scripts.concat(htmls).join('\n'));

  log('>> Vulcanizing'.yellow);
  var out = exec(EXECPATH + '/vulcanize ' + 'public/web/temp');
  fs.writeFileSync('public/web/'+ group +'.html', out.output);
  exec('rm public/web/temp');
  success('>> Build successful!'.underline);
}

/*
 * make all
 */
function make(sources, minify) {
  var minify = (typeof minify === 'undefined') ? false : true;

  log('>> Compiling typescripts');
  var regex = new RegExp(/d\.ts$/);
  sources.typescripts.forEach(function(tsfile) {
    if (regex.test(tsfile)) return true;
    var outfile = dst(tsfile, '.ts');
    exec(EXECPATH + '/tsc ' + '-t ES5 '+ tsfile +' -out '+ outfile);
    // if (minify) {
    //   var minfile = outfile.replace(/\.js$/,'.min.js')
    //   exec(EXECPATH + '/minify ' + '--output '+  +' '+ outfile);
    // }
  });

  log('>> Compiling handlebars');
  sources.handlebars.forEach(function(hbfile) {
    var outfile = dst(hbfile, '.handlebars');
    exec(EXECPATH + '/handlebars ' + hbfile +' -f '+ outfile);
  });

  log('>> Compiling SASS');
  sources.scss.forEach(function(safile) {
    var outfile = dst(safile, '.scss');
    var mini = (minify) ? '--output-style compressed' : '';
    exec(EXECPATH + '/node-sass ' +
      '--sourcemap=none '+ mini +' '+ safile +' --output '+ outfile);
  });

  log('>> Copying HTMLS');
  sources.html.forEach(function(html) {
    var outfile = dst(html, '.html');
    exec('cp ' + html + ' ' + outfile);
  });

  log('>> Copying vendors');
  exec('cp -r web/vendors public/web/');

  log('>> Copying tests');
  exec('cp -r web/tests public/web/');
}

/*
 * make clean
 */
function clean() {
  exec('rm -rf public/web');
}

function find_and_aggregate() {
  var sources = {};
  sources.typescripts = glob.sync('web/src/**/*.ts');
  sources.handlebars = glob.sync('web/src/**/*.handlebars');
  sources.scss = glob.sync('web/src/**/*.scss');
  sources.html = glob.sync('web/src/**/*.html');
  return sources;
}

/* Filters an array based on regex match */
function filter(arr, regex) {
  return arr.filter(function(item){
    return regex.test(item);
  });
}

/* Returns a destination path based on source path and file type */
function dst( src, type ) {
  var filename = src.replace(/^.*[\\\/]/, '').replace(type, '');
  var destination = BASEPATH + '/' + filename;
  switch(type) {
    case '.handlebars':
      destination += '.handlebars.js';
      break;
    case '.scss':
      destination = BASEPATH + '/'
      break;
    case '.ts':
      destination += '.js';
      break;
    default:
      destination += type;
  }
  return destination;
}

/* Use shelljs to exec a command */
function exec( cmd ) {
  log('>> ' + cmd);
  var out = shell.exec(cmd, { silent: true });
  if (out.code == 0) {
    success('>> -- success');
    return out;
  } else {
    error('>> -- error!');
    throw out.output;
  }
}

/* Loggers */
function log(str) { console.log(str.yellow); }
function error(str) { console.log(str.red); }
function success(str) { console.log(str.green); }
