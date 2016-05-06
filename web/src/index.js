import angular from 'angular';
import routing from './config';
import uirouter from 'angular-ui-router';
import home from './home/home';

angular.module('app', [
    // Modules
    uirouter,

    // Controllers
    home
  ])
  .config(routing)

// XXX - Require index html in development
// this is to enable webpack --watch to track our html files
if (process.env.NODE_ENV === 'development') {
  require('./index.html')
}
