const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
// test message
  this.message = "controller works"
  this.survivors = [];
  this.cities = [];
  this.formdata = {};

// GET route for survivors
  $http({
    method: 'GET',
    url: 'http://localhost:3000/survivors/#'
  }).then(response => {
    console.log(response);
    this.survivors = response.data;
  })
  .catch(err => console.log(err));

// GET route for cities
  $http({
    method: 'GET',
    url: 'http://localhost:3000/cities/#'
  }).then(response => {
    console.log(response);
    this.cities = response.data;
  })
  .catch(err => console.log(err));

  // form submit
  this.processForm = function() {
  	console.log('processForm function . . .');
  	console.log('Formdata: ', this.formdata);
  }

// end of mainController
}]);

// test message to confirm app.js is linked
console.log('app.js working');
