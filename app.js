//module
var weatherApp = angular.module('weatherApp',['ngRoute' , 'ngResource']);


//Routes
//http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d5e8894052fdf1481161c3e6f70ab124&units=metric

weatherApp.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
      templateUrl:'pages/home.htm',
      controller:'homeController'
    })
    .when('/forecast', {
      templateUrl:'pages/forecast.htm',
      controller:'forecastController'
    });
});

//services
weatherApp.service('cityService' ,function() {
  this.city ="San Jose, CA";
});


//controllers
weatherApp.controller('homeController' ,['$scope', '$http','cityService', function($scope , $http, cityService) {

$scope.weatherResult={};
  $scope.city = cityService.city;
  $scope.$watch('city' , function () {
    cityService.city = $scope.city;
  });

$scope.weatherResult=$http({
    url: "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d5e8894052fdf1481161c3e6f70ab124&units=metric",
    method: "GET",
    params: {q: $scope.city, cnt:2}
 })
  console.log($scope.weatherResult);

}]);


weatherApp.controller('forecastController' ,['$scope', 'cityService', function($scope , cityService) {
  $scope.city = cityService.city;
}]);
