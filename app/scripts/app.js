
console.log("In LoginApp");
var myapp = angular.module("loginApp",['ngMaterial','ngRoute','ngMessages']);

function watchLanguageChange($scope,propertiesfactory){
    $scope.$watch(function () { return propertiesfactory.getProperties("no"); },
        function (value) {
            $scope.properties = value;
            console.log("$scope.properties in login con inside:"+$scope.properties);
        }
    );
}

myapp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/loginAgent', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).
        when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        }).
        when('/restaurantDNIS', {
            templateUrl: 'views/restaurants.html',
            controller: 'RestaurantsController'
        }).
        when('/customerANI', {
            templateUrl: 'views/customersani.html',
            controller: 'RestaurantsController'
        }).
        when('/createcustomer', {
            templateUrl: 'views/createcustomers.html',
            controller: 'CustomersController'
        }).
        when('/updatecustomer', {
            templateUrl: 'views/updatecustomer.html',
            controller: 'CustomersController'
        }).
        when('/deletecustomer', {
            templateUrl: 'views/deletecustomer.html',
            controller: 'CustomersController'
        }).
        when('/createcustomeraddress', {
            templateUrl: 'views/createcustomeraddress.html',
            controller: 'CustomerAddressController'
        }).
        when('/updatecustomeraddress', {
            templateUrl: 'views/updatecustomeraddress.html',
            controller: 'CustomerAddressController'
        }).
        when('/deletecustomeraddress', {
            templateUrl: 'views/deletecustomeraddress.html',
            controller: 'CustomerAddressController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }]);

