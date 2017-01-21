//module
var weatherApp = angular.module('weatherApp',['ngRoute' , 'ngResource']);


//Routes
//http://api.openweathermap.org/data/2.5/forecast/daily?APPID=24&units=metric

weatherApp.config(function ($routeProvider , $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl:'pages/home.htm',
      controller:'homeController'
    })
    .when('/forecast', {
      templateUrl:'pages/forecast.htm',
      controller:'forecastController',
    });
     $locationProvider.hashPrefix('');


});

//services
weatherApp.service('cityService' ,function() {
  this.city ="San Jose, CA";
});


//controllers
weatherApp.controller('homeController' ,['$scope', 'cityService', function($scope , cityService) {


  $scope.city = cityService.city;
  $scope.$watch('city' , function () {
    cityService.city = $scope.city;
  });
}]);


weatherApp.controller('forecastController' ,['$scope', '$http','cityService', function($scope , $http, cityService) {
  $scope.city = cityService.city;
  console.log($scope.city);
  $http({
      url: "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=&units=metric",
      method: "GET",
      params: {q: $scope.city, cnt:7}
   }).then(function(response){
        $scope.weatherResults = response.data; //IF I LOG THIS IT WORKS
        console.log($scope.weatherResults);
   });

   $scope.convertDate = function(dt){
   return new Date(dt*1000);
   }


}]);
