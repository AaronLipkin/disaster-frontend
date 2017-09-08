const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
// test message
this.message = "controller works"
this.notices = [];

$http({
  method: 'GET',
// need to set url
  url: 'http://localhost:3000/#'
}).then(response => {
  console.log(response);
  this.notices = response.data;
})
.catch(err => console.log(err));

// end of mainController
}]);

// test message to confirm app.js is linked
console.log('app.js working');
