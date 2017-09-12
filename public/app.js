const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  // test message
  this.message = "controller works"
  this.survivors = [];
  this.cities = {};
  this.formdata = {};
  this.geolocation = [];

// GET route for survivors
this.getSurvivors = function () {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/survivors/#'
  }).then(response => {
    console.log(response);
    this.survivors = response.data;
    console.log(this.survivors.distance);
  })
  .catch(err => console.log(err));
}

// GET route for cities
this.getCities = function (){
  $http({
    method: 'GET',
    url: 'http://localhost:3000/cities/#'
  }).then(response => {
    // console.log(response);
    this.cities = response.data;
    console.log(response.data);
  })
  .catch(err => console.log(err));
}

this.createSurvivor = function () {
  $http({
    method: 'POST',
    url: 'http://localhost:3000/survivors/',
    data: {
      name: this.formdata.name,
      number: this.formdata.number,
      city: this.geolocation.address.city
    }
  }).then(response => {
    console.log(response);
    this.getCities();
    this.getSurvivors();
  })
  .catch(err => console.log(err));
}

  // form submit
  // this.processForm = function() {
  // 	console.log('processForm function . . .');
  // 	console.log('Formdata: ', this.formdata);
  // }

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
          timeout: 500,
          maximumWait: 500,     // max wait time for desired accuracy
          maximumAge: 0,          // disable cache
          desiredAccuracy: 30,    // meters
          fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
          addressLookup: true,    // requires Google API key if true
          timezone: true,         // requires Google API key if true
          // map: "map-canvas",      // interactive map element id (or options object)
          staticMap: true         // map image URL (boolean or options object)
      };

      geolocator.locate(options, function (err, location) {
          if (err) return console.log(err);
          console.log(location);
          controller.geolocation = location;
          console.log(controller.geolocation.address.city);
      });

  // end of window onload
  };

  this.getSurvivors();
  this.getCities();
// end of mainController
}]);
// test message to confirm app.js is linked
console.log('app.js working');
