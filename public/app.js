const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
// test message
  this.message = "controller works"
  this.survivors = [];
  this.formdata = {};

  $http({
    method: 'GET',
  // need to set url
    url: 'http://localhost:3000/#'
  }).then(response => {
    console.log(response);
    this.survivors = response.data;
  })
  .catch(err => console.log(err));

  this.processForm = function() {
  	console.log('processForm function . . .');
  	console.log('Formdata: ', this.formdata);
  }

// end of mainController
}]);

// test message to confirm app.js is linked
console.log('app.js working');
