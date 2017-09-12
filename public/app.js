const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.cities = {};
  this.formdata = {};
  this.survivor_distance = {};
  this.geolocation = [];


// GET route for cities
this.getCities = function (){
  $http({
    method: 'GET',
    url: 'http://localhost:3000/cities/#'
  }).then(response => {
    this.cities = response.data;
  })
  .catch(err => console.log(err));
}

// POST route to create new survivor
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
  })
  .catch(err => console.log(err));
}

this.distanceSurvivor = function () {
  $http({
    method: 'POST',
    url: 'http://localhost:3000/survivors/distanced',
    data: {
      res_lat: this.geolocation.coords.latitude,
      res_lng: this.geolocation.coords.longitude
    }
  }).then(response => {
    console.log(response);
    // console.log(this.geolocation.coords.longitude);
    // console.log(response.data);
    // this.survivor_distance = response.data;
    // console.log(this.survivor_distance);
  })
  .catch(err => console.log(err));
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

// to run on page load
  this.getCities();

// end of mainController
}]);
