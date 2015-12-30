
myapp.controller('LoginController',['$scope','$http','propertiesfactory', function($scope,$http,propertiesfactory) {

    $scope.loginResponse =[{}];
    watchLanguageChange($scope,propertiesfactory);
    console.log("$scope.properties in login con:"+$scope.properties);

    $scope.authToken="";
    $scope.login=function(){
        console.log( $scope.userName);
        console.log( $scope.password);
        $scope.loginResponse =[{}];
        $http({
            method: 'POST',
            url: 'https://services.kiofc.com/api/51/api/callcenter/login',
            data: {
                "userName": ""+$scope.userName+"",
                "password": ""+ $scope.password+""
            }
        }).then(function(resp) {
            console.log("Inside");
            console.log(resp.data);
            $scope.loginResponse = resp.data;
            $scope.authToken=resp.data.AuthToken;
            if(typeof(Storage) !== "undefined") {
                sessionStorage.setItem("authKey",$scope.authToken);
            } else {
                console.log("No Session storage support");
            }
        }, function errorCallback(resp) {
            $scope.loginResponse = resp.data;
        });
    }

}]);
