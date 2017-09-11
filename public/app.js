const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
// test message
  this.message = "controller works"
  this.survivors = [];
  this.cities = [];
  this.formdata = {};
  this.geolocation = {};

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

// geolocator
  geolocator.config({
      language: "en",
      google: {
          version: "3",
          key: "AIzaSyARlWLHlv9oid2232i1Hje9CVfE5qlSc6E"
      }
  });

  window.onload = function () {
      var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumWait: 10000,     // max wait time for desired accuracy
          maximumAge: 0,          // disable cache
          desiredAccuracy: 30,    // meters
          fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
          addressLookup: true,    // requires Google API key if true
          timezone: true,         // requires Google API key if true
          map: "map-canvas",      // interactive map element id (or options object)
          staticMap: true         // map image URL (boolean or options object)
      };

      geolocator.locate(options, function (err, location) {
          if (err) return console.log(err);
          this.geolocation = location;
      });

  // end of window onload
  };

// end of mainController
}]);

// test message to confirm app.js is linked
console.log('app.js working');
