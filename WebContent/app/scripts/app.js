"use strict";

//application
var app = angular.module('app' , ['ngRoute'])

.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(true);
});



