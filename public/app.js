const app = angular.module('disasterboard', []);
app.controller('mainController', ['$http', function($http) {
// test message
this.message = "controller works"
// end of mainController 
}]);

// test message to confirm app.js is linked
console.log('app.js working');
