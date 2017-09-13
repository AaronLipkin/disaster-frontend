const app = angular.module('disasterboard', []);

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.cities = {};
  this.formdata = {};
  this.survivor_distance = [];
  this.geolocation;
  this.display_city;
  this.cityform = {};
  let geolocation;
  this.mode = "main";


// GET route for cities
this.getCities =  () => {
  $http({
    method: 'GET',
    url: 'https://disaster-app-wdir.herokuapp.com/cities/#'
  }).then(response => {
    this.cities = response.data;
  })
  .catch(err => console.log(err));
}

this.getCity =  (id) => {
  $http({
    method: 'GET',
    url: 'https://disaster-app-wdir.herokuapp.com/cities/' + id
  }).then(response => {
    this.display_city = response.data;
  })
  .catch(err => console.log(err));
}

// POST route to create new survivor
this.createSurvivor = () => {
  console.log(geolocation)
  $http({
    method: 'POST',
    url: 'https://disaster-app-wdir.herokuapp.com/survivors/',
    data: {
      name: this.formdata.name,
      number: this.formdata.number,
      city: geolocation.address.city,
      lat: geolocation.coords.latitude,
      lng: geolocation.coords.longitude
    }
  }).then(response => {
    console.log(response);
    this.getCities();
  })
  .catch(err => console.log(err));
}

this.editCity = (id) => {
  console.log(geolocation)
  $http({
    method: 'PUT',
    url: 'https://disaster-app-wdir.herokuapp.com/cities/' + id,
    data: {
      emergency_number: this.cityform.en,
      extra_info: this.cityform.extra_info
    }
  }).then(response => {
    console.log(response);
    this.getCities();
  })
  .catch(err => console.log(err));
}

this.destroySurvivor = (id) => {
  console.log(geolocation)
  $http({
    method: 'DELETE',
    url: 'https://disaster-app-wdir.herokuapp.com/survivors/' + id,
    params: {
      res_lat: geolocation.coords.latitude,
      res_lng: geolocation.coords.longitude
    }
  }).then(response => {
    console.log(response);
    this.message = response.data.response
    this.distanceSurvivor();
  })
  .catch(err => console.log(err));
}

this.distanceSurvivor = ()  =>  {
  $http({
    method: 'POST',
    url: 'https://disaster-app-wdir.herokuapp.com/survivors/distanced',
    data: {
      res_lat: geolocation.coords.latitude,
      res_lng: geolocation.coords.longitude
    }
  }).then(response => {
    // console.log(this.geolocation.coords.longitude);
    // console.log(response.data);
    this.mode = "use";
    this.survivor_distance = response.data;
    console.log(this.survivor_distance);
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

  window.onload = ()  =>  {
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
          geolocation = location;
          console.log(geolocation.coords.longitude);
          console.log(geolocation.coords.latitude);
          // console.log(controller.geolocation.address.city);
      });

  // end of window onload
  };

// to run on page load
  this.getCities();

// end of mainController
}]);
