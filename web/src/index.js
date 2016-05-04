import angular from 'angular';
import routing from './config';

import uirouter from 'angular-ui-router';
import HomeController from './home/home';

angular.module('app', ['ui.router'])
  .config(routing)
  .controller('HomeController', HomeController);